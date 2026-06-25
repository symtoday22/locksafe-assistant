import React, { useState } from "react";
import { storageService } from "../services/storageService";
import { 
  ShieldAlert, 
  Trash2, 
  Power, 
  HelpCircle,
  Grid3x3,
  CheckCircle2,
  Trophy,
  Undo2,
  Sparkles
} from "lucide-react";
import { PatternRecorder } from "../components/PatternRecorder";
import { PatternPreview } from "../components/PatternPreview";
import { useLanguage } from "../services/LanguageContext";

interface SettingsProps {
  logout: () => void;
}

interface GesturePreset {
  id: string;
  sequence: number[];
}

const GESTURE_PRESETS: GesturePreset[] = [
  {
    id: "z-lock",
    sequence: [1, 2, 3, 7, 4, 6, 9, 8, 5],
  },
  {
    id: "s-loop",
    sequence: [3, 2, 1, 4, 5, 6, 9, 8, 7],
  },
  {
    id: "hourglass",
    sequence: [1, 5, 9, 6, 2, 8, 4, 3, 7],
  },
  {
    id: "house-guard",
    sequence: [7, 4, 2, 6, 9, 7, 9],
  },
  {
    id: "m-helix",
    sequence: [7, 4, 1, 5, 3, 6, 9],
  },
  {
    id: "n-symmetric",
    sequence: [7, 4, 1, 9, 6, 3],
  }
];

const Settings: React.FC<SettingsProps> = ({ logout }) => {
  const { t } = useLanguage();
  const [resetConfirm, setResetConfirm] = useState(false);
  const [testSequence, setTestSequence] = useState<number[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<GesturePreset | null>(null);

  const handleWipeDatabase = () => {
    storageService.resetMasterKey();
    logout();
    window.location.reload();
  };

  const handleLogout = () => {
    storageService.addLog(t("settings.sessionLogTerminated"), "info");
    logout();
  };

  const isMatched = selectedPreset 
    ? JSON.stringify(testSequence) === JSON.stringify(selectedPreset.sequence) 
    : false;

  const [hasLoggedMatch, setHasLoggedMatch] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isMatched && selectedPreset && hasLoggedMatch !== selectedPreset.id) {
      const presetName = t(`settings.preset.${selectedPreset.id}.name` as any);
      storageService.addLog(t("settings.playgroundLogSuccess", { presetName }), "success");
      setHasLoggedMatch(selectedPreset.id);
    } else if (!isMatched) {
      setHasLoggedMatch(null);
    }
  }, [isMatched, selectedPreset, hasLoggedMatch, t]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="settings-screen">
      
      {/* Sessions and Database Administration Column */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Sessions control */}
        <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm p-6 md:p-8 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Power size={16} className="text-slate-800" />
            <span>{t("settings.activeSessionCard")}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed font-sans">
            {t("settings.activeSessionDesc")}
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-slate-905 hover:bg-slate-900 text-white font-bold text-[11px] rounded-xl tracking-wider uppercase transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
          >
            <Power size={13} />
            <span>{t("settings.revokeBtn")}</span>
          </button>
        </div>

        {/* Wipe/Hardware destruction */}
        <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm p-6 md:p-8 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Trash2 size={16} className="text-red-500" />
            <span>{t("settings.purgeConsole")}</span>
          </h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed font-sans">
            {t("settings.purgeDesc")}
          </p>

          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="w-full px-4 py-3 bg-red-500/[0.03] border border-red-500/15 hover:bg-red-500/10 text-red-650 font-bold text-[11px] rounded-xl tracking-wider uppercase transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              <ShieldAlert size={13} />
              <span>{t("settings.purgeBtn")}</span>
            </button>
          ) : (
            <div className="p-4.5 bg-red-500/[0.04] border border-red-500/15 rounded-2xl space-y-3.5">
              <h4 className="text-xs font-bold text-red-800 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                ⚠️ {t("settings.purgeConfirmTitle")}
              </h4>
              <p className="text-[11px] text-red-750 font-medium leading-relaxed font-sans">
                {t("settings.purgeConfirmDesc")}
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={handleWipeDatabase}
                  className="flex-1 py-2 bg-red-650 hover:bg-red-700 text-white font-bold text-[10px] rounded-xl tracking-wider uppercase transition-all duration-150 cursor-pointer text-center"
                >
                  {t("settings.purgeConfirmYes")}
                </button>
                <button
                  onClick={() => setResetConfirm(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded-xl tracking-wider uppercase transition-all duration-150 cursor-pointer text-center"
                >
                  {t("settings.purgeConfirmNo")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sandbox Integrity Info */}
        <div className="bg-slate-100/40 border border-slate-200/50 rounded-3xl p-6 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 select-none">
            <HelpCircle size={14} className="text-slate-500" />
            <span>{t("settings.localSpecificationsTitle")}</span>
          </h4>
          <div className="text-[11px] text-slate-400 font-semibold space-y-2.5 ml-1 leading-relaxed">
            <p className="flex items-center gap-2">• <span>{t("settings.specData")}</span></p>
            <p className="flex items-center gap-2">• <span>{t("settings.specNetwork")}</span></p>
            <p className="flex items-center gap-2">• <span>{t("settings.specAccess")}</span></p>
          </div>
        </div>
      </div>

      {/* Security Gesture Canvas and Star Preset Playground Column */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm p-6 md:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-betweenSelect">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Grid3x3 size={16} className="text-amber-500" />
              <span>{t("settings.practiceCanvas")}</span>
            </h3>
            <span className="text-[9px] font-mono bg-indigo-505/[0.05] border border-indigo-500/10 text-indigo-700 font-bold uppercase py-1 px-3 rounded-xl tracking-wider">
              {t("settings.practiceCanvas")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Drawing Core Block */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="bg-slate-50/60 p-4 border border-slate-150/50 rounded-2xl w-full flex flex-col items-center">
                <span className="text-[9px] font-bold text-slate-400 font-mono mb-3 uppercase tracking-widest leading-none">
                  {t("settings.gridLabel")}
                </span>
                
                <PatternRecorder
                  sequence={testSequence}
                  onChange={setTestSequence}
                />
              </div>
            </div>

            {/* Live Stats and Preset Goals Block */}
            <div className="md:col-span-6 space-y-4">
              <div className="bg-slate-50 p-4 border border-slate-150 rounded-2xl">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block mb-2.5 font-mono">
                  {t("settings.practiceCoordinates")}
                </span>
                
                {testSequence.length === 0 ? (
                  <div className="py-5 text-center">
                    <p className="text-xs text-slate-405 font-bold">{t("settings.gridIdle")}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium leading-relaxed font-sans">{t("settings.gridIdleDesc")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="font-mono text-xs font-extrabold text-indigo-700 bg-indigo-500/[0.04] border border-indigo-500/15 p-2.5 rounded-xl text-center tracking-widest">
                      {testSequence.join(" ➔ ")}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 font-mono">
                      <span>{t("settings.totalNodes")}</span>
                      <span className="bg-white text-slate-800 px-2 py-0.5 rounded border border-slate-150">{testSequence.length} / 9</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Preset practice status block */}
              {selectedPreset && (
                <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isMatched 
                    ? "bg-emerald-500/[0.03] border-emerald-500/15 text-emerald-800 shadow-sm" 
                    : "bg-slate-50 border-slate-200 text-slate-700 animate-scale-up"
                }`}>
                  <div className="flex items-start gap-3">
                    {isMatched ? (
                      <Trophy className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                    ) : (
                      <Sparkles className="text-blue-500 shrink-0 mt-0.5 animate-pulse" size={16} />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold leading-none">
                        {isMatched 
                          ? t("settings.practiceMatched") 
                          : t("settings.practiceGoal", { presetName: t(`settings.preset.${selectedPreset.id}.name` as any) })
                        }
                      </p>
                      
                      {isMatched ? (
                        <p className="text-[10px] text-emerald-600 font-semibold leading-relaxed mt-1.5">
                          {t("settings.practiceMatchedDesc")}
                        </p>
                      ) : (
                        <div className="mt-2.5 space-y-2">
                          <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">
                            {t("settings.drawSequence")} <strong className="font-mono text-slate-700 font-bold">{selectedPreset.sequence.join(" ➔ ")}</strong>
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[9px] text-slate-400 font-bold">{t("settings.targetVisual")}</span>
                            <div className="scale-50 origin-left border border-slate-800 rounded-xl overflow-hidden bg-slate-950 p-1 bg-clip-border">
                              <PatternPreview sequence={selectedPreset.sequence} revealed={true} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Quick-select Gesture Presets */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest font-mono">
                {t("settings.trainingPresetsTitle")}
              </span>
              {selectedPreset && (
                <button
                  onClick={() => {
                    setSelectedPreset(null);
                    setTestSequence([]);
                  }}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition"
                >
                  <Undo2 size={11} />
                  <span>{t("settings.clearPresetSelection")}</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-semibold font-sans">
              {t("settings.trainingPresetsDesc")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {GESTURE_PRESETS.map((preset) => {
                const isPresetSelected = selectedPreset?.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setTestSequence([]);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between h-24 ${
                      isPresetSelected
                        ? "bg-indigo-650 border-indigo-700 text-white shadow-lg shadow-indigo-650/15 scale-[1.01]"
                        : "bg-white border-slate-150 hover:bg-slate-50 text-slate-700 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      <h4 className={`text-xs font-bold truncate ${isPresetSelected ? "text-white" : "text-slate-800"}`}>
                        {t(`settings.preset.${preset.id}.name` as any)}
                      </h4>
                      <p className={`text-[9px] leading-snug mt-1.5 line-clamp-2 font-medium ${isPresetSelected ? "text-indigo-100" : "text-slate-400"}`}>
                        {t(`settings.preset.${preset.id}.description` as any)}
                      </p>
                    </div>

                    <span className={`text-[9px] font-mono tracking-wider font-bold block mt-2 ${
                      isPresetSelected ? "text-amber-400" : "text-indigo-600 bg-indigo-500/[0.03] px-1.5 py-0.5 rounded-md"
                    }`}>
                      {t("settings.nodesCountLabel", { count: preset.sequence.length })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
