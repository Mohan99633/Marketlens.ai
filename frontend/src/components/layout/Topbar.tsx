"use client";

import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, Menu, User, Settings, LogOut } from "lucide-react";

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onOpenMobileNav: () => void;
  unreadCount?: number;
}

export function Topbar({
  onOpenCommandPalette,
  onOpenMobileNav,
  unreadCount = 2,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center border-b border-[#DDD8CE] bg-[#F2EFE7]">
      <div className="w-full max-w-[1536px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile Hamburger & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onOpenMobileNav}
            className="flex size-8 items-center justify-center rounded-md border border-[#DDD8CE] text-[#4B4840] hover:bg-[#E8E4DB] md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
          </button>

          {/* Global Search Input Button (opens Command Palette) */}
          <button
            onClick={onOpenCommandPalette}
            className="flex h-9 w-full max-w-md items-center gap-2.5 rounded-md border border-[#DDD8CE] bg-[#E8E4DB] px-3.5 text-xs text-[#4B4840] transition-colors hover:border-[#C9C4B9] focus:outline-hidden"
          >
            <Search className="size-3.5 text-[#77736B] shrink-0" />
            <span className="truncate text-xs text-[#4B4840]">
              Search companies, intelligence, or ask Leon...
            </span>
            <kbd className="ml-auto hidden rounded border border-[#C9C4B9] bg-[#F8F6F0] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#77736B] sm:inline-block shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Controls: Notifications & Mohan Profile */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* Notification Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  className="relative flex size-8 items-center justify-center rounded-md text-[#11110F] hover:bg-[#E8E4DB] transition-colors"
                  aria-label="View notifications"
                />
              }
            >
              <Bell className="size-4 text-[#11110F]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#C62828] ring-2 ring-[#F2EFE7]" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-[#F8F6F0] border-[#C9C4B9]">
              <div className="flex items-center justify-between p-3 border-b border-[#DDD8CE]">
                <span className="text-xs font-bold text-[#11110F]">Market Alerts</span>
                <span className="text-[10px] font-mono text-[#77736B]">{unreadCount} UNREAD</span>
              </div>
              <div className="p-2 space-y-1.5 max-h-64 overflow-y-auto">
                <Link
                  href="/alerts"
                  className="block p-2 rounded-md bg-[#FFF0D6] border border-[#C77700]/30 text-xs hover:bg-[#FFF0D6]/80 transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-bold text-[#C77700]">
                    <span className="size-1.5 rounded-full bg-[#C77700]" />
                    NVDA: Next-Gen AI Chips Unveiled
                  </div>
                  <div className="text-[11px] text-[#4B4840] mt-0.5 truncate">
                    Blackwell Ultra chips announced with 2x performance jump.
                  </div>
                </Link>
                <Link
                  href="/alerts"
                  className="block p-2 rounded-md bg-[#E7F3E8] border border-[#16803C]/30 text-xs hover:bg-[#E7F3E8]/80 transition-colors"
                >
                  <div className="flex items-center gap-1.5 font-bold text-[#16803C]">
                    <span className="size-1.5 rounded-full bg-[#16803C]" />
                    AMD: Major Cloud Provider Partnership
                  </div>
                  <div className="text-[11px] text-[#4B4840] mt-0.5 truncate">
                    Multi-year AI accelerator agreement finalized.
                  </div>
                </Link>
              </div>
              <DropdownMenuSeparator className="bg-[#DDD8CE]" />
              <DropdownMenuItem
                render={
                  <Link
                    href="/alerts"
                    className="w-full flex items-center justify-center text-xs font-semibold text-[#11110F] py-1"
                  >
                    View All Alerts
                  </Link>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile: Mohan, Analyst */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  className="flex items-center gap-2.5 rounded-md p-1 pr-2 hover:bg-[#E8E4DB] transition-colors text-left"
                  aria-label="User account menu"
                />
              }
            >
              {/* Avatar Circle with "M" */}
              <div className="flex size-8 items-center justify-center rounded-full bg-[#DDD8CE] text-[#11110F] text-xs font-bold shrink-0">
                M
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-[#11110F]">Mohan</span>
                <span className="text-[11px] text-[#77736B]">Analyst</span>
              </div>
              <svg
                className="size-3.5 text-[#77736B] shrink-0 ml-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#F8F6F0] border-[#C9C4B9]">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-xs font-bold text-[#11110F]">Mohan</p>
                  <p className="text-[11px] text-[#77736B]">mohan@marketlens.ai</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#DDD8CE]" />
              <DropdownMenuItem
                render={
                  <Link href="/settings" className="flex items-center gap-2 text-xs text-[#11110F]">
                    <Settings className="size-3.5 text-[#77736B]" /> Platform Settings
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link href="/agent" className="flex items-center gap-2 text-xs text-[#11110F]">
                    <User className="size-3.5 text-[#77736B]" /> Ask Leon Assistant
                  </Link>
                }
              />
              <DropdownMenuSeparator className="bg-[#DDD8CE]" />
              <DropdownMenuItem
                render={
                  <Link href="/login" className="flex items-center gap-2 text-xs text-[#C62828]">
                    <LogOut className="size-3.5" /> Sign Out
                  </Link>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
