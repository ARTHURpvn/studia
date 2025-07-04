"use client";

import {
  Calendar1Icon,
  CircleUserRoundIcon,
  HelpCircleIcon,
} from "lucide-react";

import DesktopNavContainer from "@/components/layout/navMenu/components/DesktopNavContainer";
import FolderTree from "@/components/layout/navMenu/components/FolderTree/FolderTree";
import NavButton from "@/components/layout/navMenu/components/NavButton";

const DesktopMenu = () => {
  return (
    <aside
      className={
        "w-70 h-full absolute left-0  top-0 bg-[var(--background)] border-r"
      }
    >
      <div className={"flex text-white items-center gap-6 p-4"}>
        <CircleUserRoundIcon className="size-9" strokeWidth={1.2} />
        <p className={"text-2xl font-bold"}>Arthur Pavan</p>
      </div>

      <DesktopNavContainer />

      <div className={"flex flex-col gap-3 mx-6 mt-8 pb-12 border-b"}>
        <p className={"font-bold"}>Pastas</p>
        <div>
          <FolderTree />
        </div>
      </div>

      <nav className={"mx-6"}>
        <NavButton name={"Configuração"} />
      </nav>

      <div className={"absolute bottom-3 flex w-full justify-between px-6"}>
        <Calendar1Icon strokeWidth={1.5} />
        <HelpCircleIcon strokeWidth={1.5} />
      </div>
    </aside>
  );
};

export default DesktopMenu;
