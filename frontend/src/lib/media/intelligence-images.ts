export interface IntelligenceMedia {
  id: string;
  ticker: string;
  imageUrl: string;
  altText: string;
  caption: string;
}

export const INTELLIGENCE_MEDIA: Record<string, IntelligenceMedia> = {
  intel_1843: {
    id: "intel_1843",
    ticker: "NVDA",
    imageUrl: "/images/nvda-blackwell.svg",
    altText: "NVIDIA GB200 NVL72 liquid-cooled rack architecture",
    caption: "NVIDIA Sovereign Datacenter NVLink Architecture",
  },
  intel_1842: {
    id: "intel_1842",
    ticker: "AMD",
    imageUrl: "/images/amd-mi350.svg",
    altText: "AMD Instinct MI350 accelerator cluster in Azure datacenter",
    caption: "AMD Instinct MI350 Deployment at Microsoft Azure",
  },
  intel_1820: {
    id: "intel_1820",
    ticker: "MSFT",
    imageUrl: "/images/msft-azure.svg",
    altText: "Microsoft Azure global hyperscale datacenter network",
    caption: "Microsoft Copilot & Cloud Infrastructure",
  },
  intel_1828: {
    id: "intel_1828",
    ticker: "GOOGL",
    imageUrl: "/images/googl-tpu.svg",
    altText: "Google TPU v6 Trillium optical compute network",
    caption: "Alphabet DeepMind Custom TPU Computing",
  },
  intel_1835: {
    id: "intel_1835",
    ticker: "INTC",
    imageUrl: "/images/intc-18a.svg",
    altText: "Intel Foundry 18A EUV cleanroom facility",
    caption: "Intel 18A PowerVia Silicon Fabrication",
  },
  intel_1830: {
    id: "intel_1830",
    ticker: "AMZN",
    imageUrl: "/images/amzn-silicon.svg",
    altText: "AWS Cloud datacenter server corridor with custom silicon",
    caption: "AWS Custom AI Silicon Infrastructure",
  },
  intel_1840: {
    id: "intel_1840",
    ticker: "NVDA",
    imageUrl: "/images/nvda-blackwell.svg",
    altText: "NVIDIA Sovereign NVLink 5.0 Rack Interconnect",
    caption: "NVIDIA Export-Compliant NVLink 5.0 Cluster",
  },
  intel_1798: {
    id: "intel_1798",
    ticker: "NVDA",
    imageUrl: "/images/nvda-blackwell.svg",
    altText: "Cloud GPU compute capacity and server pricing telemetry",
    caption: "High-density cloud server racks",
  },
};

export function getIntelligenceMedia(id: string, fallbackTicker = "NVDA"): IntelligenceMedia {
  if (INTELLIGENCE_MEDIA[id]) {
    return INTELLIGENCE_MEDIA[id];
  }
  const tickerMap: Record<string, string> = {
    NVDA: "/images/nvda-blackwell.svg",
    AMD: "/images/amd-mi350.svg",
    MSFT: "/images/msft-azure.svg",
    GOOGL: "/images/googl-tpu.svg",
    INTC: "/images/intc-18a.svg",
    AMZN: "/images/amzn-silicon.svg",
  };
  const t = fallbackTicker.toUpperCase();
  const url = tickerMap[t] || "/images/nvda-blackwell.svg";

  return {
    id,
    ticker: fallbackTicker,
    imageUrl: url,
    altText: `${fallbackTicker} Semiconductor Enterprise Telemetry`,
    caption: `${fallbackTicker} Enterprise Intelligence Briefing`,
  };
}
