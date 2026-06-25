import React from "react";
import { AppTab } from "../types";
import { 
  LayoutDashboard, 
  KeyRound, 
  ShieldAlert, 
  BookOpen, 
  Settings as SettingsIcon,
  ShieldAlert as BrandIcon
} from "lucide-react";
import { useLanguage } from "../services/LanguageContext";

interface NavigationProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: AppTab.DASHBOARD, label: t("nav.dashboard"), icon: LayoutDashboard },
    { id: AppTab.HINTS, label: t("nav.hints"), icon: KeyRound },
    { id: AppTab.CONTACTS, label: t("nav.contacts"), icon: ShieldAlert },
    { id: AppTab.RECOVERY, label: t("nav.recovery"), icon: BookOpen },
    { id: AppTab.SETTINGS, label: t("nav.settings"), icon: SettingsIcon },
  ];

  return (
    <>
      {/* Desktop Sidebar - Fixed Left, dark blue */}
      <aside 
        id="desktop-sidebar"
        className="hidden md:flex flex-col fixed top-0 bottom-0 left-0 w-64 bg-slate-950 text-slate-300 border-r border-slate-900/60 z-30 font-sans"
      >
        {/* Brand Banner */}
        <div className="p-6 border-b border-slate-900/40 flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/10 rounded-xl text-blue-400 border border-blue-500/10 group-hover:scale-105 transition-transform duration-300">
            <BrandIcon size={20} className="animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight text-sm">LockSafe Assistant</h1>
            <p className="text-[9px] text-slate-400 font-mono tracking-wider select-none mt-0.5">{t("nav.localVault")}</p>
          </div>
        </div>

        {/* Navigation Options */}
        <nav className="flex-1 px-3.5 py-8 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-desktop-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ease-smooth relative group cursor-pointer ${
                  isActive 
                     ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-bold translate-x-1" 
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-100 hover:translate-x-0.5"
                }`}
              >
                {/* Active left indicator line */}
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-1 bg-white rounded-r-md" />
                )}
                
                <Icon size={16} className={`transition-transform duration-300 ${
                  isActive 
                    ? "text-white scale-110" 
                    : "text-slate-500 group-hover:text-slate-300 group-hover:scale-105"
                }`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Security indicator status */}
        <div className="p-4 border-t border-slate-900/60">
          <div className="p-3 bg-slate-900/40 rounded-xl flex items-center justify-between border border-slate-900/30">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider truncate mr-1">{t("nav.secureLink")}</span>
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-sm shadow-emerald-400/50"></span>
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Floating Sticky Bottom-Nav */}
      <nav 
        id="mobile-navigation"
        className="md:hidden fixed bottom-3 left-3 right-3 h-16 bg-slate-950/95 backdrop-blur-xl border border-slate-900/60 rounded-2xl flex items-center justify-around text-slate-400 z-50 px-3 shadow-2xl"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-mobile-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all relative group cursor-pointer overflow-hidden"
            >
              <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                isActive ? "bg-blue-600/10 text-blue-400 scale-110" : "text-slate-500 group-hover:text-slate-300"
              }`}>
                <Icon size={18} />
              </div>
              <span className={`text-[9px] mt-0.5 truncate hidden sm:block w-full max-w-full px-1 text-center font-semibold transition-all duration-200 ${
                isActive ? "text-blue-400 scale-105 font-bold" : "text-slate-500"
              }`}>
                {item.label}
              </span>
              
              {/* Blue indicator dot for active item on mobile */}
              {isActive && (
                <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-blue-500 shadow-sm shadow-blue-400/50 animate-pulse-subtle" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;
