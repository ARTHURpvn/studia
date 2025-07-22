"use client";

import { SquarePenIcon } from "lucide-react";

import { useWindowSize } from "@/hooks/useWindowSize";

const Header = () => {
  const device: "mobile" | "desktop" = useWindowSize();
  return (
    <div
      className={"lg:w-full lg:bg-[var(--second)] lg:p-6 rounded-md relative"}
    >
      <h1 className={"text-3xl lg:text-4xl text-white"}>
        Matemática Discreta I
      </h1>

      <div className={"flex gap-4 mt-2 lg:mt-6"}>
        <div className={"flex gap-1"}>
          <p className={"text-white"}>Professor:</p>
          <p className={"font-light"}> Arthur </p>
        </div>

        {device === "desktop" && (
          <>
            <div className={"flex gap-1"}>
              <p className={"text-white"}>Criado em:</p>
              <p className={"font-light"}> 22/07/2025 às 16:15 </p>
            </div>

            <div className={"absolute right-2 top-2"}>
              <SquarePenIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
