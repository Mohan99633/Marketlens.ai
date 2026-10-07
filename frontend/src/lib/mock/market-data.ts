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
    price: 185.42,
    change1D: 5.12,
    change1DPercent: 2.84,
    change1MPercent: 14.8,
    marketCapStr: "$4.52T",
    marketCapValue: 4520,
    revenueStr: "$130.5B",
    revenueValue: 130.5,
    peRatio: 52.4,
    momentum: "Strong ↑",
    momentumStatus: "surging",
    latestSignal: "Blackwell B200 volume ramp & NVLink 5.0 sovereign deployments",
    signalCategory: "Product",
    color: "#2563EB", // Primary Blue
    sparkline: [172, 175, 173, 178, 180, 179, 182, 185.42],
  },
  {
    ticker: "AMD",
    name: "AMD",
    price: 214.31,
    change1D: 4.04,
    change1DPercent: 1.92,
    change1MPercent: 18.4,
    marketCapStr: "$347.0B",
    marketCapValue: 347,
    revenueStr: "$28.2B",
    revenueValue: 28.2,
    peRatio: 38.6,
    momentum: "Accelerating ↑",
    momentumStatus: "rising",
    latestSignal: "Microsoft Azure $4.2B Instinct MI350 cluster commitment",
    signalCategory: "Partnership",
    color: "#EA580C", // Orange
    sparkline: [195, 198, 201, 204, 200, 208, 211, 214.31],
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    price: 448.20,
    change1D: 5.10,
    change1DPercent: 1.15,
    change1MPercent: 6.2,
    marketCapStr: "$3.34T",
    marketCapValue: 3340,
    revenueStr: "$245.1B",
    revenueValue: 245.1,
    peRatio: 34.2,
    momentum: "Strong ↑",
    momentumStatus: "surging",
    latestSignal: "Azure AI multi-vendor accelerator abstraction & Copilot monetization",
    signalCategory: "Technology",
    color: "#7C3AED", // Purple
    sparkline: [432, 436, 435, 439, 442, 440, 444, 448.2],
  },
  {
    ticker: "GOOGL",
    name: "Google (Alphabet)",
    price: 182.10,
    change1D: 1.54,
    change1DPercent: 0.85,
    change1MPercent: 4.9,
    marketCapStr: "$2.28T",
    marketCapValue: 2280,
    revenueStr: "$338.4B",
    revenueValue: 338.4,
    peRatio: 24.8,
    momentum: "Stable →",
    momentumStatus: "stable",
    latestSignal: "Gemini query migration to custom TPU v6 Trillium reduces unit cost 34%",
    signalCategory: "Financial",
    color: "#059669", // Emerald
    sparkline: [175, 177, 176, 178, 179, 181, 180, 182.1],
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    price: 188.65,
    change1D: 2.61,
    change1DPercent: 1.40,
    change1MPercent: 7.1,
    marketCapStr: "$1.96T",
    marketCapValue: 1960,
    revenueStr: "$604.3B",
    revenueValue: 604.3,
    peRatio: 41.5,
    momentum: "Moderate ↑",
    momentumStatus: "moderate",
    latestSignal: "AWS Trainium 2 clusters taped-out for enterprise foundation model inference",
    signalCategory: "Technology",
    color: "#D97706", // Amber
    sparkline: [178, 181, 180, 183, 185, 184, 186, 188.65],
  },
  {
    ticker: "INTC",
    name: "Intel",
    price: 24.80,
    change1D: -0.36,
    change1DPercent: -1.45,
    change1MPercent: -6.4,
    marketCapStr: "$106.0B",
    marketCapValue: 106,
    revenueStr: "$54.2B",
    revenueValue: 54.2,
    peRatio: 22.1,
    momentum: "Weakening ↓",
    momentumStatus: "declining",
    latestSignal: "AWS multi-billion custom silicon deal validates 18A node turnaround",
    signalCategory: "Product",
    color: "#0284C7", // Sky Blue
    sparkline: [27.5, 27.0, 26.8, 26.2, 25.5, 25.0, 25.2, 24.8],
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

// Generate realistic financial line coordinates for each timeframe
export function getStockChartData(timeframe: TimeframeOption): StockChartPoint[] {
  const result: StockChartPoint[] = [];

  const timeLabels: Record<TimeframeOption, string[]> = {
    "1D": ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
    "1W": ["Mon 09:30", "Mon 16:00", "Tue 09:30", "Tue 16:00", "Wed 09:30", "Wed 16:00", "Thu 09:30", "Thu 16:00", "Fri 09:30", "Fri 12:00", "Fri 14:00", "Fri 16:00"],
    "1M": ["Sep 08", "Sep 11", "Sep 14", "Sep 17", "Sep 20", "Sep 23", "Sep 26", "Sep 29", "Oct 01", "Oct 03", "Oct 04", "Oct 05", "Oct 06", "Oct 07", "Oct 08", "Today"],
    "3M": ["Jul 10", "Jul 17", "Jul 24", "Jul 31", "Aug 07", "Aug 14", "Aug 21", "Aug 28", "Sep 04", "Sep 11", "Sep 18", "Sep 25", "Oct 02", "Oct 04", "Oct 06", "Today"],
    "6M": ["Apr 15", "May 01", "May 15", "Jun 01", "Jun 15", "Jul 01", "Jul 15", "Aug 01", "Aug 15", "Sep 01", "Sep 15", "Sep 25", "Oct 01", "Oct 04", "Oct 06", "Today"],
    "1Y": ["Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26", "Apr '26", "May '26", "Jun '26", "Jul '26", "Aug '26", "Sep '26", "Sep '26", "Oct '26", "Oct '26", "Today"],
  };

  const labels = timeLabels[timeframe];

  // Base offsets for percentage gain representation
  const trajectories: Record<TimeframeOption, { [ticker: string]: { start: number; end: number; variance: number } }> = {
    "1D": {
      NVDA: { start: 180.3, end: 185.42, variance: 1.8 },
      AMD: { start: 210.27, end: 214.31, variance: 2.1 },
      MSFT: { start: 443.1, end: 448.2, variance: 1.2 },
      GOOGL: { start: 180.56, end: 182.1, variance: 0.9 },
      AMZN: { start: 186.04, end: 188.65, variance: 1.4 },
      INTC: { start: 25.16, end: 24.8, variance: 0.4 },
    },
    "1W": {
      NVDA: { start: 178.5, end: 185.42, variance: 3.2 },
      AMD: { start: 202.4, end: 214.31, variance: 4.5 },
      MSFT: { start: 438.0, end: 448.2, variance: 2.5 },
      GOOGL: { start: 177.2, end: 182.1, variance: 1.8 },
      AMZN: { start: 182.5, end: 188.65, variance: 2.6 },
      INTC: { start: 26.2, end: 24.8, variance: 0.8 },
    },
    "1M": {
      NVDA: { start: 162.3, end: 185.42, variance: 5.5 },
      AMD: { start: 181.0, end: 214.31, variance: 6.8 },
      MSFT: { start: 422.0, end: 448.2, variance: 4.2 },
      GOOGL: { start: 173.5, end: 182.1, variance: 3.1 },
      AMZN: { start: 176.0, end: 188.65, variance: 3.8 },
      INTC: { start: 26.5, end: 24.8, variance: 1.2 },
    },
    "3M": {
      NVDA: { start: 135.0, end: 185.42, variance: 8.2 },
      AMD: { start: 154.0, end: 214.31, variance: 9.5 },
      MSFT: { start: 395.0, end: 448.2, variance: 6.0 },
      GOOGL: { start: 165.0, end: 182.1, variance: 5.2 },
      AMZN: { start: 168.0, end: 188.65, variance: 5.5 },
      INTC: { start: 31.0, end: 24.8, variance: 2.1 },
    },
    "6M": {
      NVDA: { start: 110.0, end: 185.42, variance: 12.0 },
      AMD: { start: 142.0, end: 214.31, variance: 11.5 },
      MSFT: { start: 380.0, end: 448.2, variance: 8.5 },
      GOOGL: { start: 152.0, end: 182.1, variance: 7.1 },
      AMZN: { start: 155.0, end: 188.65, variance: 8.0 },
      INTC: { start: 36.5, end: 24.8, variance: 3.5 },
    },
    "1Y": {
      NVDA: { start: 82.0, end: 185.42, variance: 18.0 },
      AMD: { start: 115.0, end: 214.31, variance: 16.0 },
      MSFT: { start: 345.0, end: 448.2, variance: 12.0 },
      GOOGL: { start: 136.0, end: 182.1, variance: 9.5 },
      AMZN: { start: 132.0, end: 188.65, variance: 11.0 },
      INTC: { start: 42.0, end: 24.8, variance: 5.0 },
    },
  };

  const traj = trajectories[timeframe];
  const count = labels.length;

  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const sineFactor = Math.sin((i / count) * Math.PI * 2);

    const calcPrice = (ticker: string) => {
      const { start, end, variance } = traj[ticker];
      const trend = start + (end - start) * progress;
      const noise = (sineFactor * variance * (i % 2 === 0 ? 0.7 : -0.5)) + (i === count - 1 ? 0 : 0.2);
      return Math.round((trend + noise) * 100) / 100;
    };

    result.push({
      timestamp: `T-${count - i}`,
      dateLabel: labels[i],
      NVDA: i === count - 1 ? 185.42 : calcPrice("NVDA"),
      AMD: i === count - 1 ? 214.31 : calcPrice("AMD"),
      MSFT: i === count - 1 ? 448.20 : calcPrice("MSFT"),
      GOOGL: i === count - 1 ? 182.10 : calcPrice("GOOGL"),
      AMZN: i === count - 1 ? 188.65 : calcPrice("AMZN"),
      INTC: i === count - 1 ? 24.80 : calcPrice("INTC"),
    });
  }

  return result;
}

export const LEON_MARKET_ASSESSMENT = {
  headline: "Hyperscale Dual-Sourcing Inflection",
  synthesis:
    "AMD's recent AI infrastructure expansion with Microsoft Azure is accelerating multi-vendor diversification across Tier-1 cloud datacenters. While NVIDIA preserves an 82% margin moat in frontier training clusters via NVLink 5.0, inference workloads are rapidly migrating toward open-source PyTorch/Triton frameworks, compressing merchant chip margins over the next 18 months.",
  confidence: 0.94,
  primarySignalTicker: "AMD",
  generatedAt: "2026-10-08T01:00:00Z",
};
