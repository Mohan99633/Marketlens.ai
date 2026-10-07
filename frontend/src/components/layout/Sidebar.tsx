"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  BrainCircuit,
  Scale,
  Bell,
  FileText,
  Bot,
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
    { label: "Intelligence", href: "/intelligence", icon: BrainCircuit },
    { label: "Comparison", href: "/comparison", icon: Scale },
    {
      label: "Alerts",
      href: "/alerts",
      icon: Bell,
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined,
      badgeColor: "bg-red-500 text-white",
    },
    { label: "Reports", href: "/reports", icon: FileText },
  ];

  const agentNavItems: NavItem[] = [
    {
      label: "Leon",
      href: "/agent",
      icon: Bot,
      badge: "LIVE",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40",
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
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-all select-none outline-none",
          isActive
            ? "bg-sidebar-accent text-sidebar-primary-foreground font-bold shadow-xs border-l-2 border-primary"
            : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon
          className={cn(
            "size-4 shrink-0 transition-transform group-hover:scale-105",
            isActive ? "text-primary" : "text-sidebar-foreground/70"
          )}
        />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {!collapsed && item.badge !== undefined && (
          <span
            className={cn(
              "ml-auto rounded px-1.5 py-0.2 font-mono text-[10px] font-bold tracking-wider",
              item.badgeColor || "bg-primary/20 text-primary"
            )}
          >
            {item.badge}
          </span>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.href}>
          <TooltipTrigger render={linkContent} />
          <TooltipContent side="right" className="text-xs font-medium">
            <p>{item.label}</p>
            {item.badge !== undefined && (
              <span className="text-[10px] text-muted-foreground ml-1">
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
        "relative flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200 z-30 shrink-0",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-15 items-center justify-between border-b border-sidebar-border px-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2.5 transition-opacity hover:opacity-90",
            collapsed && "justify-center w-full"
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs tracking-wider shadow-xs ring-1 ring-white/10">
            ML
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-tight text-sidebar-foreground">
                MARKETLENS.AI
              </span>
              <span className="text-[10px] font-mono text-sidebar-foreground/50 tracking-wider">
                INTELLIGENCE ENGINE
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div className="space-y-1">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-sidebar-foreground/50">
              Intelligence Core
            </div>
          )}
          {mainNavItems.map(renderNavLink)}
        </div>

        {/* Autonomous Agent Section */}
        <div className="space-y-1 pt-2 border-t border-sidebar-border/60">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-sidebar-foreground/50 flex items-center justify-between">
              <span>Agent Chat</span>
              <span className="size-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
          )}
          {agentNavItems.map(renderNavLink)}
        </div>
      </div>

      {/* Bottom Nav & Collapse Trigger */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {bottomNavItems.map(renderNavLink)}

        <button
          onClick={onToggleCollapse}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground select-none",
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
