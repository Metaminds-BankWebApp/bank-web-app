import type { OfficerFormData, OfficerFormErrors } from "./types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const contactRegex = /^\+?[0-9][0-9\s-]{7,20}$/;

export function validateOfficerForm(formData: OfficerFormData): OfficerFormErrors {
  const errors: OfficerFormErrors = {};

  if (!formData.officerName.trim()) {
    errors.officerName = "Officer name is required.";
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

  if (!formData.assignedBranch.trim()) {
    errors.assignedBranch = "Please select a branch.";
  }

  if (!formData.username.trim()) {
    errors.username = "Generate username before saving.";
  }

  if (!formData.password.trim()) {
    errors.password = "Generate password before saving.";
  }

  return errors;
}

export function isOfficerFormComplete(
  formData: Pick<OfficerFormData, "officerName" | "contact" | "email" | "assignedBranch" | "username" | "password">
): boolean {
  return Boolean(
    formData.officerName.trim() &&
      formData.contact.trim() &&
      formData.email.trim() &&
      formData.assignedBranch.trim() &&
      formData.username.trim() &&
      formData.password.trim()
  );
}
