"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import {
  RiAwardFill,
  RiFacebookFill,
  RiInstagramFill,
  RiLeafFill,
  RiLinkedinFill,
  RiMailCheckFill,
  RiMailFill,
  RiMapPin2Fill,
  RiPhoneFill,
  RiShieldCheckFill,
  RiTimeFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "react-icons/ri";
import type { IconType } from "react-icons";

import content from "../data";

const socialIconMap: Record<string, IconType> = {
  Facebook: RiFacebookFill,
  Instagram: RiInstagramFill,
  Twitter: RiTwitterXFill,
  X: RiTwitterXFill,
  LinkedIn: RiLinkedinFill,
  YouTube: RiYoutubeFill,
};

const badgeIconMap: Record<string, IconType> = {
  Leaf: RiLeafFill,
  Award: RiAwardFill,
  ShieldCheck: RiShieldCheckFill,
  Clock3: RiTimeFill,
};

const footer = content.footer;

const quickLinks = footer.quickLinks.map((link) => [link.name, link.href]);
const serviceLinks = footer.serviceLinks.slice(0, 6).map((link) => [link.name, link.href]);
const socialLinks = footer.socialLinks.map((social) => ({
  ...social,
  icon: socialIconMap[social.label] ?? RiFacebookFill,
}));
const trustBadges = footer.trustBadges.map((badge) => ({
  ...badge,
  icon: badgeIconMap[badge.icon] ?? RiLeafFill,
}));

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [showPopCard, setShowPopCard] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setSubmittedEmail(newsletterEmail.trim());
    setShowPopCard(true);
    setNewsletterEmail("");
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#032e47] text-white"
    >
      <div
        className={`pointer-events-none absolute right-[-20px] top-[-20px] hidden h-[220px] w-[150px] transition-all duration-700 lg:block ${
          isVisible ? "scale-100 opacity-[0.08]" : "scale-75 opacity-0"
        }`}
      >
        <LeafDecoration />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 pt-10 pb-6 sm:px-8 sm:pt-12 sm:pb-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_0.8fr_1.1fr_1.2fr] lg:gap-6 xl:gap-8">
          <div
            style={{ animationDelay: "150ms" }}
            className={isVisible ? "animate-fade-in-up" : "opacity-0"}
          >
            <Link href={footer.logoHref} className="inline-block transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src={footer.logo}
                alt={footer.logoAlt}
                width={200}
                height={115}
                priority
                className="h-auto w-[165px] object-contain"
              />
            </Link>

            <p className="mt-2.5 max-w-[280px] text-[13px] font-normal leading-5 text-white/70 sm:text-[13.5px]">
              {footer.description}
            </p>

            <div className="mt-4 flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white/80 transition-all duration-200 hover:border-[#17b83c] hover:bg-[#17b83c] hover:text-white"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          <div
            style={{ animationDelay: "260ms" }}
            className={isVisible ? "animate-fade-in-up" : "opacity-0"}
          >
            <FooterHeading>{footer.quickLinksTitle}</FooterHeading>

            <ul className="mt-4 space-y-2.5">
              {quickLinks.map(([name, href]) => (
                <FooterLink key={name} name={name} href={href} />
              ))}
            </ul>
          </div>

          <div
            style={{ animationDelay: "370ms" }}
            className={isVisible ? "animate-fade-in-up" : "opacity-0"}
          >
            <FooterHeading>{footer.servicesTitle}</FooterHeading>

            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map(([name, href]) => (
                <FooterLink key={name} name={name} href={href} />
              ))}
            </ul>
          </div>

          <div
            style={{ animationDelay: "480ms" }}
            className={isVisible ? "animate-fade-in-up" : "opacity-0"}
          >
            <FooterHeading>{footer.contactTitle}</FooterHeading>

            <div className="mt-4 space-y-3.5">
              <ContactItem
                icon={<RiPhoneFill size={21} />}
                title={footer.contact.phone}
                subtitle={footer.contact.phoneHours}
                href={footer.contact.phoneHref}
              />

              <ContactItem
                icon={<RiMailFill size={21} />}
                title={footer.contact.email}
                subtitle={footer.contact.emailNote}
                href={footer.contact.emailHref}
              />

              <ContactItem
                icon={<RiMapPin2Fill size={21} />}
                title={footer.contact.address}
              />
            </div>
          </div>

          <div
            style={{ animationDelay: "590ms" }}
            className={`sm:col-span-2 lg:col-span-1 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <FooterHeading>{footer.newsletter.title}</FooterHeading>

            <p className="mt-2 text-[12.5px] font-normal leading-5 text-white/65">
              {footer.newsletter.description}
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-3.5 flex h-10 w-full overflow-hidden rounded-md border border-white/20 bg-white/[0.04] transition-colors focus-within:border-[#12b63a]"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={footer.newsletter.placeholder}
                className="min-w-0 flex-1 bg-transparent px-3 text-[12.5px] text-white outline-none placeholder:text-white/40"
              />

              <button
                type="submit"
                aria-label={footer.newsletter.submitLabel}
                className="flex w-10 shrink-0 items-center justify-center bg-[#12b63a] transition-all hover:bg-[#0c9c30] active:scale-95 cursor-pointer"
              >
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </form>

            <div className="mt-4 pt-3.5 border-t border-white/10">
              <div className="grid grid-cols-4 gap-2">
                {trustBadges.map((badge) => (
                  <TrustBadge
                    key={badge.title}
                    icon={<badge.icon size={19} />}
                    title={badge.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ animationDelay: "680ms" }}
          className={`mt-8 h-px w-full bg-white/15 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          style={{ animationDelay: "720ms" }}
          className={`flex flex-col gap-4 pt-4 pb-1 lg:flex-row lg:items-center lg:justify-between ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <p className="text-center text-[12px] font-normal text-white/60 lg:text-left lg:text-[13px]">
            {footer.copyright}
          </p>
        </div>
      </div>

      {showPopCard && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowPopCard(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[430px] overflow-hidden rounded-[24px] bg-white p-6 sm:p-8 text-center text-[#102b4c] shadow-[0_20px_50px_rgba(0,0,0,0.30)] animate-fade-in-scale"
          >
            <button
              type="button"
              onClick={() => setShowPopCard(false)}
              aria-label="Close message"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f7] text-[#607187] transition hover:bg-[#e4ebf0] hover:text-[#102b4c] cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f8eb] text-[#159447] shadow-sm">
              <RiMailCheckFill size={40} />
            </div>

            <h3 className="mt-4 text-[20px] font-bold text-[#102b4c] sm:text-[22px]">
              Subscribed Successfully!
            </h3>

            <p className="mt-2 text-[13px] leading-6 text-[#5b6e7f] sm:text-[14px]">
              Thank you for subscribing! We&apos;ve sent a confirmation to{" "}
              <span className="font-semibold text-[#102b4c]">
                {submittedEmail}
              </span>
              . You&apos;ll now receive our latest updates, seasonal cleaning tips, and exclusive offers.
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowPopCard(false)}
                className="w-full rounded-full bg-[#10ad3b] py-3 text-[14px] font-bold text-white shadow-md transition hover:bg-[#088e2e] active:scale-95 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[15px] font-bold leading-5 text-white sm:text-[16px] mb-2">
        {children}
      </h3>

      <span className="mt-2 block h-[2.5px] w-8 rounded-full bg-[#12b83b]" />
    </div>
  );
}

function FooterLink({ name, href }: { name: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-[13px] font-medium leading-5 text-white/65 transition-colors hover:text-[#18bb40] sm:text-[13.5px]"
      >
        <span className="text-[18px] leading-4 text-white/70 transition-transform duration-200 group-hover:translate-x-1">
          ›
        </span>

        <span>{name}</span>
      </Link>
    </li>
  );
}

function ContactItem({
  icon,
  title,
  subtitle,
  href,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  href?: string;
}) {
  const content = (
    <div className="flex w-full items-start gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#075f4e] text-white shadow-sm">
        {icon}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="break-words text-[13px] font-semibold leading-snug text-white sm:text-[13.5px]">
          {title}
        </div>

        {subtitle && (
          <p className="mt-0.5 text-[11px] font-normal leading-tight text-white/55 sm:text-[11.5px]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block transition-opacity hover:opacity-85"
      >
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}

function TrustBadge({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#075f4e] text-white shadow-sm">
        {icon}
      </div>

      <p className="mt-1.5 text-[10px] font-medium leading-tight text-white/80 sm:text-[10.5px]">
        {title}
      </p>
    </div>
  );
}

function LeafDecoration() {
  return (
    <svg
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <path
        d="M80 215C80 150 77 82 38 15"
        stroke="currentColor"
        strokeWidth="4"
      />

      <path
        d="M75 168C38 170 17 147 11 117C42 117 65 135 75 168Z"
        fill="currentColor"
      />

      <path
        d="M73 125C109 125 133 103 140 73C109 73 87 92 73 125Z"
        fill="currentColor"
      />

      <path
        d="M59 80C32 78 15 60 12 37C36 39 54 53 59 80Z"
        fill="currentColor"
      />

      <path
        d="M83 52C107 52 124 37 128 14C104 16 89 29 83 52Z"
        fill="currentColor"
      />
    </svg>
  );
}
