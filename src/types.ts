export enum AppTab {
  DASHBOARD = "dashboard",
  HINTS = "hints",
  CONTACTS = "contacts",
  RECOVERY = "recovery",
  SETTINGS = "settings",
}

export interface PasswordHint {
  id: string;
  label: string;
  hintText: string;
  createdAt: number;
  patternSequence?: number[];
  isPattern?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email?: string;
  note?: string;
  createdAt: number;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  message: string;
  status: "success" | "warning" | "info";
}
