import React, { useState } from "react";
import { storageService } from "../services/storageService";
import { ShieldCheck, LockKeyhole, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useLanguage } from "../services/LanguageContext";

interface SecurityGateProps {
  isAuthorized: boolean;
  onAuthSuccess: (key: string) => void;
  children: React.ReactNode;
}

const SecurityGate: React.FC<SecurityGateProps> = ({ isAuthorized, onAuthSuccess, children }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const isConfigured = storageService.isMasterKeyConfigured();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(t("gate.errorEmpty"));
      return;
    }

    const success = storageService.verifyMasterKey(password);
    if (success) {
      setError(null);
      onAuthSuccess(password);
    } else {
      setError(t("gate.errorIncorrect"));
    }
  };

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-md mx-auto my-12 bg-white border border-slate-200/70 rounded-3xl shadow-lg shadow-slate-100/50 p-6 md:p-8 animate-fade-in relative overflow-hidden font-sans">
      
      {/* Decorative top security line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500" />

      <div className="flex flex-col items-center text-center mt-3">
        <div className="p-4.5 bg-blue-500/[0.04] border border-blue-500/10 text-blue-600 rounded-2xl mb-5 shadow-inner">
          <LockKeyhole size={30} className="animate-pulse-subtle" />
        </div>
        <h3 className="text-base font-extrabold text-slate-950 tracking-tight leading-none">
          {isConfigured ? t("gate.shieldActive") : t("gate.initializeMaster")}
        </h3>
        <p className="text-xs text-slate-400 mt-2.5 max-w-sm leading-relaxed font-medium">
          {isConfigured 
            ? t("gate.provideMaster") 
            : t("gate.defineSecureOption")}
        </p>
      </div>

      <form onSubmit={handleUnlock} className="mt-8 space-y-5">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            {isConfigured ? t("gate.passphraseLabel") : t("gate.newKeyLabel")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isConfigured ? "••••••••" : t("gate.choosePassphrasePlaceholder")}
              className="w-full px-4 py-3 bg-slate-5/65 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-mono text-xs pr-12 font-medium"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-500/[0.04] border border-red-500/10 rounded-xl text-[11px] font-semibold text-red-650 flex items-center gap-2.5">
            <AlertTriangle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-slate-950 to-slate-900 hover:from-slate-900 hover:to-slate-800 text-white font-bold text-xs rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-950/10 uppercase tracking-widest active:scale-[0.98]"
        >
          <ShieldCheck size={14} />
          <span>{isConfigured ? t("gate.decryptBtn") : t("gate.initializeChamberBtn")}</span>
        </button>
      </form>

      <div className="mt-8 border-t border-slate-100 pt-5 text-center">
        <span className="inline-flex items-center gap-2 text-[8px] font-mono font-bold tracking-widest text-slate-400 bg-slate-50 border border-slate-205 px-3 py-1 rounded-full uppercase">
          🔒 {t("gate.sandrockActive")}
        </span>
      </div>
    </div>
  );
};

export default SecurityGate;
