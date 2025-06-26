import {
  BookCheckIcon,
  CalendarIcon,
  CogIcon,
  HouseIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { useNavStore } from "@/store/useNavStore";

interface NavButtonProps {
  name:
    | "Buscar"
    | "Página Inicial"
    | "Calendário"
    | "Matérias"
    | "Configuração";

  link?: string;
}

const NavButton = ({ name, link }: NavButtonProps) => {
  const activeSection = useNavStore((s) => s.activeSection);
  let icon: ReactNode;

  switch (name) {
    case "Buscar":
      icon = <SearchIcon className="size-7" strokeWidth={1} />;
      break;

    case "Página Inicial":
      icon = <HouseIcon className="size-7" strokeWidth={1} />;
      break;

    case "Calendário":
      icon = <CalendarIcon className="size-7" strokeWidth={1} />;
      break;

    case "Matérias":
      icon = <BookCheckIcon className="size-7" strokeWidth={1} />;
      break;

    case "Configuração":
      icon = <CogIcon className={"size-7"} strokeWidth={1.5} />;
      break;
  }

  return (
    <Link
      href={"/" + link}
      className={`
        ${activeSection === link && "text-white"} 
        ${name == "Configuração" && "py-2 px-3 mt-4 rounded-md hover:bg-[var(--second)] hover:text-white duration-200"} 
        flex items-center gap-5
       `}
    >
      {icon}
      <p className={"text-xl"}> {name} </p>
    </Link>
  );
};

export default NavButton;
