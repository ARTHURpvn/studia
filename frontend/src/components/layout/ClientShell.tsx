"use client";

import TokenExpirationChecker from "@/components/auth/TokenExpirationChecker";
import NavBar from "@/components/layout/navMenu/NavBar";
import PathHeader from "@/components/layout/pathHeader/PathHeader";

const ClientShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Token expiration checker */}
      <TokenExpirationChecker />

      {/* Menu Desktop */}
      <aside className="hidden lg:block w-70 h-full">
        <NavBar />
      </aside>

      {/* Menu Mobile */}
      <div className="block lg:hidden">
        <NavBar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <nav className="w-full px-4 py-2">
          <PathHeader />
        </nav>

        <main className="flex-1 overflow-auto flex w-full justify-center max-lg:pb-34">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientShell;
