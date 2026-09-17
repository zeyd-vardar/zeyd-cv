import type { ContactErrors, ContactFormData } from "../types/portfolio";

export const contactLimits = { name: 100, email: 254, subject: 150, message: 5000 };

export function validateContact(values: ContactFormData): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of Object.keys(contactLimits) as (keyof ContactFormData)[]) {
    if (!values[field].trim()) {
      errors[field] = "required";
    } else if (values[field].length > contactLimits[field]) {
      errors[field] = "long";
    }
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "email";
  }
  if (!errors.message && values.message.trim().length < 20) {
    errors.message = "short";
  }
  return errors;
}
