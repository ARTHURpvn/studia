"use client";

import { useTrackRoute } from "@/hooks/useTrackRoute";
import useWindowSize from "@/hooks/useWindowSize";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
  const [width] = useWindowSize();
  const isDesktop = width >= 1024;

  useTrackRoute();

  return <>{isDesktop ? <DesktopMenu /> : <MobileMenu />}</>;
};

export default NavBar;
