"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useNavStore } from "@/store/useNavStore";

export function useTrackRoute() {
  const pathname: string = usePathname();
  const setActiveSection = useNavStore((s) => s.setActiveSection);
  const setActivePath = useNavStore((s) => s.setActivePath);

  useEffect(() => {
    const section = pathname.split("/")[1] || "";
    const path: string[] = pathname.split("/");
    setActiveSection(section);
    setActivePath(path);
  }, [pathname, setActiveSection, setActivePath]);
}
