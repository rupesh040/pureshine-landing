"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import content from "../data";
import { useEnquiry } from "./EnquiryProvider";

export interface GalleryItem {
  id: number;
  type: string;
  category: string;
  title: string;
  image: string;
}

export interface GalleryData {
  badge?: string;
  badgeCategory?: string;
  categoriesAriaLabel?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  itemsLabel?: string;
  sliderAriaLabel?: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  itemsPerPage?: number;
  categories: string[];
  items: GalleryItem[];
}

export interface CategoriesPreviewProps {
  data?: GalleryData;
}

export function CategoriesPreview({ data = content.gallery as GalleryData }: CategoriesPreviewProps = {}) {
  const gallery = data;
  const photos = gallery.items.filter((item) => item.type === "photo");
  const categories = gallery.categories.filter(
    (category, index) =>
      index === 0 || photos.some((photo) => photo.category === category),
  );

  const [category, setCategory] = useState<string>(categories[0] ?? "All Photos");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const currentPhotos = photos.filter(
    (photo) => category === categories[0] || photo.category === category,
  );

  const checkScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    setHasOverflow(maxScroll > 10);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollTo({ left: 0, behavior: "instant" });
    }
    const timer = setTimeout(checkScroll, 60);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScroll);
    };
  }, [category, checkScroll]);

  const scrollPhotos = useCallback(
    (direction: "left" | "right") => {
      const slider = sliderRef.current;
      if (!slider) return;

      const firstCard = slider.querySelector<HTMLElement>("[data-photo-card]");
      const cardWidth = firstCard ? firstCard.offsetWidth : slider.clientWidth;
      const gap = 24;
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

      setTimeout(checkScroll, 350);
    },
    [checkScroll],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPhotos("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollPhotos("right");
    }
  };

  const badgeSuffix = gallery.badgeCategory ? ` · ${gallery.badgeCategory}` : "";

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="bg-[#f3faf5] px-4 py-6 sm:px-8"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#128237]">
            {gallery.badge}
            {badgeSuffix}
          </p>
          <h2
            id="categories-heading"
            className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#062d4c] sm:text-5xl"
          >
            {gallery.headingLine1}{" "}
            <span className="text-[#12a83a]">{gallery.headingLine2}</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#526679] sm:text-base">
            {gallery.description}
          </p>
        </div>

        <div
          aria-label={gallery.categoriesAriaLabel || "Cleaning categories"}
          className="mx-auto mt-8 flex max-w-[1050px] flex-wrap justify-center gap-2"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              aria-controls="category-preview"
              onClick={() => setCategory(item)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
                category === item
                  ? "border-[#092a43] bg-[#092a43] text-white"
                  : "border-[#cde4d3] bg-white text-[#24435b] hover:border-[#12a83a] hover:text-[#128237]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <p role="status" className="sr-only">
          Showing {currentPhotos.length} {gallery.itemsLabel || "photos"} for {category}.
        </p>

        <div className="mt-8 flex items-center gap-2 sm:gap-4 lg:gap-5">
          {hasOverflow && (
            <button
              type="button"
              onClick={() => scrollPhotos("left")}
              aria-label={gallery.prevAriaLabel || "Previous photo"}
              className="shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#cde4d3] bg-white text-[#092a43] shadow-[0_6px_25px_rgba(8,45,76,0.10)] transition-all duration-200 hover:border-[#10aa3a] hover:bg-[#10aa3a] hover:text-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10aa3a] cursor-pointer"
            >
              <ChevronLeft size={22} strokeWidth={2.2} className="-ml-0.5 sm:h-6 sm:w-6" />
            </button>
          )}

          <div
            id="category-preview"
            ref={sliderRef}
            onScroll={checkScroll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label={gallery.sliderAriaLabel || `${category} photos slider`}
            className="flex-1 min-w-0 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10aa3a] rounded-[26px]"
          >
            {currentPhotos.map((photo) => (
              <figure
                key={photo.id}
                data-photo-card
                className="group shrink-0 snap-start overflow-hidden rounded-[24px] border border-[#e3eee6] bg-white shadow-[0_8px_30px_rgba(8,45,76,0.05)] w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(8,45,76,0.10)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eef5f0]">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#128237]">
                    {photo.category}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[#062d4c]">
                    {photo.title}
                  </h3>
                </figcaption>
              </figure>
            ))}
          </div>

          {hasOverflow && (
            <button
              type="button"
              onClick={() => scrollPhotos("right")}
              aria-label={gallery.nextAriaLabel || "Next photo"}
              className="shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#cde4d3] bg-white text-[#092a43] shadow-[0_6px_25px_rgba(8,45,76,0.10)] transition-all duration-200 hover:border-[#10aa3a] hover:bg-[#10aa3a] hover:text-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10aa3a] cursor-pointer"
            >
              <ChevronRight size={22} strokeWidth={2.2} className="ml-0.5 sm:h-6 sm:w-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export interface EnquirySectionProps {
  contactData?: typeof content.contact;
  siteData?: typeof content.site;
}

export function EnquirySection({
  contactData = content.contact,
  siteData = content.site,
}: EnquirySectionProps = {}) {
  const { openEnquiry } = useEnquiry();
  const contact = contactData;
  const site = siteData;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#f3faf5] px-5 py-6 sm:px-8"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#128237]">
            {contact.badge}
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-4xl font-black leading-tight text-[#062d4c] sm:text-5xl"
          >
            {contact.form.headingLine1}{" "}
            <span className="text-[#12a83a]">{contact.form.headingLine2}</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-base leading-7 text-[#526679]">
            {contact.description}
          </p>
          <button
            type="button"
            onClick={() => openEnquiry()}
            className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-4 rounded-full bg-[#10a538] px-7 text-sm font-bold text-white transition-colors hover:bg-[#087d2a] cursor-pointer"
          >
            {contact.form.badge} <ArrowRight size={20} />
          </button>
        </div>
        <div className="space-y-5 rounded-[24px] border border-[#dcebe1] bg-white p-6 shadow-[0_8px_30px_rgba(8,45,76,0.05)] sm:p-8">
          <h3 className="text-xl font-bold text-[#062d4c]">
            {contact.heading} {contact.headingHighlight}
          </h3>
          <a
            href={site.phoneHref}
            className="flex min-h-11 items-center gap-4 text-[#24435b] hover:text-[#128237]"
          >
            <Phone className="shrink-0 text-[#128237]" size={21} />
            <span>{site.phone}</span>
          </a>
          <a
            href={site.emailHref}
            className="flex min-h-11 items-center gap-4 break-all text-[#24435b] hover:text-[#128237]"
          >
            <Mail className="shrink-0 text-[#128237]" size={21} />
            <span>{site.email}</span>
          </a>
          <p className="flex items-start gap-4 text-sm leading-6 text-[#526679]">
            <MapPin className="mt-0.5 shrink-0 text-[#128237]" size={21} />
            <span>{site.address}</span>
          </p>
          <p className="flex items-center gap-4 border-t border-[#e3eee6] pt-5 text-sm text-[#526679]">
            <Clock3 className="shrink-0 text-[#128237]" size={21} />
            <span>{site.phoneHours}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
