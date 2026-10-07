"use client";

import React from "react";
import Link from "next/link";
import { ConnectionStatus } from "@/components/shared/connection-status";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, Menu, Bot, LogOut, Settings, ExternalLink } from "lucide-react";

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onOpenMobileNav: () => void;
  unreadCount?: number;
}

export function Topbar({
  onOpenCommandPalette,
  onOpenMobileNav,
  unreadCount = 3,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-15 items-center justify-between border-b border-border/80 bg-background/95 px-4 md:px-6 backdrop-blur-md">
      {/* Mobile Hamburger & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileNav}
          className="flex size-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:bg-muted md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" />
        </button>

        {/* Global Search Input Button (opens Command Palette) */}
        <button
          onClick={onOpenCommandPalette}
          className="flex h-9 w-full max-w-sm items-center gap-2 rounded-lg border border-border/80 bg-muted/40 px-3 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:bg-muted/70 focus:outline-hidden"
        >
          <Search className="size-3.5 text-muted-foreground" />
          <span className="truncate">Search intelligence, companies, alerts...</span>
          <kbd className="ml-auto hidden rounded border border-border/80 bg-card px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground sm:inline-block shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Realtime link indicator */}
        <div className="hidden sm:block">
          <ConnectionStatus state="Connected" />
        </div>

        {/* Leon Quick State Pill */}
        <Link
          href="/agent"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-bold text-cyan-700 dark:text-cyan-300 transition-all hover:bg-cyan-500/20"
        >
          <Bot className="size-3.5 text-cyan-600 dark:text-cyan-400" />
          <span className="font-mono">LEON: ACTIVE</span>
          <span className="size-1.5 rounded-full bg-cyan-500 animate-pulse" />
        </Link>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className="relative flex size-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:bg-muted/60 transition-colors"
                aria-label="View notifications"
              />
            }
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-2xs">
                {unreadCount}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-3 border-b border-border/60">
              <span className="text-xs font-bold text-foreground">Critical Intelligence Alerts</span>
              <span className="text-[10px] font-mono text-muted-foreground">{unreadCount} UNREAD</span>
            </div>
            <div className="p-2 space-y-1.5 max-h-64 overflow-y-auto">
              <Link
                href="/alerts"
                className="block p-2 rounded-lg bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 text-xs hover:bg-red-100/50 transition-colors"
              >
                <div className="flex items-center gap-1.5 font-bold text-red-700 dark:text-red-300">
                  <span className="size-1.5 rounded-full bg-red-500" />
                  NVDA: Microsoft Dual-Sourcing MI350
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  $4.2B multi-year Azure deployment announced.
                </div>
              </Link>
              <Link
                href="/alerts"
                className="block p-2 rounded-lg bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 text-xs hover:bg-orange-100/50 transition-colors"
              >
                <div className="flex items-center gap-1.5 font-bold text-orange-700 dark:text-orange-300">
                  <span className="size-1.5 rounded-full bg-orange-500" />
                  MSFT: DOJ Antitrust Copilot Inquiry
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  DOJ civil subpoena on Office 365 AI bundling.
                </div>
              </Link>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={
                <Link
                  href="/alerts"
                  className="w-full flex items-center justify-center text-xs font-semibold text-primary py-1"
                >
                  View All Alerts in Center
                </Link>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-1 pr-2.5 text-xs font-semibold text-foreground hover:bg-muted/70 transition-colors"
                aria-label="User account menu"
              />
            }
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold">
              ML
            </div>
            <span className="hidden sm:inline font-mono text-[11px]">DEMO USER</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-bold leading-none">Decision Maker (Demo)</p>
                <p className="text-[11px] leading-none text-muted-foreground">demo@marketlens.ai</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/settings" className="flex items-center gap-2 text-xs"><Settings className="size-3.5" /> Intelligence Settings</Link>} />
            <DropdownMenuItem render={<Link href="/agent" className="flex items-center gap-2 text-xs"><Bot className="size-3.5" /> Leon Brain Status</Link>} />
            <DropdownMenuItem render={<Link href="/design-system" className="flex items-center gap-2 text-xs"><ExternalLink className="size-3.5" /> Design System Showcase</Link>} />
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/login" className="flex items-center gap-2 text-xs text-rose-600"><LogOut className="size-3.5" /> Sign Out (Demo)</Link>} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
