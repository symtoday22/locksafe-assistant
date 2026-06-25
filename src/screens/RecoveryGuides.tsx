import React, { useState } from "react";
import { 
  ShieldAlert, 
  Mail, 
  Smartphone, 
  HardDrive, 
  HeartHandshake, 
  ChevronRight, 
  CheckSquare, 
  BookOpen,
  Info 
} from "lucide-react";
import { useLanguage } from "../services/LanguageContext";

interface GuideItem {
  id: string;
  title: string;
  category: "sim" | "email" | "hardware" | "estate";
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
  bgStr: string;
  steps: string[];
  tips: string[];
}

const RecoveryGuides: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<"sim" | "email" | "hardware" | "estate">("sim");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const guides: GuideItem[] = [
    {
      id: "sim",
      category: "sim",
      title: t("recovery.guide.sim.title"),
      icon: Smartphone,
      color: "text-blue-500",
      bgStr: "bg-blue-50/50",
      steps: [
        t("recovery.guide.sim.step1"),
        t("recovery.guide.sim.step2"),
        t("recovery.guide.sim.step3"),
        t("recovery.guide.sim.step4")
      ],
      tips: [
        t("recovery.guide.sim.tip1"),
        t("recovery.guide.sim.tip2")
      ]
    },
    {
      id: "email",
      category: "email",
      title: t("recovery.guide.email.title"),
      icon: Mail,
      color: "text-amber-500",
      bgStr: "bg-amber-50/50",
      steps: [
        t("recovery.guide.email.step1"),
        t("recovery.guide.email.step2"),
        t("recovery.guide.email.step3"),
        t("recovery.guide.email.step4")
      ],
      tips: [
        t("recovery.guide.email.tip1"),
        t("recovery.guide.email.tip2")
      ]
    },
    {
      id: "hardware",
      category: "hardware",
      title: t("recovery.guide.hardware.title"),
      icon: HardDrive,
      color: "text-rose-500",
      bgStr: "bg-rose-50/50",
      steps: [
        t("recovery.guide.hardware.step1"),
        t("recovery.guide.hardware.step2"),
        t("recovery.guide.hardware.step3"),
        t("recovery.guide.hardware.step4")
      ],
      tips: [
        t("recovery.guide.hardware.tip1"),
        t("recovery.guide.hardware.tip2")
      ]
    },
    {
      id: "estate",
      category: "estate",
      title: t("recovery.guide.estate.title"),
      icon: HeartHandshake,
      color: "text-emerald-500",
      bgStr: "bg-emerald-50/50",
      steps: [
        t("recovery.guide.estate.step1"),
        t("recovery.guide.estate.step2"),
        t("recovery.guide.estate.step3"),
        t("recovery.guide.estate.step4")
      ],
      tips: [
        t("recovery.guide.estate.tip1"),
        t("recovery.guide.estate.tip2")
      ]
    }
  ];

  const activeGuide = guides.find(g => g.category === activeCategory) || guides[0];

  const toggleStep = (stepIndex: number) => {
    const key = `${activeCategory}-${stepIndex}`;
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const GuideIcon = activeGuide.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="recovery-playbook-screen">
      
      {/* Selector side panel */}
      <section className="lg:col-span-4 space-y-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 select-none">
          {t("recovery.threatPlaybooks")}
        </h3>
        
        <div className="space-y-2.5">
          {guides.map((g) => {
            const IconComp = g.icon;
            const isSelected = activeCategory === g.category;
            return (
              <button
                key={g.id}
                onClick={() => setActiveCategory(g.category)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer hover:shadow-sm ${
                  isSelected 
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10 -translate-y-0.5"
                    : "bg-white border-slate-200/60 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-2.5 rounded-xl transition ${isSelected ? "bg-slate-800 text-white" : `${g.bgStr} ${g.color} border border-slate-200/50`}`}>
                    <IconComp size={15} />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold">{t(`recovery.guide.${g.category}.short` as any)} {t("recovery.contingencySuffix")}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium truncate max-w-[150px] sm:max-w-none">
                      {g.title}
                    </p>
                  </div>
                </div>
                <ChevronRight size={14} className={`text-slate-400 group-hover:translate-x-0.8 transition-transform ${isSelected ? "text-slate-200" : ""}`} />
              </button>
            );
          })}
        </div>
      </section>

      {/* Structured playbook workspace */}
      <section className="lg:col-span-8">
        <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm p-6 md:p-8 space-y-7">
          
          {/* Guide Header */}
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
            <span className={`p-3 rounded-2xl ${activeGuide.bgStr} ${activeGuide.color} border border-slate-200/40 shrink-0`}>
              <GuideIcon size={22} />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                {activeGuide.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-semibold leading-relaxed">
                {t("recovery.reviewSecPlaybook")}
              </p>
            </div>
          </div>

          {/* Interactive Steps list */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">
              {t("recovery.checklistTitle")}
            </h4>

            <div className="space-y-3">
              {activeGuide.steps.map((step, idx) => {
                const stepKey = `${activeCategory}-${idx}`;
                const isCompleted = !!completedSteps[stepKey];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer hover:shadow-sm ${
                      isCompleted 
                        ? "bg-emerald-500/[0.03] border-emerald-500/15 text-slate-400" 
                        : "bg-slate-50/55 border-slate-150/60 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className={`mt-0.5 shrink-0 transition-all duration-300 ${isCompleted ? "text-emerald-500 scale-110" : "text-slate-350"}`}>
                      <CheckSquare size={16} />
                    </span>
                    <span className={`text-xs leading-relaxed font-semibold ${isCompleted ? "line-through" : ""}`}>
                      {step}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Tips and Background Insights */}
          <div className="bg-amber-500/[0.03] border border-amber-500/15 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-700">
              <Info size={14} className="shrink-0" />
              <h4 className="text-[10px] font-bold uppercase tracking-wider">
                {t("recovery.threatVectorTitle")}
              </h4>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-amber-800/80 ml-1 font-semibold leading-relaxed">
              {activeGuide.tips.map((tip, idx) => (
                <li key={idx}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Footer security clearance */}
          <div className="border-t border-slate-100 pt-5 flex justify-between items-center text-[9px] text-slate-400 font-mono tracking-wider font-semibold">
            <span>{t("recovery.offlineThreatDrill")}</span>
            <span>{t("recovery.verCode")}</span>
          </div>

         </div>
      </section>

    </div>
  );
};

export default RecoveryGuides;
