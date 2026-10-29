"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  LockKeyhole,
  LucideIcon,
  Mail,
  MessageSquare,
  Phone,
  User,
  X,
} from "lucide-react";

import content from "../data";

const iconMap: Record<string, LucideIcon> = {
  User,
  Phone,
  Mail,
  MessageSquare,
  LockKeyhole,
  Headphones,
  ArrowRight,
  CheckCircle2,
  X,
};

const formData = content.contact?.form;

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopCard, setShowPopCard] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setIsVisible(true), 60);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!showPopCard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowPopCard(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showPopCard]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = new FormData(form);
    const name = (formElements.get("name") as string) || "";

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmittedName(name);
    setShowPopCard(true);
    form.reset();
  };

  const PrivacyIcon =
    iconMap[formData?.privacyNote?.icon ?? "LockKeyhole"] ?? LockKeyhole;
  const MessageAreaIcon =
    iconMap[formData?.message?.icon ?? "MessageSquare"] ?? MessageSquare;
  const AssistanceIcon =
    iconMap[formData?.sidebar?.assistance?.icon ?? "Headphones"] ?? Headphones;
  const SubmitIcon =
    iconMap[formData?.submitButton?.icon ?? "ArrowRight"] ?? ArrowRight;
  const PopSuccessIcon =
    iconMap[formData?.popCard?.icon ?? "CheckCircle2"] ?? CheckCircle2;
  const PopCloseIcon = iconMap[formData?.popCard?.closeIcon ?? "X"] ?? X;

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#07543f]">
      <div className="mx-auto grid min-h-[650px] w-full max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        <div className="relative overflow-hidden px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 xl:px-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0a634b] opacity-50" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#064b3a] opacity-70" />

          <div className="relative z-10 mx-auto max-w-[570px]">
            <p
              style={{ animationDelay: "150ms" }}
              className={`text-[14px] font-bold text-[#ffd95a] ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {formData?.badge}
            </p>

            <h2
              style={{ animationDelay: "260ms" }}
              className={`mt-4 max-w-[440px] text-[40px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[48px] lg:text-[52px] ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {formData?.headingLine1}
              <br />
              {formData?.headingLine2}
            </h2>

            <p
              style={{ animationDelay: "370ms" }}
              className={`mt-5 max-w-[520px] text-[15px] leading-7 text-white/80 sm:text-[16px] ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {formData?.description}
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ animationDelay: "450ms" }}
              className={`mt-7 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {formData?.fields?.map((field) => {
                  const FieldIcon = iconMap[field.icon] ?? User;

                  return (
                    <InputField
                      key={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      icon={<FieldIcon size={19} />}
                    />
                  );
                })}
              </div>

              <div className="relative mt-4">
                <MessageAreaIcon
                  size={19}
                  className="absolute left-4 top-4 text-[#119b62]"
                />

                <textarea
                  name={formData?.message?.name}
                  placeholder={formData?.message?.placeholder}
                  rows={formData?.message?.rows}
                  required={formData?.message?.required}
                  className="w-full resize-none rounded-[9px] border border-white/10 bg-white px-11 py-3.5 text-[14px] text-[#263b46] outline-none transition placeholder:text-[#7c8790] focus:ring-2 focus:ring-[#ffd95a]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 flex h-[53px] w-full items-center justify-center gap-3 rounded-full bg-[#ffd958] px-6 text-[14px] font-extrabold text-[#102c22] transition hover:bg-[#ffdf72] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer shadow-md"
              >
                {isSubmitting
                  ? formData?.submitButton?.submittingLabel
                  : formData?.submitButton?.label}

                {!isSubmitting && <SubmitIcon size={18} />}
              </button>

              <div className="mt-5 flex items-center gap-2 text-[12px] text-white/65">
                <PrivacyIcon size={16} className="shrink-0" />

                <span>{formData?.privacyNote?.text}</span>
              </div>
            </form>
          </div>
        </div>
        <div
          style={{ animationDelay: "200ms" }}
          className={`relative min-h-[450px] lg:min-h-full ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <Image
            src={formData?.sidebar?.image ?? "/why-chooseUs.png"}
            alt={formData?.sidebar?.imageAlt ?? ""}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/10" />
          <div
            style={{ animationDelay: "520ms" }}
            className={`absolute bottom-6 left-1/2 flex w-[calc(100%-32px)] max-w-[430px] -translate-x-1/2 items-center gap-4 rounded-[16px] bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-105 sm:bottom-8 sm:px-6 ${
              isVisible ? "animate-fade-in-scale" : "opacity-0"
            }`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dff5e8] text-[#079c58]">
              <AssistanceIcon size={27} strokeWidth={2} />
            </div>

            <div>
              <p className="text-[13px] font-extrabold text-[#0b7046] sm:text-[14px]">
                {formData?.sidebar?.assistance?.title}
              </p>

              {formData?.sidebar?.assistance?.phoneHref ? (
                <a
                  href={formData.sidebar.assistance.phoneHref}
                  className="mt-1 block text-[12px] font-semibold text-[#263b46] transition hover:text-[#0b7046] sm:text-[13px]"
                >
                  {formData.sidebar.assistance.subtitle}
                </a>
              ) : (
                <p className="mt-1 text-[12px] font-semibold text-[#263b46] sm:text-[13px]">
                  {formData?.sidebar?.assistance?.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPopCard && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowPopCard(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] overflow-hidden rounded-[24px] bg-white p-6 text-center shadow-2xl sm:p-8 animate-fade-in-scale"
          >
            <button
              type="button"
              onClick={() => setShowPopCard(false)}
              aria-label={formData?.popCard?.closeAriaLabel ?? "Close"}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#7b8a95] transition hover:bg-[#f0f4f2] hover:text-[#0b2942] cursor-pointer"
            >
              <PopCloseIcon size={18} />
            </button>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f8ee] text-[#12a83a] shadow-inner">
              <PopSuccessIcon size={38} strokeWidth={2.2} />
            </div>

            <h3 className="mt-4 text-[22px] font-extrabold text-[#062d4c] sm:text-[24px]">
              {formData?.popCard?.title}
            </h3>

            <p className="mt-2 text-[14px] leading-6 text-[#5b6e7f]">
              {submittedName
                ? `${formData?.popCard?.thankYouPrefix}${submittedName}${formData?.popCard?.thankYouSuffix}`
                : formData?.popCard?.defaultMessage}
              <br />
              {formData?.popCard?.followUp}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowPopCard(false)}
                className="w-full rounded-full bg-[#10ad3b] py-3 text-[14px] font-bold text-white shadow-md transition hover:bg-[#088e2e] active:scale-95 cursor-pointer"
              >
                {formData?.popCard?.buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  icon: React.ReactNode;
}

function InputField({
  name,
  type,
  placeholder,
  required = true,
  icon,
}: InputFieldProps) {
  const isNumberType =
    type === "number" ||
    type === "tel" ||
    name.toLowerCase().includes("phone") ||
    name.toLowerCase().includes("number");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isNumberType) return;
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(e.key)) return;
    if (
      (e.ctrlKey || e.metaKey) &&
      ["a", "c", "v", "x"].includes(e.key.toLowerCase())
    ) {
      return;
    }
    if (
      e.key === "+" &&
      e.currentTarget.selectionStart === 0 &&
      !e.currentTarget.value.includes("+")
    ) {
      return;
    }

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!isNumberType) return;
    const target = e.currentTarget;
    let val = target.value.replace(/[^0-9+]/g, "");
    if (val.indexOf("+") > 0) {
      val =
        val.charAt(0) === "+"
          ? "+" + val.slice(1).replace(/\+/g, "")
          : val.replace(/\+/g, "");
    }
    target.value = val;
  };

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#119b62]">
        {icon}
      </span>

      <input
        name={name}
        type={isNumberType ? "tel" : type}
        inputMode={isNumberType ? "numeric" : undefined}
        pattern={isNumberType ? "[0-9+]*" : undefined}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={placeholder}
        required={required}
        className="h-[50px] w-full rounded-[9px] border border-white/10 bg-white pl-11 pr-4 text-[14px] text-[#263b46] outline-none transition placeholder:text-[#7c8790] focus:ring-2 focus:ring-[#ffd95a]"
      />
    </div>
  );
}
