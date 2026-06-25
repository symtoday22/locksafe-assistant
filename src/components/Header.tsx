import React, { useState, useEffect } from "react";
import { AppTab } from "../types";
import { ShieldAlert, KeyRound, LayoutDashboard, Library, Settings, Timer, Globe } from "lucide-react";
import { sessionService } from "../services/sessionService";
import { useLanguage, Language } from "../services/LanguageContext";

interface HeaderProps {
  activeTab: AppTab;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const updateSessionStatus = () => {
      setIsSessionActive(sessionService.isSessionActive());
      setSecondsLeft(sessionService.getInactivitySecondsLeft());
    };

    updateSessionStatus();
    const unsubscribe = sessionService.subscribe(updateSessionStatus);

    const interval = setInterval(() => {
      if (sessionService.isSessionActive()) {
        setSecondsLeft(sessionService.getInactivitySecondsLeft());
      }
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getHeaderDetails = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return {
          title: t("header.dashboardTitle"),
          subtitle: t("header.dashboardSubtitle"),
          icon: LayoutDashboard,
          color: "text-blue-500",
        };
      case AppTab.HINTS:
        return {
          title: t("header.hintsTitle"),
          subtitle: t("header.hintsSubtitle"),
          icon: KeyRound,
          color: "text-amber-500",
        };
      case AppTab.CONTACTS:
        return {
          title: t("header.contactsTitle"),
          subtitle: t("header.contactsSubtitle"),
          icon: ShieldAlert,
          color: "text-rose-500",
        };
      case AppTab.RECOVERY:
        return {
          title: t("header.recoveryTitle"),
          subtitle: t("header.recoverySubtitle"),
          icon: Library,
          color: "text-emerald-500",
        };
      case AppTab.SETTINGS:
        return {
          title: t("header.settingsTitle"),
          subtitle: t("header.settingsSubtitle"),
          icon: Settings,
          color: "text-slate-500",
        };
      default:
        return {
          title: t("header.portalTitle"),
          subtitle: t("header.portalSubtitle"),
          icon: ShieldAlert,
          color: "text-blue-500",
        };
    }
  };

  const { title, subtitle, icon: Icon, color } = getHeaderDetails();

  return (
    <header 
      id="main-app-header" 
      className="bg-white border-b border-slate-100/80 px-6 md:px-8 py-5 md:py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm shadow-slate-100/40"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-slate-50 rounded-2xl ${color} border border-slate-150/50 flex-shrink-0 flex items-center justify-center`}>
          <Icon size={20} className="animate-pulse-subtle" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
            {title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 max-w-lg font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Trust seal, language selector and active volatile countdown */}
      <div className="self-start lg:self-auto flex flex-wrap items-center gap-3">
        {/* Language selector */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-150 rounded-xl px-2.5 py-1.5 shadow-sm">
          <Globe size={14} className="text-slate-400" />
          <select
            id="language-selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer pr-1"
          >
            <option value="en">English (EN)</option>
            <option value="zh">中文 (ZH)</option>
            <option value="es">Español (ES)</option>
            <option value="ja">日本語 (JA)</option>
          </select>
        </div>

        {isSessionActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/[0.05] border border-amber-500/10 rounded-xl text-[10px] font-bold text-amber-600 font-mono tracking-wider shadow-sm select-none">
            <Timer size={12} className="animate-pulse text-amber-500" />
            <span>{t("header.keysExpire", { time: formatTime(secondsLeft) })}</span>
          </div>
        )}

        <div className="flex items-center gap-2 px-3 py-1.8 bg-emerald-500/[0.04] border border-emerald-500/10 rounded-xl text-[10px] font-bold text-emerald-600 font-mono tracking-wider shadow-sm select-none">
          <span className="h-2 w-2 rounded-full bg-emerald-500 relative flex shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{t("header.securedBadge")}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
