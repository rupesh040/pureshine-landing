export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  service: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryPayload, string>>;

export const enquiryLimits: Record<keyof EnquiryPayload, number> = {
  name: 100,
  phone: 40,
  email: 254,
  subject: 160,
  message: 4000,
  service: 120,
};

const clean = (value?: unknown) => (typeof value === "string" ? value.trim() : "");

export function validateEnquiry(input?: Partial<EnquiryPayload> | null):
  | { ok: true; data: EnquiryPayload }
  | { ok: false; errors: EnquiryErrors } {
  const data: EnquiryPayload = {
    name: clean(input?.name),
    phone: clean(input?.phone),
    email: clean(input?.email),
    subject: clean(input?.subject),
    message: clean(input?.message),
    service: clean(input?.service),
  };
  const errors: EnquiryErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  if (!data.phone || !/^[+\d\s().-]+$/.test(data.phone) ||
      data.phone.replace(/\D/g, "").length < 7 ||
      data.phone.replace(/\D/g, "").length > 15) {
    errors.phone = "Enter a phone number with 7 to 15 digits.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.subject) errors.subject = "Please enter a subject.";
  if (data.message.length < 10) {
    errors.message = "Please tell us a little more (at least 10 characters).";
  }

  for (const key of Object.keys(enquiryLimits) as (keyof EnquiryPayload)[]) {
    if (data[key].length > enquiryLimits[key]) {
      errors[key] = `Please use ${enquiryLimits[key]} characters or fewer.`;
    }
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
