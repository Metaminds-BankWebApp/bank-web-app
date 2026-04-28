"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { 
  CheckCircle2, 
   Pencil,
   Trash2,
   User,
   X
} from "lucide-react";
import { initialFormData, CustomerFormData } from "./components/types";
import { PersonalDetails } from "./components/step-1-personal-details";
import { CribLinking } from "./components/step-2-crib-linking";
import { FinancialData } from "./components/step-2-financial-data";
import { Loans } from "./components/step-3-loans";
import { CreditCards } from "./components/step-4-credit-cards";
import { Liabilities } from "./components/step-5-liabilities";
import { Review } from "./components/step-8-review";
import { SuccessView } from "./components/success-view";
import ModuleHeader from "@/src/components/ui/module-header";
import { validateCreditCardDraft, validateCustomerSubmission, validateLiabilityDraft, validateLoanDraft } from "./components/validation";
import {
   continueBankCustomerStepOne,
   saveBankCustomerStepOneDraft,
   updateBankCustomerStepOneContinue,
   updateBankCustomerStepOneDraft,
} from "@/src/api/registration/bank-customer-registration.service";
import { verifyBankAccount } from "@/src/api/customers/account-verification.service";
import {
   completeBankCustomerCribReviewStep,
   findOwnedBankCustomerStepOneByNic,
   getCurrentBankCustomerFinancialRecord,
   getOwnedBankCustomerIdentityByUserId,
   saveBankCustomerCardStep,
   saveBankCustomerCribLinkingStep,
   saveBankCustomerIncomeStep,
   saveBankCustomerLiabilityStep,
   saveBankCustomerLoanStep,
} from "@/src/api/customers/bank-customer-financial.service";
import type {
   BankCustomerCardStepRequest,
   BankCustomerCribRequestStepRequest,
   BankCustomerCribStepResponse,
   BankCustomerFinancialRecordResponse,
   BankCustomerIncomeStepRequest,
   BankCustomerLiabilityStepRequest,
   BankCustomerLoanStepRequest,
} from "@/src/types/dto/bank-customer-financial.dto";
import type { StepOneRegistrationRequest, StepOneUpdateRequest } from "@/src/types/dto/registration.dto";
import { ApiError } from "@/src/types/api-error";
import { getOfficerCreditCurrentEvaluation } from "@/src/api/creditlens/officer-creditlens.service";
import { useToast } from "@/src/components/ui/toast";

type StepOneConflictField = "nic" | "email" | "username" | "bankAccount";
type StepOneFieldErrors = Partial<Record<StepOneConflictField, string>>;
type UnknownRecord = Record<string, unknown>;

type CribPrefillData = {
   creditScore?: number;
   inquiryCount?: number;
   activeLoansCount?: number;
   totalActiveLoanValue?: number;
   missedPaymentsLast12Months?: number;
   loans: CustomerFormData["loans"];
   creditCards: CustomerFormData["creditCards"];
   liabilities: CustomerFormData["liabilities"];
};

function isRecord(value: unknown): value is UnknownRecord {
   return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toNumber(value: unknown): number | undefined {
   if (typeof value === "number" && Number.isFinite(value)) {
      return value;
   }

   if (typeof value === "string") {
      const parsed = Number(value.replace(/,/g, "").trim());
      if (Number.isFinite(parsed)) {
         return parsed;
      }
   }

   return undefined;
}

function toRoundedNonNegativeInteger(value: unknown): number | undefined {
   const parsed = toNumber(value);
   if (parsed === undefined || parsed < 0) {
      return undefined;
   }

   return Math.round(parsed);
}

function toCurrencyString(value: unknown): string | undefined {
   const parsed = toNumber(value);
   if (parsed === undefined || parsed < 0) {
      return undefined;
   }

   return parsed.toFixed(2);
}

function toDisplayToken(value: string | null | undefined): string {
   if (!value) {
      return "";
   }

   return value
      .trim()
      .toLowerCase()
      .split(/[_\s]+/)
      .filter(Boolean)
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(" ");
}

function toCurrencyInputValue(value: number | null | undefined): string {
   if (typeof value !== "number" || !Number.isFinite(value)) {
      return "";
   }
   return value.toFixed(2);
}

function mapFinancialRecordToFormData(record: BankCustomerFinancialRecordResponse): Partial<CustomerFormData> {
   const salaryIncome = record.incomes.find((income) => (income.incomeCategory || "").toUpperCase() === "SALARY");
   const businessIncome = record.incomes.find((income) => (income.incomeCategory || "").toUpperCase() === "BUSINESS");
   const incomes: CustomerFormData["incomes"] = [];
   if (Array.isArray(record.incomes)) {
      for (const income of record.incomes) {
         const normalizedCategory = (income.incomeCategory || "").toUpperCase();
         if (normalizedCategory === "SALARY") {
            incomes.push({
               type: "Salary Worker",
               amount: toCurrencyInputValue(income.amount),
               salaryType: toDisplayToken(income.salaryType) || "Fixed",
               employmentType: toDisplayToken(income.employmentType) || "Permanent",
               contractDurationMonths:
                  typeof income.durationMonths === "number" && Number.isFinite(income.durationMonths)
                     ? String(income.durationMonths)
                     : undefined,
            });
            continue;
         }

         if (normalizedCategory === "BUSINESS") {
            incomes.push({
               type: "Business Person",
               amount: toCurrencyInputValue(income.amount),
               incomeStability: toDisplayToken(income.incomeStability) || "Stable",
            });
         }
      }
   }

   let incomeType = "Salary Worker";
   if (salaryIncome && businessIncome) {
      incomeType = "Salary Worker + Business Person";
   } else if (businessIncome) {
      incomeType = "Business Person";
   }

   return {
      incomeType,
      salaryType: toDisplayToken(salaryIncome?.salaryType) || "Fixed",
      employmentType: toDisplayToken(salaryIncome?.employmentType) || "Permanent",
      contractDurationMonths:
         typeof salaryIncome?.durationMonths === "number" && Number.isFinite(salaryIncome.durationMonths)
            ? String(salaryIncome.durationMonths)
            : "",
      monthlySalary: toCurrencyInputValue(salaryIncome?.amount),
      businessIncome: toCurrencyInputValue(businessIncome?.amount),
      incomeStability: toDisplayToken(businessIncome?.incomeStability) || "Stable",
      incomes,
      loans: Array.isArray(record.loans)
         ? record.loans.map((loan) => ({
              type: loan.loanType || "",
              monthlyEmi: toCurrencyInputValue(loan.monthlyEmi),
              remainingBalance: toCurrencyInputValue(loan.remainingBalance),
           }))
         : [],
      creditCards: Array.isArray(record.cards)
         ? record.cards.map((card) => ({
              issuer: card.provider || "Standard Card",
              limit: toCurrencyInputValue(card.creditLimit),
              outstandingBalance: toCurrencyInputValue(card.outstandingBalance),
           }))
         : [],
      liabilities: Array.isArray(record.liabilities)
         ? record.liabilities.map((liability) => ({
              category: liability.description || "",
              monthlyAmount: toCurrencyInputValue(liability.monthlyAmount),
           }))
         : [],
      missedPaymentsLast12Months:
         typeof record.missedPayments === "number" && Number.isFinite(record.missedPayments)
            ? Math.max(0, Math.trunc(record.missedPayments))
            : 0,
   };
}

function pickString(source: UnknownRecord, keys: string[]): string | undefined {
   for (const key of keys) {
      const value = source[key];
      if (typeof value === "string" && value.trim()) {
         return value.trim();
      }
   }

   return undefined;
}

function pickNumber(source: UnknownRecord, keys: string[]): number | undefined {
   for (const key of keys) {
      const parsed = toNumber(source[key]);
      if (parsed !== undefined) {
         return parsed;
      }
   }

   return undefined;
}

function pickNumberFromSources(sources: UnknownRecord[], keys: string[]): number | undefined {
   for (const source of sources) {
      const parsed = pickNumber(source, keys);
      if (parsed !== undefined) {
         return parsed;
      }
   }

   return undefined;
}

function pickArrayFromSources(sources: UnknownRecord[], keys: string[]): unknown[] {
   for (const source of sources) {
      for (const key of keys) {
         const candidate = source[key];
         if (Array.isArray(candidate)) {
            return candidate;
         }
      }
   }

   return [];
}

function buildCribSources(response: BankCustomerCribStepResponse): UnknownRecord[] {
   const root = response as unknown as UnknownRecord;
   const sources: UnknownRecord[] = [root];

   const appendIfRecord = (candidate: unknown) => {
      if (!isRecord(candidate) || sources.includes(candidate)) {
         return;
      }
      sources.push(candidate);
   };

   appendIfRecord(root.cribData);
   appendIfRecord(root.report);
   appendIfRecord(root.data);
   appendIfRecord(root.snapshot);
   appendIfRecord(root.payload);

   for (const source of [...sources]) {
      appendIfRecord(source.facilities);
      appendIfRecord(source.summary);
      appendIfRecord(source.details);
   }

   return sources;
}

function normalizeLoanRows(records: unknown[]): CustomerFormData["loans"] {
   return records.flatMap((record) => {
      if (!isRecord(record)) {
         return [];
      }

      const type = pickString(record, ["loanType", "type", "facilityType", "productType", "description"]);
      const monthlyEmi = toCurrencyString(
         pickNumber(record, ["monthlyEmi", "emi", "monthlyInstallment", "installmentAmount", "monthlyPayment"]),
      );
      const remainingBalance = toCurrencyString(
         pickNumber(record, ["remainingBalance", "balance", "outstandingBalance", "outstandingAmount"]),
      );

      if (!type || !monthlyEmi || !remainingBalance) {
         return [];
      }

      return [{ type, monthlyEmi, remainingBalance }];
   });
}

function normalizeCardRows(records: unknown[]): CustomerFormData["creditCards"] {
   return records.flatMap((record) => {
      if (!isRecord(record)) {
         return [];
      }

      const issuer = pickString(record, ["provider", "issuer", "cardIssuer", "bankName", "cardType"]) ?? "Standard Card";
      const limit = toCurrencyString(pickNumber(record, ["creditLimit", "limit", "approvedLimit", "cardLimit"]));
      const outstandingBalance =
         toCurrencyString(
            pickNumber(record, ["outstandingBalance", "balance", "outstanding", "usedLimit", "statementBalance"]),
         ) ?? "0.00";

      if (!limit) {
         return [];
      }

      return [{ issuer, limit, outstandingBalance }];
   });
}

function normalizeLiabilityRows(records: unknown[]): CustomerFormData["liabilities"] {
   return records.flatMap((record) => {
      if (!isRecord(record)) {
         return [];
      }

      const category = pickString(record, ["description", "category", "type", "liabilityType"]);
      const monthlyAmount = toCurrencyString(
         pickNumber(record, ["monthlyAmount", "amount", "monthlyObligation", "obligationAmount", "monthlyPayment"]),
      );

      if (!category || !monthlyAmount) {
         return [];
      }

      return [{ category, monthlyAmount }];
   });
}

function extractCribPrefillData(response: BankCustomerCribStepResponse): CribPrefillData {
   const sources = buildCribSources(response);
   const loans = normalizeLoanRows(
      pickArrayFromSources(sources, ["loans", "loanFacilities", "activeLoans", "facilitiesLoans"]),
   );
   const creditCards = normalizeCardRows(
      pickArrayFromSources(sources, ["cards", "creditCards", "creditCardFacilities", "cardFacilities"]),
   );
   const liabilities = normalizeLiabilityRows(
      pickArrayFromSources(sources, ["liabilities", "otherLiabilities", "obligations", "liabilityItems"]),
   );

   const inferredTotalLoanValue = loans.reduce((total, loan) => total + (toNumber(loan.remainingBalance) ?? 0), 0);
   const totalActiveLoanValueRaw = pickNumberFromSources(sources, [
      "totalActiveLoanValue",
      "activeLoanValue",
      "totalLoanValue",
      "loanOutstandingTotal",
   ]);
   const totalActiveLoanValue =
      totalActiveLoanValueRaw !== undefined && totalActiveLoanValueRaw >= 0
         ? totalActiveLoanValueRaw
         : inferredTotalLoanValue;

   return {
      creditScore: toRoundedNonNegativeInteger(pickNumberFromSources(sources, ["creditScore", "score", "creditRating"])),
      inquiryCount: toRoundedNonNegativeInteger(
         pickNumberFromSources(sources, ["inquiryCount", "inquiries", "creditInquiries", "recentInquiryCount"]),
      ),
      activeLoansCount:
         toRoundedNonNegativeInteger(
            pickNumberFromSources(sources, ["activeLoansCount", "loanCount", "activeFacilitiesCount"]),
         ) ?? loans.length,
      totalActiveLoanValue,
      missedPaymentsLast12Months:
         toRoundedNonNegativeInteger(
            pickNumberFromSources(sources, [
               "missedPaymentsLast12Months",
               "missedPayments",
               "latePaymentCount",
               "arrearsCount",
            ]),
         ) ?? 0,
      loans,
      creditCards,
      liabilities,
   };
}

function extractStepOneFieldErrors(error: ApiError): StepOneFieldErrors {
   const details = error.details as { fieldErrors?: unknown } | undefined;
   const fieldErrors = details?.fieldErrors;
   if (!fieldErrors || typeof fieldErrors !== "object") {
      return {};
   }

   const source = fieldErrors as Record<string, unknown>;
   const result: StepOneFieldErrors = {};
   if (typeof source.nic === "string") {
      result.nic = source.nic;
   }
   if (typeof source.email === "string") {
      result.email = source.email;
   }
   if (typeof source.username === "string") {
      result.username = source.username;
   }
   if (typeof source.bankAccount === "string") {
      result.bankAccount = source.bankAccount;
   }
   if (typeof source.accountNumber === "string") {
      result.bankAccount = source.accountNumber;
   }

   return result;
}

function buildDuplicateFieldMessage(fieldErrors: StepOneFieldErrors): string | null {
   const labels: Record<StepOneConflictField, string> = {
      nic: "NIC",
      email: "Email",
      username: "Username",
      bankAccount: "Bank Account",
   };

   const duplicateFields = (Object.keys(fieldErrors) as StepOneConflictField[]).filter(
      (field) => typeof fieldErrors[field] === "string" && Boolean(fieldErrors[field]?.trim())
   );

   if (duplicateFields.length === 0) {
      return null;
   }

   return `Duplicate values found for: ${duplicateFields.map((field) => labels[field]).join(", ")}. Please use unique values.`;
}

const generateCustomerId = () => `PC-${Math.floor(100000 + Math.random() * 900000)}`;
const ADD_CUSTOMER_DRAFT_STORAGE_KEY = "bank-officer-add-customer-draft-v1";

type StoredAddCustomerDraft = {
   step: number;
   formData: CustomerFormData;
   createdBankCustomerId: number | null;
};

type LoanDraftState = CustomerFormData["loans"][number];
type CardDraftState = CustomerFormData["creditCards"][number];
type LiabilityDraftState = CustomerFormData["liabilities"][number];

const emptyLoanDraft: LoanDraftState = {
   type: "",
   monthlyEmi: "",
   remainingBalance: "",
};

const emptyCardDraft: CardDraftState = {
   issuer: "Standard Card",
   limit: "",
   outstandingBalance: "",
};

const emptyLiabilityDraft: LiabilityDraftState = {
   category: "",
   monthlyAmount: "",
};

const lkrFormatter = new Intl.NumberFormat("en-LK", {
   style: "currency",
   currency: "LKR",
   minimumFractionDigits: 2,
   maximumFractionDigits: 2,
});

function parseAmount(value: string | number | null | undefined): number {
   if (typeof value === "number" && Number.isFinite(value)) {
      return value;
   }

   if (typeof value === "string") {
      const parsed = Number(value.replace(/,/g, "").trim());
      if (Number.isFinite(parsed)) {
         return parsed;
      }
   }

   return 0;
}

function formatAmount(value: string | number | null | undefined): string {
   return lkrFormatter.format(parseAmount(value));
}

export default function AddCustomerPage() {
   const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [generatedId, setGeneratedId] = useState("");
  const [submitError, setSubmitError] = useState("");
   const [serverStepOneErrors, setServerStepOneErrors] = useState<StepOneFieldErrors>({});
   const [createdBankCustomerId, setCreatedBankCustomerId] = useState<number | null>(null);
   const [isSavingDraftStepOne, setIsSavingDraftStepOne] = useState(false);
   const [isSubmittingStepOne, setIsSubmittingStepOne] = useState(false);
   const [isLookingUpCustomerByNic, setIsLookingUpCustomerByNic] = useState(false);
   const [hasExistingCustomerMatch, setHasExistingCustomerMatch] = useState(false);
   const [isVerifyingAccount, setIsVerifyingAccount] = useState(false);
   const [isSavingCribLinkingStep, setIsSavingCribLinkingStep] = useState(false);
   const [isCompletingCribReviewStep, setIsCompletingCribReviewStep] = useState(false);
   const [editingLoanIndex, setEditingLoanIndex] = useState<number | null>(null);
   const [editingLoanDraft, setEditingLoanDraft] = useState<LoanDraftState>(emptyLoanDraft);
   const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);
   const [editingCardDraft, setEditingCardDraft] = useState<CardDraftState>(emptyCardDraft);
   const [editingLiabilityIndex, setEditingLiabilityIndex] = useState<number | null>(null);
   const [editingLiabilityDraft, setEditingLiabilityDraft] = useState<LiabilityDraftState>(emptyLiabilityDraft);
   const [liveSummaryError, setLiveSummaryError] = useState("");
   const customerFullName = `${formData.firstName} ${formData.lastName}`.trim();

   useEffect(() => {
      try {
         const rawDraft = window.localStorage.getItem(ADD_CUSTOMER_DRAFT_STORAGE_KEY);
         if (!rawDraft) {
            return;
         }

         const parsedDraft = JSON.parse(rawDraft) as Partial<StoredAddCustomerDraft>;
         if (parsedDraft.formData) {
            setFormData({
               ...initialFormData,
               ...parsedDraft.formData,
               incomes: Array.isArray(parsedDraft.formData.incomes) ? parsedDraft.formData.incomes : [],
               loans: Array.isArray(parsedDraft.formData.loans) ? parsedDraft.formData.loans : [],
               creditCards: Array.isArray(parsedDraft.formData.creditCards) ? parsedDraft.formData.creditCards : [],
               liabilities: Array.isArray(parsedDraft.formData.liabilities) ? parsedDraft.formData.liabilities : [],
            });
         }

         if (typeof parsedDraft.createdBankCustomerId === "number") {
            setCreatedBankCustomerId(parsedDraft.createdBankCustomerId);
         }

         if (
            typeof parsedDraft.step === "number" &&
            Number.isInteger(parsedDraft.step) &&
            parsedDraft.step >= 1 &&
            parsedDraft.step <= 7
         ) {
            setStep(parsedDraft.step);
         }
      } catch {
         // Ignore broken localStorage payloads and start with default values.
      }
   }, []);

   useEffect(() => {
      const draft: StoredAddCustomerDraft = {
         step,
         formData,
         createdBankCustomerId,
      };
      window.localStorage.setItem(ADD_CUSTOMER_DRAFT_STORAGE_KEY, JSON.stringify(draft));
   }, [step, formData, createdBankCustomerId]);

   useEffect(() => {
      if (editingLoanIndex !== null && editingLoanIndex >= formData.loans.length) {
         setEditingLoanIndex(null);
         setEditingLoanDraft(emptyLoanDraft);
      }
   }, [editingLoanIndex, formData.loans.length]);

   useEffect(() => {
      if (editingCardIndex !== null && editingCardIndex >= formData.creditCards.length) {
         setEditingCardIndex(null);
         setEditingCardDraft(emptyCardDraft);
      }
   }, [editingCardIndex, formData.creditCards.length]);

   useEffect(() => {
      if (editingLiabilityIndex !== null && editingLiabilityIndex >= formData.liabilities.length) {
         setEditingLiabilityIndex(null);
         setEditingLiabilityDraft(emptyLiabilityDraft);
      }
   }, [editingLiabilityIndex, formData.liabilities.length]);

   useEffect(() => {
      setLiveSummaryError("");
   }, [step]);
  
  const steps = [
    { id: 1, label: "Personal Details" },
      { id: 2, label: "CRIB Linking" },
      { id: 3, label: "Financial Data" },
      { id: 4, label: "Loans" },
      { id: 5, label: "Credit Cards" },
      { id: 6, label: "Other Liabilities" },
      { id: 7, label: "Review & Submit" },
  ];
   const currentStepLabel = steps.find((item) => item.id === step)?.label ?? "Summary";

  const updateFormData = (data: Partial<CustomerFormData>) => {
      const nicUpdated = Object.prototype.hasOwnProperty.call(data, "nic");
      setFormData(prev => {
         const next = { ...prev, ...data };
         if (Object.prototype.hasOwnProperty.call(data, "bankAccount")) {
            next.isAccountVerified = false;
            next.accountVerificationStatus = "";
            next.accountVerificationMessage = "";
         }
         return next;
      });
    if (nicUpdated) {
      setHasExistingCustomerMatch(false);
      setCreatedBankCustomerId(null);
    }
    if (submitError) {
      setSubmitError("");
    }
  };

   const clearServerStepOneError = (field: StepOneConflictField) => {
      setServerStepOneErrors((prev) => {
         if (!prev[field]) {
            return prev;
         }
         return { ...prev, [field]: undefined };
      });
   };

  const handleNext = () => {
      if (step < steps.length) {
         void (async () => {
            try {
               if (step >= 3 && step <= 6) {
                  await persistFinancialStep(step - 1);
               }
               setStep((prev) => prev + 1);
               if (submitError) {
                  setSubmitError("");
               }
            } catch (error) {
               if (error instanceof ApiError) {
                  setSubmitError(error.message || "Failed to save financial step.");
                  return;
               }
               setSubmitError("Failed to save financial step. Please try again.");
            }
         })();
      } else {
      const validation = validateCustomerSubmission(formData, {
        allowPasswordUnchanged: createdBankCustomerId !== null,
      });
      if (!validation.isValid) {
        setSubmitError(validation.message || "Please fix validation errors before submitting.");
        if (validation.firstInvalidStep && validation.firstInvalidStep !== step) {
          setStep(validation.firstInvalidStep);
        }
        return;
      }

      setGeneratedId(generateCustomerId());
      setIsSuccess(true);
      setSubmitError("");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (submitError) {
        setSubmitError("");
      }
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setStep(1);
    setIsSuccess(false);
    setSubmitError("");
      setServerStepOneErrors({});
      setCreatedBankCustomerId(null);
      setHasExistingCustomerMatch(false);
      setEditingLoanIndex(null);
      setEditingLoanDraft(emptyLoanDraft);
      setEditingCardIndex(null);
      setEditingCardDraft(emptyCardDraft);
      setEditingLiabilityIndex(null);
      setEditingLiabilityDraft(emptyLiabilityDraft);
      setLiveSummaryError("");
      window.localStorage.removeItem(ADD_CUSTOMER_DRAFT_STORAGE_KEY);
  };

      const toEnumToken = (value?: string) => {
         if (!value) return undefined;
         return value
            .trim()
            .toUpperCase()
            .replace(/[^A-Z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");
      };

      const parseCurrency = (value: string) => {
         const parsed = Number(value);
         return Number.isFinite(parsed) ? parsed : 0;
      };

      const buildIncomePayload = (): BankCustomerIncomeStepRequest => {
         if (formData.incomes.length > 0) {
            return {
               incomes: formData.incomes.map((income) => {
                  const isBusiness = income.type === "Business Person";
                  return {
                     incomeCategory: isBusiness ? "BUSINESS" : "SALARY",
                     amount: parseCurrency(income.amount),
                     salaryType: toEnumToken(income.salaryType),
                     employmentType: toEnumToken(income.employmentType),
                     durationMonths: income.contractDurationMonths?.trim()
                        ? Number(income.contractDurationMonths)
                        : undefined,
                     incomeStability: toEnumToken(income.incomeStability),
                  };
               }),
            };
         }

         const fallbackIncomes: BankCustomerIncomeStepRequest["incomes"] = [];
         const incomeType = formData.incomeType || "Salary Worker";
         const includesSalaryDetails = incomeType !== "Business Person";
         const includesBusinessDetails = incomeType !== "Salary Worker";

         if (includesSalaryDetails && formData.monthlySalary.trim()) {
            fallbackIncomes.push({
               incomeCategory: "SALARY",
               amount: parseCurrency(formData.monthlySalary),
               salaryType: toEnumToken(formData.salaryType),
               employmentType: toEnumToken(formData.employmentType),
               durationMonths:
                  formData.employmentType === "Contract" && formData.contractDurationMonths.trim()
                     ? Number(formData.contractDurationMonths)
                     : undefined,
            });
         }

         if (includesBusinessDetails && formData.businessIncome.trim()) {
            fallbackIncomes.push({
               incomeCategory: "BUSINESS",
               amount: parseCurrency(formData.businessIncome),
               incomeStability: toEnumToken(formData.incomeStability),
            });
         }

         return { incomes: fallbackIncomes };
      };

      const buildLoanPayload = (): BankCustomerLoanStepRequest => ({
         loans: formData.loans.map((loan) => ({
            loanType: loan.type,
            monthlyEmi: parseCurrency(loan.monthlyEmi),
            remainingBalance: parseCurrency(loan.remainingBalance),
         })),
      });

      const buildCardPayload = (): BankCustomerCardStepRequest => ({
         cards: formData.creditCards.map((card) => ({
            provider: card.issuer,
            creditLimit: parseCurrency(card.limit),
            outstandingBalance: parseCurrency(card.outstandingBalance),
         })),
      });

      const buildLiabilityPayload = (): BankCustomerLiabilityStepRequest => ({
         liabilities: formData.liabilities.map((liability) => ({
            description: liability.category,
            monthlyAmount: parseCurrency(liability.monthlyAmount),
         })),
         missedPayments: formData.missedPaymentsLast12Months,
      });

      const persistFinancialStep = async (currentStep: number) => {
         if (!createdBankCustomerId) {
            throw new Error("Please complete step 1 to create the bank customer before adding financial data.");
         }

         if (currentStep === 2) {
            await saveBankCustomerIncomeStep(createdBankCustomerId, buildIncomePayload());
            return;
         }

         if (currentStep === 3) {
            await saveBankCustomerLoanStep(createdBankCustomerId, buildLoanPayload());
            return;
         }

         if (currentStep === 4) {
            await saveBankCustomerCardStep(createdBankCustomerId, buildCardPayload());
            return;
         }

         if (currentStep === 5) {
            await saveBankCustomerLiabilityStep(createdBankCustomerId, buildLiabilityPayload());
         }
      };

      const saveCribLinkingStep = async (requestType: string) => {
         if (!createdBankCustomerId) {
            throw new Error("Please complete step 1 to create the bank customer before adding CRIB data.");
         }

         setIsSavingCribLinkingStep(true);
         try {
            const nic = formData.nic.trim();
            const response = await saveBankCustomerCribLinkingStep(createdBankCustomerId, {
               requestType,
               nic: nic || undefined,
            } as BankCustomerCribRequestStepRequest);
            const cribPrefillData = extractCribPrefillData(response);
            const requestStatus = (response.requestStatus || "COMPLETED").toUpperCase();
            const reportStatus = (response.reportStatus || "READY").toUpperCase();
            const isCribNotFound = requestStatus === "FAILED" && reportStatus === "FAILED";

            updateFormData({
               cribRequestType: requestType,
               cribRequestStatus: requestStatus,
               cribReportStatus: reportStatus,
               creditScore: isCribNotFound ? undefined : cribPrefillData.creditScore ?? formData.creditScore,
               missedPaymentsLast12Months:
                  isCribNotFound
                     ? formData.missedPaymentsLast12Months
                     : cribPrefillData.missedPaymentsLast12Months ?? formData.missedPaymentsLast12Months ?? 0,
               activeLoansCount: isCribNotFound
                  ? formData.activeLoansCount
                  : cribPrefillData.activeLoansCount ?? formData.activeLoansCount ?? 0,
               totalActiveLoanValue: isCribNotFound
                  ? formData.totalActiveLoanValue
                  : cribPrefillData.totalActiveLoanValue ?? formData.totalActiveLoanValue ?? 0,
               inquiryCount: isCribNotFound
                  ? formData.inquiryCount
                  : cribPrefillData.inquiryCount ?? formData.inquiryCount ?? 0,
               loans: isCribNotFound ? formData.loans : cribPrefillData.loans,
               creditCards: isCribNotFound ? formData.creditCards : cribPrefillData.creditCards,
               liabilities: isCribNotFound ? formData.liabilities : cribPrefillData.liabilities,
            });

            return response;
         } finally {
            setIsSavingCribLinkingStep(false);
         }
      };

   const mapStepOnePayload = (data: CustomerFormData): StepOneRegistrationRequest => ({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      nic: data.nic.trim(),
      dob: data.dob.trim(),
      email: data.email.trim(),
      mobile: data.mobile.trim(),
      province: data.province.trim(),
      address: data.address.trim(),
      username: data.username.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      accountNumber: data.bankAccount.replace(/\s+/g, "").trim() || undefined,
   });

   const mapStepOneUpdatePayload = (data: CustomerFormData): StepOneUpdateRequest => {
      const password = data.password.trim();
      const confirmPassword = data.confirmPassword.trim();
      return {
         firstName: data.firstName.trim(),
         lastName: data.lastName.trim(),
         nic: data.nic.trim(),
         dob: data.dob.trim(),
         email: data.email.trim(),
         mobile: data.mobile.trim(),
         province: data.province.trim(),
         address: data.address.trim(),
         username: data.username.trim(),
         password: password || undefined,
         confirmPassword: confirmPassword || undefined,
         accountNumber: data.bankAccount.replace(/\s+/g, "").trim() || undefined,
      };
   };

   const resolveExistingBankCustomerIdByNic = async (nic: string): Promise<number | null> => {
      const normalizedNic = nic.trim();
      if (!normalizedNic) {
         return null;
      }
      try {
         const existing = await findOwnedBankCustomerStepOneByNic(normalizedNic);
         return existing.bankCustomerId;
      } catch (error) {
         if (error instanceof ApiError && error.status === 404) {
            return null;
         }
         throw error;
      }
   };

   const lookupCustomerByNic = async () => {
      const nic = formData.nic.trim();
      if (!nic) {
         setSubmitError("NIC number is required.");
         return;
      }

      setIsLookingUpCustomerByNic(true);
      setSubmitError("");
      setServerStepOneErrors({});
      try {
         const prefill = await findOwnedBankCustomerStepOneByNic(nic);
         setCreatedBankCustomerId(prefill.bankCustomerId);
         setHasExistingCustomerMatch(true);

         let financialPatch: Partial<CustomerFormData> = {
            incomeType: initialFormData.incomeType,
            salaryType: initialFormData.salaryType,
            employmentType: initialFormData.employmentType,
            contractDurationMonths: initialFormData.contractDurationMonths,
            monthlySalary: initialFormData.monthlySalary,
            businessIncome: initialFormData.businessIncome,
            incomeStability: initialFormData.incomeStability,
            incomes: [],
            loans: [],
            creditCards: [],
            liabilities: [],
            missedPaymentsLast12Months: 0,
         };

         try {
            const currentRecord = await getCurrentBankCustomerFinancialRecord(prefill.bankCustomerId);
            financialPatch = mapFinancialRecordToFormData(currentRecord);
         } catch (error) {
            if (!(error instanceof ApiError && (error.status === 400 || error.status === 404))) {
               throw error;
            }
         }

         setFormData((prev) => ({
            ...prev,
            firstName: prefill.firstName || prev.firstName,
            lastName: prefill.lastName || prev.lastName,
            nic: prefill.nic || nic,
            dob: prefill.dob || prev.dob,
            email: prefill.email || prev.email,
            mobile: prefill.mobile || prev.mobile,
            province: prefill.province || prev.province,
            address: prefill.address || prev.address,
            username: prefill.username || prev.username,
            bankAccount: prefill.accountNumber || prev.bankAccount,
            isAccountVerified: Boolean(prefill.accountNumber),
            accountVerificationStatus: prefill.accountStatus || "",
            accountVerificationMessage: prefill.accountNumber
               ? `Existing customer loaded. Linked account status: ${prefill.accountStatus || "UNKNOWN"}.`
               : "",
            ...financialPatch,
         }));
      } catch (error) {
         if (error instanceof ApiError && error.status === 404) {
            setHasExistingCustomerMatch(false);
            setCreatedBankCustomerId(null);
            setSubmitError("");
            return;
         }
         if (error instanceof ApiError) {
            setSubmitError(error.message || "Failed to retrieve customer by NIC.");
            return;
         }
         setSubmitError("Failed to retrieve customer by NIC.");
      } finally {
         setIsLookingUpCustomerByNic(false);
      }
   };

   const verifyStepOneAccount = async () => {
      const accountNumber = formData.bankAccount.replace(/\s+/g, "").trim();
      if (!accountNumber) {
         updateFormData({
            isAccountVerified: false,
            accountVerificationStatus: "NOT_FOUND",
            accountVerificationMessage: "Bank account number is required.",
         });
         return;
      }

      setIsVerifyingAccount(true);
      try {
         const verification = await verifyBankAccount(accountNumber);
         if (verification.exists) {
            updateFormData({
               isAccountVerified: true,
               accountVerificationStatus: verification.status,
               accountVerificationMessage: `Account found. Status: ${verification.status}`,
            });
         } else {
            updateFormData({
               isAccountVerified: false,
               accountVerificationStatus: verification.status,
               accountVerificationMessage: verification.message || "Account not found.",
            });
         }
      } catch (error) {
         if (error instanceof ApiError) {
            updateFormData({
               isAccountVerified: false,
               accountVerificationStatus: "NOT_FOUND",
               accountVerificationMessage: error.message || "Unable to verify account.",
            });
         } else {
            updateFormData({
               isAccountVerified: false,
               accountVerificationStatus: "NOT_FOUND",
               accountVerificationMessage: "Unable to verify account right now.",
            });
         }
      } finally {
         setIsVerifyingAccount(false);
      }
   };

   const saveStepOneDraft = async () => {
      setIsSavingDraftStepOne(true);
      setSubmitError("");
      setServerStepOneErrors({});
      try {
         let targetBankCustomerId = createdBankCustomerId;
         if (!targetBankCustomerId) {
            targetBankCustomerId = await resolveExistingBankCustomerIdByNic(formData.nic);
            if (targetBankCustomerId) {
               setCreatedBankCustomerId(targetBankCustomerId);
               setHasExistingCustomerMatch(true);
            }
         }

         if (targetBankCustomerId) {
            await updateBankCustomerStepOneDraft(targetBankCustomerId, mapStepOneUpdatePayload(formData));
         } else {
            await saveBankCustomerStepOneDraft(mapStepOnePayload(formData));
         }
      } catch (error) {
         if (error instanceof ApiError) {
            const fieldErrors = extractStepOneFieldErrors(error);
            const duplicateMessage = buildDuplicateFieldMessage(fieldErrors);
            setSubmitError(duplicateMessage || error.message);
            setServerStepOneErrors(fieldErrors);
         } else {
            setSubmitError("Failed to save draft. Please try again.");
            setServerStepOneErrors({});
         }
         throw error;
      } finally {
         setIsSavingDraftStepOne(false);
      }
   };

   const continueStepOne = async () => {
      setIsSubmittingStepOne(true);
      setSubmitError("");
      setServerStepOneErrors({});
      try {
         const accountNumber = formData.bankAccount.replace(/\s+/g, "").trim();
         const verification = await verifyBankAccount(accountNumber);
         if (!verification.exists) {
            updateFormData({
               isAccountVerified: false,
               accountVerificationStatus: verification.status,
               accountVerificationMessage: verification.message || "Account not found.",
            });
            const message = verification.message || "Account not found.";
            setSubmitError(message);
            throw new Error(message);
         }

         updateFormData({
            isAccountVerified: true,
            accountVerificationStatus: verification.status,
            accountVerificationMessage: `Account found. Status: ${verification.status}`,
         });

         let targetBankCustomerId = createdBankCustomerId;
         if (!targetBankCustomerId) {
            targetBankCustomerId = await resolveExistingBankCustomerIdByNic(formData.nic);
            if (targetBankCustomerId) {
               setCreatedBankCustomerId(targetBankCustomerId);
               setHasExistingCustomerMatch(true);
            }
         }

         if (targetBankCustomerId) {
            await updateBankCustomerStepOneContinue(targetBankCustomerId, mapStepOneUpdatePayload(formData));
            setHasExistingCustomerMatch(true);
         } else {
            const response = await continueBankCustomerStepOne(mapStepOnePayload(formData));
            const customerIdentity = await getOwnedBankCustomerIdentityByUserId(response.userId);
            setCreatedBankCustomerId(customerIdentity.bankCustomerId);
         }
      } catch (error) {
         if (error instanceof ApiError) {
            const fieldErrors = extractStepOneFieldErrors(error);
            const duplicateMessage = buildDuplicateFieldMessage(fieldErrors);
            setSubmitError(duplicateMessage || error.message);
            setServerStepOneErrors(fieldErrors);
         } else if (error instanceof Error) {
            setSubmitError(error.message || "Failed to save step one. Please try again.");
            setServerStepOneErrors({});
         } else {
            setSubmitError("Failed to save step one. Please try again.");
            setServerStepOneErrors({});
         }
         throw error;
      } finally {
         setIsSubmittingStepOne(false);
      }
   };

   const completeCribReviewStep = async () => {
      if (!createdBankCustomerId) {
         throw new Error("Please complete step 1 to create the bank customer before finishing onboarding.");
      }

      setIsCompletingCribReviewStep(true);
      try {
         const response = await completeBankCustomerCribReviewStep(createdBankCustomerId);
         updateFormData({
            cribRequestStatus: response.requestStatus ?? "COMPLETED",
            cribReportStatus: response.reportStatus ?? "READY",
         });
         // fetch the newly created bank credit evaluation and update the review UI
         try {
            const evalResp = await getOfficerCreditCurrentEvaluation(createdBankCustomerId);
            updateFormData({
               creditScore: evalResp.totalRiskPoints,
               missedPaymentsLast12Months: evalResp.missedPaymentsCount ?? formData.missedPaymentsLast12Months,
            });
            // show success toast with evaluation info
             showToast({
                title: "Onboarding completed",
                description: `Credit evaluation created (score: ${evalResp.totalRiskPoints ?? "N/A"})`,
                type: "success",
             });
         } catch (evalErr) {
            // non-fatal: leave form data as-is
            console.warn("Failed to fetch credit evaluation after onboarding:", evalErr);
             showToast({
                title: "Onboarding completed",
                description: "Onboarding completed but credit evaluation could not be fetched.",
                type: "info",
             });
         }
         return response;
      } finally {
         setIsCompletingCribReviewStep(false);
      }
   };

   const startLoanEdit = (index: number) => {
      const selected = formData.loans[index];
      if (!selected) {
         return;
      }
      setEditingLoanIndex(index);
      setEditingLoanDraft({ ...selected });
      setLiveSummaryError("");
   };

   const cancelLoanEdit = () => {
      setEditingLoanIndex(null);
      setEditingLoanDraft(emptyLoanDraft);
      setLiveSummaryError("");
   };

   const saveLoanEdit = () => {
      if (editingLoanIndex === null) {
         return;
      }

      const validation = validateLoanDraft(editingLoanDraft);
      const firstError = Object.values(validation).find((error): error is string => Boolean(error));
      if (firstError) {
         setLiveSummaryError(firstError);
         return;
      }

      updateFormData({
         loans: formData.loans.map((loan, index) => (index === editingLoanIndex ? { ...editingLoanDraft } : loan)),
      });
      setEditingLoanIndex(null);
      setEditingLoanDraft(emptyLoanDraft);
      setLiveSummaryError("");
   };

   const deleteLoan = (index: number) => {
      updateFormData({
         loans: formData.loans.filter((_, rowIndex) => rowIndex !== index),
      });
      if (editingLoanIndex === index) {
         cancelLoanEdit();
      }
   };

   const startCardEdit = (index: number) => {
      const selected = formData.creditCards[index];
      if (!selected) {
         return;
      }
      setEditingCardIndex(index);
      setEditingCardDraft({ ...selected });
      setLiveSummaryError("");
   };

   const cancelCardEdit = () => {
      setEditingCardIndex(null);
      setEditingCardDraft(emptyCardDraft);
      setLiveSummaryError("");
   };

   const saveCardEdit = () => {
      if (editingCardIndex === null) {
         return;
      }

      const validation = validateCreditCardDraft(editingCardDraft);
      const firstError = Object.values(validation).find((error): error is string => Boolean(error));
      if (firstError) {
         setLiveSummaryError(firstError);
         return;
      }

      updateFormData({
         creditCards: formData.creditCards.map((card, index) => (index === editingCardIndex ? { ...editingCardDraft } : card)),
      });
      setEditingCardIndex(null);
      setEditingCardDraft(emptyCardDraft);
      setLiveSummaryError("");
   };

   const deleteCard = (index: number) => {
      updateFormData({
         creditCards: formData.creditCards.filter((_, rowIndex) => rowIndex !== index),
      });
      if (editingCardIndex === index) {
         cancelCardEdit();
      }
   };

   const startLiabilityEdit = (index: number) => {
      const selected = formData.liabilities[index];
      if (!selected) {
         return;
      }
      setEditingLiabilityIndex(index);
      setEditingLiabilityDraft({ ...selected });
      setLiveSummaryError("");
   };

   const cancelLiabilityEdit = () => {
      setEditingLiabilityIndex(null);
      setEditingLiabilityDraft(emptyLiabilityDraft);
      setLiveSummaryError("");
   };

   const saveLiabilityEdit = () => {
      if (editingLiabilityIndex === null) {
         return;
      }

      const validation = validateLiabilityDraft(editingLiabilityDraft);
      const firstError = Object.values(validation).find((error): error is string => Boolean(error));
      if (firstError) {
         setLiveSummaryError(firstError);
         return;
      }

      updateFormData({
         liabilities: formData.liabilities.map((liability, index) =>
            index === editingLiabilityIndex ? { ...editingLiabilityDraft } : liability,
         ),
      });
      setEditingLiabilityIndex(null);
      setEditingLiabilityDraft(emptyLiabilityDraft);
      setLiveSummaryError("");
   };

   const deleteLiability = (index: number) => {
      updateFormData({
         liabilities: formData.liabilities.filter((_, rowIndex) => rowIndex !== index),
      });
      if (editingLiabilityIndex === index) {
         cancelLiabilityEdit();
      }
   };

   const renderLiveSummaryContent = () => {
      const totalLoanEmi = formData.loans.reduce((total, loan) => total + parseAmount(loan.monthlyEmi), 0);
      const totalLoanBalance = formData.loans.reduce((total, loan) => total + parseAmount(loan.remainingBalance), 0);
      const totalCardLimit = formData.creditCards.reduce((total, card) => total + parseAmount(card.limit), 0);
      const totalCardOutstanding = formData.creditCards.reduce(
         (total, card) => total + parseAmount(card.outstandingBalance),
         0,
      );
      const totalLiabilityAmount = formData.liabilities.reduce(
         (total, liability) => total + parseAmount(liability.monthlyAmount),
         0,
      );
      const totalMonthlyIncome = formData.incomes.reduce((total, income) => total + parseAmount(income.amount), 0);

      switch (step) {
         case 1:
            return (
               <div className="space-y-5">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Full Name</span>
                     <span className="text-xs font-bold text-slate-700 text-right">{customerFullName || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">NIC Number</span>
                     <span className="text-xs font-bold text-slate-700 text-right">{formData.nic || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Email Address</span>
                     <span className="text-xs font-bold text-slate-700 text-right">{formData.email || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Mobile</span>
                     <span className="text-xs font-bold text-slate-700 text-right">{formData.mobile || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Bank Account</span>
                     <span className="text-xs font-bold text-slate-700 text-right">{formData.bankAccount || "-"}</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                     <span className="text-[11px] font-semibold text-slate-600">
                        {formData.isAccountVerified
                           ? `Account Verified (${formData.accountVerificationStatus || "ACTIVE"})`
                           : "Account Not Verified"}
                     </span>
                  </div>
               </div>
            );

         case 2:
            return (
               <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                     <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Request Status</p>
                        <p className="text-xs font-semibold text-slate-700 mt-1">{formData.cribRequestStatus || "PENDING"}</p>
                     </div>
                     <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Report Status</p>
                        <p className="text-xs font-semibold text-slate-700 mt-1">{formData.cribReportStatus || "NOT_READY"}</p>
                     </div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Credit Score</span>
                     <span className="text-xs font-bold text-slate-700 text-right">
                        {typeof formData.creditScore === "number" ? formData.creditScore : "-"}
                     </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Credit Inquiries</span>
                     <span className="text-xs font-bold text-slate-700 text-right">
                        {typeof formData.inquiryCount === "number" ? formData.inquiryCount : "-"}
                     </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Active Loans</span>
                     <span className="text-xs font-bold text-slate-700 text-right">
                        {typeof formData.activeLoansCount === "number" ? formData.activeLoansCount : formData.loans.length}
                     </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Total Active Loan Value</span>
                     <span className="text-xs font-bold text-slate-700 text-right">
                        {formatAmount(formData.totalActiveLoanValue ?? totalLoanBalance)}
                     </span>
                  </div>
               </div>
            );

         case 3:
            return (
               <div className="space-y-5">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Income Type</span>
                     <span className="text-xs font-bold text-slate-700 text-right">{formData.incomeType || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                     <span className="text-xs text-slate-400 font-medium">Income Sources</span>
                     <span className="text-xs font-bold text-slate-700 text-right">{formData.incomes.length}</span>
                  </div>
                  {formData.incomes.length === 0 ? (
                     <p className="text-xs text-slate-500 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                        No income sources added yet.
                     </p>
                  ) : (
                     <div className="space-y-2">
                        {formData.incomes.slice(0, 3).map((income, index) => (
                           <div
                              key={`${income.type}-${income.amount}-${index}`}
                              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
                           >
                              <div className="flex items-center justify-between gap-3">
                                 <span className="font-semibold text-slate-700">{income.type}</span>
                                 <span className="font-semibold text-slate-700">{formatAmount(income.amount)}</span>
                              </div>
                           </div>
                        ))}
                        {formData.incomes.length > 3 && (
                           <p className="text-[11px] text-slate-500">+{formData.incomes.length - 3} more income sources</p>
                        )}
                     </div>
                  )}
                  <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-blue-600 font-semibold">Total Monthly Income</span>
                        <span className="text-sm font-bold text-blue-700">{formatAmount(totalMonthlyIncome)}</span>
                     </div>
                  </div>
               </div>
            );

         case 4:
            return (
               <div className="space-y-4">
                  {formData.loans.length === 0 && (
                     <p className="text-xs text-slate-500 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                        No loans added yet.
                     </p>
                  )}
                  {formData.loans.map((loan, index) => (
                     <div key={`${loan.type}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-3">
                        {editingLoanIndex === index ? (
                           <>
                              <input
                                 type="text"
                                 value={editingLoanDraft.type}
                                 onChange={(event) => {
                                    setEditingLoanDraft((prev) => ({ ...prev, type: event.target.value }));
                                    setLiveSummaryError("");
                                 }}
                                 placeholder="Loan type"
                                 className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                 <input
                                    type="text"
                                    value={editingLoanDraft.monthlyEmi}
                                    onChange={(event) => {
                                       setEditingLoanDraft((prev) => ({ ...prev, monthlyEmi: event.target.value }));
                                       setLiveSummaryError("");
                                    }}
                                    placeholder="Monthly EMI"
                                    className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                                 />
                                 <input
                                    type="text"
                                    value={editingLoanDraft.remainingBalance}
                                    onChange={(event) => {
                                       setEditingLoanDraft((prev) => ({ ...prev, remainingBalance: event.target.value }));
                                       setLiveSummaryError("");
                                    }}
                                    placeholder="Balance"
                                    className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                                 />
                              </div>
                              <div className="flex items-center justify-end gap-2">
                                 <button
                                    type="button"
                                    onClick={cancelLoanEdit}
                                    className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                                 >
                                    <X size={12} />
                                    Cancel
                                 </button>
                                 <button
                                    type="button"
                                    onClick={saveLoanEdit}
                                    className="rounded-md bg-[#3e9fd3] px-2 py-1 text-[11px] font-semibold text-white hover:bg-[#328ab8]"
                                 >
                                    Save
                                 </button>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className="flex items-center justify-between">
                                 <p className="text-xs font-bold text-slate-800">{loan.type}</p>
                                 <div className="flex items-center gap-2">
                                    <button
                                       type="button"
                                       onClick={() => startLoanEdit(index)}
                                       className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                                    >
                                       <Pencil size={12} />
                                       Edit
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => deleteLoan(index)}
                                       className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                                    >
                                       <Trash2 size={12} />
                                       Delete
                                    </button>
                                 </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                                 <p>EMI: {formatAmount(loan.monthlyEmi)}</p>
                                 <p className="text-right">Balance: {formatAmount(loan.remainingBalance)}</p>
                              </div>
                           </>
                        )}
                     </div>
                  ))}
                  {formData.loans.length > 0 && (
                     <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 space-y-1">
                        <div className="flex justify-between items-center">
                           <span className="text-xs text-blue-600 font-semibold">Total Monthly EMI</span>
                           <span className="text-xs font-bold text-blue-700">{formatAmount(totalLoanEmi)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-xs text-blue-600 font-semibold">Total Remaining Balance</span>
                           <span className="text-xs font-bold text-blue-700">{formatAmount(totalLoanBalance)}</span>
                        </div>
                     </div>
                  )}
               </div>
            );

         case 5:
            return (
               <div className="space-y-4">
                  {formData.creditCards.length === 0 && (
                     <p className="text-xs text-slate-500 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                        No credit cards added yet.
                     </p>
                  )}
                  {formData.creditCards.map((card, index) => (
                     <div key={`${card.issuer}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-3">
                        {editingCardIndex === index ? (
                           <>
                              <input
                                 type="text"
                                 value={editingCardDraft.issuer}
                                 onChange={(event) => {
                                    setEditingCardDraft((prev) => ({ ...prev, issuer: event.target.value }));
                                    setLiveSummaryError("");
                                 }}
                                 placeholder="Issuer"
                                 className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                 <input
                                    type="text"
                                    value={editingCardDraft.limit}
                                    onChange={(event) => {
                                       setEditingCardDraft((prev) => ({ ...prev, limit: event.target.value }));
                                       setLiveSummaryError("");
                                    }}
                                    placeholder="Credit limit"
                                    className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                                 />
                                 <input
                                    type="text"
                                    value={editingCardDraft.outstandingBalance}
                                    onChange={(event) => {
                                       setEditingCardDraft((prev) => ({ ...prev, outstandingBalance: event.target.value }));
                                       setLiveSummaryError("");
                                    }}
                                    placeholder="Outstanding"
                                    className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                                 />
                              </div>
                              <div className="flex items-center justify-end gap-2">
                                 <button
                                    type="button"
                                    onClick={cancelCardEdit}
                                    className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                                 >
                                    <X size={12} />
                                    Cancel
                                 </button>
                                 <button
                                    type="button"
                                    onClick={saveCardEdit}
                                    className="rounded-md bg-[#3e9fd3] px-2 py-1 text-[11px] font-semibold text-white hover:bg-[#328ab8]"
                                 >
                                    Save
                                 </button>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className="flex items-center justify-between">
                                 <p className="text-xs font-bold text-slate-800">{card.issuer || "Standard Card"}</p>
                                 <div className="flex items-center gap-2">
                                    <button
                                       type="button"
                                       onClick={() => startCardEdit(index)}
                                       className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                                    >
                                       <Pencil size={12} />
                                       Edit
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => deleteCard(index)}
                                       className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                                    >
                                       <Trash2 size={12} />
                                       Delete
                                    </button>
                                 </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                                 <p>Limit: {formatAmount(card.limit)}</p>
                                 <p className="text-right">Outstanding: {formatAmount(card.outstandingBalance)}</p>
                              </div>
                           </>
                        )}
                     </div>
                  ))}
                  {formData.creditCards.length > 0 && (
                     <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 space-y-1">
                        <div className="flex justify-between items-center">
                           <span className="text-xs text-blue-600 font-semibold">Total Credit Limit</span>
                           <span className="text-xs font-bold text-blue-700">{formatAmount(totalCardLimit)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-xs text-blue-600 font-semibold">Total Outstanding</span>
                           <span className="text-xs font-bold text-blue-700">{formatAmount(totalCardOutstanding)}</span>
                        </div>
                     </div>
                  )}
               </div>
            );

         case 6:
            return (
               <div className="space-y-4">
                  {formData.liabilities.length === 0 && (
                     <p className="text-xs text-slate-500 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                        No liabilities added yet.
                     </p>
                  )}
                  {formData.liabilities.map((liability, index) => (
                     <div
                        key={`${liability.category}-${index}`}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-3"
                     >
                        {editingLiabilityIndex === index ? (
                           <>
                              <input
                                 type="text"
                                 value={editingLiabilityDraft.category}
                                 onChange={(event) => {
                                    setEditingLiabilityDraft((prev) => ({ ...prev, category: event.target.value }));
                                    setLiveSummaryError("");
                                 }}
                                 placeholder="Description"
                                 className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                              />
                              <input
                                 type="text"
                                 value={editingLiabilityDraft.monthlyAmount}
                                 onChange={(event) => {
                                    setEditingLiabilityDraft((prev) => ({ ...prev, monthlyAmount: event.target.value }));
                                    setLiveSummaryError("");
                                 }}
                                 placeholder="Monthly amount"
                                 className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                              />
                              <div className="flex items-center justify-end gap-2">
                                 <button
                                    type="button"
                                    onClick={cancelLiabilityEdit}
                                    className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                                 >
                                    <X size={12} />
                                    Cancel
                                 </button>
                                 <button
                                    type="button"
                                    onClick={saveLiabilityEdit}
                                    className="rounded-md bg-[#3e9fd3] px-2 py-1 text-[11px] font-semibold text-white hover:bg-[#328ab8]"
                                 >
                                    Save
                                 </button>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className="flex items-center justify-between">
                                 <p className="text-xs font-bold text-slate-800">{liability.category}</p>
                                 <div className="flex items-center gap-2">
                                    <button
                                       type="button"
                                       onClick={() => startLiabilityEdit(index)}
                                       className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                                    >
                                       <Pencil size={12} />
                                       Edit
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => deleteLiability(index)}
                                       className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                                    >
                                       <Trash2 size={12} />
                                       Delete
                                    </button>
                                 </div>
                              </div>
                              <p className="text-[11px] text-slate-600">Monthly Amount: {formatAmount(liability.monthlyAmount)}</p>
                           </>
                        )}
                     </div>
                  ))}
                  <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 space-y-1">
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-blue-600 font-semibold">Total Monthly Liabilities</span>
                        <span className="text-xs font-bold text-blue-700">{formatAmount(totalLiabilityAmount)}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-blue-600 font-semibold">Missed Payments (12M)</span>
                        <span className="text-xs font-bold text-blue-700">{formData.missedPaymentsLast12Months}</span>
                     </div>
                  </div>
               </div>
            );

         case 7:
            return (
               <div className="space-y-4">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 space-y-2">
                     <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Customer</span>
                        <span className="font-semibold text-slate-700">{customerFullName || "-"}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Income Sources</span>
                        <span className="font-semibold text-slate-700">{formData.incomes.length}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Loans</span>
                        <span className="font-semibold text-slate-700">{formData.loans.length}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Credit Cards</span>
                        <span className="font-semibold text-slate-700">{formData.creditCards.length}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Liabilities</span>
                        <span className="font-semibold text-slate-700">{formData.liabilities.length}</span>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                     >
                        Edit Loans
                     </button>
                     <button
                        type="button"
                        onClick={() => setStep(5)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                     >
                        Edit Credit Cards
                     </button>
                     <button
                        type="button"
                        onClick={() => setStep(6)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                     >
                        Edit Liabilities
                     </button>
                  </div>
               </div>
            );

         default:
            return null;
      }
   };

  const renderStep = () => {
      const props = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack
    };

    switch (step) {
         case 1:
            return (
               <PersonalDetails
                  {...props}
                  onSaveDraftStepOne={saveStepOneDraft}
                  onContinueStepOne={continueStepOne}
                  onLookupCustomerByNic={lookupCustomerByNic}
                  onVerifyAccount={verifyStepOneAccount}
                  isVerifyingAccount={isVerifyingAccount}
                  isSavingDraftStepOne={isSavingDraftStepOne}
                  isSubmittingStepOne={isSubmittingStepOne}
                  isLookingUpCustomerByNic={isLookingUpCustomerByNic}
                  hasExistingCustomerMatch={hasExistingCustomerMatch || createdBankCustomerId !== null}
                  serverStepOneErrors={serverStepOneErrors}
                  onClearServerStepOneError={clearServerStepOneError}
               />
            );
      case 2: return <CribLinking {...props} onSaveCribLinkingStep={saveCribLinkingStep} isSavingCribLinkingStep={isSavingCribLinkingStep} />;
      case 3: return <FinancialData {...props} />;
      case 4: return <Loans {...props} />;
      case 5: return <CreditCards {...props} />;
      case 6: return <Liabilities {...props} />;
      case 7: return <Review {...props} onCompleteCribReviewStep={completeCribReviewStep} isCompletingCribReviewStep={isCompletingCribReviewStep} />;
         default: return <PersonalDetails {...props} serverStepOneErrors={serverStepOneErrors} onClearServerStepOneError={clearServerStepOneError} />;
    }
  };

  return (
      <AuthGuard requiredRole="BANK_OFFICER">
         <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
            <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
         <main className="flex-1 flex flex-col bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:p-7 h-full overflow-hidden lg:rounded-l-[28px]">
          <ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="BANK_OFFICER" sidebarHideCollapse mailBadge={2} notificationBadge={8} avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" avatarStatusDot name="Kamal Edirisinghe" role="Bank Officer" title="Add Customer" className="mb-6 shrink-0" />

          <div className="flex-1 overflow-y-auto min-h-0 pb-24">
          {isSuccess ? (
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 min-h-150 flex items-center justify-center">
                <SuccessView 
                   customerName={customerFullName || "New Customer"}  
                   generatedId={generatedId}
                   onReset={handleReset}
                />
             </div>
          ) : (
            <>
              {/* Page Title */}
              {submitError && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
                 {/* Left Column: Form Steps */}
                 <div className="space-y-6">
                    
                    {/* Stepper */}
                    <div className="bg-white/95 backdrop-blur-md rounded-xl pt-8 pb-12 px-8 mb-8 shadow-sm border border-slate-100 overflow-x-auto sticky top-6 z-40">
                       <div className="flex items-center justify-between min-w-150 relative">
                          {/* Connecting Line Background */}
                          <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

                          {steps.map((s) => (
                             <div key={s.id} className="relative z-10 flex flex-col items-center gap-3 flex-1">
                                <div 
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
                                    ${step === s.id ? "border-[#3e9fd3] bg-white text-[#3e9fd3] scale-110 shadow-lg shadow-blue-100" : 
                                      step > s.id ? "border-[#3e9fd3] bg-[#3e9fd3] text-white" : 
                                      "border-slate-200 bg-white text-slate-400"}`}
                                >
                                   {step > s.id ? <CheckCircle2 size={16} /> : s.id}
                                </div>
                                <span 
                                    className={`text-[10px] font-bold uppercase tracking-wider text-center
                                    ${step === s.id ? "text-[#3e9fd3]" : 
                                      step > s.id ? "text-[#3e9fd3]/80" : 
                                      "text-slate-400"}`}
                                >
                                    {s.label}
                                </span>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Form Content */}
                    {renderStep()}

                 </div>

                 {/* Right Column: Live Summary */}
                 <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 sticky top-6">
                       <div className="bg-slate-50/50 p-6 border-b border-slate-100">
                          <div className="flex items-center gap-2 mb-4">
                             <span className="text-[10px] uppercase font-bold text-[#3e9fd3] tracking-widest">Live Summary</span>
                             <span className="rounded-full bg-[#e0f2fe] px-2 py-1 text-[10px] font-bold text-[#0284c7]">
                                Step {step}: {currentStepLabel}
                             </span>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="h-14 w-14 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
                                <User size={28} />
                             </div>
                             <div>
                                <h3 className="text-lg font-bold text-slate-800">{customerFullName || "New Customer"}</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                                   {step === steps.length ? "Final Review" : "Incomplete Registration"}
                                </p>
                             </div>
                          </div>
                       </div>
                       
                       <div className="p-6 space-y-5">
                          {renderLiveSummaryContent()}
                          {liveSummaryError && (
                             <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                                {liveSummaryError}
                             </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
            </>
          )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}


