import React, { useState, useEffect } from "react";
import { AppTab, SecurityLog } from "../types";
import { storageService } from "../services/storageService";
import { useLanguage } from "../services/LanguageContext";
import { MasterKeyConfigModal } from "../components/MasterKeyConfigModal";
import { 
  KeyRound, 
  Users, 
  ArrowRight, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from "lucide-react";

interface DashboardProps {
  hintsCount: number;
  contactsCount: number;
  onNavigate: (tab: AppTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ hintsCount, contactsCount, onNavigate }) => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [isVaultInitialized, setIsVaultInitialized] = useState<boolean>(storageService.isMasterKeyConfigured());
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const { t, formatDateTime } = useLanguage();

  useEffect(() => {
    setIsVaultInitialized(storageService.isMasterKeyConfigured());
    setLogs(storageService.getLogs().slice(0, 5));
  }, [hintsCount, contactsCount]);

  return (
    <div className="space-y-8 animate-fade-in font-sans" id="dashboard-screen">
      {/* Overview stats layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hints Stat Card */}
        <div className="bg-white border border-slate-150/60 rounded-3xl p-6 shadow-sm hover-lift hover-glow-amber transition-all duration-300 flex flex-col justify-between group border-b-[3px] border-b-amber-500/20">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-3 bg-amber-500/5 text-amber-600 rounded-2xl border border-amber-500/10">
                <KeyRound size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 truncate max-w-[150px]">
                {t("dashboard.keyspaceHints")}
              </span>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mt-6 tracking-tight leading-none">
              {hintsCount}
            </h3>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              {t("dashboard.keyspaceDesc")}
            </p>
          </div>
          <button 
            onClick={() => onNavigate(AppTab.HINTS)}
            className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors pt-4 border-t border-slate-100/60 cursor-pointer self-start w-full group"
          >
            <span>{t("dashboard.decryptHintRegistry")}</span>
            <ArrowRight size={13} className="ml-auto group-hover:translate-x-1 transition-transform duration-350 ease-smooth" />
          </button>
        </div>

        {/* Contacts Stat Card */}
        <div className="bg-white border border-slate-150/60 rounded-3xl p-6 shadow-sm hover-lift hover-glow-rose transition-all duration-300 flex flex-col justify-between group border-b-[3px] border-b-rose-500/20">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-3 bg-rose-500/5 text-rose-600 rounded-2xl border border-rose-500/10">
                <Users size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 truncate max-w-[150px]">
                {t("dashboard.guardians")}
              </span>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mt-6 tracking-tight leading-none">
              {contactsCount}
            </h3>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              {t("dashboard.guardiansDesc")}
            </p>
          </div>
          <button 
            onClick={() => onNavigate(AppTab.CONTACTS)}
            className="mt-6 flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors pt-4 border-t border-slate-100/60 cursor-pointer self-start w-full group"
          >
            <span>{t("dashboard.manageSafetyRings")}</span>
            <ArrowRight size={13} className="ml-auto group-hover:translate-x-1 transition-transform duration-350 ease-smooth" />
          </button>
        </div>

        {/* Playbook Quick Start */}
        <div className="bg-white border border-slate-150/60 rounded-3xl p-6 shadow-sm hover-lift hover-glow-emerald transition-all duration-300 flex flex-col justify-between group border-b-[3px] border-b-emerald-500/20 md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between">
              <span className="p-3 bg-emerald-500/5 text-emerald-600 rounded-2xl border border-emerald-500/10">
                <ShieldCheck size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 truncate max-w-[150px]">
                {t("dashboard.guides")}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-6 tracking-tight leading-none">
              {t("dashboard.threatHandbook")}
            </h3>
            <p className="text-xs text-slate-500 mt-2.5 font-medium leading-relaxed">
              {t("dashboard.threatHandbookDesc")}
            </p>
          </div>
          <button 
            onClick={() => onNavigate(AppTab.RECOVERY)}
            className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors pt-4 border-t border-slate-100/60 cursor-pointer self-start w-full group"
          >
            <span>{t("dashboard.loadContingencySheets")}</span>
            <ArrowRight size={13} className="ml-auto group-hover:translate-x-1 transition-transform duration-350 ease-smooth" />
          </button>
        </div>
      </section>

      {/* Main Section Grid for Security Checklist & Live Local Log */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security Readiness Checklist */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6 md:p-8 shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm tracking-tight mb-6 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-slate-800" />
            <span>{t("dashboard.auditTitle")}</span>
          </h4>

          <div className="space-y-4">
            <div 
              onClick={() => setIsConfigModalOpen(true)}
       className="flex flex-row items-center justify-between gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 hover:bg-slate-100/50 hover:border-blue-500/20 hover:shadow-sm transition duration-200 cursor-pointer group/card focus:outline-none focus:ring-2 focus:ring-blue-500/10"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsConfigModalOpen(true);
                }
              }}
            >
              <span className={`p-2 rounded-xl mt-0.5 border self-start group-hover/card:scale-105 transition-all duration-300 ${
                isVaultInitialized 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100/40" 
                  : "bg-amber-50 text-amber-500 border-amber-100/40"
              }`}>
                <ShieldCheck size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-800 leading-snug group-hover/card:text-blue-600 transition-colors">{t("dashboard.masterVault")}</h5>
                  <span className={`text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.8 rounded-lg transition-all duration-200 ${
                    isVaultInitialized 
                      ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/15" 
                      : "bg-amber-500/15 text-amber-700 border border-amber-500/25 animate-pulse"
                  }`}>
                    {isVaultInitialized ? t("dashboard.securedStatus") : t("dashboard.configRequiredStatus")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed">
                  {t("dashboard.masterVaultDesc")}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 hover:bg-slate-50 transition duration-200">
              <span className={`p-2 rounded-xl mt-0.5 border self-start ${
                hintsCount > 0 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100/40" 
                  : "bg-slate-150 text-slate-400 border-slate-200/40"
              }`}>
                <KeyRound size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-800 leading-snug">{t("dashboard.cluesRegistered")}</h5>
                  <span className={`text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.8 rounded-lg ${
                    hintsCount > 0 
                      ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/15" 
                      : "bg-slate-100 text-slate-400 border border-slate-200/10"
                  }`}>
                    {hintsCount > 0 ? t("dashboard.populatedStatus") : t("dashboard.emptyStatus")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed">
                  {t("dashboard.cluesRegisteredDesc")}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 hover:bg-slate-50 transition duration-200">
              <span className={`p-2 rounded-xl mt-0.5 border self-start ${
                contactsCount > 0 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100/40" 
                  : "bg-slate-150 text-slate-400 border-slate-200/40"
              }`}>
                <Users size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-800 leading-snug">{t("dashboard.trustRing")}</h5>
                  <span className={`text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.8 rounded-lg ${
                    contactsCount > 0 
                      ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/15" 
                      : "bg-slate-100 text-slate-400 border border-slate-200/10"
                  }`}>
                    {contactsCount > 0 ? t("dashboard.onlineStatus") : t("dashboard.noGuardiansStatus")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed">
                  {t("dashboard.trustRingDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time local security logs */}
        <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between text-slate-200">
          <div>
            <h4 className="font-bold text-white text-sm tracking-tight mb-6 flex items-center justify-between gap-2 flex-wrap">
              <span className="flex items-center gap-2">
                <Terminal size={18} className="text-blue-400 animate-pulse" />
                <span>{t("dashboard.sandboxLog")}</span>
              </span>
              <span className="text-[9px] font-mono bg-slate-800 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-700 tracking-wider">
                {t("dashboard.ramBuffer")}
              </span>
            </h4>

            {logs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xs text-slate-500 italic">{t("dashboard.noLogs")}</p>
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                {logs.map((log) => (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-850">
                    <span className="text-[10px] text-slate-500 mt-0.5 font-bold tracking-tight shrink-0 font-mono">
                      [{log.timestampMs ? formatDateTime(log.timestampMs) : log.timestamp}]
                    </span>
                    <span className="flex-1 text-slate-300 leading-normal font-sans font-medium text-[11.5px] break-words">
                      {log.message}
                    </span>
                    <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 self-end sm:self-start ${
                      log.status === "success" 
                        ? "bg-emerald-400 shadow-sm shadow-emerald-400/40" 
                        : log.status === "warning" 
                        ? "bg-amber-400 shadow-sm shadow-amber-400/40" 
                        : "bg-blue-400 shadow-sm shadow-blue-400/40"
                    }`}></span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-slate-800/80 pt-5 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <span className="text-[9px] text-slate-500 font-mono text-center sm:text-left">
              {t("dashboard.localEndpointAlert")}
            </span>
            <button 
              onClick={() => {
                storageService.addLog("Triggered manual log inspection sequence", "info");
                setLogs(storageService.getLogs().slice(0, 5));
              }}
              className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase font-mono tracking-wider cursor-pointer bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/10 truncate"
            >
              {t("dashboard.forceRefresh")}
            </button>
          </div>
        </div>
      </section>

      <MasterKeyConfigModal 
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onConfigured={(password) => {
          setIsConfigModalOpen(false);
          setIsVaultInitialized(true);
          setLogs(storageService.getLogs().slice(0, 5));
        }}
      />
    </div>
  );
};

export default Dashboard;
