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
 * Category tokens for MarketLens intelligence domain
 */
export const CATEGORY_TOKENS: Record<IntelligenceCategory, CategoryToken> = {
  Product: {
    label: "Product",
    color: "#4f46e5", // Indigo
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/40",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    badgeBorder: "border-indigo-200 dark:border-indigo-800",
    iconName: "Box",
    description: "Product launches, feature releases, product deprecations",
  },
  Financial: {
    label: "Financial",
    color: "#059669", // Emerald
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    badgeBorder: "border-emerald-200 dark:border-emerald-800",
    iconName: "DollarSign",
    description: "Earnings reports, guidance, financial metrics, revenue",
  },
  Technology: {
    label: "Technology",
    color: "#0284c7", // Sky
    badgeBg: "bg-sky-50 dark:bg-sky-950/40",
    badgeText: "text-sky-700 dark:text-sky-300",
    badgeBorder: "border-sky-200 dark:border-sky-800",
    iconName: "Cpu",
    description: "Patents, tech architectures, AI models, benchmark results",
  },
  Partnership: {
    label: "Partnership",
    color: "#7c3aed", // Violet
    badgeBg: "bg-violet-50 dark:bg-violet-950/40",
    badgeText: "text-violet-700 dark:text-violet-300",
    badgeBorder: "border-violet-200 dark:border-violet-800",
    iconName: "Handshake",
    description: "Strategic partnerships, joint ventures, OEM agreements",
  },
  Acquisition: {
    label: "Acquisition",
    color: "#d97706", // Amber
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-200 dark:border-amber-800",
    iconName: "GitMerge",
    description: "Mergers, acquisitions, spin-offs, asset purchases",
  },
  Regulatory: {
    label: "Regulatory",
    color: "#e11d48", // Rose
    badgeBg: "bg-rose-50 dark:bg-rose-950/40",
    badgeText: "text-rose-700 dark:text-rose-300",
    badgeBorder: "border-rose-200 dark:border-rose-800",
    iconName: "Scale",
    description: "Antitrust scrutiny, compliance, policy impacts, litigations",
  },
  Strategy: {
    label: "Strategy",
    color: "#2563eb", // Blue
    badgeBg: "bg-blue-50 dark:bg-blue-950/40",
    badgeText: "text-blue-700 dark:text-blue-300",
    badgeBorder: "border-blue-200 dark:border-blue-800",
    iconName: "Compass",
    description: "Executive changes, organizational restructuring, pivots",
  },
  Market: {
    label: "Market",
    color: "#0d9488", // Teal
    badgeBg: "bg-teal-50 dark:bg-teal-950/40",
    badgeText: "text-teal-700 dark:text-teal-300",
    badgeBorder: "border-teal-200 dark:border-teal-800",
    iconName: "TrendingUp",
    description: "Market share shifts, TAM expansion, consumer trends",
  },
};

/**
 * Severity & impact tokens
 */
export const SEVERITY_TOKENS: Record<AlertSeverity, SeverityToken> = {
  Critical: {
    level: "Critical",
    label: "Critical",
    color: "#dc2626", // Red-600
    badgeBg: "bg-red-50 dark:bg-red-950/50",
    badgeText: "text-red-700 dark:text-red-300",
    badgeBorder: "border-red-200 dark:border-red-800",
    pulseColor: "bg-red-500",
  },
  High: {
    level: "High",
    label: "High",
    color: "#ea580c", // Orange-600
    badgeBg: "bg-orange-50 dark:bg-orange-950/50",
    badgeText: "text-orange-700 dark:text-orange-300",
    badgeBorder: "border-orange-200 dark:border-orange-800",
    pulseColor: "bg-orange-500",
  },
  Medium: {
    level: "Medium",
    label: "Medium",
    color: "#d97706", // Amber-600
    badgeBg: "bg-amber-50 dark:bg-amber-950/50",
    badgeText: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-200 dark:border-amber-800",
    pulseColor: "bg-amber-500",
  },
  Low: {
    level: "Low",
    label: "Low",
    color: "#64748b", // Slate-500
    badgeBg: "bg-slate-50 dark:bg-slate-900/50",
    badgeText: "text-slate-700 dark:text-slate-300",
    badgeBorder: "border-slate-200 dark:border-slate-800",
    pulseColor: "bg-slate-400",
  },
};

/**
 * Leon AI Agent State tokens
 */
export const LEON_STATE_TOKENS: Record<LeonAgentState, LeonStateToken> = {
  Idle: {
    state: "Idle",
    label: "Standby / Idle",
    color: "#3b82f6", // Blue
    glowColor: "rgba(59, 130, 246, 0.35)",
    description: "Monitoring ambient sources, ready for directive",
    pulseSpeed: "slow",
    accentHex: "#3b82f6",
  },
  Researching: {
    state: "Researching",
    label: "Autonomous Research",
    color: "#06b6d4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.45)",
    description: "Actively querying multi-source knowledge vectors",
    pulseSpeed: "fast",
    accentHex: "#06b6d4",
  },
  Analyzing: {
    state: "Analyzing",
    label: "Competitive Synthesis",
    color: "#6366f1", // Indigo
    glowColor: "rgba(99, 102, 241, 0.45)",
    description: "Evaluating market positioning and strategic impact",
    pulseSpeed: "fast",
    accentHex: "#6366f1",
  },
  Validating: {
    state: "Validating",
    label: "Evidence Validation",
    color: "#f59e0b", // Amber
    glowColor: "rgba(245, 158, 11, 0.4)",
    description: "Cross-referencing citations and factual corroboration",
    pulseSpeed: "normal",
    accentHex: "#f59e0b",
  },
  Generating: {
    state: "Generating",
    label: "Intelligence Generation",
    color: "#10b981", // Emerald
    glowColor: "rgba(16, 185, 129, 0.45)",
    description: "Compiling actionable insights and structural intelligence",
    pulseSpeed: "normal",
    accentHex: "#10b981",
  },
  Starting: {
    state: "Starting",
    label: "Initializing Runtime",
    color: "#8b5cf6", // Purple
    glowColor: "rgba(139, 92, 246, 0.35)",
    description: "Loading agent skills, MCP tools, and memory stores",
    pulseSpeed: "normal",
    accentHex: "#8b5cf6",
  },
  Completed: {
    state: "Completed",
    label: "Task Concluded",
    color: "#10b981", // Emerald
    glowColor: "rgba(16, 185, 129, 0.3)",
    description: "Intelligence successfully synthesized and dispatched",
    pulseSpeed: "none",
    accentHex: "#10b981",
  },
  Error: {
    state: "Error",
    label: "System Fault",
    color: "#ef4444", // Red
    glowColor: "rgba(239, 68, 68, 0.5)",
    description: "Agent execution interrupted or task anomaly detected",
    pulseSpeed: "fast",
    accentHex: "#ef4444",
  },
  Offline: {
    state: "Offline",
    label: "Subnet Disconnected",
    color: "#64748b", // Slate
    glowColor: "rgba(100, 116, 139, 0.15)",
    description: "Leon agent server unreachable or in maintenance mode",
    pulseSpeed: "none",
    accentHex: "#64748b",
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
    color: "bg-emerald-500",
    ping: true,
  },
  Connecting: {
    label: "Establishing Gateway Handshake...",
    color: "bg-amber-500",
    ping: true,
  },
  Reconnecting: {
    label: "Re-establishing Link...",
    color: "bg-orange-500",
    ping: true,
  },
  Disconnected: {
    label: "Gateway Link Offline",
    color: "bg-rose-500",
    ping: false,
  },
};
