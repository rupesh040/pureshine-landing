"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Play,
  X,
} from "lucide-react";
import content from "../data";

type GalleryType = "photo" | "video";

interface GalleryItem {
  id: number;
  type: GalleryType;
  category: string;
  title: string;
  image: string;
  videoUrl?: string;
}

const {
  badge,
  headingLine1,
  headingLine2,
  description,
  itemsPerPage: rawItemsPerPage,
  categories,
  items: rawItems,
} = content.gallery;

const galleryItems: GalleryItem[] = rawItems as GalleryItem[];
const PHOTOS_PER_PAGE = rawItemsPerPage || 9;
const VIDEOS_PER_PAGE = 6;
const CATEGORY_PHOTOS_PER_PAGE = 3;
const CATEGORY_VIDEOS_PER_PAGE = 2;

function getEmbedUrl(url?: string): string {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("youtube.com/embed/")) {
    return url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`;
  }
  return url;
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeType, setActiveType] = useState<GalleryType>("photo");
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const isAll = (cat: string) =>
    cat === "All Photos" || cat === "All Videos" || cat === "All";

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const typeMatches = item.type === activeType;
      const categoryMatches =
        isAll(activeCategory) || item.category === activeCategory;

      return typeMatches && categoryMatches;
    });
  }, [activeType, activeCategory]);

  const photoItems = useMemo(() => {
    return filteredItems.filter((item) => item.type === "photo");
  }, [filteredItems]);

  const videoItems = useMemo(() => {
    return filteredItems.filter((item) => item.type === "video");
  }, [filteredItems]);

  const currentPhoto =
    selectedPhotoIndex !== null && photoItems[selectedPhotoIndex]
      ? photoItems[selectedPhotoIndex]
      : null;

  const currentVideo =
    selectedVideoIndex !== null && videoItems[selectedVideoIndex]
      ? videoItems[selectedVideoIndex]
      : null;

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prev) => {
      if (prev === null || photoItems.length === 0) return null;
      return (prev - 1 + photoItems.length) % photoItems.length;
    });
  };

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prev) => {
      if (prev === null || photoItems.length === 0) return null;
      return (prev + 1) % photoItems.length;
    });
  };

  const handlePrevVideo = () => {
    setSelectedVideoIndex((prev) => {
      if (prev === null || videoItems.length === 0) return null;
      return (prev - 1 + videoItems.length) % videoItems.length;
    });
  };

  const handleNextVideo = () => {
    setSelectedVideoIndex((prev) => {
      if (prev === null || videoItems.length === 0) return null;
      return (prev + 1) % videoItems.length;
    });
  };

  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevPhoto();
      } else if (e.key === "ArrowRight") {
        handleNextPhoto();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedPhotoIndex, photoItems.length]);

  useEffect(() => {
    if (selectedVideoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideoIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevVideo();
      } else if (e.key === "ArrowRight") {
        handleNextVideo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedVideoIndex, videoItems.length]);

  const isAllCategory = isAll(activeCategory);

  const itemsPerPage = isMobile
    ? 4
    : isAllCategory
      ? activeType === "video"
        ? VIDEOS_PER_PAGE
        : PHOTOS_PER_PAGE
      : activeType === "video"
        ? CATEGORY_VIDEOS_PER_PAGE
        : CATEGORY_PHOTOS_PER_PAGE;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / itemsPerPage),
  );

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeType, activeCategory, isMobile]);

  const changeType = (type: GalleryType) => {
    setActiveType(type);
    setCurrentPage(1);
    setActiveCategory(type === "photo" ? "All Photos" : "All Videos");
  };

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white px-4 py-6"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="mx-auto max-w-[700px] text-center">
          <span
            style={{ animationDelay: "100ms" }}
            className={`inline-flex rounded-full bg-[#dff7e7] px-4 py-1.5 text-[11px] font-bold text-[#0c9d36] sm:text-[12px] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {badge}
          </span>

          <h1
            style={{ animationDelay: "200ms" }}
            className={`mt-3 text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#062d4c] sm:text-[40px] lg:text-[44px] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {headingLine1}{" "}
            <span className="text-[#0b9e37]">{headingLine2}</span>
          </h1>

          <div
            style={{ animationDelay: "280ms" }}
            className={`mx-auto mt-2 h-[3px] w-[34px] rounded-full bg-[#0b9e37] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          />

          <p
            style={{ animationDelay: "360ms" }}
            className={`mx-auto mt-4 max-w-[620px] text-[12px] leading-5 text-[#718191] sm:text-[14px] sm:leading-6 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {description}
          </p>
        </div>
        <div
          style={{ animationDelay: "440ms" }}
          className={`mt-7 flex justify-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="inline-flex rounded-full bg-[#edf4f8] p-1 shadow-inner">
            <button
              type="button"
              onClick={() => changeType("photo")}
              className={`flex min-w-[120px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold transition-all duration-300 sm:min-w-[130px] ${
                activeType === "photo"
                  ? "bg-[#07534f] text-white shadow-md"
                  : "text-[#092f4b] hover:text-[#07534f]"
              }`}
            >
              <ImageIcon size={17} />
              Photos
            </button>

            <button
              type="button"
              onClick={() => changeType("video")}
              className={`flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold transition-all duration-300 sm:min-w-[130px] ${
                activeType === "video"
                  ? "bg-[#07534f] text-white shadow-md"
                  : "text-[#092f4b] hover:text-[#07534f]"
              }`}
            >
              <Play size={17} />
              Videos
            </button>
          </div>
        </div>
        <div
          style={{ animationDelay: "520ms" }}
          className={`mt-6 overflow-x-auto pb-2 scrollbar-hide ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="flex min-w-max justify-center gap-2 px-1 lg:min-w-0 lg:flex-wrap">
            {categories.map((category) => {
              const displayCategory =
                category === "All Photos"
                  ? activeType === "video"
                    ? "All Videos"
                    : "All Photos"
                  : category;

              const active =
                activeCategory === category ||
                (isAll(activeCategory) && category === "All Photos");

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    changeCategory(
                      category === "All Photos" && activeType === "video"
                        ? "All Videos"
                        : category,
                    )
                  }
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-medium transition-all duration-300 sm:px-5 sm:text-[12px] cursor-pointer ${
                    active
                      ? "border-[#0b9e37] bg-[#0b9e37] text-white shadow-sm scale-105"
                      : "border-[#dfe7ed] bg-white text-[#092f4b] hover:border-[#0b9e37] hover:text-[#0b9e37]"
                  }`}
                >
                  {displayCategory}
                </button>
              );
            })}
          </div>
        </div>
        {currentItems.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((item, idx) => (
              <div
                key={`${item.id}-${item.type}-${idx}`}
                onClick={() => {
                  if (item.type === "video") {
                    const vIdx = videoItems.findIndex((v) => v.id === item.id);
                    setSelectedVideoIndex(vIdx !== -1 ? vIdx : 0);
                  } else {
                    const pIdx = photoItems.findIndex((p) => p.id === item.id);
                    setSelectedPhotoIndex(pIdx !== -1 ? pIdx : 0);
                  }
                }}
                style={{ animationDelay: `${200 + (idx % 9) * 60}ms` }}
                className={`group relative aspect-[1.62] overflow-hidden rounded-[14px] bg-[#edf2f4] shadow-[0_4px_20px_rgba(8,45,76,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(8,45,76,0.14)] cursor-pointer ${
                  isVisible ? "animate-fade-in-scale" : "opacity-0"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 right-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#38e86c]">
                    {item.category}
                  </span>
                  <p className="line-clamp-1 text-sm font-semibold text-white">
                    {item.title}
                  </p>
                </div>
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#0b9e37] shadow-[0_8px_25px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0b9e37] group-hover:text-white">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{ animationDelay: "300ms" }}
            className={`mt-8 flex min-h-[260px] flex-col items-center justify-center rounded-2xl bg-[#f7faf8] p-6 text-center ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <p className="text-base font-semibold text-[#102b4c]">
              No {activeType === "video" ? "videos" : "photos"} found
            </p>
            <p className="mt-1 text-xs text-[#718191]">
              Try selecting a different category or view all {activeType === "video" ? "videos" : "photos"}.
            </p>
            <button
              type="button"
              onClick={() => changeCategory(activeType === "video" ? "All Videos" : "All Photos")}
              className="mt-4 rounded-full bg-[#0b9e37] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#08832c]"
            >
              View All {activeType === "video" ? "Videos" : "Photos"}
            </button>
          </div>
        )}
        {filteredItems.length > 0 && (
          <div
            style={{ animationDelay: "600ms" }}
            className={`mt-8 flex items-center justify-center gap-2 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe7ed] text-[#092f4b] transition hover:border-[#0b9e37] hover:text-[#0b9e37] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>

            {pageNumbers.map((page, index) => {
              const previousPage = pageNumbers[index - 1];
              const showDots =
                previousPage !== undefined && page - previousPage > 1;

              return (
                <div key={page} className="flex items-center gap-2">
                  {showDots && (
                    <span className="text-[13px] text-[#82909c]">...</span>
                  )}

                  <button
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold transition ${
                      currentPage === page
                        ? "bg-[#0b9e37] text-white shadow-md scale-105"
                        : "text-[#092f4b] hover:bg-[#e8f7ec] hover:text-[#0b9e37]"
                    }`}
                  >
                    {page}
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe7ed] text-[#092f4b] transition hover:border-[#0b9e37] hover:text-[#0b9e37] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
      {currentPhoto && selectedPhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.title}
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-fade-in"
        >
          {photoItems.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-[#0b9e37] hover:scale-110 active:scale-95 cursor-pointer shadow-xl border border-white/10"
            >
              <ChevronLeft size={26} strokeWidth={2.5} />
            </button>
          )}

          {photoItems.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-[#0b9e37] hover:scale-110 active:scale-95 cursor-pointer shadow-xl border border-white/10"
            >
              <ChevronRight size={26} strokeWidth={2.5} />
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-[92vw] items-center justify-center animate-fade-in-scale"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close photo preview"
                className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-[#0b9e37] hover:scale-105 active:scale-95 cursor-pointer border border-white/20 shadow-md"
              >
                <X size={20} />
              </button>

              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                className="block max-h-[82vh] max-w-[92vw] h-auto w-auto object-contain select-none"
              />

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-5">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#38e86c]">
                      {currentPhoto.category}
                    </span>
                    <h3 className="text-sm font-bold text-white drop-shadow sm:text-base truncate">
                      {currentPhoto.title}
                    </h3>
                  </div>
                  {photoItems.length > 1 && (
                    <span className="shrink-0 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                      {selectedPhotoIndex + 1} / {photoItems.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentVideo && selectedVideoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentVideo.title}
          onClick={() => setSelectedVideoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-fade-in"
        >
          {videoItems.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevVideo();
              }}
              aria-label="Previous video"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-[#0b9e37] hover:scale-110 active:scale-95 cursor-pointer shadow-xl border border-white/10"
            >
              <ChevronLeft size={26} strokeWidth={2.5} />
            </button>
          )}

          {videoItems.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextVideo();
              }}
              aria-label="Next video"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-[#0b9e37] hover:scale-110 active:scale-95 cursor-pointer shadow-xl border border-white/10"
            >
              <ChevronRight size={26} strokeWidth={2.5} />
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#092135] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 animate-fade-in-scale"
          >
            <button
              type="button"
              onClick={() => setSelectedVideoIndex(null)}
              aria-label="Close video player"
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-[#0b9e37] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-video w-full bg-black">
              {currentVideo.videoUrl &&
              (currentVideo.videoUrl.includes("youtube.com") ||
                currentVideo.videoUrl.includes("youtu.be")) ? (
                <iframe
                  key={currentVideo.videoUrl}
                  src={getEmbedUrl(currentVideo.videoUrl)}
                  title={currentVideo.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : currentVideo.videoUrl ? (
                <video
                  key={currentVideo.videoUrl}
                  src={currentVideo.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white/70">
                  <p>Video not available.</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#12aa3b]">
                  {currentVideo.category}
                </span>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  {currentVideo.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {videoItems.length > 1 && (
                  <span className="shrink-0 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                    {selectedVideoIndex + 1} / {videoItems.length}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#12aa3b]/20 px-3 py-1 text-xs font-medium text-[#29d458] sm:self-auto">
                  <Play size={12} fill="currentColor" /> Playing
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
