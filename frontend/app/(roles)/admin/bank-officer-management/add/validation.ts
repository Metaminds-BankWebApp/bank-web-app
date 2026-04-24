import type { OfficerFormData, OfficerFormErrors } from "./types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const contactRegex = /^\+?[0-9][0-9\s-]{7,20}$/;
const nicRegex = /^(?:\d{9}[VvXx]|\d{12})$/;
const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

export function validateOfficerForm(formData: OfficerFormData): OfficerFormErrors {
  const errors: OfficerFormErrors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!formData.nic.trim()) {
    errors.nic = "NIC is required.";
  } else if (!nicRegex.test(formData.nic.trim())) {
    errors.nic = "Enter a valid NIC number.";
  }

  if (!formData.dob.trim()) {
    errors.dob = "Date of birth is required.";
  } else if (!dobRegex.test(formData.dob.trim())) {
    errors.dob = "Use yyyy-mm-dd format.";
  }

  if (!formData.province.trim()) {
    errors.province = "Province is required.";
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
  formData: Pick<
    OfficerFormData,
    "firstName" | "lastName" | "nic" | "dob" | "province" | "contact" | "email" | "assignedBranch" | "username" | "password"
  >
): boolean {
  return Boolean(
    formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.nic.trim() &&
      formData.dob.trim() &&
      formData.province.trim() &&
      formData.contact.trim() &&
      formData.email.trim() &&
      formData.assignedBranch.trim() &&
      formData.username.trim() &&
      formData.password.trim()
  );
}
