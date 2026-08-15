"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (command: "track", eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

type MetaPixelEventProps = {
  eventName: string;
  parameters?: Record<string, unknown>;
};

export function MetaPixelEvent({ eventName, parameters }: MetaPixelEventProps) {
  useEffect(() => {
    window.fbq?.("track", eventName, parameters);
  }, [eventName, parameters]);

  return null;
}
