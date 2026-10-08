export interface StockQuote {
  ticker: string;
  name: string;
  price: number;
  change1D: number;
  change1DPercent: number;
  change1MPercent: number;
  marketCapStr: string;
  marketCapValue: number; // in Billions
  revenueStr: string;
  revenueValue: number; // in Billions
  peRatio: number;
  momentum: "Strong ↑" | "Accelerating ↑" | "Moderate ↑" | "Stable →" | "Weakening ↓";
  momentumStatus: "surging" | "rising" | "moderate" | "stable" | "declining";
  latestSignal: string;
  signalCategory: "Product" | "Partnership" | "Technology" | "Regulatory" | "Financial";
  color: string;
  sparkline: number[];
}

export const MONITORED_MARKET_STOCKS: StockQuote[] = [
  {
    ticker: "NVDA",
    name: "NVIDIA",
    price: 1286.25,
    change1D: 30.12,
    change1DPercent: 2.4,
    change1MPercent: 28.4,
    marketCapStr: "$3.21T",
    marketCapValue: 3210,
    revenueStr: "$60.9B",
    revenueValue: 60.9,
    peRatio: 65.2,
    momentum: "Strong ↑",
    momentumStatus: "surging",
    latestSignal: "Next-gen Blackwell Ultra chips deliver 2x performance jump",
    signalCategory: "Product",
    color: "#16803C", // Mandatory NVIDIA Green
    sparkline: [1000, 1050, 1120, 1180, 1220, 1250, 1260, 1286.25],
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    price: 448.20,
    change1D: 3.56,
    change1DPercent: 0.8,
    change1MPercent: 8.3,
    marketCapStr: "$2.78T",
    marketCapValue: 2780,
    revenueStr: "$245.1B",
    revenueValue: 245.1,
    peRatio: 34.2,
    momentum: "Strong ↑",
    momentumStatus: "surging",
    latestSignal: "Expands Azure AI infrastructure footprint across global regions",
    signalCategory: "Technology",
    color: "#E97817", // Mandatory Microsoft Orange
    sparkline: [415, 420, 428, 432, 439, 442, 445, 448.2],
  },
  {
    ticker: "GOOGL",
    name: "Alphabet",
    price: 182.10,
    change1D: 1.98,
    change1DPercent: 1.1,
    change1MPercent: 6.5,
    marketCapStr: "$2.12T",
    marketCapValue: 2120,
    revenueStr: "$338.4B",
    revenueValue: 338.4,
    peRatio: 24.8,
    momentum: "Stable →",
    momentumStatus: "stable",
    latestSignal: "Releases updated Gemini model with enhanced reasoning capabilities",
    signalCategory: "Product",
    color: "#D9A400", // Mandatory Google Amber/Yellow
    sparkline: [171, 173, 175, 178, 179, 180, 181, 182.1],
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    price: 188.65,
    change1D: 1.68,
    change1DPercent: 0.9,
    change1MPercent: 4.2,
    marketCapStr: "$1.98T",
    marketCapValue: 1980,
    revenueStr: "$604.3B",
    revenueValue: 604.3,
    peRatio: 41.5,
    momentum: "Moderate ↑",
    momentumStatus: "moderate",
    latestSignal: "Increases investment in AI and cloud infrastructure by $10B",
    signalCategory: "Financial",
    color: "#6C4CE8", // Mandatory Amazon Purple
    sparkline: [181, 183, 184, 185, 186, 187, 188, 188.65],
  },
  {
    ticker: "AMD",
    name: "AMD",
    price: 143.28,
    change1D: 2.25,
    change1DPercent: 1.6,
    change1MPercent: 12.1,
    marketCapStr: "$289B",
    marketCapValue: 289,
    revenueStr: "$22.7B",
    revenueValue: 22.7,
    peRatio: 142.5,
    momentum: "Accelerating ↑",
    momentumStatus: "rising",
    latestSignal: "Announces strategic multi-year partnership with major cloud provider",
    signalCategory: "Partnership",
    color: "#1769D1", // Mandatory AMD Blue
    sparkline: [128, 131, 133, 136, 139, 141, 142, 143.28],
  },
  {
    ticker: "INTC",
    name: "Intel",
    price: 24.12,
    change1D: -0.07,
    change1DPercent: -0.3,
    change1MPercent: -2.1,
    marketCapStr: "$129B",
    marketCapValue: 129,
    revenueStr: "$54.2B",
    revenueValue: 54.2,
    peRatio: 28.6,
    momentum: "Weakening ↓",
    momentumStatus: "declining",
    latestSignal: "Announces restructuring plan to strengthen core foundry business",
    signalCategory: "Product",
    color: "#77736B", // Mandatory Intel Gray/Muted
    sparkline: [24.8, 24.7, 24.6, 24.5, 24.4, 24.3, 24.2, 24.12],
  },
];

export type TimeframeOption = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y";

export interface StockChartPoint {
  timestamp: string;
  dateLabel: string;
  NVDA: number;
  AMD: number;
  MSFT: number;
  GOOGL: number;
  AMZN: number;
  INTC: number;
  [key: string]: string | number;
}

// Generate realistic financial trajectories normalized by timeframe
export function getStockChartData(timeframe: TimeframeOption): StockChartPoint[] {
  const result: StockChartPoint[] = [];

  const timeLabels: Record<TimeframeOption, string[]> = {
    "1D": ["09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:00"],
    "1W": ["Dec 09", "Dec 10", "Dec 11", "Dec 12", "Dec 13", "Dec 14"],
    "1M": ["Nov 16", "Nov 23", "Nov 30", "Dec 7", "Dec 14"],
    "3M": ["Sep 16", "Oct 01", "Oct 16", "Nov 01", "Nov 16", "Dec 01", "Dec 14"],
    "6M": ["Jun 16", "Jul 16", "Aug 16", "Sep 16", "Oct 16", "Nov 16", "Dec 14"],
    "1Y": ["Dec '23", "Feb '24", "Apr '24", "Jun '24", "Aug '24", "Oct '24", "Dec '24"],
  };

  const labels = timeLabels[timeframe];
  const count = labels.length;

  // Percentage returns matching the reference frame at the end
  const finalReturns: Record<string, number> = {
    NVDA: 28.4,
    AMD: 12.1,
    MSFT: 8.3,
    GOOGL: 6.5,
    AMZN: 4.2,
    INTC: -2.1,
  };

  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const sineFactor = Math.sin(progress * Math.PI * 1.5);

    const getPct = (ticker: string) => {
      if (i === 0) return 0;
      if (i === count - 1) return finalReturns[ticker];
      const target = finalReturns[ticker];
      return Math.round((target * (progress * 0.8 + sineFactor * 0.2)) * 10) / 10;
    };

    result.push({
      timestamp: `T-${count - i}`,
      dateLabel: labels[i],
      NVDA: getPct("NVDA"),
      AMD: getPct("AMD"),
      MSFT: getPct("MSFT"),
      GOOGL: getPct("GOOGL"),
      AMZN: getPct("AMZN"),
      INTC: getPct("INTC"),
    });
  }

  return result;
}

export const LEON_MARKET_ASSESSMENT = {
  headline: "Hyperscale Dual-Sourcing Inflection",
  synthesis:
    "NVIDIA maintains dominant position in AI accelerators with Blackwell Ultra providing 2x training and inference uplift. AMD gains significant enterprise validation via multi-year cloud partnerships, while Microsoft expands sovereign datacenter footprint globally.",
  confidence: 0.94,
  primarySignalTicker: "NVDA",
  generatedAt: "2024-12-16T10:32:00Z",
};
