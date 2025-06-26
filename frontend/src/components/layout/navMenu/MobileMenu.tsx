"use client";

import {
  BookCheckIcon,
  CalendarIcon,
  FolderIcon,
  HouseIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";

import { useNavStore } from "@/store/useNavStore";

const MobileMenu = () => {
  const activeSection: string = useNavStore((s) => s.activeSection);

  return (
    <div className="flex w-full h-19 items-center px-10 justify-between absolute bottom-0 left-0">
      <Link href="/">
        <HouseIcon
          className={`${activeSection == "" && "text-white"} size-9`}
          strokeWidth={1.5}
        />
      </Link>

      <Link href="/calendar">
        <CalendarIcon
          className={`${activeSection == "calendar" && "text-white"} size-9`}
          strokeWidth={1.5}
        />
      </Link>

      <SearchIcon
        className={`${activeSection == "search" && "text-white"} size-9`}
        strokeWidth={1.5}
      />

      <Link href="/folders">
        <FolderIcon
          className={`${activeSection == "folders" && "text-white"} size-9`}
          strokeWidth={1.5}
        />
      </Link>

      <Link href="/materias">
        <BookCheckIcon
          className={`${activeSection == "materias" && "text-white"} size-9`}
          strokeWidth={1.5}
        />
      </Link>
    </div>
  );
};

export default MobileMenu;
