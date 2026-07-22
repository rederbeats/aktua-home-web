"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";

export type PropertyGalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export function PropertyGallery({ images, title }: { images: PropertyGalleryImage[]; title: string }) {
  const galleryImages = useMemo(
    () => (images.length ? images : [{ id: "fallback", url: "/assets/aktua-home-logo.png", alt: title }]),
    [images, title]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const current = galleryImages[currentIndex] ?? galleryImages[0];
  const hasMultiple = galleryImages.length > 1;

  const goTo = useCallback(
    (nextIndex: number) => {
      const normalized = (nextIndex + galleryImages.length) % galleryImages.length;
      setCurrentIndex(normalized);
    },
    [galleryImages.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowLeft") goTo(currentIndex - 1);
      if (event.key === "ArrowRight") goTo(currentIndex + 1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, goTo, isOpen]);

  return (
    <section className="grid gap-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-black/10 bg-neutral-100 shadow-[0_24px_70px_rgba(17,17,17,0.13)] md:aspect-[16/8]">
        <button type="button" className="block h-full w-full" onClick={() => setIsOpen(true)}>
          <Image src={current.url} alt={current.alt} fill className="object-cover" priority sizes="(min-width: 1024px) 70vw, 100vw" />
          <span className="sr-only">Ampliar galeria</span>
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-black text-brand-dark shadow-lg">
          Foto {currentIndex + 1} de {galleryImages.length}
        </span>
        <button
          type="button"
          className="absolute bottom-4 right-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-brand-dark shadow-lg hover:text-brand-red"
          onClick={() => setIsOpen(true)}
        >
          <Images size={17} /> Ver todas
        </button>
        {hasMultiple ? (
          <>
            <button
              type="button"
              className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-lg hover:text-brand-red"
              onClick={() => goTo(currentIndex - 1)}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-lg hover:text-brand-red"
              onClick={() => goTo(currentIndex + 1)}
              aria-label="Foto siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={`relative h-24 w-32 shrink-0 overflow-hidden rounded-md border bg-neutral-100 shadow-sm transition md:h-28 md:w-40 ${
                index === currentIndex ? "border-brand-red ring-2 ring-brand-red/20" : "border-black/10 hover:border-brand-red"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="160px" />
              <span className="absolute bottom-1 left-1 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white">{index + 1}</span>
            </button>
          ))}
        </div>
      ) : null}

      {isOpen ? (
        <div className="fixed inset-0 z-[120] bg-black/95 text-white">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div>
              <p className="text-sm font-bold text-white/70">{title}</p>
              <p className="text-lg font-black">Foto {currentIndex + 1} de {galleryImages.length}</p>
            </div>
            <button type="button" className="flex size-11 items-center justify-center rounded-full bg-white text-brand-dark hover:text-brand-red" onClick={() => setIsOpen(false)} aria-label="Cerrar galeria">
              <X size={24} />
            </button>
          </div>

          <div className="relative h-full w-full px-3 py-20 md:px-20">
            <Image src={current.url} alt={current.alt} fill className="object-contain p-3 md:p-10" sizes="100vw" />
          </div>

          {hasMultiple ? (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-dark hover:text-brand-red md:left-6"
                onClick={() => goTo(currentIndex - 1)}
                aria-label="Foto anterior"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-dark hover:text-brand-red md:right-6"
                onClick={() => goTo(currentIndex + 1)}
                aria-label="Foto siguiente"
              >
                <ChevronRight size={28} />
              </button>
              <div className="absolute inset-x-0 bottom-0 z-10 flex gap-2 overflow-x-auto bg-gradient-to-t from-black/80 to-transparent p-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border ${index === currentIndex ? "border-white" : "border-white/20 opacity-70"}`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="96px" />
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
