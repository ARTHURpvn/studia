"use client";

import { useEffect, useState } from "react";

export function useWindowSize(): "mobile" | "desktop" {
  const [width, setWidth] = useState<number | null>(
    typeof window !== "undefined" ? window.innerWidth : null,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
        localStorage.setItem(
          "device",
          window.innerWidth < 768 ? "mobile" : "desktop",
        );
      }, 150); // debounce
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width === null) return "desktop";
  return width <= 768 ? "mobile" : "desktop";
}
