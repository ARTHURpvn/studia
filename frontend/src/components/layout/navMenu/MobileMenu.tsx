import {
  BookCheckIcon,
  CalendarIcon,
  FolderIcon,
  HouseIcon,
  SearchIcon,
} from "lucide-react";

import { useNavStore } from "@/store/useNavStore";

const MobileMenu = () => {
  const activeSection = useNavStore((s) => s.activeSection);

  return (
    <div className="flex w-full h-19 items-center px-10 justify-between absolute bottom-0 left-0">
      <HouseIcon
        className={`${activeSection == "" && "text-white"} size-9`}
        strokeWidth={1.5}
      />
      <CalendarIcon
        className={`${activeSection == "calendar" && "text-white"} size-9`}
        strokeWidth={1.5}
      />
      <SearchIcon
        className={`${activeSection == "search" && "text-white"} size-9`}
        strokeWidth={1.5}
      />
      <FolderIcon
        className={`${activeSection == "folders" && "text-white"} size-9`}
        strokeWidth={1.5}
      />
      <BookCheckIcon
        className={`${activeSection == "exams" && "text-white"} size-9`}
        strokeWidth={1.5}
      />
    </div>
  );
};

export default MobileMenu;
