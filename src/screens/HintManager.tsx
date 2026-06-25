import React, { useState } from "react";
import { PasswordHint } from "../types";
import { 
  KeyRound, 
  Trash2, 
  Plus, 
  Search, 
  Eye, 
  EyeOff, 
  KeySquare,
  Sparkles,
  HelpCircle,
  Grid3x3
} from "lucide-react";
import { PatternRecorder } from "../components/PatternRecorder";
import { PatternPreview } from "../components/PatternPreview";
import { useLanguage } from "../services/LanguageContext";

interface HintManagerProps {
  hints: PasswordHint[];
  onUpdate: (hints: PasswordHint[]) => void;
}

const HintManager: React.FC<HintManagerProps> = ({ hints, onUpdate }) => {
  const { t } = useLanguage();
  const [label, setLabel] = useState("");
  const [hintText, setHintText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  
  // Custom states for pattern lock drawing
  const [hintType, setHintType] = useState<"text" | "pattern">("text");
  const [patternSequence, setPatternSequence] = useState<number[]>([]);

  const handleAddHint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    let finalHintText = hintText.trim();
    let finalSequence: number[] | undefined = undefined;

    if (hintType === "pattern") {
      if (patternSequence.length < 2) {
        setError(t("hints.patternMinError"));
        return;
      }
      finalHintText = `${t("hints.patternGesturePrefix")}${patternSequence.join(" ➔ ")}`;
      finalSequence = patternSequence;
    } else {
      if (!finalHintText) return;
    }

    const newHint: PasswordHint = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      label: label.trim(),
      hintText: finalHintText,
      createdAt: Date.now(),
      isPattern: hintType === "pattern",
      patternSequence: finalSequence,
    };

    onUpdate([newHint, ...hints]);
    setLabel("");
    setHintText("");
    setPatternSequence([]);
    setError(null);
  };

  const handleDeleteHint = (id: string) => {
    onUpdate(hints.filter(h => h.id !== id));
  };

  const toggleReveal = (id: string) => {
    setShowExplanation(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredHints = hints.filter(h => 
    h.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.hintText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="hint-manager-screen">
      
      {/* Add Hint Form Column (Left/Responsive Top) */}
      <section className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm p-6 md:p-8">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-5">
            <Plus size={16} className="text-amber-500" />
            <span>{t("hints.addNewSec")}</span>
          </h3>

          {/* Hint Type Selector */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 space-x-1 border border-slate-200/30">
            <button
              type="button"
              onClick={() => setHintType("text")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${
                hintType === "text"
                  ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <KeySquare size={13} />
              <span>{t("hints.clueTab")}</span>
            </button>
            <button
              type="button"
              onClick={() => setHintType("pattern")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer select-none ${
                hintType === "pattern"
                  ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-100"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Grid3x3 size={13} />
              <span>{t("hints.gestureTab")}</span>
            </button>
          </div>

          <form onSubmit={handleAddHint} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t("hints.labelField")}
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={t("hints.labelPlaceholder")}
                className="w-full px-4 py-3 bg-slate-50/65 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs font-medium transition-all animate-fade-in"
                required
              />
            </div>

            {hintType === "text" ? (
              <div className="animate-fade-in">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t("hints.clueField")}
                </label>
                <textarea
                  value={hintText}
                  onChange={(e) => setHintText(e.target.value)}
                  placeholder={t("hints.cluePlaceholder")}
                  className="w-full px-4 py-3 bg-slate-50/65 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs font-medium h-28 resize-none transition-all leading-relaxed"
                  required={hintType === "text"}
                />
                <p className="text-[10px] text-slate-400 mt-2.5 font-medium leading-relaxed">
                  ⚠️ {t("hints.clueWarning")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-2 animate-fade-in">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4 w-full self-start">
                  {t("hints.drawGridLabel")}
                </label>
                
                <PatternRecorder 
                  sequence={patternSequence} 
                  onChange={setPatternSequence} 
                />

                {patternSequence.length >= 2 && (
                  <div className="mt-5 p-3 bg-amber-500/[0.04] border border-amber-500/15 rounded-2xl w-full text-center">
                    <p className="text-[9px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                      {t("hints.tempPatternCode")}
                    </p>
                    <p className="text-xs font-extrabold text-slate-800 tracking-wider mt-1 flex items-center justify-center gap-1 font-mono">
                      {patternSequence.join(" ➔ ")}
                    </p>
                  </div>
                )}
                
                <p className="text-[10px] text-slate-400 mt-4.5 font-medium leading-relaxed w-full self-start">
                  💡 {t("hints.drawGridWarning")}
                </p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/[0.04] border border-red-500/15 rounded-xl text-[10px] font-bold text-red-600 flex items-center gap-1.5 animate-pulse mt-2">
                <span>⚠️ {error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold text-xs rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/10 uppercase tracking-wider mt-5 active:scale-[0.98]"
            >
              <KeySquare size={14} />
              <span>{t("hints.catalogCueBtn")}</span>
            </button>
          </form>
        </div>

        {/* Info Explainer Box */}
        <div className="bg-slate-100/40 border border-slate-200/50 rounded-3xl p-6">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <Sparkles size={14} className="text-amber-500" />
            <span>{t("hints.howWorkTitle")}</span>
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
            {t("hints.howWorkDesc")}
          </p>
        </div>
      </section>

      {/* Hints List Column (Right/Responsive Bottom) */}
      <section className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm p-6 md:p-8 min-h-[420px] flex flex-col justify-between">
          <div>
            {/* Search and Filters Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <KeyRound size={16} className="text-slate-850" />
                <span>{t("hints.cluesDir")}</span>
              </h3>

              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("hints.searchPlaceholder")}
                  className="w-full sm:w-52 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-medium transition-all"
                />
                <Search size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* List content */}
            {filteredHints.length === 0 ? (
              <div className="text-center py-24 flex flex-col items-center justify-center animate-fade-in">
                <HelpCircle size={36} className="text-slate-350 stroke-1 mb-3" />
                <p className="text-xs text-slate-500 font-bold">{t("hints.noCluesYet")}</p>
                <p className="text-[11px] text-slate-400 mt-1.5 max-w-xs px-4 leading-relaxed font-semibold">
                  {t("hints.noCluesDesc")}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-1">
                {filteredHints.map((hint) => {
                  const revealed = !showExplanation[hint.id];
                  return (
                    <article key={hint.id} className="py-5 flex items-start gap-4 hover:bg-slate-50/50 rounded-2xl px-3 transition-all duration-200 group">
                      <div className="p-2.5 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-600 mt-1 shrink-0">
                        <KeySquare size={15} />
                      </div>
                      
                      <div className="flex-1 min-w-0 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-950 truncate flex items-center gap-2">
                            <span>{hint.label}</span>
                            {hint.isPattern && (
                              <span className="inline-block text-[8px] tracking-widest font-extrabold uppercase px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-700 border border-blue-500/10">
                                {t("hints.gestureBadge")}
                              </span>
                            )}
                          </h4>
                          <span className="text-[9px] text-slate-400 font-mono font-medium">
                            {new Date(hint.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Hint representation */}
                        {hint.isPattern && hint.patternSequence ? (
                          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <PatternPreview 
                              sequence={hint.patternSequence} 
                              revealed={revealed} 
                            />
                            <div className="flex-1 space-y-1.5 animate-fade-in">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.8 bg-slate-950 text-amber-400 font-mono text-[9px] rounded-lg font-bold uppercase tracking-wider border border-slate-800">
                                {t("hints.gestureSeq")}
                              </span>
                              <p className="text-xs text-slate-700 font-mono mt-1 font-bold">
                                {revealed 
                                  ? `${t("hints.gesturePathLabel")}${hint.patternSequence.join(" ➔ ")}` 
                                  : "••••••••••••••••••••"
                                }
                              </p>
                              {revealed && (
                                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                                  {t("hints.gestureDiagramTip")}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 text-xs relative bg-slate-50 border border-slate-150 rounded-2xl p-4 select-all shadow-inner">
                            {revealed ? (
                              <div className="font-mono text-slate-800 filter-none whitespace-pre-wrap select-text leading-relaxed font-semibold animate-fade-in">
                                {hint.hintText}
                              </div>
                            ) : (
                              <div className="font-mono text-slate-300 select-none tracking-widest leading-none blur-[4px]">
                                ••••••••••••••••••••••••••••••••••
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1.5 shrink-0 self-center">
                        <button
                          onClick={() => toggleReveal(hint.id)}
                          title={revealed ? t("hints.obfuscateTooltip") : t("hints.revealTooltip")}
                          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition duration-150 cursor-pointer shadow-sm active:scale-95"
                        >
                          {revealed ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                        <button
                          onClick={() => handleDeleteHint(hint.id)}
                          title={t("hints.deleteTooltip")}
                          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-100 text-slate-400 hover:text-red-600 transition duration-150 cursor-pointer shadow-sm active:scale-95"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 flex items-center justify-between text-[9px] text-slate-400 font-mono tracking-wider font-semibold">
            <span>{t("hints.savedLocksCount").replace("{count}", filteredHints.length.toString())}</span>
            <span>{t("hints.memTransfersOnly")}</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HintManager;
