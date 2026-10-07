import { AgentTask } from "../types/models";
import { LeonAgentState } from "../types/design-system";

export interface AgentWatcher {
  id: string;
  targetTicker: string;
  targetName: string;
  criteria: string;
  frequency: "Continuous" | "Hourly" | "Daily";
  activeSince: string;
  status: "Watching" | "Triggered" | "Paused";
  lastTriggered?: string;
  triggerCount: number;
}

export const MOCK_AGENT_STATUS: {
  state: LeonAgentState;
  uptimeSeconds: number;
  activeTasksCount: number;
  totalIntelligenceGenerated: number;
  totalSourcesIndexed: number;
  accuracyConfidence: number;
  frameworkVersion: string;
  serverLocation: string;
  lastSync: string;
} = {
  state: "Researching",
  uptimeSeconds: 142850,
  activeTasksCount: 2,
  totalIntelligenceGenerated: 1248,
  totalSourcesIndexed: 28410,
  accuracyConfidence: 0.942,
  frameworkVersion: "Hermes v0.3.1 (Autonomous Engine)",
  serverLocation: "AWS EC2 Server 2 (Private Subnet)",
  lastSync: "2026-10-07T17:28:45Z",
};

export const MOCK_AGENT_TASKS: AgentTask[] = [
  {
    id: "task_9k8j7h6g",
    operation: "investigate",
    subject: "AMD & Microsoft Azure Datacenter MI350 Deployment Verification",
    status: "active",
    state: "Researching",
    progress: {
      phase: "Cross-referencing SEC disclosures & PyTorch commit logs",
      sourcesGathered: 18,
      sourcesAnalyzed: 11,
      insightsGenerated: 4,
      message: "Parsing Azure deployment timelines from AMD 8-K filings...",
    },
    createdAt: "2026-10-06T18:20:00Z",
  },
  {
    id: "task_4f7e2c1a",
    operation: "generate_report",
    subject: "Alphabet Full-Stack AI Moat & Custom Silicon Cost Economics",
    status: "active",
    state: "Generating",
    progress: {
      phase: "Compiling financial comparative matrix for TPU v6 Trillium",
      sourcesGathered: 24,
      sourcesAnalyzed: 22,
      insightsGenerated: 7,
      message: "Validating TPU v6 token pricing against OpenAI API costs...",
    },
    createdAt: "2026-10-06T20:10:00Z",
  },
  {
    id: "task_8b3a1d9e",
    operation: "monitor",
    subject: "NVIDIA Sovereign Datacenter Export NVLink Waiver Status",
    status: "completed",
    state: "Completed",
    progress: {
      phase: "Investigation Concluded",
      sourcesGathered: 14,
      sourcesAnalyzed: 14,
      insightsGenerated: 3,
      message: "Export-compliant NVLink 5.0 rack architecture confirmed.",
    },
    createdAt: "2026-10-06T11:00:00Z",
    completedAt: "2026-10-06T12:10:00Z",
  },
  {
    id: "task_2c5d8e7b",
    operation: "research",
    subject: "Intel 18A PowerVia Yields & AWS Hyperscaler Silicon Order",
    status: "completed",
    state: "Completed",
    progress: {
      phase: "Investigation Concluded",
      sourcesGathered: 19,
      sourcesAnalyzed: 19,
      insightsGenerated: 5,
      message: "AWS custom AI fabric order verified via joint corporate statements.",
    },
    createdAt: "2026-10-05T08:30:00Z",
    completedAt: "2026-10-05T09:45:00Z",
  },
  {
    id: "task_1a4f6e8c",
    operation: "investigate",
    subject: "DOJ Civil Antitrust Subpoena on Microsoft 365 Copilot Bundling",
    status: "completed",
    state: "Completed",
    progress: {
      phase: "Investigation Concluded",
      sourcesGathered: 16,
      sourcesAnalyzed: 16,
      insightsGenerated: 4,
      message: "DOJ inquiry and EU parallel complaints validated.",
    },
    createdAt: "2026-10-03T09:15:00Z",
    completedAt: "2026-10-03T11:00:00Z",
  },
];

export const MOCK_WATCHERS: AgentWatcher[] = [
  {
    id: "watch_01",
    targetTicker: "NVDA",
    targetName: "NVIDIA Corporation",
    criteria: "Hyperscaler volume pricing adjustments & CoWoS packaging allocation shifts",
    frequency: "Continuous",
    activeSince: "2026-08-01",
    status: "Watching",
    triggerCount: 14,
  },
  {
    id: "watch_02",
    targetTicker: "AMD",
    targetName: "Advanced Micro Devices",
    criteria: "ROCm PyTorch benchmark pull requests & Instinct MI350 cloud availability",
    frequency: "Continuous",
    activeSince: "2026-08-15",
    status: "Triggered",
    lastTriggered: "2026-10-06T18:24:00Z",
    triggerCount: 8,
  },
  {
    id: "watch_03",
    targetTicker: "INTC",
    targetName: "Intel Corporation",
    criteria: "18A tape-outs, CHIPS Act grant payouts, Foveros packaging yields",
    frequency: "Hourly",
    activeSince: "2026-09-01",
    status: "Watching",
    triggerCount: 5,
  },
  {
    id: "watch_04",
    targetTicker: "MSFT",
    targetName: "Microsoft Corporation",
    criteria: "DOJ antitrust filings & Azure OpenAI GPU dual-sourcing contracts",
    frequency: "Continuous",
    activeSince: "2026-07-20",
    status: "Triggered",
    lastTriggered: "2026-10-03T11:00:00Z",
    triggerCount: 12,
  },
];

/**
 * Contextual simulated responses from Leon based on input and target context.
 */
export function getSimulatedLeonResponse(
  message: string,
  context?: {
    type?: string;
    id?: string;
    company?: string;
    category?: string;
    impact?: string;
  }
): {
  response: string;
  confidence: number;
  sourcesUsed: number;
  citations: { title: string; url: string; relevance: number }[];
  suggestedFollowUps: string[];
} {
  const company = context?.company || "the target company";

  if (message.toLowerCase().includes("why is this important") || message.toLowerCase().includes("importance")) {
    return {
      response: `This development concerning ${company} is critical because it directly threatens existing datacenter pricing power. When tier-1 hyperscalers establish formal secondary sourcing, it eliminates single-vendor hardware lock-in and sets a pricing ceiling on subsequent rack generation deployments. Based on my analysis of 18 SEC filings and server telemetry logs, this could shift market share by 5-8% over the next 18 months.`,
      confidence: 0.93,
      sourcesUsed: 8,
      citations: [
        { title: `${company} Material Definitive Agreement (SEC 8-K)`, url: "#", relevance: 0.98 },
        { title: "Azure Next-Gen Server Architecture Blog", url: "#", relevance: 0.94 },
        { title: "SemiAnalysis Datacenter Compute Report", url: "#", relevance: 0.91 },
      ],
      suggestedFollowUps: [
        "What is the estimated impact on NVIDIA's operating margin?",
        "How quickly can AMD scale MI350 volume through TSMC?",
        "Compare this with Intel's Gaudi 3 adoption.",
      ],
    };
  }

  if (message.toLowerCase().includes("compare") || message.toLowerCase().includes("versus") || message.toLowerCase().includes("vs")) {
    return {
      response: `Comparing ${company} with its primary competitors: On pure training compute density, NVIDIA maintains a 15-20% lead with NVLink 5.0. However, on raw memory capacity and cost-per-token for high-volume inference, AMD holds an advantage with 288GB HBM3E at an estimated 32% lower total cost of ownership. Intel trails in accelerator volume but leads in sovereign US manufacturing incentives via 18A.`,
      confidence: 0.91,
      sourcesUsed: 12,
      citations: [
        { title: "Blackwell vs Instinct Architecture Whitepaper", url: "#", relevance: 0.96 },
        { title: "Fortune 500 Enterprise AI Capex Survey", url: "#", relevance: 0.89 },
      ],
      suggestedFollowUps: [
        "Show memory bandwidth comparison table.",
        "Generate a full Competitor Report.",
        "Monitor developer migration on Hugging Face.",
      ],
    };
  }

  // Default intelligent synthesis response
  return {
    response: `I have analyzed your query regarding ${company}. Current intelligence vectors indicate that recent developments are accelerating multi-vendor diversification across enterprise cloud infrastructure. My evidence validation layer corroborates these findings with 94.2% factual confidence across primary regulatory filings and industry benchmarks.`,
    confidence: 0.89,
    sourcesUsed: 6,
    citations: [
      { title: `${company} Quarterly 10-Q Financial Filing`, url: "#", relevance: 0.95 },
      { title: "Validated Industry Benchmark Repository", url: "#", relevance: 0.90 },
    ],
    suggestedFollowUps: [
      "Why is this important for enterprise decision makers?",
      "What should be investigated next?",
      "Generate an executive briefing report.",
    ],
  };
}
