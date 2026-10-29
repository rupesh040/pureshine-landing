"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  RiLeafFill,
  RiTeamFill,
  RiShieldCheckFill,
  RiTimeFill,
  RiAwardFill,
  RiSparklingFill,
  RiShieldFill,
} from "react-icons/ri";
import type { IconType } from "react-icons";
import content from "../data";

const iconMap: Record<string, IconType> = {
  Leaf: RiLeafFill,
  Users: RiTeamFill,
  ShieldCheck: RiShieldCheckFill,
  Clock3: RiTimeFill,
  Award: RiAwardFill,
  Sparkles: RiSparklingFill,
  Shield: RiShieldFill,
};

const {
  badge,
  headingLine1,
  headingLine2,
  description,
  backgroundImage,
  primaryButton,
  secondaryButton,
  features: rawFeatures,
} = content.hero;

const features = rawFeatures.map((f) => ({
  ...f,
  icon: iconMap[f.icon] ?? RiLeafFill,
}));

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative block h-[360px] w-full overflow-hidden sm:h-[430px] md:h-[500px] lg:hidden">
        <div
          className="absolute inset-0 bg-cover bg-[position:right_bottom] bg-no-repeat animate-hero-bg will-change-transform"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white" />
        <div className="absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-white via-white/65 to-transparent" />
      </div>

      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat lg:block animate-hero-bg will-change-transform"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[68%] bg-gradient-to-r from-white/20 via-white/95 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-[radial-gradient(ellipse_at_35%_50%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.75)_42%,rgba(255,255,255,0)_78%)] lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-12 pt-0 min-[480px]:px-7 sm:px-8 sm:pb-14 md:px-10 lg:flex lg:min-h-[560px] lg:items-center lg:px-12 lg:py-16 xl:px-16">
        <div className="-mt-[55px] w-full min-[480px]:-mt-[65px] sm:-mt-[75px] lg:mt-0 lg:max-w-[650px] xl:max-w-[680px]">
          <div className="relative rounded-[24px] bg-white/90 px-4 py-7 shadow-[0_-8px_35px_rgba(255,255,255,0.8)] backdrop-blur-[2px] min-[380px]:px-5 sm:px-7 sm:py-8 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-0">
            <p
              style={{ animationDelay: "100ms" }}
              className="animate-fade-in-up mb-3 text-[10px] font-semibold uppercase leading-5 tracking-[2.5px] text-[#234762] min-[380px]:text-[11px] sm:text-[12px] sm:tracking-[3.5px] md:text-[13px] lg:text-[14px] lg:tracking-[5px]"
            >
              {badge}
            </p>

            <h1
              style={{ animationDelay: "220ms" }}
              className="animate-fade-in-up text-[clamp(2.2rem,8vw,3.1rem)] font-extrabold leading-[1.03] tracking-[-1.5px] text-[#062d4c] sm:text-[clamp(3rem,7vw,3.7rem)] md:text-[clamp(3.2rem,6vw,4rem)] lg:text-[clamp(3.5rem,5vw,4.35rem)] xl:text-[62px]"
            >
              {headingLine1}
              <span className="block text-[#20ae35]">{headingLine2}</span>
            </h1>

            <p
              style={{ animationDelay: "340ms" }}
              className="animate-fade-in-up mt-4 max-w-[570px] text-[13px] leading-[1.65] text-[#24435b] min-[380px]:text-[14px] sm:mt-5 sm:text-[15px] sm:leading-6 lg:text-[16px]"
            >
              {description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 min-[380px]:gap-x-5 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-4 lg:gap-x-7">
              {features.map((f, index) => (
                <Feature
                  key={f.title}
                  icon={
                    <f.icon
                      className="h-6 w-6 min-[380px]:h-7 min-[380px]:w-7 sm:h-[30px] sm:w-[30px] lg:h-[32px] lg:w-[32px]"
                      size={30}
                    />
                  }
                  title={f.title}
                  subtitle={f.subtitle}
                  delay={450 + index * 90}
                />
              ))}
            </div>

            <div
              style={{ animationDelay: "820ms" }}
              className="animate-fade-in-scale mt-7 grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 min-[430px]:gap-4 sm:flex sm:flex-wrap"
            >
              <Link
                href={primaryButton.href}
                className="group flex h-[50px] w-full items-center justify-center gap-3 rounded-full bg-[#16b532] px-5 text-[14px] font-bold text-white shadow-[0_7px_20px_rgba(22,181,50,0.2)] transition-all duration-200 hover:bg-[#119728] hover:shadow-[0_9px_24px_rgba(22,181,50,0.28)] active:scale-[0.98] min-[430px]:px-3 sm:h-[51px] sm:w-auto sm:min-w-[180px] sm:px-7 sm:text-[15px] lg:text-[16px]"
              >
                <span>{primaryButton.label}</span>
                <ArrowRight
                  size={20}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href={secondaryButton.href}
                className="group flex h-[50px] w-full items-center justify-center gap-3 rounded-full border-2 border-[#8ca0af] bg-white px-5 text-[14px] font-bold text-[#173b55] transition-all duration-200 hover:border-[#173b55] hover:bg-white active:scale-[0.98] min-[430px]:px-3 sm:h-[51px] sm:w-auto sm:min-w-[170px] sm:px-7 sm:text-[15px] lg:bg-white/80 lg:text-[16px]"
              >
                <span>{secondaryButton.label}</span>
                <ArrowRight
                  size={20}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  subtitle,
  delay = 450,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  delay?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="animate-fade-in-scale flex min-w-0 items-center gap-2 sm:gap-2.5 transition-transform duration-300 hover:scale-105"
    >
      <div className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full border border-[#b8e8c1] bg-[#f1fff4] text-[#18ad32] shadow-sm transition-colors duration-300 min-[380px]:h-[46px] min-[380px]:w-[46px] sm:h-[50px] sm:w-[50px] lg:h-[55px] lg:w-[55px]">
        {icon}
      </div>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[10px] font-semibold text-[#24435b] min-[380px]:text-[11px] sm:text-[12px] lg:text-[13px]">
          {title}
        </p>
        <p className="truncate text-[10px] text-[#24435b] min-[380px]:text-[11px] sm:text-[12px] lg:text-[13px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}