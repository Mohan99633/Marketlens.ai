import { Company, IntelligenceItem, AlertItem, ReportItem, AgentTask, SearchResult } from "../types/models";
import { MOCK_COMPANIES } from "./companies";
import { MOCK_INTELLIGENCE } from "./intelligence";
import { MOCK_ALERTS } from "./alerts";
import { MOCK_REPORTS } from "./reports";
import { MOCK_AGENT_STATUS, MOCK_AGENT_TASKS, MOCK_WATCHERS, getSimulatedLeonResponse } from "./agent";

/**
 * Centralized Client-Side Data Service.
 * Mimics asynchronous REST/WebSocket endpoints so components can be wired
 * cleanly now and later replaced with FastAPI client calls without UI refactoring.
 */

export async function getCompanies(): Promise<Company[]> {
  return [...MOCK_COMPANIES];
}

export async function getCompanyById(idOrTicker: string): Promise<Company | undefined> {
  const query = idOrTicker.toUpperCase();
  return MOCK_COMPANIES.find(
    (c) => c.id === idOrTicker || c.ticker.toUpperCase() === query
  );
}

export async function getIntelligence(): Promise<IntelligenceItem[]> {
  return [...MOCK_INTELLIGENCE];
}

export async function getIntelligenceById(id: string): Promise<IntelligenceItem | undefined> {
  return MOCK_INTELLIGENCE.find((i) => i.id === id);
}

export async function getAlerts(): Promise<AlertItem[]> {
  return [...MOCK_ALERTS];
}

export async function getAlertById(id: string): Promise<AlertItem | undefined> {
  return MOCK_ALERTS.find((a) => a.id === id);
}

export async function getReports(): Promise<ReportItem[]> {
  return [...MOCK_REPORTS];
}

export async function getReportById(id: string): Promise<ReportItem | undefined> {
  return MOCK_REPORTS.find((r) => r.id === id);
}

export async function getAgentStatus() {
  return { ...MOCK_AGENT_STATUS };
}

export async function getAgentTasks(): Promise<AgentTask[]> {
  return [...MOCK_AGENT_TASKS];
}

export async function getAgentWatchers() {
  return [...MOCK_WATCHERS];
}

export { getSimulatedLeonResponse };

export async function searchGlobal(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search companies
  MOCK_COMPANIES.forEach((c) => {
    if (c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q)) {
      results.push({
        id: c.id,
        type: "company",
        title: `${c.name} (${c.ticker})`,
        subtitle: `${c.sector} • AI Score: ${c.aiScore}/100`,
        url: `/companies/${c.ticker.toLowerCase()}`,
        badge: c.ticker,
      });
    }
  });

  // Search intelligence
  MOCK_INTELLIGENCE.forEach((intel) => {
    if (
      intel.title.toLowerCase().includes(q) ||
      intel.summary.toLowerCase().includes(q) ||
      intel.companyTicker.toLowerCase().includes(q) ||
      intel.category.toLowerCase().includes(q)
    ) {
      results.push({
        id: intel.id,
        type: "intelligence",
        title: intel.title,
        subtitle: `${intel.companyTicker} • ${intel.category} • Impact: ${intel.impact}`,
        url: `/intelligence/${intel.id}`,
        badge: intel.category,
      });
    }
  });

  // Search alerts
  MOCK_ALERTS.forEach((a) => {
    if (a.title.toLowerCase().includes(q) || a.message.toLowerCase().includes(q) || a.companyTicker.toLowerCase().includes(q)) {
      results.push({
        id: a.id,
        type: "alert",
        title: a.title,
        subtitle: `${a.companyTicker} • Severity: ${a.severity}`,
        url: `/alerts`,
        badge: a.severity,
      });
    }
  });

  // Search reports
  MOCK_REPORTS.forEach((r) => {
    if (r.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.executiveSummary.toLowerCase().includes(q)) {
      results.push({
        id: r.id,
        type: "report",
        title: r.title,
        subtitle: `${r.type} • Status: ${r.status}`,
        url: `/reports/${r.id}`,
        badge: r.type,
      });
    }
  });

  return results.slice(0, 10);
}
