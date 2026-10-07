export interface CompanyMedia {
  ticker: string;
  name: string;
  hero: string;
  datacenter: string;
  silicon: string;
  logo: string;
  brandColor: string;
}

export const COMPANY_MEDIA: Record<string, CompanyMedia> = {
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    hero: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80", // AI GPU board close-up
    datacenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80", // Modern server rack row
    silicon: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", // Silicon wafer micro-circuitry
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
    brandColor: "#76B900",
  },
  AMD: {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80", // High-tech semiconductor cluster
    datacenter: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80", // Datacenter server infrastructure
    silicon: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", // Advanced chip package
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
    brandColor: "#ED1C24",
  },
  INTC: {
    ticker: "INTC",
    name: "Intel Corporation",
    hero: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80", // Cleanroom semiconductor fabrication
    datacenter: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80", // Datacenter network corridor
    silicon: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80", // Microprocessor wafer
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg",
    brandColor: "#0071C5",
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", // Cloud global infrastructure globe
    datacenter: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80", // Azure style enterprise facility
    silicon: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80", // Custom AI accelerator silicon
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    brandColor: "#00A4EF",
  },
  GOOGL: {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    hero: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80", // Deep learning neural computing
    datacenter: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", // Modern hyperscale architecture
    silicon: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80", // TPU optical compute matrix
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    brandColor: "#4285F4",
  },
  AMZN: {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    hero: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", // Cloud compute infrastructure
    datacenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80", // AWS datacenter rack density
    silicon: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", // Trainium 2 custom silicon
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    brandColor: "#FF9900",
  },
};

export function getCompanyMedia(ticker: string): CompanyMedia {
  const t = ticker.toUpperCase();
  return (
    COMPANY_MEDIA[t] || {
      ticker: t,
      name: t,
      hero: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      datacenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      silicon: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      logo: "",
      brandColor: "#2563EB",
    }
  );
}
