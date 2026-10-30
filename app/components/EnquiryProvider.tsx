"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, LockKeyhole, X } from "lucide-react";
import content from "../data";
import { enquiryLimits, validateEnquiry, type EnquiryErrors, type EnquiryPayload } from "../lib/enquiry";

const EnquiryContext = createContext<{ openEnquiry: (service?: string) => void } | null>(null);
const formContent = content.contact.form;
const services = content.services.filter(
  (service, index, items) => items.findIndex((item) => item.slug === service.slug) === index,
);
const emptyForm: EnquiryPayload = { name: "", phone: "", email: "", subject: "", message: "", service: "" };
const inputClass = "min-h-12 w-full rounded-xl border border-[#d9e5df] bg-white px-4 py-3 text-base text-[#092a43] outline-none transition placeholder:text-[#7a8791] focus:border-[#11883e] focus:ring-2 focus:ring-[#11883e]/20 disabled:opacity-60";

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return context;
}

export function EnquiryButton({
  service,
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & { service?: string }) {
  const { openEnquiry } = useEnquiry();
  return <button {...props} type="button" onClick={() => openEnquiry(service)}>{children}</button>;
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<EnquiryPayload>(emptyForm);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const openEnquiry = useCallback((service = "") => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const selected = services.find((item) => item.title === service || item.slug === service);
    setValues({ ...emptyForm, service: selected?.title ?? "", subject: selected?.title ?? service });
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    requestRef.current?.abort();
    requestRef.current = null;
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = overflow;
      if (dialog?.open) dialog.close();
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const updateField = (key: keyof EnquiryPayload, value: string) => {
    const nextValue = key === "phone" ? value.replace(/\D/g, "") : value;
    setValues((current) => ({ ...current, [key]: nextValue }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const focusError = (fieldErrors: EnquiryErrors) => {
    const first = Object.keys(fieldErrors)[0];
    const field = first && formRef.current?.elements.namedItem(first);
    if (field instanceof HTMLElement) field.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const validation = validateEnquiry(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      focusError(validation.errors);
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    setErrors({});
    setErrorMessage("");
    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      if (controller.signal.aborted) return;
      setSubmittedName(validation.data.name);
      setStatus("success");
    } catch {
      if (controller.signal.aborted) return;
      setErrorMessage("We couldn't send your enquiry. Please try again.");
      setStatus("error");
    } finally {
      if (requestRef.current === controller) requestRef.current = null;
    }
  };

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="enquiry-title"
        aria-describedby="enquiry-description"
        onCancel={(event) => { event.preventDefault(); closeEnquiry(); }}
        onClose={() => setIsOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) closeEnquiry(); }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[620px] overflow-y-auto rounded-3xl border-0 bg-white p-0 text-[#092a43] shadow-2xl backdrop:bg-[#092a43]/65 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-6 sm:p-9">
          <button
            type="button"
            aria-label="Close enquiry"
            onClick={closeEnquiry}
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full text-[#536873] transition hover:bg-[#eef7f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11883e]"
          ><X size={22} /></button>

          {status === "success" ? (
            <div className="py-7 text-center" role="status">
              <CheckCircle2 className="mx-auto size-16 text-[#11883e]" aria-hidden="true" />
              <h2 ref={successHeadingRef} tabIndex={-1} id="enquiry-title" className="mt-5 text-2xl font-black outline-none">{formContent.popCard.title}</h2>
              <p id="enquiry-description" className="mt-3 leading-7 text-[#536873]">
                {formContent.popCard.thankYouPrefix}{submittedName}{formContent.popCard.thankYouSuffix}{" "}{formContent.popCard.followUp}
              </p>
              <button type="button" onClick={closeEnquiry} className="mt-7 min-h-12 rounded-full bg-[#11883e] px-7 py-3 font-bold text-white transition hover:bg-[#0a6b2d]">{formContent.popCard.buttonText}</button>
            </div>
          ) : (
            <>
              <p className="pr-12 text-xs font-bold uppercase tracking-[0.16em] text-[#11883e]">{formContent.badge}</p>
              <h2 id="enquiry-title" className="mt-3 pr-8 text-3xl font-black leading-tight sm:text-4xl">{formContent.headingLine1} {formContent.headingLine2}</h2>
              <p id="enquiry-description" className="mt-3 text-sm leading-6 text-[#536873]">{formContent.description}</p>

              <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-6" aria-busy={status === "sending"}>
                <fieldset disabled={status === "sending"} className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                  {formContent.fields.map((field) => {
                    const key = field.name as keyof EnquiryPayload;
                    return (
                      <div key={key} className="min-w-0">
                        <label htmlFor={`enquiry-${key}`} className="mb-1.5 block text-sm font-bold">{field.placeholder}{field.required && <span aria-hidden="true"> *</span>}</label>
                        <input
                          id={`enquiry-${key}`}
                          name={key}
                          type={field.type}
                          inputMode={key === "phone" ? "numeric" : undefined}
                          pattern={key === "phone" ? "[0-9]*" : undefined}
                          autoComplete={key === "name" ? "name" : key === "phone" ? "tel" : key === "email" ? "email" : undefined}
                          required={field.required}
                          maxLength={enquiryLimits[key]}
                          value={values[key]}
                          onChange={(event) => updateField(key, event.target.value)}
                          aria-invalid={Boolean(errors[key])}
                          aria-describedby={errors[key] ? `enquiry-${key}-error` : undefined}
                          className={inputClass}
                        />
                        {errors[key] && <p id={`enquiry-${key}-error`} className="mt-1.5 text-xs text-[#a72727]">{errors[key]}</p>}
                      </div>
                    );
                  })}
                  <div className="sm:col-span-2">
                    <label htmlFor="enquiry-service" className="mb-1.5 block text-sm font-bold">Cleaning service <span className="font-normal text-[#536873]">(optional)</span></label>
                    <select id="enquiry-service" name="service" value={values.service} onChange={(event) => updateField("service", event.target.value)} className={inputClass}>
                      <option value="">General enquiry</option>
                      {services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="enquiry-message" className="mb-1.5 block text-sm font-bold">{formContent.message.placeholder} <span aria-hidden="true">*</span></label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={formContent.message.rows}
                      required={formContent.message.required}
                      maxLength={enquiryLimits.message}
                      value={values.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "enquiry-message-error" : undefined}
                      className={`${inputClass} resize-y`}
                    />
                    {errors.message && <p id="enquiry-message-error" className="mt-1.5 text-xs text-[#a72727]">{errors.message}</p>}
                  </div>
                </fieldset>
                {errorMessage && <p role="alert" className="mt-4 rounded-xl bg-[#fff0ef] p-3 text-sm leading-6 text-[#a72727]">{errorMessage}</p>}
                <button type="submit" disabled={status === "sending"} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#11883e] px-6 py-3 font-bold text-white transition hover:bg-[#0a6b2d] disabled:cursor-wait disabled:opacity-70">
                  {status === "sending" ? <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" />{formContent.submitButton.submittingLabel}</> : <>{formContent.submitButton.label}<ArrowRight size={18} aria-hidden="true" /></>}
                </button>
                <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#536873]"><LockKeyhole size={15} className="mt-0.5 shrink-0" aria-hidden="true" />{formContent.privacyNote.text}</p>
              </form>
            </>
          )}
        </div>
      </dialog>
    </EnquiryContext.Provider>
  );
}

export default EnquiryProvider;
