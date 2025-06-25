"use client";

import MobileMenu from "@/components/layout/navMenu/MobileMenu";
import { useTrackRoute } from "@/hooks/useTrackRoute";
import { useWindowSize } from "@/hooks/useWindowSize";

import DesktopMenu from "./DesktopMenu";

const NavBar = () => {
  const isDesktop: "mobile" | "desktop" = useWindowSize();
  useTrackRoute();

  return <>{isDesktop == "desktop" ? <DesktopMenu /> : <MobileMenu />}</>;
};

export default NavBar;
