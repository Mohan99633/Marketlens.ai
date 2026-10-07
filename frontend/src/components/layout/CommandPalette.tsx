"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { searchGlobal } from "@/lib/mock";
import { SearchResult } from "@/lib/types/models";
import {
  Search,
  LayoutDashboard,
  Building2,
  BrainCircuit,
  Scale,
  Bell,
  FileText,
  Bot,
  Settings,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Keyboard shortcut listener for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // Live search when typing
  useEffect(() => {
    if (!query.trim()) return;

    let isCancelled = false;
    searchGlobal(query).then((res) => {
      if (!isCancelled) setSearchResults(res);
    });

    return () => {
      isCancelled = true;
    };
  }, [query]);

  const navigateTo = (url: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(url);
  };

  const coreCommands = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, category: "Navigation" },
    { label: "Companies Portfolio", href: "/companies", icon: Building2, category: "Navigation" },
    { label: "Intelligence Center", href: "/intelligence", icon: BrainCircuit, category: "Navigation" },
    { label: "Competitive Comparison", href: "/comparison", icon: Scale, category: "Navigation" },
    { label: "Alerts & Threat Signals", href: "/alerts", icon: Bell, category: "Navigation" },
    { label: "Intelligence Reports", href: "/reports", icon: FileText, category: "Navigation" },
    { label: "Leon (Agent Chat)", href: "/agent", icon: Bot, category: "Agent Chat" },
    { label: "Settings", href: "/settings", icon: Settings, category: "Preferences" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden bg-card border-border/80 shadow-2xl">
        <DialogHeader className="p-3 border-b border-border/80 bg-muted/20">
          <div className="flex items-center gap-2.5 px-2">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Type a command or search companies, intelligence, alerts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-foreground outline-hidden placeholder:text-muted-foreground/70"
              autoFocus
            />
            <kbd className="hidden sm:inline-block rounded border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ESC
            </kbd>
          </div>
          <DialogTitle className="sr-only">MarketLens Command Palette</DialogTitle>
        </DialogHeader>

        <div className="max-h-80 overflow-y-auto p-2 space-y-3">
          {/* Live Search Results */}
          {query.trim().length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Search Results ({searchResults.length})
              </div>
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground">
                  No matching companies, intelligence vectors, or reports found.
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((item) => (
                    <button
                      key={`${item.type}_${item.id}`}
                      onClick={() => navigateTo(item.url)}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-primary/10 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-foreground">
                          {item.badge || item.type.toUpperCase()}
                        </span>
                        <div className="min-w-0 truncate">
                          <p className="font-semibold text-foreground truncate">{item.title}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Core Commands */}
          {query.trim().length === 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Quick Navigation & Actions
              </div>
              <div className="space-y-0.5">
                {coreCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.href}
                      onClick={() => navigateTo(cmd.href)}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs hover:bg-muted/60 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground group-hover:text-primary">
                          <Icon className="size-3.5" />
                        </div>
                        <span className="font-semibold text-foreground">{cmd.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="p-2.5 border-t border-border/80 bg-muted/30 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3 text-primary" />
            <span>Leon AI Autonomous Search</span>
          </span>
          <span className="font-mono text-[10px]">Use ↑↓ to navigate • ↵ to select</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
