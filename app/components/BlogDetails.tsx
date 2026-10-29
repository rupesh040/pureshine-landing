"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Share2,
  User,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface BlogSection {
  heading?: string;
  text: string;
}

interface Blog {
  id: string;
  title: string;
  category: string;
  date: string;
  shortDate: string;
  day: string;
  month: string;
  author: string;
  role: string;
  image: string;
  comments?: number;
  content: BlogSection[];
}

interface Category {
  name: string;
  count: string;
}

interface BlogDetailsProps {
  blog: Blog;
  recentPosts: Blog[];
  categories: Category[];
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.66.34-1 1-1Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.11 8.13L22.75 22h-6.57l-5.14-6.72L5.16 22H1.9l7.6-8.69L1.5 2h6.74l4.65 6.14L18.244 2Zm-1.15 17.9h1.8L7.22 4.02H5.29L17.094 19.9Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.03 2.03 0 0 0 3.22 5.03c0 1.12.91 2.03 2.03 2.03s2.03-.91 2.03-2.03A2.03 2.03 0 0 0 5.25 3ZM20.78 13.42c0-3.46-1.84-5.07-4.3-5.07-1.98 0-2.86 1.09-3.36 1.86V8.5H9.74V20h3.38v-5.7c0-1.5.28-2.96 2.15-2.96 1.85 0 1.87 1.73 1.87 3.06V20h3.38l.26-6.58Z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.59 5.96L.08 24l6.29-1.65a11.87 11.87 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.23-6.17-3.46-8.42ZM12.08 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.84 9.84 0 0 1-1.51-5.28c0-5.45 4.44-9.88 9.89-9.88a9.8 9.8 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 7c0 5.45-4.43 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}



function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setIsVisible(true);
    }

    const timer = setTimeout(() => setIsVisible(true), 800);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${className} ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function BlogDetails({
  blog,
  recentPosts,
  categories,
}: BlogDetailsProps) {
  const displayedRecentPosts = recentPosts.slice(0, 5);

  return (
    <main className="bg-white py-6">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-7 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
        <article className="min-w-0">
          <ScrollReveal delay={100}>
            <div className="relative overflow-hidden rounded-[12px]">
              <Image
                src={blog.image}
                alt={blog.title}
                width={900}
                height={500}
                priority
                className="h-auto max-h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute left-4 top-4 overflow-hidden rounded-[8px] bg-[#10a83a] text-center text-white shadow-md sm:left-5 sm:top-5">
                <div className="px-4 py-2 text-[28px] font-extrabold leading-none sm:text-[30px]">
                  {blog.day}
                </div>

                <div className="bg-[#07972f] px-3 py-1 text-[11px] font-medium sm:text-[12px]">
                  {blog.month}
                </div>
              </div>

              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                <span className="inline-flex rounded-full bg-[#e5f9eb] px-4 py-2 text-[11px] font-bold text-[#10a83a] shadow-sm sm:text-[12px]">
                  {blog.category}
                </span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <h1 className="mt-5 max-w-[850px] text-[32px] font-extrabold leading-[1.08] tracking-[-0.8px] text-[#062d4c] sm:text-[40px] lg:text-[44px]">
              {blog.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={260}>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-4 text-[12px] text-[#637789] sm:text-[13px]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8edf2]">
                  <User size={25} className="text-[#738395]" />
                </div>

                <div>
                  <p className="font-bold text-[#092f4b]">{blog.author}</p>
                  <p className="mt-0.5">{blog.role}</p>
                </div>
              </div>

              <span className="hidden h-7 w-px bg-[#d9e1e7] sm:block" />

              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#092f4b]" />
                <span>{blog.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Share2 size={16} className="text-[#092f4b]" />
                <span>Share:</span>

                <Link
                  href="#"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877f2] text-white transition hover:scale-105"
                >
                  <FacebookIcon />
                </Link>

                <Link
                  href="#"
                  aria-label="X"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition hover:scale-105"
                >
                  <XIcon />
                </Link>

                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a66c2] text-white transition hover:scale-105"
                >
                  <LinkedinIcon />
                </Link>

                <Link
                  href="#"
                  aria-label="WhatsApp"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366] text-white transition hover:scale-105"
                >
                  <WhatsappIcon />
                </Link>
              </div>
            </div>
          </ScrollReveal>
          <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
            {blog.content.map((section, index) => (
              <ScrollReveal key={index} delay={index * 80}>
                <section>
                  {section.heading && (
                    <h2 className="mb-1.5 text-[21px] font-extrabold leading-tight text-[#092f4b] sm:text-[23px]">
                      {section.heading}
                    </h2>
                  )}

                  <p className="max-w-[850px] text-[13px] leading-6 text-[#637789] sm:text-[14px] sm:leading-7 lg:text-[15px]">
                    {section.text}
                  </p>
                </section>
              </ScrollReveal>
            ))}
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <ScrollReveal delay={180}>
            <div className="rounded-[12px] border border-[#e7edf1] bg-white p-4 shadow-[0_3px_18px_rgba(8,45,76,0.04)] sm:p-5">
              <h2 className="text-[17px] font-extrabold text-[#092f4b] sm:text-[18px]">
                Recent Posts
              </h2>

              <div className="mt-4 divide-y divide-[#edf1f4]">
                {displayedRecentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${(post as any).slug || post.id}`}
                    className="group flex gap-3 py-3 first:pt-0 last:pb-0 transition-transform duration-200 hover:translate-x-1"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={92}
                      height={62}
                      className="h-[62px] w-[92px] shrink-0 rounded-[7px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-[12px] font-bold leading-[1.4] text-[#092f4b] transition-colors group-hover:text-[#10a83a] sm:text-[13px]">
                        {post.title}
                      </h3>

                      <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[#637789] sm:text-[11px]">
                        <CalendarDays size={11} />
                        <span>{post.shortDate}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={280}>
            <div className="rounded-[12px] border border-[#e7edf1] bg-white p-4 shadow-[0_3px_18px_rgba(8,45,76,0.04)] sm:p-5">
              <h2 className="text-[17px] font-extrabold text-[#092f4b] sm:text-[18px]">
                Categories
              </h2>

              <div className="mt-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/blogs?category=${encodeURIComponent(category.name)}`}
                    className="group flex items-center justify-between border-b border-[#edf1f4] py-2.5 text-[13px] text-[#637789] transition-colors last:border-b-0 hover:text-[#10a83a]"
                  >
                    <span>
                      {category.name}{" "}
                      <span className="ml-2 text-[#8a99a6]">
                        ({category.count})
                      </span>
                    </span>

                    <ChevronRight
                      size={16}
                      className="text-[#8292a0] transition-transform group-hover:translate-x-1 group-hover:text-[#10a83a]"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </aside>
      </div>
    </main>
  );
}