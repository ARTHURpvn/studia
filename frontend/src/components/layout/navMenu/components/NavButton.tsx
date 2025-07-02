import {
  BookCheckIcon,
  CalendarIcon,
  CogIcon,
  HouseIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";

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

  const Icon = {
    Buscar: SearchIcon,
    "Página Inicial": HouseIcon,
    Calendário: CalendarIcon,
    Matérias: BookCheckIcon,
    Configuração: CogIcon,
  }[name];

  return (
    <Link
      href={"/" + link}
      className={`
        ${activeSection === link && "text-white"} 
        ${name == "Configuração" && "py-2 px-3 mt-4 rounded-md hover:bg-[var(--second)] hover:text-white duration-200"} 
        flex items-center gap-5
       `}
    >
      <Icon className="size-7" strokeWidth={1} />
      <p className={"text-xl"}> {name} </p>
    </Link>
  );
};

export default NavButton;
