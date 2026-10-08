"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  TrendingUp,
  Bell,
  FileText,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  unreadAlertsCount?: number;
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  unreadAlertsCount = 3,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  const mainNavItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Companies", href: "/companies", icon: Building2 },
    { label: "Intelligence", href: "/intelligence", icon: ShieldCheck },
    { label: "Comparison", href: "/comparison", icon: TrendingUp },
    {
      label: "Alerts",
      href: "/alerts",
      icon: Bell,
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined,
      badgeColor: "bg-[#C62828] text-white",
    },
    { label: "Reports", href: "/reports", icon: FileText },
  ];

  const agentNavItems: NavItem[] = [
    {
      label: "Leon",
      href: "/agent",
      icon: User,
      badge: "LIVE",
      badgeColor: "bg-[#E7F3E8] text-[#16803C] border border-[#16803C]/30",
    },
  ];

  const bottomNavItems: NavItem[] = [
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const renderNavLink = (item: NavItem) => {
    const isActive =
      pathname === item.href ||
      (item.href !== "/dashboard" && pathname.startsWith(item.href));
    const Icon = item.icon;

    const linkContent = (
      <Link
        href={item.href}
        className={cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-colors select-none outline-none",
          isActive
            ? "bg-[#11110F] text-[#F8F6F0] font-semibold shadow-xs"
            : "text-[#4B4840] hover:bg-[#E8E4DB] hover:text-[#11110F]",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon
          className={cn(
            "size-4 shrink-0 transition-transform",
            isActive ? "text-[#F8F6F0]" : "text-[#4B4840] group-hover:text-[#11110F]"
          )}
        />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {!collapsed && item.badge !== undefined && (
          <span
            className={cn(
              "ml-auto rounded-full px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider flex items-center gap-1",
              item.badgeColor || (isActive ? "bg-white/20 text-white" : "bg-[#DDD8CE] text-[#11110F]")
            )}
          >
            {item.badge === "LIVE" && <span className="size-1.5 rounded-full bg-[#16803C] animate-pulse" />}
            {item.badge}
          </span>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.href}>
          <TooltipTrigger render={linkContent} />
          <TooltipContent side="right" className="text-xs font-medium bg-[#11110F] text-white">
            <p>{item.label}</p>
            {item.badge !== undefined && (
              <span className="text-[10px] text-zinc-300 ml-1">
                ({item.badge})
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.href}>{linkContent}</div>;
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-[#DDD8CE] bg-[#F2EFE7] text-[#11110F] transition-all duration-200 z-30 shrink-0 select-none",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-[#DDD8CE] px-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2.5 transition-opacity hover:opacity-90",
            collapsed && "justify-center w-full"
          )}
        >
          {/* Logo Mark: 4 black vertical bars */}
          <div className="flex items-end gap-0.5 h-5 shrink-0 px-0.5">
            <span className="w-1 h-3.5 bg-[#11110F] rounded-xs" />
            <span className="w-1 h-5 bg-[#11110F] rounded-xs" />
            <span className="w-1 h-4 bg-[#11110F] rounded-xs" />
            <span className="w-1 h-4.5 bg-[#11110F] rounded-xs" />
          </div>
          {!collapsed && (
            <span className="text-base font-bold tracking-tight text-[#11110F]">
              MarketLens.ai
            </span>
          )}
        </Link>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div className="space-y-1">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#77736B]">
              Intelligence Core
            </div>
          )}
          {mainNavItems.map(renderNavLink)}
        </div>

        {/* Agent Chat Section */}
        <div className="space-y-1 pt-2">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#77736B]">
              Agent Chat
            </div>
          )}
          {agentNavItems.map(renderNavLink)}
        </div>
      </div>

      {/* Bottom Nav & Collapse Trigger */}
      <div className="border-t border-[#DDD8CE] p-3 space-y-2">
        {bottomNavItems.map(renderNavLink)}

        <button
          onClick={onToggleCollapse}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs text-[#77736B] transition-colors hover:bg-[#E8E4DB] hover:text-[#11110F] select-none",
            collapsed && "justify-center"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="size-4 shrink-0" />
              <span className="text-[11px] font-medium">Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
