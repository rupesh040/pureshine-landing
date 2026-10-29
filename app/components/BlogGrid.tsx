"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import content from "../data";

const blogs = content.blogs;

interface BlogGridProps {
  limit?: number;
  itemsPerPage?: number;
}

export default function BlogGrid({
  limit,
  itemsPerPage = 6,
}: BlogGridProps = {}) {
  const pathname = usePathname();
  const isBlogsPage = pathname?.replace(/\/$/, "") === "/blogs";
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const effectiveIsMobile = isMounted ? isMobile : false;
  const pageSize = effectiveIsMobile ? 4 : (itemsPerPage ?? 6);
  const totalPages = Math.ceil(blogs.length / pageSize);

  const cardLimit = limit !== undefined ? limit : (effectiveIsMobile ? 4 : 6);
  const startIndex = (currentPage - 1) * pageSize;

  const currentBlogs = isBlogsPage
    ? blogs.slice(startIndex, startIndex + pageSize)
    : blogs.slice(0, cardLimit);

  const shouldShowPagination = isBlogsPage && totalPages > 1;

  useEffect(() => {
    if (isMounted) {
      setCurrentPage(1);
    }
  }, [pathname, isMobile, isMounted]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-white py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((blog, idx) => {
            const blogSlug = (blog as any).slug || blog.id;
            const blogDescription =
              (blog as any).description ||
              blog.content?.[0]?.text ||
              "";
            return (
              <article
                key={blog.id}
                style={{ animationDelay: `${120 + idx * 80}ms` }}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                <Link
                  href={`/blogs/${blogSlug}`}
                  aria-label={`Read ${blog.title}`}
                  className="relative block h-[210px] w-full shrink-0 overflow-hidden"
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-3 flex h-[58px] w-[58px] flex-col items-center justify-center rounded-xl bg-[#11952b] text-white shadow-md">
                    <span className="text-lg font-bold leading-5">
                      {blog.day}
                    </span>

                    <span className="text-sm font-medium">
                      {blog.month}
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div>
                    <span className="inline-flex rounded-full bg-[#e7f8eb] px-4 py-1.5 text-xs font-semibold text-[#11952b]">
                      {blog.category}
                    </span>
                  </div>

                  <h2 className="mt-3 line-clamp-2 min-h-[56px] text-xl font-bold leading-7 text-[#092a43]">
                    <Link
                      href={`/blogs/${blogSlug}`}
                      className="transition-colors hover:text-[#11952b]"
                    >
                      {blog.title}
                    </Link>
                  </h2>

                  {blogDescription && (
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {blogDescription}
                    </p>
                  )}

                  <div className="mt-auto pt-4">
                    <Link
                      href={`/blogs/${blogSlug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#11952b] transition-colors hover:text-[#08751f]"
                    >
                      Read More

                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {shouldShowPagination && (
          <div
            style={{ animationDelay: `${120 + currentBlogs.length * 80 + 80}ms` }}
            suppressHydrationWarning
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#092a43] transition-all hover:border-[#11952b] hover:text-[#11952b] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                suppressHydrationWarning
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-[#11952b] text-white shadow-md"
                    : "border border-gray-200 bg-white text-[#092a43] hover:border-[#11952b] hover:text-[#11952b]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              suppressHydrationWarning
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#092a43] transition-all hover:border-[#11952b] hover:text-[#11952b] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}