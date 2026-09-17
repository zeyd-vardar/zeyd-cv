import type { ContactFormData } from "../types/portfolio";
import { validateContact } from "../utils/validateContact";

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
export const isContactDemo = !contactEndpoint;

export async function sendContactMessage(values: ContactFormData): Promise<"demo" | "sent"> {
  if (Object.keys(validateContact(values)).length > 0) {
    throw new Error("Invalid contact data");
  }
  if (!contactEndpoint) return "demo";

  const response = await fetch(contactEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(values),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("Contact request failed");
  return "sent";
}
