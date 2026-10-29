"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import {
  RiHome4Fill,
  RiCalendar2Fill,
  RiLeafFill,
  RiCoinsFill,
  RiTimeFill,
  RiShieldCheckFill,
  RiHeadphoneFill,
  RiTeamFill,
  RiRepeat2Fill,
  RiBankCardFill,
  RiSparklingFill,
  RiShieldFill,
  RiFileCheckFill,
} from "react-icons/ri";
import { FaSprayCanSparkles } from "react-icons/fa6";
import type { IconType } from "react-icons";
import content from "../data";

const iconMap: Record<string, IconType> = {
  Home: RiHome4Fill,
  CalendarDays: RiCalendar2Fill,
  Leaf: RiLeafFill,
  Coins: RiCoinsFill,
  SprayCan: FaSprayCanSparkles,
  Clock3: RiTimeFill,
  ShieldCheck: RiShieldCheckFill,
  Headphones: RiHeadphoneFill,
  Users: RiTeamFill,
  Repeat: RiRepeat2Fill,
  CreditCard: RiBankCardFill,
  Sparkles: RiSparklingFill,
  Shield: RiShieldFill,
  FileCheck: RiFileCheckFill,
};

const {
  badge,
  heading,
  headingHighlight,
  description,
  leafImage,
  leafImageAlt,
  defaultLimit,
  contactCard,
} = content.faqSection;

const rawFaqs = content.faqs;

const allFaqs = rawFaqs.map((f) => ({
  ...f,
  icon: iconMap[f.icon] ?? RiHome4Fill,
}));

interface FAQProps {
  showContactCard?: boolean;
  limit?: number;
  showAll?: boolean;
}

export default function FAQ({
  showContactCard,
  limit,
  showAll,
}: FAQProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pathname = usePathname();

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
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const isFaqPage =
    pathname === "/faq" ||
    pathname === "/faqs" ||
    Boolean(pathname?.startsWith("/faq/"));

  const shouldShowContactCard =
    showContactCard !== undefined ? showContactCard : !isFaqPage;
  const shouldShowAll = showAll !== undefined ? showAll : isFaqPage;
  const effectiveLimit =
    limit !== undefined ? limit : shouldShowAll ? undefined : defaultLimit;

  const displayedFaqs = effectiveLimit
    ? allFaqs.slice(0, effectiveLimit)
    : allFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  const leftFaqs = displayedFaqs.filter((_, index) => index % 2 === 0);
  const rightFaqs = displayedFaqs.filter((_, index) => index % 2 !== 0);

  const ContactCardIcon = iconMap[contactCard.icon] ?? RiHeadphoneFill;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-6"
    >
      <div className="pointer-events-none absolute -left-[75px] -top-[75px] h-[180px] w-[180px] rounded-full bg-[#f2f8f5] sm:h-[230px] sm:w-[230px]" />
      <div className="pointer-events-none absolute -right-[80px] -top-[80px] h-[180px] w-[180px] rounded-full bg-[#f2f8f5] sm:h-[240px] sm:w-[240px]" />
      <div className="pointer-events-none absolute -bottom-[80px] -left-[90px] h-[190px] w-[190px] rounded-full bg-[#f5faf8]" />
      <div className="pointer-events-none absolute -bottom-[100px] -right-[60px] h-[200px] w-[200px] rounded-full bg-[#f5faf8]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-[950px] text-center">
          <Image
            src={leafImage}
            alt={leafImageAlt}
            width={60}
            height={60}
            className={`pointer-events-none absolute left-0 top-0 rotate-[240deg] transition-all duration-700 ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          />
          <Image
            src={leafImage}
            alt="leaf"
            width={60}
            height={60}
            className={`pointer-events-none absolute right-0 top-0 transition-all duration-700 ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          />

          <div
            style={{ animationDelay: "150ms" }}
            className={`flex items-center justify-center gap-4 sm:gap-5 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <span className="hidden h-[2px] w-[55px] bg-[#13aa3b] sm:block" />
            <span className="text-[13px] font-bold tracking-[3px] text-[#10a83a] sm:text-[14px] sm:tracking-[4px]">
              {badge}
            </span>
            <span className="hidden h-[2px] w-[55px] bg-[#13aa3b] sm:block" />
          </div>

          <h2
            style={{ animationDelay: "260ms" }}
            className={`mt-4 text-[34px] font-extrabold leading-[1.1] tracking-tight text-[#062d4c] sm:text-[44px] lg:text-[48px] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {heading} <span className="text-[#10a83a]">{headingHighlight}</span>
          </h2>

          <p
            style={{ animationDelay: "370ms" }}
            className={`mx-auto mt-4 max-w-[720px] text-[13px] leading-6 text-[#5c7182] sm:text-[15px] sm:leading-7 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {description}
          </p>
        </div>
        <div className="mt-10 hidden gap-5 lg:flex">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {leftFaqs.map((faq, i) => {
              const originalIndex = displayedFaqs.indexOf(faq);
              return (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  isOpen={openIndex === originalIndex}
                  onToggle={() => toggleFAQ(originalIndex)}
                  delay={450 + i * 80}
                  isVisible={isVisible}
                />
              );
            })}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {rightFaqs.map((faq, i) => {
              const originalIndex = displayedFaqs.indexOf(faq);
              return (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  isOpen={openIndex === originalIndex}
                  onToggle={() => toggleFAQ(originalIndex)}
                  delay={500 + i * 80}
                  isVisible={isVisible}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 lg:hidden">
          {displayedFaqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              delay={420 + index * 70}
              isVisible={isVisible}
            />
          ))}
        </div>
        {shouldShowContactCard && (
          <div
            style={{ animationDelay: "850ms" }}
            className={`mx-auto mt-8 flex max-w-[885px] flex-col gap-5 rounded-[18px] bg-[#e8f8ed] px-5 py-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8 transition-transform duration-300 hover:shadow-md ${
              isVisible ? "animate-fade-in-scale" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border-2 border-[#13ad3c] bg-white text-[#092f4b]">
                <ContactCardIcon size={32} className="h-8 w-8 text-[#092f4b]" />
              </div>
              <div className="hidden h-[52px] w-[2px] bg-[#b9dfc3] sm:block" />

              <div>
                <h3 className="text-[16px] font-bold text-[#092f4b] sm:text-[18px]">
                  {contactCard.title}
                </h3>
                <p className="mt-1 text-[12px] leading-5 text-[#607689] sm:text-[13px]">
                  {contactCard.description}
                </p>
              </div>
            </div>

            <Link
              href={contactCard.button.href}
              className="group flex h-[50px] shrink-0 items-center justify-center gap-5 rounded-full bg-[#10ad3b] px-8 text-[14px] font-bold text-white transition hover:bg-[#07972f] sm:min-w-[185px]"
            >
              <span>{contactCard.button.label}</span>
               <ArrowRight
                  size={20}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
    icon: IconType;
  };
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
  isVisible?: boolean;
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
  delay = 450,
  isVisible = true,
}: FAQItemProps) {
  const Icon = faq.icon;

  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`w-full overflow-hidden rounded-[16px] bg-white shadow-[0_5px_25px_rgba(8,45,76,0.06)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(8,45,76,0.09)] ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-4 py-3 text-left sm:px-5 sm:py-4 cursor-pointer"
      >
        <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#e5f7e9] text-[#0aaa3a] sm:h-[58px] sm:w-[58px]">
          <Icon size={29} className="h-7 w-7 text-[#0aaa3a]" />
        </span>
        <span className="flex-1 text-[14px] font-bold leading-5 text-[#092f4b] sm:text-[16px]">
          {faq.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center text-[#092f4b] transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown size={21} strokeWidth={2} />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-[#edf3ef] px-5 pb-5 pl-[72px] pt-4 sm:pl-[83px]">
            <p className="max-w-[560px] text-[13px] leading-6 text-[#637789] sm:text-[14px]">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
