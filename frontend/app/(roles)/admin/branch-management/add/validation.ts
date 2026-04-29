import type { BranchFormData, BranchFormErrors } from "./types";

const emailRegex = /^[a-zA-Z0-9._%+-]+@primecore\.com$/i;
const contactRegex =
  /^(?:070|071|072|074|075|076|077|078|011|021|023|024|025|026|027|031|032|033|034|035|036|037|038|041|045|047|051|052|054|055|057|063|065|066|067|081|091)\d{7}$/;

export function validateBranchForm(formData: BranchFormData): BranchFormErrors {
  const errors: BranchFormErrors = {};

  if (!formData.branchName.trim()) {
    errors.branchName = "Branch name is required.";
  }

  if (!formData.contact.trim()) {
    errors.contact = "Contact number is required.";
  } else if (!contactRegex.test(formData.contact.trim())) {
    errors.contact =
      "Contact number must be 10 digits and start with a valid Sri Lankan area/mobile code.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Email must be in the format name@primecore.com.";
  }

  if (!formData.address.trim()) {
    errors.address = "Full address is required.";
  }

  return errors;
}

export function isBranchFormComplete(
  formData: Pick<BranchFormData, "branchName" | "contact" | "email" | "address">
): boolean {
  return Boolean(
    formData.branchName.trim() &&
      formData.contact.trim() &&
      formData.email.trim() &&
      formData.address.trim()
  );
}
