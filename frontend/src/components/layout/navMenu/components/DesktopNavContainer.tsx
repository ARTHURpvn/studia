import NavButton from "@/components/layout/navMenu/components/NavButton";

const DesktopNavContainer = () => {
  return (
    <nav className={"flex flex-col gap-4 mx-12 mt-4"}>
      <NavButton name="Buscar" />
      <NavButton name="Página Inicial" link="" />
      <NavButton name="Calendário" link="calendar" />
      <NavButton name="Matérias" link="materias" />
    </nav>
  );
};

export default DesktopNavContainer;
