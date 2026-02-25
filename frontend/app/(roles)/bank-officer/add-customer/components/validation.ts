import { CustomerFormData } from "./types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const contactRegex = /^\+?[0-9][0-9\s-]{7,20}$/;
const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
const usernameRegex = /^[a-zA-Z0-9._-]{4,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const currencyRegex = /^\d+(\.\d{1,2})?$/;

export type PersonalDetailsErrors = Partial<
  Record<"fullName" | "nic" | "dob" | "email" | "mobile" | "username" | "password" | "confirmPassword", string>
>;

export type FinancialDataErrors = Partial<
  Record<"employmentType" | "monthlySalary" | "businessIncome" | "income", string>
>;

export type LoanDraft = {
  type: string;
  monthlyEmi: string;
  remainingBalance: string;
};

export type LoanDraftErrors = Partial<Record<"type" | "monthlyEmi" | "remainingBalance", string>>;

export type CreditCardDraft = {
  issuer: string;
  limit: string;
  outstandingBalance: string;
};

export type CreditCardDraftErrors = Partial<Record<"issuer" | "limit" | "outstandingBalance", string>>;

export type LiabilityDraft = {
  category: string;
  monthlyAmount: string;
};

export type LiabilityDraftErrors = Partial<Record<"category" | "monthlyAmount", string>>;

export type LiabilitiesStepErrors = Partial<Record<"missedPaymentsLast12Months", string>>;

export type CRIBRetrievalErrors = Partial<
  Record<"creditScore" | "inquiryCount" | "activeLoansCount" | "totalActiveLoanValue", string>
>;

export interface SubmissionValidationResult {
  isValid: boolean;
  firstInvalidStep: 1 | 2 | 3 | 4 | 5 | 7 | null;
  message?: string;
}

function sanitizeAmount(value: string): string {
  return value.replace(/,/g, "").trim();
}

function toAmount(value: string): number {
  return Number(sanitizeAmount(value));
}

function isCurrencyFormat(value: string): boolean {
  return currencyRegex.test(sanitizeAmount(value));
}

function hasErrors<T extends object>(errors: T): boolean {
  return Object.keys(errors).length > 0;
}

function getFirstErrorMessage(errors: Record<string, string | undefined>): string | undefined {
  return Object.values(errors).find((error): error is string => Boolean(error));
}

function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

export function validatePersonalDetailsStep(formData: CustomerFormData): PersonalDetailsErrors {
  const errors: PersonalDetailsErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  if (!formData.nic.trim()) {
    errors.nic = "NIC number is required.";
  } else if (!nicRegex.test(formData.nic.trim())) {
    errors.nic = "Enter a valid NIC number.";
  }

  if (!formData.dob.trim()) {
    errors.dob = "Date of birth is required.";
  } else {
    const dob = new Date(formData.dob);
    const today = new Date();
    if (Number.isNaN(dob.getTime())) {
      errors.dob = "Enter a valid date of birth.";
    } else if (dob > today) {
      errors.dob = "Date of birth cannot be in the future.";
    } else {
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age -= 1;
      }
      if (age < 18) {
        errors.dob = "Customer must be at least 18 years old.";
      }
    }
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.mobile.trim()) {
    errors.mobile = "Mobile number is required.";
  } else if (!contactRegex.test(formData.mobile.trim())) {
    errors.mobile = "Enter a valid mobile number.";
  }

  if (!formData.username.trim()) {
    errors.username = "Username is required.";
  } else if (!usernameRegex.test(formData.username.trim())) {
    errors.username = "Use 4-20 characters: letters, numbers, dots, underscores, or hyphens.";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required.";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password = "Use at least 8 chars with uppercase, lowercase, and a number.";
  }

  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm the password.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function validateFinancialDataStep(formData: CustomerFormData): FinancialDataErrors {
  const errors: FinancialDataErrors = {};
  const monthlySalary = formData.monthlySalary.trim();
  const businessIncome = formData.businessIncome.trim();

  if (!formData.employmentType.trim()) {
    errors.employmentType = "Employment type is required.";
  }

  if (monthlySalary) {
    if (!isCurrencyFormat(monthlySalary)) {
      errors.monthlySalary = "Enter a valid salary amount.";
    } else if (toAmount(monthlySalary) <= 0) {
      errors.monthlySalary = "Salary amount must be greater than 0.";
    }
  }

  if (businessIncome) {
    if (!isCurrencyFormat(businessIncome)) {
      errors.businessIncome = "Enter a valid business income amount.";
    } else if (toAmount(businessIncome) <= 0) {
      errors.businessIncome = "Business income amount must be greater than 0.";
    }
  }

  if (!monthlySalary && !businessIncome) {
    errors.income = "Enter at least one income source.";
  } else if (!errors.monthlySalary && !errors.businessIncome) {
    const totalIncome = (monthlySalary ? toAmount(monthlySalary) : 0) + (businessIncome ? toAmount(businessIncome) : 0);
    if (totalIncome <= 0) {
      errors.income = "Total income must be greater than 0.";
    }
  }

  return errors;
}

export function validateLoanDraft(loan: LoanDraft): LoanDraftErrors {
  const errors: LoanDraftErrors = {};

  if (!loan.type.trim()) {
    errors.type = "Loan type is required.";
  }

  if (!loan.monthlyEmi.trim()) {
    errors.monthlyEmi = "Monthly EMI is required.";
  } else if (!isCurrencyFormat(loan.monthlyEmi)) {
    errors.monthlyEmi = "Enter a valid EMI amount.";
  } else if (toAmount(loan.monthlyEmi) <= 0) {
    errors.monthlyEmi = "EMI amount must be greater than 0.";
  }

  if (!loan.remainingBalance.trim()) {
    errors.remainingBalance = "Remaining balance is required.";
  } else if (!isCurrencyFormat(loan.remainingBalance)) {
    errors.remainingBalance = "Enter a valid remaining balance amount.";
  } else if (toAmount(loan.remainingBalance) <= 0) {
    errors.remainingBalance = "Remaining balance must be greater than 0.";
  }

  return errors;
}

export function validateLoanCollection(loans: CustomerFormData["loans"]): string | undefined {
  for (let index = 0; index < loans.length; index += 1) {
    const errors = validateLoanDraft(loans[index]);
    if (hasErrors(errors)) {
      return `Loan #${index + 1} contains invalid values.`;
    }
  }

  return undefined;
}

export function validateCreditCardDraft(card: CreditCardDraft): CreditCardDraftErrors {
  const errors: CreditCardDraftErrors = {};

  if (card.issuer.trim() && card.issuer.trim().length < 2) {
    errors.issuer = "Issuer name must be at least 2 characters.";
  }

  if (!card.limit.trim()) {
    errors.limit = "Credit limit is required.";
  } else if (!isCurrencyFormat(card.limit)) {
    errors.limit = "Enter a valid credit limit.";
  } else if (toAmount(card.limit) <= 0) {
    errors.limit = "Credit limit must be greater than 0.";
  }

  if (!card.outstandingBalance.trim()) {
    errors.outstandingBalance = "Outstanding balance is required.";
  } else if (!isCurrencyFormat(card.outstandingBalance)) {
    errors.outstandingBalance = "Enter a valid outstanding balance.";
  } else if (toAmount(card.outstandingBalance) < 0) {
    errors.outstandingBalance = "Outstanding balance cannot be negative.";
  }

  if (!errors.limit && !errors.outstandingBalance) {
    const limit = toAmount(card.limit);
    const outstandingBalance = toAmount(card.outstandingBalance);
    if (outstandingBalance > limit) {
      errors.outstandingBalance = "Outstanding balance cannot exceed credit limit.";
    }
  }

  return errors;
}

export function validateCreditCardCollection(cards: CustomerFormData["creditCards"]): string | undefined {
  for (let index = 0; index < cards.length; index += 1) {
    const errors = validateCreditCardDraft(cards[index]);
    if (hasErrors(errors)) {
      return `Credit card #${index + 1} contains invalid values.`;
    }
  }

  return undefined;
}

export function validateLiabilityDraft(liability: LiabilityDraft): LiabilityDraftErrors {
  const errors: LiabilityDraftErrors = {};

  if (!liability.category.trim()) {
    errors.category = "Liability category is required.";
  }

  if (!liability.monthlyAmount.trim()) {
    errors.monthlyAmount = "Monthly amount is required.";
  } else if (!isCurrencyFormat(liability.monthlyAmount)) {
    errors.monthlyAmount = "Enter a valid monthly amount.";
  } else if (toAmount(liability.monthlyAmount) <= 0) {
    errors.monthlyAmount = "Monthly amount must be greater than 0.";
  }

  return errors;
}

export function validateLiabilityCollection(liabilities: CustomerFormData["liabilities"]): string | undefined {
  for (let index = 0; index < liabilities.length; index += 1) {
    const errors = validateLiabilityDraft(liabilities[index]);
    if (hasErrors(errors)) {
      return `Liability #${index + 1} contains invalid values.`;
    }
  }

  return undefined;
}

export function validateLiabilitiesStep(formData: CustomerFormData): LiabilitiesStepErrors {
  const errors: LiabilitiesStepErrors = {};

  if (!isInteger(formData.missedPaymentsLast12Months) || formData.missedPaymentsLast12Months < 0) {
    errors.missedPaymentsLast12Months = "Missed payments must be a non-negative whole number.";
  }

  return errors;
}

export function validateCRIBRetrievalStep(formData: CustomerFormData): CRIBRetrievalErrors {
  const errors: CRIBRetrievalErrors = {};

  if (formData.creditScore === undefined || formData.creditScore === null) {
    errors.creditScore = "Retrieve CRIB data before continuing.";
  } else if (formData.creditScore < 300 || formData.creditScore > 900) {
    errors.creditScore = "Credit score must be between 300 and 900.";
  }

  if (formData.inquiryCount !== undefined && (!isInteger(formData.inquiryCount) || formData.inquiryCount < 0)) {
    errors.inquiryCount = "Inquiry count must be a non-negative whole number.";
  }

  if (formData.activeLoansCount !== undefined && (!isInteger(formData.activeLoansCount) || formData.activeLoansCount < 0)) {
    errors.activeLoansCount = "Active loans count must be a non-negative whole number.";
  }

  if (formData.totalActiveLoanValue !== undefined && formData.totalActiveLoanValue < 0) {
    errors.totalActiveLoanValue = "Total active loan value cannot be negative.";
  }

  return errors;
}

export function validateCustomerSubmission(formData: CustomerFormData): SubmissionValidationResult {
  const step1Errors = validatePersonalDetailsStep(formData);
  if (hasErrors(step1Errors)) {
    return {
      isValid: false,
      firstInvalidStep: 1,
      message: getFirstErrorMessage(step1Errors) ?? "Complete personal details before submitting.",
    };
  }

  const step2Errors = validateFinancialDataStep(formData);
  if (hasErrors(step2Errors)) {
    return {
      isValid: false,
      firstInvalidStep: 2,
      message: getFirstErrorMessage(step2Errors) ?? "Complete financial data before submitting.",
    };
  }

  const step3CollectionError = validateLoanCollection(formData.loans);
  if (step3CollectionError) {
    return {
      isValid: false,
      firstInvalidStep: 3,
      message: step3CollectionError,
    };
  }

  const step4CollectionError = validateCreditCardCollection(formData.creditCards);
  if (step4CollectionError) {
    return {
      isValid: false,
      firstInvalidStep: 4,
      message: step4CollectionError,
    };
  }

  const step5Errors = validateLiabilitiesStep(formData);
  if (hasErrors(step5Errors)) {
    return {
      isValid: false,
      firstInvalidStep: 5,
      message: getFirstErrorMessage(step5Errors) ?? "Fix liability details before submitting.",
    };
  }

  const step5CollectionError = validateLiabilityCollection(formData.liabilities);
  if (step5CollectionError) {
    return {
      isValid: false,
      firstInvalidStep: 5,
      message: step5CollectionError,
    };
  }

  const step7Errors = validateCRIBRetrievalStep(formData);
  if (hasErrors(step7Errors)) {
    return {
      isValid: false,
      firstInvalidStep: 7,
      message: getFirstErrorMessage(step7Errors) ?? "Retrieve CRIB data before submitting.",
    };
  }

  return {
    isValid: true,
    firstInvalidStep: null,
  };
}
