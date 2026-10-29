"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type AboutHeroProps = {
  title: string;
  breadcrumb?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage: string;
};

const routeNameMap: Record<string, string> = {
  about: "About Us",
  services: "Services",
  serviceDetail: "Services",
  blogs: "Blogs",
  contact: "Contact Us",
  faq: "Our FAQs",
  faqs: "Our FAQs",
  gallery: "Our Gallery",
};

export default function AboutHero({
  title,
  breadcrumb,
  breadcrumbs,
  backgroundImage,
}: AboutHeroProps) {
  const pathname = usePathname();

  let items: BreadcrumbItem[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    items = breadcrumbs;
  } else if (pathname) {
    const rawSegments = pathname.split("/").filter(Boolean);

    if (rawSegments.length === 0) {
      items = [
        { label: "Home", href: "/" },
        { label: breadcrumb || title },
      ];
    } else if (rawSegments.length === 1) {
      const seg = rawSegments[0];
      items = [
        { label: "Home", href: "/" },
        { label: breadcrumb || routeNameMap[seg] || title },
      ];
    } else {
      items = [{ label: "Home", href: "/" }];

      let accumulatedPath = "";
      rawSegments.forEach((segment, index) => {
        const isLast = index === rawSegments.length - 1;
        accumulatedPath += `/${segment}`;

        if (isLast) {
          items.push({
            label: breadcrumb || title,
          });
        } else {
          const parentHref =
            segment === "serviceDetail" ? "/services" : accumulatedPath;
          items.push({
            label:
              routeNameMap[segment] ||
              segment.charAt(0).toUpperCase() + segment.slice(1),
            href: parentHref,
          });
        }
      });
    }
  } else {
    items = [
      { label: "Home", href: "/" },
      { label: breadcrumb || title },
    ];
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative flex min-h-[320px] w-full items-end sm:min-h-[360px] md:min-h-[400px] lg:min-h-[430px] xl:min-h-[460px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-hero-bg will-change-transform"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15 transition-opacity" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-end px-5 pb-12 sm:px-8 sm:pb-14 md:px-10 md:pb-16 lg:px-14 lg:pb-20 xl:px-20">
          <div className="w-full max-w-[700px]">
            <h1
              style={{ animationDelay: "150ms" }}
              className="animate-fade-in-up text-4xl font-extrabold leading-none tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[68px]"
            >
              {title}
            </h1>
            <nav
              aria-label="Breadcrumb"
              style={{ animationDelay: "280ms" }}
              className="animate-fade-in-up mt-4 inline-flex max-w-full flex-wrap items-center gap-y-1 rounded-2xl sm:rounded-full border border-white/30 bg-black/30 px-4 py-2.5 sm:mt-6 sm:px-6 sm:py-3 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-white/50 hover:bg-black/40"
            >
              {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                  <div
                    key={`${item.label}-${index}`}
                    className="flex min-w-0 items-center"
                  >
                    {index > 0 && (
                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                        className="mx-2 shrink-0 text-white/80 sm:mx-2.5"
                      />
                    )}

                    {isLast || !item.href ? (
                      <span
                        title={item.label}
                        className="block max-w-[170px] truncate text-sm font-semibold text-[#f4c430] min-[380px]:max-w-[210px] min-[440px]:max-w-[260px] min-[520px]:max-w-[320px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-none sm:text-[15px]"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="shrink-0 text-sm font-medium text-white/90 transition-all duration-200 hover:text-[#42c943] hover:underline sm:text-[15px]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
