import {
  IntelligenceCategory,
  AlertSeverity,
  LeonAgentState,
} from "./design-system";

export interface Company {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  marketCap: string;
  revenue: string;
  revenueGrowth: string;
  netIncome: string;
  stockPrice: string;
  stockChange1M: string;
  status: "Monitored" | "Analyzing" | "Idle";
  aiScore: number;
  pulse: {
    competitiveScore: number;
    momentum: "Surging" | "Rising" | "Stable" | "Declining";
    threatLevel: AlertSeverity;
    innovation: number;
    marketPower: number;
    technologyStrength: number;
  };
  overview: string;
  products: { name: string; category: string; marketShare: string }[];
  financials: {
    quarter: string;
    revenue: string;
    operatingMargin: string;
    rdExpense: string;
  }[];
  technology: string[];
  news: { title: string; date: string; source: string; url: string }[];
  partnerships: { partner: string; scope: string; date: string }[];
  acquisitions: { target: string; value: string; date: string }[];
  strategy: string;
  leonAssessment: {
    summary: string;
    strategicMoat: string;
    keyVulnerability: string;
    outlook: string;
    confidence: number;
    generatedAt: string;
  };
}

export interface SourceCitation {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt: string;
  credibility: "Primary SEC" | "Official Press" | "Verified Media" | "Industry Research";
}

export interface IntelligenceItem {
  id: string;
  title: string;
  companyId: string;
  companyTicker: string;
  companyName: string;
  category: IntelligenceCategory;
  impact: AlertSeverity;
  timestamp: string;
  summary: string;
  evidence: string[];
  sources: SourceCitation[];
  relatedCompanies: string[];
  relatedIntelligenceIds: string[];
  leonAnalysis: {
    competitiveImplications: string;
    marketImpact: string;
    threatAssessment: {
      to: string;
      level: AlertSeverity;
      reasoning: string;
    };
    recommendedActions: string[];
  };
  verified: boolean;
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  companyTicker: string;
  companyName: string;
  severity: AlertSeverity;
  category: IntelligenceCategory;
  timestamp: string;
  read: boolean;
  relatedIntelligenceId: string;
  actions: string[];
}

export interface ReportItem {
  id: string;
  title: string;
  type:
    | "Company Report"
    | "Competitor Report"
    | "Weekly Intelligence"
    | "Monthly Intelligence"
    | "Industry Report"
    | "Custom Investigation";
  targetCompanyTicker?: string;
  status: "Requested" | "Researching" | "Analyzing" | "Generating" | "Completed";
  createdAt: string;
  completedAt?: string;
  progressPercent: number;
  currentPhase: string;
  executiveSummary: string;
  keyFindings: string[];
  competitiveImplications: string;
  sourceCount: number;
  intelligenceCount: number;
  sections: { title: string; content: string }[];
  metadata: {
    confidence: number;
    durationSeconds: number;
  };
}

export interface AgentTask {
  id: string;
  operation: string;
  subject: string;
  status: "active" | "completed" | "failed" | "paused";
  state: LeonAgentState;
  progress: {
    phase: string;
    sourcesGathered: number;
    sourcesAnalyzed: number;
    insightsGenerated: number;
    message: string;
  };
  createdAt: string;
  completedAt?: string;
}

export interface SearchResult {
  id: string;
  type: "company" | "intelligence" | "alert" | "report";
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
}
