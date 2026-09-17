import { useRef, useState, type FormEvent } from "react";
import type { Translation } from "../data/translations";
import { isContactDemo, sendContactMessage } from "../services/contactService";
import type { ContactErrors, ContactFormData } from "../types/portfolio";
import { contactLimits, validateContact } from "../utils/validateContact";

const emptyForm: ContactFormData = { name: "", email: "", subject: "", message: "" };
type SubmitStatus = "idle" | "sending" | "sent" | "demo" | "error";

export function ContactForm({ text }: { text: Translation }) {
  const [values, setValues] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const submissionPending = useRef(false);
  const content = text.contact;
  const errorMessages = {
    required: content.required,
    email: content.emailError,
    short: content.short,
    long: content.long,
  };
  const fields = [
    {
      name: "name",
      label: content.name,
      placeholder: content.namePlaceholder,
      type: "text",
      autoComplete: "name",
    },
    {
      name: "email",
      label: content.emailField,
      placeholder: content.emailPlaceholder,
      type: "email",
      autoComplete: "email",
    },
    {
      name: "subject",
      label: content.subject,
      placeholder: content.subjectPlaceholder,
      type: "text",
      autoComplete: "off",
    },
    {
      name: "message",
      label: content.message,
      placeholder: content.messagePlaceholder,
      type: "text",
      autoComplete: "off",
    },
  ] as const;

  function updateField(field: keyof ContactFormData, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "sending") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionPending.current) return;
    const validationErrors = validateContact(values);
    setErrors(validationErrors);
    const firstInvalidField = Object.keys(validationErrors)[0];
    if (firstInvalidField) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }
    submissionPending.current = true;
    setStatus("sending");
    try {
      const result = await sendContactMessage(values);
      setStatus(result);
      if (result === "sent") setValues(emptyForm);
    } catch {
      setStatus("error");
    } finally {
      submissionPending.current = false;
    }
  }

  return (
    <form
      className="contact-form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "sending"}
    >
      <h3>{content.formTitle}</h3>
      <div className="form-fields">
        {fields.map((field) => {
          const error = errors[field.name];
          const fieldProps = {
            id: `contact-${field.name}`,
            name: field.name,
            value: values[field.name],
            placeholder: field.placeholder,
            required: true,
            maxLength: contactLimits[field.name],
            disabled: status === "sending",
            "aria-invalid": Boolean(error),
            "aria-describedby": error ? `${field.name}-error` : undefined,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              updateField(field.name, event.target.value),
          };
          return (
            <div className={`form-field field-${field.name}`} key={field.name}>
              <label htmlFor={fieldProps.id}>
                {field.label}
                <span aria-hidden="true"> *</span>
              </label>
              {field.name === "message" ? (
                <textarea {...fieldProps} rows={4} />
              ) : (
                <input {...fieldProps} type={field.type} autoComplete={field.autoComplete} />
              )}
              {error && (
                <span id={`${field.name}-error`} className="field-error">
                  {errorMessages[error]}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <button type="submit" className="button primary" disabled={status === "sending"}>
        {status === "sending" ? content.sending : content.submit}
        <span aria-hidden="true">↗</span>
      </button>
      {isContactDemo && <p className="form-note">{content.demoNote}</p>}
      <div className={`form-status status-${status}`} role="status" aria-live="polite">
        {status === "demo" && content.demoSuccess}
        {status === "sent" && content.success}
        {status === "error" && content.failure}
      </div>
    </form>
  );
}
