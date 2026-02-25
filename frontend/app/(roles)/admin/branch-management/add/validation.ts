import type { BranchFormData, BranchFormErrors } from "./types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const contactRegex = /^\+?[0-9][0-9\s-]{7,20}$/;

export function validateBranchForm(formData: BranchFormData): BranchFormErrors {
  const errors: BranchFormErrors = {};

  if (!formData.branchName.trim()) {
    errors.branchName = "Branch name is required.";
  }

  if (!formData.contact.trim()) {
    errors.contact = "Contact number is required.";
  } else if (!contactRegex.test(formData.contact.trim())) {
    errors.contact = "Enter a valid contact number.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.address.trim()) {
    errors.address = "Full address is required.";
  }

  return errors;
}

export function isBranchFormComplete(formData: Pick<BranchFormData, "branchName" | "contact" | "email" | "address">): boolean {
  return Boolean(
    formData.branchName.trim() &&
      formData.contact.trim() &&
      formData.email.trim() &&
      formData.address.trim()
  );
}
