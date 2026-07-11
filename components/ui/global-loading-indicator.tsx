"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MIN_VISIBLE_MS = 450;
const FALLBACK_HIDE_MS = 4500;

function isInteractiveElement(element: Element | null) {
  if (!element) {
    return false;
  }

  const target = element.closest("a, button, input[type='submit'], input[type='button']");

  if (!target) {
    return false;
  }

  if (target.closest("[data-no-loading]")) {
    return false;
  }

  if (target instanceof HTMLButtonElement || target instanceof HTMLInputElement) {
    return !target.disabled;
  }

  if (target instanceof HTMLAnchorElement) {
    if (target.target === "_blank" || target.hasAttribute("download")) {
      return false;
    }

    const url = new URL(target.href);
    const current = new URL(window.location.href);
    return url.origin === current.origin && target.href !== window.location.href;
  }

  return true;
}

export function GlobalLoadingIndicator() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const startedAt = useRef(0);
  const fallbackTimer = useRef<number | null>(null);

  const stopLoading = useCallback(() => {
    if (!startedAt.current) {
      setIsLoading(false);
      return;
    }

    const elapsed = Date.now() - startedAt.current;
    const delay = Math.max(MIN_VISIBLE_MS - elapsed, 0);

    window.setTimeout(() => {
      setIsLoading(false);
      startedAt.current = 0;
    }, delay);
  }, []);

  const startLoading = useCallback(() => {
    startedAt.current = Date.now();
    setIsLoading(true);

    if (fallbackTimer.current) {
      window.clearTimeout(fallbackTimer.current);
    }

    fallbackTimer.current = window.setTimeout(stopLoading, FALLBACK_HIDE_MS);
  }, [stopLoading]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      if (isInteractiveElement(event.target instanceof Element ? event.target : null)) {
        startLoading();
      }
    };

    const handleSubmit = () => startLoading();

    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("submit", handleSubmit, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("submit", handleSubmit, { capture: true });

      if (fallbackTimer.current) {
        window.clearTimeout(fallbackTimer.current);
      }
    };
  }, [startLoading]);

  useEffect(() => {
    stopLoading();
  }, [pathname, stopLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div className="h-1 w-full overflow-hidden bg-brand-red/15">
        <div className="h-full w-1/2 animate-loading-bar bg-brand-red" />
      </div>
      <div className="fixed right-4 top-4 rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-bold text-brand-dark shadow-xl">
        <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-brand-red border-t-transparent align-[-1px]" />
        Cargando
      </div>
    </div>
  );
}
