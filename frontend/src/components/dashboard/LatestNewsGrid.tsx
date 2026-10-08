"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IntelligenceItem } from "@/lib/types/models";
import { getIntelligence } from "@/lib/mock";
import { getIntelligenceMedia } from "@/lib/media/intelligence-images";
import { SafeImage } from "@/components/shared/safe-image";
import { CategoryBadge } from "@/components/shared/category-badge";
import { SeverityBadge } from "@/components/shared/severity-badge";
import {
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function LatestNewsGrid() {
  const router = useRouter();
  const [items, setItems] = useState<IntelligenceItem[]>([]);
  const [lastUpdatedSec, setLastUpdatedSec] = useState(18);

  useEffect(() => {
    getIntelligence().then((data) => {
      setItems(data.slice(0, 6)); // Top 6 high-impact developments
    });

    const timer = setInterval(() => {
      setLastUpdatedSec((prev) => (prev > 60 ? 12 : prev + 3));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              LATEST NEWS & INTELLIGENCE
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-muted text-muted-foreground border border-border">
              Simulated Feed
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Recent developments across your competitive landscape.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Updated {lastUpdatedSec} sec ago</span>
          </span>
          <Link
            href="/intelligence"
            className="font-semibold text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <span>All Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => {
          const media = getIntelligenceMedia(item.id, item.companyTicker);
          const timeAgo = formatTimeAgo(item.timestamp);

          return (
            <article
              key={item.id}
              onClick={() => router.push(`/intelligence/${item.id}`)}
              className="bg-card rounded-md border border-border shadow-xs overflow-hidden flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/50"
            >
              <div>
                {/* Real-World Technology / Datacenter Image with 3D Hover Scale */}
                <div className="w-full h-44 relative overflow-hidden bg-[#11110F]">
                  <SafeImage
                    src={media.imageUrl}
                    alt={media.altText}
                    fallbackTicker={item.companyTicker}
                    enableHoverEffect={true}
                    className="h-full w-full opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11110F]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#11110F]/90 text-[#F5F2EA] backdrop-blur-xs border border-[#F5F2EA]/10 shadow-xs">
                      {item.companyTicker}
                    </span>
                    <CategoryBadge category={item.category} />
                  </div>

                  <div className="absolute top-3 right-3">
                    <SeverityBadge severity={item.impact} />
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 text-[11px] text-[#F5F2EA]/90 font-medium truncate drop-shadow-xs">
                    {media.caption}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="text-sm font-bold text-foreground leading-snug group-hover:opacity-80 transition-opacity line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* WHY IT MATTERS Section */}
                  <div className="p-2.5 rounded-md bg-background border border-border text-xs space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                      Why It Matters
                    </span>
                    <p className="text-[11px] text-foreground leading-relaxed line-clamp-2">
                      {item.leonAnalysis.marketImpact}
                    </p>
                  </div>

                  {/* LEON ASSESSMENT Section */}
                  <div className="p-2.5 rounded-md bg-muted/50 border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-primary" />
                        Leon Assessment
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                        [AI ASSESSMENT]
                      </span>
                    </div>
                    <p className="text-[11px] text-foreground leading-relaxed line-clamp-2">
                      {item.leonAnalysis.competitiveImplications}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 sm:p-5 pt-0 border-t border-border mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>
                    {item.sources.length} sources · {timeAgo}
                  </span>
                </span>

                <span className="font-semibold text-primary group-hover:text-primary/80 flex items-center gap-1 transition-colors text-xs">
                  <span>View Intelligence</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function formatTimeAgo(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  } catch {
    return "2h ago";
  }
}
