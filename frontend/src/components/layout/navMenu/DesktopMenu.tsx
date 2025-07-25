"use client";

import {
  Calendar1Icon,
  CircleUserRoundIcon,
  HelpCircleIcon,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";

import DesktopNavContainer from "@/components/layout/navMenu/components/DesktopNavContainer";
import FolderTree from "@/components/layout/navMenu/components/FolderTree/FolderTree";
import NavButton from "@/components/layout/navMenu/components/NavButton";
import { DynamicForm } from "@/components/shared/DynamicForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/useAuthStore";

const DesktopMenu = () => {
  const { authUser } = useAuthStore.getState();
  return (
    <aside
      className={
        "w-70 h-full absolute left-0  top-0 bg-[var(--background)] border-r"
      }
    >
      <div className={"flex text-white items-center gap-6 p-4"}>
        <CircleUserRoundIcon className="size-9" strokeWidth={1.2} />
        <p className={"text-2xl font-bold"}>{authUser.username || ""}</p>
      </div>

      <DesktopNavContainer />

      <div className={"flex flex-col gap-3 mx-6 mt-8 pb-12 border-b"}>
        <p className={"font-bold"}>Pastas</p>
        <div>
          <FolderTree />
          <DialogFolder />
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

const DialogFolder = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant={"folder"}
          size={"folder"}
          className={"text-md"}
          onClick={() => setOpen(true)}
        >
          <PlusIcon /> Adicionar Pasta
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar uma Pasta</DialogTitle>
        </DialogHeader>

        <DynamicForm
          type={"folder"}
          action={"create"}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DesktopMenu;
