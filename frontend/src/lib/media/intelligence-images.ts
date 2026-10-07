export interface IntelligenceMedia {
  id: string;
  ticker: string;
  imageUrl: string;
  altText: string;
  caption: string;
}

export const INTELLIGENCE_MEDIA: Record<string, IntelligenceMedia> = {
  intel_1842: {
    id: "intel_1842",
    ticker: "AMD",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
    altText: "AMD Instinct MI350 accelerator cluster in Azure datacenter",
    caption: "AMD Instinct MI350 Deployment at Microsoft Azure",
  },
  intel_1843: {
    id: "intel_1843",
    ticker: "NVDA",
    imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80",
    altText: "NVIDIA GB200 NVL72 liquid-cooled rack architecture",
    caption: "NVIDIA Sovereign Datacenter NVLink Architecture",
  },
  intel_1835: {
    id: "intel_1835",
    ticker: "INTC",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    altText: "Intel Foundry 18A EUV cleanroom facility",
    caption: "Intel 18A PowerVia Silicon Fabrication",
  },
  intel_1820: {
    id: "intel_1820",
    ticker: "MSFT",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
    altText: "Microsoft Azure global hyperscale datacenter network",
    caption: "Microsoft Copilot & Cloud Infrastructure",
  },
  intel_1828: {
    id: "intel_1828",
    ticker: "GOOGL",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    altText: "Google TPU v6 Trillium optical compute network",
    caption: "Alphabet DeepMind Custom TPU Computing",
  },
  intel_1830: {
    id: "intel_1830",
    ticker: "AMZN",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    altText: "AWS Cloud datacenter server corridor with custom silicon",
    caption: "AWS Custom AI Silicon Infrastructure",
  },
  intel_1798: {
    id: "intel_1798",
    ticker: "NVDA",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    altText: "Cloud GPU compute capacity and server pricing telemetry",
    caption: "High-density cloud server racks",
  },
};

export function getIntelligenceMedia(id: string, fallbackTicker = "NVDA"): IntelligenceMedia {
  if (INTELLIGENCE_MEDIA[id]) {
    return INTELLIGENCE_MEDIA[id];
  }
  return {
    id,
    ticker: fallbackTicker,
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    altText: "Semiconductor enterprise telemetry",
    caption: "Enterprise Intelligence Briefing",
  };
}
