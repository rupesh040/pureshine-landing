"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import content from "../data";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  CookingPot,
  Bath,
  Sofa,
  Sparkles,
  ShieldCheck,
  Building,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  CookingPot,
  Bath,
  Sofa,
  Sparkles,
  ShieldCheck,
  Building,
};

interface ServicesProps {
  limit?: number;
  showViewAll?: boolean;
  layout?: "slider" | "grid";
  itemsPerPage?: number;
  excludeId?: string;
}

export default function Services({
  limit,
  showViewAll,
  layout,
  itemsPerPage,
  excludeId,
}: ServicesProps = {}) {
  const pathname = usePathname();
  const isServicesPage = pathname === "/services";
  const effectiveLayout = layout ?? (isServicesPage ? "grid" : "slider");
  const {
    badge,
    heading,
    headingHighlight,
    description,
    leafImage = "/leaf.png",
    viewAllButton,
  } = content.servicesSection;

  const allServices = content.services;

  const activeExcludeId =
    excludeId ??
    (pathname.startsWith("/services/")
      ? pathname.replace("/services/", "").split("/")[0]
      : pathname.startsWith("/serviceDetail/")
      ? pathname.replace("/serviceDetail/", "").split("/")[0]
      : undefined);

  const availableServices = activeExcludeId
    ? allServices.filter((s) => s.id !== activeExcludeId)
    : allServices;

  const pageSize =
    itemsPerPage ??
    (content.servicesSection as { itemsPerPage?: number }).itemsPerPage ??
    8;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(availableServices.length / pageSize);

  const cardLimit = limit !== undefined ? limit : 8;
  const displayedServices = isServicesPage
    ? availableServices.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      )
    : availableServices.slice(0, cardLimit);
  const shouldShowViewAll =
    showViewAll !== undefined ? showViewAll : !isServicesPage;

  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [pathname, activeExcludeId]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const checkScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const hasOverflow = maxScroll > 8;

    setCanScrollLeft(hasOverflow);
    setCanScrollRight(hasOverflow);
  };

  useEffect(() => {
    setIsMounted(true);
    if (effectiveLayout === "slider") {
      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => window.removeEventListener("resize", checkScroll);
    }
  }, [effectiveLayout, displayedServices.length]);

  const scrollServices = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const firstCard = slider.querySelector<HTMLElement>("[data-service-card]");
    const cardWidth = firstCard ? firstCard.offsetWidth : slider.clientWidth;
    const gap = typeof window !== "undefined" && window.innerWidth < 640 ? 14 : 24;
    const step = cardWidth + gap;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (direction === "right") {
      if (slider.scrollLeft >= maxScroll - 15) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: step, behavior: "smooth" });
      }
    } else {
      if (slider.scrollLeft <= 15) {
        slider.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: -step, behavior: "smooth" });
      }
    }

    setTimeout(checkScroll, 400);
  };

  useEffect(() => {
    if (effectiveLayout !== "slider" || isPaused) return;

    const interval = setInterval(() => {
      scrollServices("right");
    }, 3500);

    return () => clearInterval(interval);
  }, [effectiveLayout, isPaused]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-6"
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-[180px] w-[180px] rounded-full bg-[#f4f8f9] sm:h-[230px] sm:w-[230px]" />
      <div className="pointer-events-none absolute -right-16 top-[130px] h-[150px] w-[150px] rounded-full bg-[#f7fafb]" />
      <div className="pointer-events-none absolute left-[52%] top-[100px] h-[100px] w-[100px] rounded-full bg-[#f6fafb]" />

      <div className="relative z-10 mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-[950px] text-center">
          <Image
            src={leafImage}
            alt="leaf"
            width={60}
            height={60}
            className={`pointer-events-none absolute left-0 top-1 h-auto w-[46px] rotate-[240deg] transition-all duration-700 sm:left-2 sm:top-2 sm:w-[58px] ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          />

          <p
            style={{ animationDelay: "150ms" }}
            className={`text-[12px] font-bold tracking-[4px] text-[#12aa3b] sm:text-[13px] sm:tracking-[5px] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {badge}
          </p>

          <h2
            style={{ animationDelay: "280ms" }}
            className={`mt-3 text-[34px] font-extrabold leading-tight tracking-tight text-[#062d4c] sm:text-[43px] lg:text-[48px] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {heading}{" "}
            <span className="text-[#10aa3a]">{headingHighlight}</span>
          </h2>

          <p
            style={{ animationDelay: "380ms" }}
            className={`mx-auto mt-3 max-w-[700px] text-[13px] leading-6 text-[#607386] sm:text-[14px] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {description}
          </p>

          <Image
           src={leafImage}
            alt="leaf"
            width={60}
            height={60}
            className="absolute right-0 top-0"
          />
        </div>

        {effectiveLayout === "grid" ? (
          <div className="mt-8 sm:mt-12 grid grid-cols-2 justify-items-center gap-3.5 sm:gap-7 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {displayedServices.map((service, idx) => {
              const Icon = iconMap[service.icon] ?? Home;
              return (
                <ServiceCard
                  key={`${service.id}-${idx}`}
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  icon={Icon}
                  darkIcon={service.darkIcon}
                  isGrid={true}
                  delay={450 + idx * 80}
                  isVisible={isVisible}
                />
              );
            })}
          </div>
        ) : (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="relative mt-8 sm:mt-12"
          >
            <button
              type="button"
              onClick={() => scrollServices("left")}
              disabled={isMounted ? !canScrollLeft : false}
              suppressHydrationWarning
              aria-label="Previous services"
              style={{ animationDelay: "450ms" }}
              className={`absolute -left-3 top-1/2 z-30 flex h-[40px] w-[40px] sm:h-[52px] sm:w-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-[#10aa3a] shadow-[0_6px_25px_rgba(8,45,76,0.14)] transition-all duration-200 hover:bg-[#10aa3a] hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-0 sm:-left-5 lg:-left-7 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
            >
              <ChevronLeft size={22} strokeWidth={2.2} className="-ml-0.5 sm:h-[26px] sm:w-[26px]" />
            </button>

            <div
              ref={sliderRef}
              onScroll={checkScroll}
              className="flex snap-x snap-mandatory gap-3.5 sm:gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {displayedServices.map((service, idx) => {
                const Icon = iconMap[service.icon] ?? Home;
                return (
                  <ServiceCard
                    key={`${service.id}-${idx}`}
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    image={service.image}
                    icon={Icon}
                    darkIcon={service.darkIcon}
                    delay={450 + idx * 80}
                    isVisible={isVisible}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollServices("right")}
              disabled={isMounted ? !canScrollRight : false}
              suppressHydrationWarning
              aria-label="Next services"
              style={{ animationDelay: "450ms" }}
              className={`absolute -right-3 top-1/2 z-30 flex h-[40px] w-[40px] sm:h-[52px] sm:w-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-[#10aa3a] shadow-[0_6px_25px_rgba(8,45,76,0.14)] transition-all duration-200 hover:bg-[#10aa3a] hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-0 sm:-right-5 lg:-right-7 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
            >
              <ChevronRight size={22} strokeWidth={2.2} className="ml-0.5 sm:h-[26px] sm:w-[26px]" />
            </button>
          </div>
        )}

        {isServicesPage && totalPages > 1 && (
          <div
            style={{
              animationDelay: `${450 + displayedServices.length * 80 + 80}ms`,
            }}
            className={`mt-10 flex items-center justify-center gap-2 sm:mt-12 ${
              isVisible ? "animate-fade-in-scale" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              suppressHydrationWarning
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#092a43] transition-all hover:border-[#10aa3a] hover:text-[#10aa3a] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  suppressHydrationWarning
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-[#10aa3a] text-white shadow-md scale-105"
                      : "border border-gray-200 bg-white text-[#092a43] hover:border-[#10aa3a] hover:text-[#10aa3a]"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              suppressHydrationWarning
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#092a43] transition-all hover:border-[#10aa3a] hover:text-[#10aa3a] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {shouldShowViewAll && (
          <div
            style={{ animationDelay: "880ms" }}
            className={`mt-8 flex justify-center sm:mt-10 ${
              isVisible ? "animate-fade-in-scale" : "opacity-0"
            }`}
          >
            <Link
              href={viewAllButton.href}
              className="group inline-flex h-[54px] items-center justify-center gap-3 rounded-full bg-[#10ad3b] px-8 text-[14px] font-bold text-white shadow-md transition hover:bg-[#07952f] active:scale-95"
            >
              <span className="leading-none">{viewAllButton.label}</span>
              <ArrowRight
                size={19}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  darkIcon: boolean;
  isGrid?: boolean;
  delay?: number;
  isVisible?: boolean;
}

function ServiceCard({
  id,
  title,
  description,
  image,
  icon: Icon,
  darkIcon,
  isGrid = false,
  delay = 450,
  isVisible = true,
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${id}`}
      data-service-card
      aria-label={`View details for ${title}`}
      style={{ animationDelay: `${delay}ms` }}
      className={`group flex flex-col items-center overflow-hidden rounded-[26px] sm:rounded-[40px] border border-[#eef2f3] bg-white shadow-[0_8px_30px_rgba(8,45,76,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(8,45,76,0.12)] cursor-pointer ${
        isVisible ? "animate-fade-in-scale" : "opacity-0"
      } ${
        isGrid
          ? "w-full max-w-[320px]"
          : "w-[calc((100%-14px)/2)] min-w-[calc((100%-14px)/2)] max-w-[calc((100%-14px)/2)] flex-shrink-0 snap-start sm:w-[calc((100%-24px)/2)] sm:min-w-[calc((100%-24px)/2)] sm:max-w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] lg:min-w-[calc((100%-48px)/3)] lg:max-w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)] xl:min-w-[calc((100%-72px)/4)] xl:max-w-[calc((100%-72px)/4)]"
      }`}
    >
      <div className="relative mx-auto mt-2.5 sm:mt-4 block aspect-square w-[calc(100%-16px)] sm:w-[calc(100%-32px)] overflow-hidden rounded-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div
        className={`relative z-10 mx-auto -mt-6 sm:-mt-8 flex h-[44px] w-[44px] sm:h-[56px] sm:w-[56px] shrink-0 items-center justify-center rounded-full border-[2.5px] sm:border-[3px] border-white shadow-sm transition-transform duration-300 group-hover:scale-105 ${
          darkIcon ? "bg-[#092a43] text-white" : "bg-[#12b43c] text-white"
        }`}
      >
        <Icon size={20} className="sm:h-[25px] sm:w-[25px]" strokeWidth={1.8} />
      </div>

      <div className="flex flex-1 flex-col items-center px-2.5 sm:px-6 pb-4 sm:pb-6 pt-2 sm:pt-3 text-center w-full">
        <h3 className="text-[13px] sm:text-[17px] font-bold leading-snug sm:leading-tight text-[#122f48] transition-colors group-hover:text-[#12b43c] line-clamp-2">
          {title}
        </h3>

        <p className="mt-1.5 sm:mt-2 min-h-[32px] sm:min-h-[44px] max-w-[240px] text-[11px] sm:text-[12px] leading-4 sm:leading-5 text-[#65788a] line-clamp-2">
          {description}
        </p>

        <div className="mt-auto flex w-full justify-center pt-2 sm:pt-4">
          <span
            aria-label={`View ${title}`}
            className="flex h-[32px] w-[32px] sm:h-[40px] sm:w-[40px] items-center justify-center rounded-full bg-[#12b43c] text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#07972e]"
          >
            <ArrowRight size={16} className="sm:h-[19px] sm:w-[19px]" />
          </span>
        </div>
      </div>
    </Link>
  );
}