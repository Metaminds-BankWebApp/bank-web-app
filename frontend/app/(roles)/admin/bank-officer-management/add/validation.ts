/**
 * Feature page component for Admin or LoanSense workflows.
 */

import type { OfficerFormData, OfficerFormErrors } from "./types";

export const SRI_LANKA_PROVINCES = [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa",
] as const;

const provinceSet = new Set(
  SRI_LANKA_PROVINCES.map((province) => province.toLowerCase())
);

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
const contactRegex = /^(?:077|076|078|070|072|074|075|071)\d{7}$/;
const nicRegex = /^(?:\d{9}[VvXx]|\d{12})$/;
const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
const startsWithLetterRegex = /^\p{L}/u;

export function validateOfficerForm(formData: OfficerFormData): OfficerFormErrors {
  const errors: OfficerFormErrors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (!startsWithLetterRegex.test(formData.firstName.trim())) {
    errors.firstName = "First name must start with a letter.";
  } else if (formData.firstName.trim().length < 3) {
    errors.firstName = "First name should contain at least more than 3 characters.";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (!startsWithLetterRegex.test(formData.lastName.trim())) {
    errors.lastName = "Last name must start with a letter.";
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
  } else {
    const dob = new Date(`${formData.dob.trim()}T00:00:00`);
    const today = new Date();

    if (Number.isNaN(dob.getTime())) {
      errors.dob = "Enter a valid date of birth.";
    } else {
      let age = today.getFullYear() - dob.getFullYear();
      const monthDifference = today.getMonth() - dob.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < dob.getDate())
      ) {
        age -= 1;
      }

      if (age < 18) {
        errors.dob = "Bank officer must be at least 18 years old.";
      }
    }
  }

  if (!formData.province.trim()) {
    errors.province = "Province is required.";
  } else if (!provinceSet.has(formData.province.trim().toLowerCase())) {
    errors.province = "Please select a valid Sri Lankan province.";
  }

  if (!formData.contact.trim()) {
    errors.contact = "Contact number is required.";
  } else if (!contactRegex.test(formData.contact.trim())) {
    errors.contact =
      "Contact number must be 10 digits and start with 070, 071, 072, 074, 075, 076, 077, or 078.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Email must be in the format name@gmail.com.";
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
