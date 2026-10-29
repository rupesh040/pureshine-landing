"use client";

import { useEffect, useRef, useState } from "react";
import {
  RiTeamFill,
  RiUserStarFill,
  RiAwardFill,
  RiSparklingFill,
  RiUserFill,
  RiMedalFill,
} from "react-icons/ri";
import { FaSprayCanSparkles } from "react-icons/fa6";
import type { IconType } from "react-icons";
import content from "../data";

const iconMap: Record<string, IconType> = {
  Users: RiTeamFill,
  SprayCan: FaSprayCanSparkles,
  UserRound: RiUserStarFill,
  Award: RiAwardFill,
  Sparkles: RiSparklingFill,
  User: RiUserFill,
  Medal: RiMedalFill,
};

const stats = content.stats.map((s) => ({
  ...s,
  icon: iconMap[s.icon] ?? RiTeamFill,
}));

export default function Stats() {
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
        threshold: 0.08,
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
      className="relative w-full overflow-hidden bg-white "
    >
      <div className="pointer-events-none absolute -left-[90px] -top-[100px] h-[210px] w-[210px] rounded-full bg-[#f2f8f5] sm:-left-[70px] sm:h-[240px] sm:w-[240px]" />
      <div className="pointer-events-none absolute -right-[80px] -top-[110px] h-[200px] w-[200px] rounded-full bg-[#f1f8f4] sm:-right-[50px] sm:h-[240px] sm:w-[240px]" />

      <div
        style={{ animationDelay: "100ms" }}
        className={`relative z-10 mx-auto w-[calc(100%-24px)]  overflow-hidden rounded-[18px] bg-[#effaf2] px-4 py-6 sm:w-[calc(100%-40px)] sm:px-6 sm:py-7 md:px-8 md:py-8 lg:w-[calc(100%-70px)] lg:px-8 lg:py-7 xl:px-12 ${
          isVisible ? "animate-fade-in-scale" : "opacity-0"
        }`}
      >
        <LeafDecoration
          position="left"
          className={`absolute bottom-[-15px] left-[-15px] h-[100px] w-[150px] rotate-[-10deg] text-[#bce8c8] opacity-70 transition-all duration-700 sm:h-[120px] sm:w-[180px] ${
            isVisible ? "scale-100 opacity-70" : "scale-75 opacity-0"
          }`}
        />

        <LeafDecoration
          position="right"
          className={`absolute right-[-20px] top-[-30px] h-[120px] w-[160px] rotate-[25deg] text-[#c5ebcf] opacity-70 transition-all duration-700 sm:h-[150px] sm:w-[200px] ${
            isVisible ? "scale-100 opacity-70" : "scale-75 opacity-0"
          }`}
        />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.title}
              {...stat}
              index={index}
              isVisible={isVisible}
              isLast={index === stats.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  title,
  description,
  icon: Icon,
  progress,
  isLast,
  isVisible,
  index,
}: {
  value: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  isLast: boolean;
  isVisible: boolean;
  index: number;
}) {
  return (
    <div
      style={{ animationDelay: `${200 + index * 120}ms` }}
      className={`relative flex items-center gap-4 px-3 py-5 transition-all duration-500 hover:scale-[1.02] sm:px-5 sm:py-6 lg:px-5 lg:py-2 xl:px-7 ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      } ${
        !isLast
          ? "lg:after:absolute lg:after:right-0 lg:after:top-[12%] lg:after:h-[76%] lg:after:w-px lg:after:bg-[#d6e9dc]"
          : ""
      }`}
    >
      <ProgressCircle value={progress} Icon={Icon} isVisible={isVisible} />

      <div className="min-w-0 flex-1">
        <AnimatedNumber value={value} startAnimation={isVisible} />

        <h4 className="mt-2 text-[14px] font-bold leading-snug tracking-tight text-[#092f4b] sm:text-[15px] lg:text-[16px]">
          {title}
        </h4>

        <span className="mt-2 block h-[2.5px] w-[38px] rounded-full bg-[#0bab3c] sm:w-[42px]" />

        <p className="mt-2 max-w-[220px] text-[11px] font-semibold leading-[1.5] text-[#55697a] sm:text-[12px] lg:text-[12.5px]">
          {description}
        </p>
      </div>
    </div>
  );
}

function AnimatedNumber({
  value,
  startAnimation,
}: {
  value: string;
  startAnimation: boolean;
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startAnimation || hasAnimated.current) return;

    const match = value.match(/^([^0-9]*)([\d,.]+)(.*)$/);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    hasAnimated.current = true;

    const prefix = match[1];
    const target = Number(match[2].replace(/,/g, ""));
    const suffix = match[3];

    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easedProgress);

      setDisplayValue(`${prefix}${currentValue.toLocaleString()}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(`${prefix}${target.toLocaleString()}${suffix}`);
      }
    };

    requestAnimationFrame(animate);
  }, [value, startAnimation]);

  return (
    <h3 className="text-[28px] font-extrabold leading-none tracking-tight text-[#092f4b] min-[380px]:text-[30px] sm:text-[33px] lg:text-[35px]">
      {displayValue}
    </h3>
  );
}

function ProgressCircle({
  value,
  Icon,
  isVisible,
}: {
  value: number;
  Icon: React.ElementType;
  isVisible: boolean;
}) {
  const size = 88;
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = isVisible
    ? circumference - (value / 100) * circumference
    : circumference;

  return (
    <div className="relative h-[70px] w-[70px] shrink-0 rounded-full bg-white shadow-[0_6px_20px_rgba(8,45,76,0.08),0_0_12px_rgba(11,171,60,0.12)] min-[380px]:h-[76px] min-[380px]:w-[76px] sm:h-[84px] sm:w-[84px] lg:h-[88px] lg:w-[88px]">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="white"
          stroke="#d9eee0"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0bab3c"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s ease-out 0.2s" }}
        />
      </svg>

      <div className="absolute inset-[7px] flex items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(8,80,40,0.08)]">
        <Icon
          className="h-[32px] w-[32px] text-[#08aa3b] sm:h-[36px] sm:w-[36px]"
          size={34}
        />
      </div>
    </div>
  );
}

function LeafDecoration({
  className,
  position,
}: {
  className?: string;
  position: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d={
          position === "left"
            ? "M15 105C55 88 83 57 100 15"
            : "M165 105C125 88 97 57 80 15"
        }
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <path
        d="M56 74C34 75 19 62 13 44C35 42 51 52 56 74Z"
        fill="currentColor"
      />

      <path
        d="M92 43C111 46 126 36 133 18C112 16 98 25 92 43Z"
        fill="currentColor"
      />

      <path
        d="M35 98C52 101 67 94 74 79C55 77 42 84 35 98Z"
        fill="currentColor"
      />
    </svg>
  );
}