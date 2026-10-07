import { AlertItem } from "../types/models";

export const MOCK_ALERTS: AlertItem[] = [
  {
    id: "alert_301",
    title: "Critical Threat: Microsoft-AMD Azure Cluster Procurement Confirmed",
    message:
      "Microsoft Azure has executed a $4.2B contract for AMD Instinct MI350 clusters, introducing direct dual-vendor sourcing into NVIDIA's highest-margin cloud customer.",
    companyTicker: "NVDA",
    companyName: "NVIDIA Corporation",
    severity: "Critical",
    category: "Partnership",
    timestamp: "2026-10-06T18:30:00Z",
    read: false,
    relatedIntelligenceId: "intel_1842",
    actions: ["Investigate", "Compare NVDA vs AMD", "Ask Leon"],
  },
  {
    id: "alert_302",
    title: "Regulatory Warning: DOJ Civil Subpoena on Copilot & OpenAI Bundling",
    message:
      "DOJ Antitrust Division has opened a formal inquiry into enterprise Office 365 Copilot licensing terms and unbundling barriers.",
    companyTicker: "MSFT",
    companyName: "Microsoft Corporation",
    severity: "Critical",
    category: "Regulatory",
    timestamp: "2026-10-03T11:15:00Z",
    read: false,
    relatedIntelligenceId: "intel_1820",
    actions: ["Review Regulatory Impact", "Ask Leon"],
  },
  {
    id: "alert_303",
    title: "Competitive Shift: AWS Selects Intel 18A Node for AI Fabric Silicon",
    message:
      "AWS has committed to tape-out custom AI networking silicon on Intel's 18A node, providing Intel Foundry with its first tier-1 hyperscaler validation.",
    companyTicker: "INTC",
    companyName: "Intel Corporation",
    severity: "High",
    category: "Product",
    timestamp: "2026-10-05T10:00:00Z",
    read: false,
    relatedIntelligenceId: "intel_1835",
    actions: ["Inspect Intel Foundry Moat", "Compare with TSMC"],
  },
  {
    id: "alert_304",
    title: "Margin Pressure: Google Gemini In-House TPU Inference Reaches 40%",
    message:
      "Alphabet discloses 34% inference cost reduction by migrating 40% of public Gemini API queries from merchant GPUs to TPU v6 Trillium.",
    companyTicker: "GOOGL",
    companyName: "Alphabet Inc.",
    severity: "Medium",
    category: "Financial",
    timestamp: "2026-10-04T15:30:00Z",
    read: true,
    relatedIntelligenceId: "intel_1828",
    actions: ["View Efficiency Analysis", "Ask Leon"],
  },
  {
    id: "alert_305",
    title: "Market Normalization: Cloud GPU Spot Rental Rates Decline 18%",
    message:
      "8x H100 hourly on-demand rental rates dropped to $2.10/hour across tier-2 neocloud providers, reflecting capacity normalization.",
    companyTicker: "NVDA",
    companyName: "NVIDIA Corporation",
    severity: "Low",
    category: "Market",
    timestamp: "2026-09-28T15:00:00Z",
    read: true,
    relatedIntelligenceId: "intel_1798",
    actions: ["View Market Pricing Index"],
  },
];
