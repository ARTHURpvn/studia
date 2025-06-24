"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useNavStore } from "@/store/useNavStore";

export function useTrackRoute() {
  const pathname = usePathname();
  const setActiveSection = useNavStore((s) => s.setActiveSection);

  useEffect(() => {
    const section = pathname.split("/")[1] || "";
    setActiveSection(section);
  }, [pathname, setActiveSection]);
}
