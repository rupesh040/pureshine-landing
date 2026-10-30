"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import type content from "../data";

export type ServiceItem = (typeof content.services)[0];

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onEnquire?: (serviceName: string) => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onEnquire,
}: ServiceDetailModalProps) {
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] rounded-[24px] sm:rounded-[32px] bg-white shadow-2xl border border-slate-100 overflow-hidden animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/60 hover:scale-105 cursor-pointer shadow-lg"
        >
          <X size={18} className="sm:h-5 sm:w-5" />
        </button>

        <div className="flex-1 overflow-y-auto">
          <div className="relative h-52 sm:h-72 w-full overflow-hidden bg-slate-900">
            <Image
              src={service.image}
              alt={service.imageAlt || service.title}
              fill
              sizes="(max-width: 768px) 100vw, 850px"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061e30] via-black/45 to-black/15" />

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-7 right-4 sm:right-7 text-white">
              <span className="inline-flex items-center rounded-full bg-[#10aa3a] px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                {service.badge || "Our Services"}
              </span>
              <h3
                id="service-modal-title"
                className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md"
              >
                {service.title}
              </h3>
              {service.tagline && (
                <p className="mt-1 text-xs sm:text-sm font-medium text-white/90 drop-shadow-sm">
                  {service.tagline}
                </p>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-7 space-y-6">
            {(service.description || service.longDescription) && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f2f9f4] to-[#eaf5ed] border border-[#d6ebd9] p-4 sm:p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#10aa3a] text-white shadow-xs">
                    <Sparkles size={16} />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    {service.description && (
                      <p className="text-sm sm:text-base font-bold text-[#063319] leading-snug">
                        {service.description}
                      </p>
                    )}
                    {service.longDescription && (
                      <p className="text-xs sm:text-sm text-[#385b46] leading-relaxed">
                        {service.longDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {service.features && service.features.length > 0 && (
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <h4 className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#062d4c]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#eaf7ee] text-[#10aa3a]">
                      <CheckCircle2 size={16} />
                    </span>
                    Key Service Features
                  </h4>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                    {service.features.length} features
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#10aa3a]/30 hover:bg-white text-xs sm:text-sm text-[#254258]"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10aa3a]/15 text-[#10aa3a]">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.includes && service.includes.length > 0 && (
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <h4 className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#062d4c]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#eaf7ee] text-[#10aa3a]">
                      <ShieldCheck size={16} />
                    </span>
                    What&apos;s Included
                  </h4>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                    Covered checklist
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.includes.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#d6ebd9] bg-[#edf8f0] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#0e7529] shadow-xs"
                    >
                      <Check className="h-3.5 w-3.5 text-[#10aa3a]" strokeWidth={2.5} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service.process && service.process.length > 0 && (
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <h4 className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#062d4c]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#eaf7ee] text-[#10aa3a]">
                      <Clock size={16} />
                    </span>
                    How We Deliver This Service
                  </h4>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                    {service.process.length} Simple Steps
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.process.map((step) => (
                    <div
                      key={step.step}
                      className="group relative rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white hover:border-[#10aa3a]/30 hover:shadow-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#092a43] text-xs font-bold text-white group-hover:bg-[#10aa3a] transition-colors">
                          {step.step}
                        </span>
                        <h5 className="text-sm font-bold text-[#092a43]">
                          {step.title}
                        </h5>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#5f7485]">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.footer && (
              <div className="rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 to-[#f4f9f5] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#10aa3a]/15 text-[#10aa3a]">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#062d4c]">
                      Our Quality & Satisfaction Commitment
                    </h5>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#5f7485]">
                      {service.footer}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-20 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-slate-100 bg-white/95 px-4 sm:px-7 py-3.5 sm:py-4 backdrop-blur-md shadow-[0_-8px_20px_rgba(0,0,0,0.03)]">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="inline-block h-2 w-2 rounded-full bg-[#10aa3a]" />
            Eco-friendly • Background-verified • Satisfaction Guaranteed
          </div>
          <div className="flex w-full sm:w-auto items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
            {onEnquire && (
              <button
                type="button"
                onClick={() => onEnquire(service.title)}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#11883e] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#11883e]/20 transition hover:bg-[#0a6b2d] hover:shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                Book / Enquire
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
