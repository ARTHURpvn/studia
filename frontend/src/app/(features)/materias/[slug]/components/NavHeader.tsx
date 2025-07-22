"use client";

import AddMateriaButton from "@/app/(features)/materias/components/AddMateriaButton";
import { useWindowSize } from "@/hooks/useWindowSize";

const NavHeader = () => {
  const device: "mobile" | "desktop" = useWindowSize();

  return (
    <div className={"self-end"}>
      {device === "desktop" && <AddMateriaButton type={"homework"} />}
    </div>
  );
};

export default NavHeader;
