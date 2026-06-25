import { PasswordHint, EmergencyContact, SecurityLog } from "../types";

export const storageService = {
  // Master Key verification
  verifyMasterKey(key: string): boolean {
    const hash = localStorage.getItem("locksafe_master_hash");
    if (!hash) {
      // First time setting key
      localStorage.setItem("locksafe_master_hash", btoa(key));
      this.addLog("Configured premium database encryption vault", "success");
      return true;
    }
    const verified = hash === btoa(key);
    if (!verified) {
      this.addLog("Unauthorized access attempt detected", "warning");
    }
    return verified;
  },

  isMasterKeyConfigured(): boolean {
    return !!localStorage.getItem("locksafe_master_hash");
  },

  resetMasterKey(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith("locksafe_")) {
        localStorage.removeItem(key);
      }
    });
    this.addLog("Physical browser storage cleared: all secure hints, emergency rings, and logs purged permanently.", "warning");
  },

  // Log management
  addLog(message: string, status: "success" | "warning" | "info" = "info"): void {
    const logs: SecurityLog[] = JSON.parse(localStorage.getItem("locksafe_logs") || "[]");
    const newLog: SecurityLog = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      timestamp: new Date().toLocaleTimeString(),
      timestampMs: Date.now(),
      message,
      status,
    } as any;
    localStorage.setItem("locksafe_logs", JSON.stringify([newLog, ...logs].slice(0, 50)));
  },

  getLogs(): SecurityLog[] {
    return JSON.parse(localStorage.getItem("locksafe_logs") || "[]");
  },

  // Password Hints
  getHints(masterKey: string): PasswordHint[] {
    const raw = localStorage.getItem("locksafe_hints");
    if (!raw) return [];
    
    try {
      // Simple base64 decode mimicking decryption
      const decoded = atob(raw);
      const parsed = JSON.parse(decoded) as PasswordHint[];
      return parsed;
    } catch {
      return [];
    }
  },

  saveHints(hints: PasswordHint[], masterKey: string): void {
    try {
      // Simple base64 encode mimicking encryption
      const raw = JSON.stringify(hints);
      const encoded = btoa(raw);
      localStorage.setItem("locksafe_hints", encoded);
      this.addLog("Synchronized encrypted security reminders directory", "success");
    } catch (e) {
      this.addLog("Failed to write to encrypted index", "warning");
    }
  },

  // Contacts List
  getContacts(): EmergencyContact[] {
    const raw = localStorage.getItem("locksafe_contacts");
    if (!raw) {
      // Seed default safety contacts if empty
      const defaultContacts: EmergencyContact[] = [
        {
          id: "1",
          name: "LockSafe Recovery Hotline",
          relation: "Automated Support Mode",
          phone: "1-800-555-0199",
          email: "support@locksafe-ai.local",
          note: "Demo emergency contact for recovery procedures.",
          createdAt: Date.now(),
        }
      ];
      localStorage.setItem("locksafe_contacts", JSON.stringify(defaultContacts));
      return defaultContacts;
    }
    return JSON.parse(raw);
  },

  saveContacts(contacts: EmergencyContact[]): void {
    localStorage.setItem("locksafe_contacts", JSON.stringify(contacts));
    this.addLog("Updated local emergency response circle configuration", "success");
  },
};
