"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import content from "../data";

const iconMap: Record<string, LucideIcon> = { MapPin, Phone, Mail };

const { badge, heading, headingHighlight, description, items } = content.contact;

const mapHref =
  content.contact?.map?.viewLargerMapHref ||
  "https://www.google.com/maps?q=Awel+Kiett-turner+495+Boulevard,+Ste+10+Elmwood+Park,+NJ+07407,+USA";

export default function ContactInformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleCardClick = (item: (typeof items)[number]) => {
    if (item.icon === "MapPin") {
      window.open(mapHref, "_blank", "noopener,noreferrer");
    } else if (item.icon === "Phone") {
      const tel = item.lines[0]?.replace(/[^0-9+]/g, "") || "";
      if (tel) {
        window.location.href = `tel:${tel}`;
      }
    } else if (item.icon === "Mail") {
      const email = item.lines[0] || "";
      if (email) {
        window.location.href = `mailto:${email}`;
      }
    }
  };

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-5 py-6"
    >
      <div
        className={`pointer-events-none absolute -left-8 top-8 h-32 w-32 rotate-[-25deg] rounded-[60%_40%_60%_40%] bg-[#eaf7ee] transition-all duration-700 sm:h-40 sm:w-40 ${
          isVisible ? "scale-100 opacity-80" : "scale-75 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute -left-16 top-28 h-24 w-24 rotate-[35deg] rounded-[60%_40%_60%_40%] bg-[#eaf7ee] transition-all duration-700 sm:h-32 sm:w-32 ${
          isVisible ? "scale-100 opacity-70" : "scale-75 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute -right-10 top-10 h-36 w-36 rotate-[25deg] rounded-[40%_60%_40%_60%] bg-[#e7f5eb] transition-all duration-700 sm:h-44 sm:w-44 ${
          isVisible ? "scale-100 opacity-80" : "scale-75 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute -right-20 top-28 h-28 w-28 rotate-[-35deg] rounded-[40%_60%_40%_60%] bg-[#dff2e5] transition-all duration-700 sm:h-36 sm:w-36 ${
          isVisible ? "scale-100 opacity-70" : "scale-75 opacity-0"
        }`}
      />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[760px] text-center">
          <span
            style={{ animationDelay: "150ms" }}
            className={`inline-flex rounded-full bg-[#dff6e6] px-4 py-1.5 text-[11px] font-bold text-[#118b38] sm:text-[12px] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {badge}
          </span>

          <h2
            style={{ animationDelay: "260ms" }}
            className={`mt-4 text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#062d4c] sm:text-[40px] lg:text-[44px] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {heading}{" "}
            <span className="text-[#0a9b38]">{headingHighlight}</span>
          </h2>

          <div
            style={{ animationDelay: "340ms" }}
            className={`mx-auto mt-3 h-[3px] w-12 rounded-full bg-[#0a9b38] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          />

          <p
            style={{ animationDelay: "420ms" }}
            className={`mx-auto mt-4 max-w-[700px] text-[13px] leading-6 text-[#657789] sm:text-[15px] sm:leading-7 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {description}
          </p>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? MapPin;

            return (
              <div
                key={item.title}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(item);
                  }
                }}
                style={{ animationDelay: `${500 + idx * 100}ms` }}
                className={`group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[16px] border border-[#e8ecea] bg-white px-7 py-7 shadow-[0_8px_30px_rgba(8,45,76,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0b9d3b]/35 hover:shadow-[0_16px_36px_rgba(11,157,59,0.12)] sm:min-h-[220px] sm:px-8 ${
                  isVisible ? "animate-fade-in-scale" : "opacity-0"
                }`}
              >
                <div className="absolute right-3 top-[-4px] text-[#0b9d3b] opacity-[0.08] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.14] sm:right-5">
                  <Icon
                    size={100}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#dff4e5] text-[#0b9d3b] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#0b9d3b] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#0b9d3b]/30">
                    <Icon size={36} strokeWidth={2} />
                  </div>

                  <h3 className="mt-5 text-[19px] font-extrabold text-[#092f4b] transition-colors duration-300 group-hover:text-[#0b9d3b] sm:text-[20px]">
                    {item.title}
                  </h3>

                  <div className="mt-2 text-[14px] leading-6 text-[#637789] sm:text-[15px]">
                    {item.lines.map((line, i) => {
                      if (item.icon === "Phone") {
                        const tel = line.replace(/[^0-9+]/g, "");
                        return (
                          <span key={i} className="block">
                            <a
                              href={`tel:${tel}`}
                              onClick={(e) => e.stopPropagation()}
                              className="transition-colors hover:text-[#0b9d3b]"
                            >
                              {line}
                            </a>
                          </span>
                        );
                      }
                      if (item.icon === "Mail") {
                        return (
                          <span key={i} className="block">
                            <a
                              href={`mailto:${line}`}
                              onClick={(e) => e.stopPropagation()}
                              className="transition-colors hover:text-[#0b9d3b]"
                            >
                              {line}
                            </a>
                          </span>
                        );
                      }
                      return (
                        <span key={i} className="block">
                          {line}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}