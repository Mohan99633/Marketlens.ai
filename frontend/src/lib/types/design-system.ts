/**
 * MarketLens.ai Design System Types
 * Establishes domain visual tokens and state interfaces
 */

export type IntelligenceCategory =
  | "Product"
  | "Financial"
  | "Technology"
  | "Partnership"
  | "Acquisition"
  | "Regulatory"
  | "Strategy"
  | "Market";

export type ImpactLevel = "Critical" | "High" | "Medium" | "Low";

export type AlertSeverity = "Critical" | "High" | "Medium" | "Low";

export type LeonAgentState =
  | "Offline"
  | "Starting"
  | "Idle"
  | "Researching"
  | "Analyzing"
  | "Validating"
  | "Generating"
  | "Completed"
  | "Error";

export type ConnectionState =
  | "Connecting"
  | "Connected"
  | "Disconnected"
  | "Reconnecting";

export interface CategoryToken {
  label: IntelligenceCategory;
  color: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  iconName: string;
  description: string;
}

export interface SeverityToken {
  level: AlertSeverity;
  label: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  pulseColor: string;
}

export interface LeonStateToken {
  state: LeonAgentState;
  label: string;
  color: string;
  glowColor: string;
  description: string;
  pulseSpeed: "none" | "slow" | "normal" | "fast";
  accentHex: string;
}
