"use client";

import { useState } from "react";
import content from "../data";

export default function ContactMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapData = (content as Record<string, any>).contactMap ?? content.contact?.map;

  const {
    title,
    src,
    locationTitle,
    locationSubtitle,
    viewLargerMapText,
    viewLargerMapHref,
    zoomIn = "+",
    zoomOut = "−",
  } = mapData ?? {};

  return (
    <section className="bg-white px-4 py-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative h-[300px] overflow-hidden rounded-[16px] sm:h-[460px] lg:h-[600px]">
          {!mapLoaded && (
            <div className="absolute inset-0 z-10 animate-pulse bg-[#e9f0eb]" />
          )}

          <iframe
            title={title}
            src={src}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
              mapLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
          />

          <div className="pointer-events-none absolute left-4 top-4 z-20 w-[210px] rounded-[10px] bg-white px-4 py-3 shadow-[0_3px_15px_rgba(0,0,0,0.18)] sm:left-5 sm:top-5 sm:w-[220px]">
            <h3 className="text-[14px] font-bold text-[#202124] sm:text-[15px]">
              {locationTitle}
            </h3>

            <p className="mt-1 text-[12px] text-[#5f6368] sm:text-[13px]">
              {locationSubtitle}
            </p>

            {viewLargerMapHref ? (
              <a
                href={viewLargerMapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto mt-3 inline-block text-[12px] font-medium text-[#1a73e8] transition hover:underline sm:text-[13px]"
              >
                {viewLargerMapText}
              </a>
            ) : (
              <span className="mt-3 inline-block text-[12px] font-medium text-[#1a73e8] sm:text-[13px]">
                {viewLargerMapText}
              </span>
            )}
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 z-20 h-16 w-16 rounded-full bg-[#dff3e5]/70 blur-xl sm:bottom-5 sm:left-5 sm:h-20 sm:w-20" />

          <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex flex-col overflow-hidden rounded-[7px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] sm:bottom-5 sm:right-5">
            <span className="flex h-12 w-12 items-center justify-center border-b border-[#e5e5e5] text-[30px] font-light text-[#444] sm:h-14 sm:w-14 sm:text-[34px]">
              {zoomIn}
            </span>

            <span className="flex h-12 w-12 items-center justify-center text-[30px] font-light text-[#444] sm:h-14 sm:w-14 sm:text-[34px]">
              {zoomOut}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

