"use client";

import {
  BookCheckIcon,
  CalendarIcon,
  CircleUserRoundIcon,
  HouseIcon,
  SearchIcon,
} from "lucide-react";

const DesktopMenu = () => {
  return (
    <aside className="w-70 h-[100dvh] bg-[var(--background)] border-r">
      <div className="flex text-white items-center gap-6 p-4">
        <CircleUserRoundIcon className="size-9" strokeWidth={1.2} />
        <p className={"text-2xl font-bold"}>Arthur Pavan</p>
      </div>

      <div className="flex flex-col gap-4 mx-12 mt-4">
        <div className="flex items-center gap-5">
          <SearchIcon className="size-7" strokeWidth={1} />
          <p className={"text-xl"}> Buscar </p>
        </div>
        <div className="flex items-center gap-5">
          <HouseIcon className="size-7" strokeWidth={1} />
          <p className={"text-xl"}> Página Inicial </p>
        </div>
        <div className="flex items-center gap-5">
          <CalendarIcon className="size-7" strokeWidth={1} />
          <p className={"text-xl"}> Calendario </p>
        </div>
        <div className="flex items-center gap-5">
          <BookCheckIcon className="size-7" strokeWidth={1} />
          <p className={"text-xl"}> Matérias </p>
        </div>
      </div>

      <div className={"flex flex-col gap-3 mx-6 mt-8"}>
        <p className={"font-bold"}>Pastas</p>
        <div></div>
      </div>
    </aside>
  );
};

export default DesktopMenu;
