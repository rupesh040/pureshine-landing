"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  RiTeamFill,
  RiLeafFill,
  RiShieldCheckFill,
  RiCoinsFill,
  RiSparklingFill,
  RiHome4Fill,
  RiTimeFill,
  RiTargetFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import type { IconType } from "react-icons";
import content from "../data";

const iconMap: Record<string, IconType> = {
  Users: RiTeamFill,
  Leaf: RiLeafFill,
  ShieldCheck: RiShieldCheckFill,
  Coins: RiCoinsFill,
  Sparkles: RiSparklingFill,
  House: RiHome4Fill,
  Home: RiHome4Fill,
  Clock3: RiTimeFill,
  Target: RiTargetFill,
  CheckCircle2: RiCheckboxCircleFill,
};

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const {
    badge,
    headingLine1,
    headingLine2,
    description,
    leafImage,
    leafImageAlt,
    image,
    imageAlt,
    features,
    mission,
    benefits,
    banner,
  } = content.whyChooseUs;

  const MissionIcon =
    mission?.icon && iconMap[mission.icon] ? iconMap[mission.icon] : RiTargetFill;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-0"
    >
      <div className="pointer-events-none absolute -left-10 top-10 h-28 w-28 rounded-full bg-[#f4faf7]" />
      <div className="pointer-events-none absolute left-[22%] top-[-45px] h-32 w-32 rounded-full bg-[#f7faf9]" />

      <div className="mx-auto">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.05fr] xl:gap-10">
          <div className="relative flex flex-col justify-center px-12 lg:px-16 xl:px-20 py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20">
            <div className="relative mb-5">
              <Image
                src={leafImage}
                alt={leafImageAlt}
                width={70}
                height={70}
                className={`pointer-events-none absolute right-0 top-0 -mr-1 -mt-3 w-[52px] sm:w-[68px] md:w-[76px] h-auto rotate-[22deg] transition-all duration-700 ${
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              />

              <span
                style={{ animationDelay: "150ms" }}
                className={`text-sm font-bold uppercase tracking-wide text-[#159447] sm:text-base ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                {badge}
              </span>

              <h2
                style={{ animationDelay: "250ms" }}
                className={`mt-3 max-w-[650px] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#102b4c] sm:text-4xl md:text-5xl xl:text-[50px] ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                {headingLine1}
                <br />
                <span className="text-[#159447]">{headingLine2}</span>
              </h2>

              <p
                style={{ animationDelay: "350ms" }}
                className={`mt-5 max-w-[650px] text-sm leading-6 text-[#607187] sm:text-base sm:leading-7 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                {description}
              </p>
            </div>

            <div className="grid max-w-[680px] gap-x-8 gap-y-5 sm:grid-cols-2">
              {features.map((feature, idx) => {
                const Icon =
                  feature.icon && iconMap[feature.icon]
                    ? iconMap[feature.icon]
                    : RiShieldCheckFill;

                return (
                  <div
                    key={feature.title || idx}
                    style={{ animationDelay: `${400 + idx * 80}ms` }}
                    className={`flex items-start gap-3 sm:gap-4 transition-transform duration-300 hover:scale-[1.02] ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e5f8eb] text-[#159447] transition-colors">
                      <Icon size={32} className="h-8 w-8" />
                    </div>

                    <div className="pt-1">
                      <h3 className="text-sm font-bold text-[#102b4c] sm:text-base">
                        {feature.title}
                      </h3>

                      <p className="mt-1 max-w-[220px] text-xs leading-5 text-[#66778b] sm:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{ animationDelay: "720ms" }}
              className={`mt-7 flex max-w-[680px] items-center gap-4 rounded-2xl bg-[#dcf8d1] px-5 py-5 sm:px-7 sm:py-6 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#102b4c] text-[#102b4c]">
                <MissionIcon size={34} className="h-[34px] w-[34px]" />
              </div>

              <div className="h-12 w-px bg-[#73ca75]" />

              <p className="text-sm font-semibold leading-6 text-[#102b4c] sm:text-base sm:leading-7">
                {mission.line1}
                <br className="hidden sm:block" />
                {mission.line2}
              </p>
            </div>

            <div className="pointer-events-none absolute bottom-0 right-[-30px] hidden lg:block">
              <div className="grid grid-cols-4 gap-3 opacity-50">
                {Array.from({ length: 20 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-[#b8dcd3]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            style={{ animationDelay: "200ms" }}
            className={`relative min-h-[500px] overflow-hidden rounded-tl-[30px] rounded-bl-[30px] bg-[#eef7f2] sm:min-h-[580px] lg:min-h-[650px] ${
              isVisible ? "animate-fade-in-scale" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5" />

            <div className="absolute right-3 top-5 z-10 flex w-[190px] flex-col gap-3 sm:right-5 sm:top-10 sm:w-[220px] lg:right-5 lg:top-16 lg:w-[225px]">
              {benefits.map((benefit, idx) => {
                const Icon =
                  benefit.icon && iconMap[benefit.icon]
                    ? iconMap[benefit.icon]
                    : RiSparklingFill;

                return (
                  <div
                    key={benefit.title || idx}
                    style={{ animationDelay: `${450 + idx * 100}ms` }}
                    className={`rounded-2xl bg-white/95 p-3 shadow-[0_8px_25px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:p-4 transition-transform duration-300 hover:scale-105 ${
                      isVisible ? "animate-fade-in-scale" : "opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e2f8e8] text-[#159447]">
                        <Icon size={28} className="h-7 w-7" />
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-[#102b4c] sm:text-sm">
                          {benefit.title}
                        </h3>

                        <p className="mt-1 text-[10px] font-semibold leading-4 text-[#718095] sm:text-xs">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{ animationDelay: "750ms" }}
              className={`absolute bottom-6 right-0 z-10 rounded-l-full bg-[#102f52] px-7 py-4 pr-8 text-white shadow-lg sm:bottom-8 sm:px-8 sm:py-5 ${
                isVisible ? "animate-fade-in-scale" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-4">
                <p className="text-xs font-medium leading-5 sm:text-sm">
                  {banner.line1}
                  <br />
                  {banner.line2}
                </p>

                <span className="h-0.5 w-8 bg-[#19b866]" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-tr-full bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}