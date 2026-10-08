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
    hero: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
    datacenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    silicon: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    logo: "",
    brandColor: "#16803C",
  },
  AMD: {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    datacenter: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    silicon: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    logo: "",
    brandColor: "#1769D1",
  },
  INTC: {
    ticker: "INTC",
    name: "Intel Corporation",
    hero: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    datacenter: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
    silicon: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80",
    logo: "",
    brandColor: "#77736B",
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    datacenter: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    silicon: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    logo: "",
    brandColor: "#E97817",
  },
  GOOGL: {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    hero: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    datacenter: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    silicon: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80",
    logo: "",
    brandColor: "#D9A400",
  },
  AMZN: {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    hero: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    datacenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    silicon: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    logo: "",
    brandColor: "#6C4CE8",
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
      brandColor: "#11110F",
    }
  );
}
