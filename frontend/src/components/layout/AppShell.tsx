"use client";

import React, { createContext, useContext, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandPalette } from "./CommandPalette";
import { LeonContextDrawer, LeonContext } from "./LeonContextDrawer";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AppShellContextType {
  openCommandPalette: () => void;
  askLeon: (context?: LeonContext) => void;
}

const AppShellContext = createContext<AppShellContextType>({
  openCommandPalette: () => {},
  askLeon: () => {},
});

export const useAppShell = () => useContext(AppShellContext);

interface AppShellProps {
  children: React.ReactNode;
  contentClassName?: string;
  noPadding?: boolean;
}

export function AppShell({ children, contentClassName, noPadding = false }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [leonDrawerOpen, setLeonDrawerOpen] = useState(false);
  const [activeLeonContext, setActiveLeonContext] = useState<LeonContext | undefined>(undefined);

  const askLeon = (context?: LeonContext) => {
    setActiveLeonContext(context);
    setLeonDrawerOpen(true);
  };

  const openCommandPalette = () => {
    setCmdPaletteOpen(true);
  };

  return (
    <AppShellContext.Provider value={{ openCommandPalette, askLeon }}>
      <div className="flex min-h-screen bg-[#F2EFE7] text-[#11110F] antialiased">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex shrink-0">
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Mobile Navigation Drawer */}
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="p-0 w-60 bg-[#F2EFE7] border-r border-[#DDD8CE]">
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
            <Sidebar
              collapsed={false}
              onToggleCollapse={() => setMobileNavOpen(false)}
              className="w-full border-r-0"
            />
          </SheetContent>
        </Sheet>

        {/* Main Application Column */}
        <div className="flex flex-1 flex-col min-w-0">
          <Topbar
            onOpenCommandPalette={openCommandPalette}
            onOpenMobileNav={() => setMobileNavOpen(true)}
          />

          <main
            className={cn(
              "flex-1 overflow-y-auto",
              noPadding ? "p-0" : "py-6 lg:py-8"
            )}
          >
            <div className={cn("w-full max-w-[1536px] mx-auto px-6 lg:px-8", contentClassName)}>
              {children}
            </div>
          </main>
        </div>

        {/* Global Modals */}
        <CommandPalette open={cmdPaletteOpen} onOpenChange={setCmdPaletteOpen} />
        <LeonContextDrawer
          open={leonDrawerOpen}
          onOpenChange={setLeonDrawerOpen}
          context={activeLeonContext}
        />
      </div>
    </AppShellContext.Provider>
  );
}
