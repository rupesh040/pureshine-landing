"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import content from "../data";

interface ProfessionalCleaningProps {
  serviceId?: string;
}

export default function ProfessionalCleaning({
  serviceId,
}: ProfessionalCleaningProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const defaultData = content.professionalCleaning;
  const service = serviceId
    ? content.services.find((s) => s.id === serviceId)
    : undefined;

  const badge: string = service?.badge ?? defaultData.badge ?? "Our Services";
  const title: string = service ? service.title : defaultData.titleLine1;
  const titleLine2: string = service ? service.tagline : defaultData.titleLine2;
  const highlight: string = service ? "" : defaultData.highlight;
  const image: string = service ? service.image : defaultData.image;
  const imageAlt: string = service
    ? (service.imageAlt ?? service.title)
    : defaultData.imageAlt;
  const paragraphs: string[] = service
    ? [service.longDescription]
    : defaultData.paragraphs;
  const features: string[] = service
    ? service.features.slice(0, 3)
    : defaultData.features;
  const footer: string = service?.footer ?? defaultData.footer;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-6"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div
            style={{ animationDelay: "150ms" }}
            className={`relative w-full ${
              isVisible ? "animate-fade-in-scale" : "opacity-0"
            }`}
          >
            <div className="absolute bottom-5 left-0 h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[14px] bg-[#11952b] sm:bottom-6 sm:h-[calc(100%-24px)] sm:w-[calc(100%-24px)]" />
            <div className="relative ml-5 overflow-hidden rounded-[14px] border-[6px] border-white shadow-md sm:ml-6">
              <Image
                src={image}
                alt={imageAlt}
                width={700}
                height={600}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>
          <div className="w-full">
            {badge && (
              <span
                style={{ animationDelay: "200ms" }}
                className={`inline-block rounded-full bg-[#e8f9ed] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#11952b] ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                {badge}
              </span>
            )}

            <h2
              style={{ animationDelay: "300ms" }}
              className={`mt-3 max-w-2xl text-3xl font-bold leading-[1.15] text-[#092a43] sm:text-4xl lg:text-[46px] ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {title}
              {titleLine2 && (
                <>
                  <br />
                  {service ? (
                    <span className="text-[#11952b]">{titleLine2}</span>
                  ) : (
                    <>
                      {titleLine2}
                      <br />
                      <span className="text-[#11952b]">{highlight}</span>
                    </>
                  )}
                </>
              )}
            </h2>

            <div
              style={{ animationDelay: "400ms" }}
              className={`mt-6 space-y-5 text-[15px] leading-7 text-[#667085] sm:text-base ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-7 space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={feature}
                  style={{ animationDelay: `${500 + idx * 80}ms` }}
                  className={`flex items-start gap-3 text-sm font-medium text-[#17202a] sm:text-base ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#11952b] text-white shadow-sm">
                    <Check size={17} strokeWidth={3} />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          style={{ animationDelay: "750ms" }}
          className={`mt-10 text-sm leading-7 text-[#667085] sm:mt-12 sm:text-base ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {footer}
        </p>
      </div>
    </section>
  );
}