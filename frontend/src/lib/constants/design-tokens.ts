import {
  IntelligenceCategory,
  AlertSeverity,
  LeonAgentState,
  ConnectionState,
  CategoryToken,
  SeverityToken,
  LeonStateToken,
} from "../types/design-system";

/**
 * Mandatory Company Colors (Constant throughout MarketLens.ai)
 */
export const COMPANY_BRAND_COLORS: Record<string, { name: string; ticker: string; color: string; lightBg: string }> = {
  NVDA: {
    name: "NVIDIA",
    ticker: "NVDA",
    color: "#16803C",
    lightBg: "#E7F3E8",
  },
  AMD: {
    name: "AMD",
    ticker: "AMD",
    color: "#1769D1",
    lightBg: "#E7F0FC",
  },
  MSFT: {
    name: "Microsoft",
    ticker: "MSFT",
    color: "#E97817",
    lightBg: "#FFF0E3",
  },
  GOOGL: {
    name: "Alphabet",
    ticker: "GOOGL",
    color: "#D9A400",
    lightBg: "#FFFBD6",
  },
  AMZN: {
    name: "Amazon",
    ticker: "AMZN",
    color: "#6C4CE8",
    lightBg: "#EEE8FF",
  },
  INTC: {
    name: "Intel",
    ticker: "INTC",
    color: "#77736B",
    lightBg: "#E8E4DB",
  },
};

/**
 * Category tokens for MarketLens intelligence domain
 */
export const CATEGORY_TOKENS: Record<IntelligenceCategory, CategoryToken> = {
  Product: {
    label: "Product",
    color: "#1769D1", // Info Blue
    badgeBg: "bg-[#E7F0FC]",
    badgeText: "text-[#1769D1]",
    badgeBorder: "border-[#1769D1]/30",
    iconName: "Box",
    description: "Product launches, feature releases, product deprecations",
  },
  Financial: {
    label: "Financial",
    color: "#16803C", // Emerald
    badgeBg: "bg-[#E7F3E8]",
    badgeText: "text-[#16803C]",
    badgeBorder: "border-[#16803C]/30",
    iconName: "DollarSign",
    description: "Earnings reports, guidance, financial metrics, revenue",
  },
  Technology: {
    label: "Technology",
    color: "#16803C", // Technology Green / Emerald
    badgeBg: "bg-[#E7F3E8]",
    badgeText: "text-[#16803C]",
    badgeBorder: "border-[#16803C]/30",
    iconName: "Cpu",
    description: "Patents, tech architectures, AI models, benchmark results",
  },
  Partnership: {
    label: "Partnership",
    color: "#C77700", // Warning Amber
    badgeBg: "bg-[#FFF0D6]",
    badgeText: "text-[#C77700]",
    badgeBorder: "border-[#C77700]/30",
    iconName: "Handshake",
    description: "Strategic partnerships, joint ventures, OEM agreements",
  },
  Acquisition: {
    label: "Acquisition",
    color: "#E97817", // Market Orange
    badgeBg: "bg-[#FFF0E3]",
    badgeText: "text-[#E97817]",
    badgeBorder: "border-[#E97817]/30",
    iconName: "GitMerge",
    description: "Mergers, acquisitions, spin-offs, asset purchases",
  },
  Regulatory: {
    label: "Regulatory",
    color: "#C62828", // Danger Red
    badgeBg: "bg-[#F9E7E5]",
    badgeText: "text-[#C62828]",
    badgeBorder: "border-[#C62828]/30",
    iconName: "Scale",
    description: "Antitrust scrutiny, compliance, policy impacts, litigations",
  },
  Strategy: {
    label: "Strategy",
    color: "#16803C", // Strategy green
    badgeBg: "bg-[#E7F3E8]",
    badgeText: "text-[#16803C]",
    badgeBorder: "border-[#16803C]/30",
    iconName: "Compass",
    description: "Executive changes, organizational restructuring, pivots",
  },
  Market: {
    label: "Market",
    color: "#E97817", // Market Orange
    badgeBg: "bg-[#FFF0E3]",
    badgeText: "text-[#E97817]",
    badgeBorder: "border-[#E97817]/30",
    iconName: "TrendingUp",
    description: "Market share shifts, TAM expansion, consumer trends",
  },
};

/**
 * Severity & impact tokens matching reference badges
 */
export const SEVERITY_TOKENS: Record<AlertSeverity, SeverityToken> = {
  Critical: {
    level: "Critical",
    label: "Critical",
    color: "#C62828",
    badgeBg: "bg-[#F9E7E5]",
    badgeText: "text-[#C62828]",
    badgeBorder: "border-[#C62828]/30",
    pulseColor: "bg-[#C62828]",
  },
  High: {
    level: "High",
    label: "High",
    color: "#16803C", // Reference screenshots show green "High" badge e.g. NVIDIA High Technology
    badgeBg: "bg-[#E7F3E8]",
    badgeText: "text-[#16803C]",
    badgeBorder: "border-[#16803C]/30",
    pulseColor: "bg-[#16803C]",
  },
  Medium: {
    level: "Medium",
    label: "Medium",
    color: "#C77700", // Reference screenshots show amber "Medium" e.g. AMD Medium Partnership
    badgeBg: "bg-[#FFF0D6]",
    badgeText: "text-[#C77700]",
    badgeBorder: "border-[#C77700]/30",
    pulseColor: "bg-[#C77700]",
  },
  Low: {
    level: "Low",
    label: "Low",
    color: "#1769D1", // Reference screenshots show blue "Low" e.g. Google Low Product
    badgeBg: "bg-[#E7F0FC]",
    badgeText: "text-[#1769D1]",
    badgeBorder: "border-[#1769D1]/30",
    pulseColor: "bg-[#1769D1]",
  },
};

/**
 * Leon AI Agent State tokens
 */
export const LEON_STATE_TOKENS: Record<LeonAgentState, LeonStateToken> = {
  Idle: {
    state: "Idle",
    label: "Standby / Idle",
    color: "#11110F",
    glowColor: "rgba(17, 17, 15, 0.15)",
    description: "Monitoring ambient sources, ready for directive",
    pulseSpeed: "slow",
    accentHex: "#11110F",
  },
  Researching: {
    state: "Researching",
    label: "Autonomous Research",
    color: "#1769D1",
    glowColor: "rgba(23, 105, 209, 0.25)",
    description: "Actively querying multi-source knowledge vectors",
    pulseSpeed: "fast",
    accentHex: "#1769D1",
  },
  Analyzing: {
    state: "Analyzing",
    label: "Competitive Synthesis",
    color: "#6C4CE8",
    glowColor: "rgba(108, 76, 232, 0.25)",
    description: "Evaluating market positioning and strategic impact",
    pulseSpeed: "fast",
    accentHex: "#6C4CE8",
  },
  Validating: {
    state: "Validating",
    label: "Evidence Validation",
    color: "#C77700",
    glowColor: "rgba(199, 119, 0, 0.25)",
    description: "Cross-referencing citations and factual corroboration",
    pulseSpeed: "normal",
    accentHex: "#C77700",
  },
  Generating: {
    state: "Generating",
    label: "Intelligence Generation",
    color: "#16803C",
    glowColor: "rgba(22, 128, 60, 0.25)",
    description: "Compiling actionable insights and structural intelligence",
    pulseSpeed: "normal",
    accentHex: "#16803C",
  },
  Starting: {
    state: "Starting",
    label: "Initializing Runtime",
    color: "#6C4CE8",
    glowColor: "rgba(108, 76, 232, 0.25)",
    description: "Loading agent skills, MCP tools, and memory stores",
    pulseSpeed: "normal",
    accentHex: "#6C4CE8",
  },
  Completed: {
    state: "Completed",
    label: "Task Concluded",
    color: "#16803C",
    glowColor: "rgba(22, 128, 60, 0.2)",
    description: "Intelligence successfully synthesized and dispatched",
    pulseSpeed: "none",
    accentHex: "#16803C",
  },
  Error: {
    state: "Error",
    label: "System Fault",
    color: "#C62828",
    glowColor: "rgba(198, 40, 40, 0.3)",
    description: "Agent execution interrupted or task anomaly detected",
    pulseSpeed: "fast",
    accentHex: "#C62828",
  },
  Offline: {
    state: "Offline",
    label: "Subnet Disconnected",
    color: "#77736B",
    glowColor: "rgba(119, 115, 107, 0.15)",
    description: "Leon agent server unreachable or in maintenance mode",
    pulseSpeed: "none",
    accentHex: "#77736B",
  },
};

/**
 * WebSocket Connection state tokens
 */
export const CONNECTION_STATE_TOKENS: Record<
  ConnectionState,
  { label: string; color: string; ping: boolean }
> = {
  Connected: {
    label: "Realtime Link Active",
    color: "bg-[#16803C]",
    ping: true,
  },
  Connecting: {
    label: "Establishing Gateway Handshake...",
    color: "bg-[#C77700]",
    ping: true,
  },
  Reconnecting: {
    label: "Re-establishing Link...",
    color: "bg-[#E97817]",
    ping: true,
  },
  Disconnected: {
    label: "Gateway Link Offline",
    color: "bg-[#C62828]",
    ping: false,
  },
};
