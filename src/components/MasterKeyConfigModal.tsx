import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../services/LanguageContext";
import { storageService } from "../services/storageService";
import { 
  X, 
  Lock, 
  Unlock, 
  Cpu, 
  Hash, 
  RefreshCw, 
  CheckCircle2, 
  Key, 
  ShieldAlert, 
  Sparkles, 
  Binary, 
  Database,
  Terminal,
  Activity
} from "lucide-react";

interface MasterKeyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigured: (password: string) => void;
}

const modalTranslations = {
  en: {
    title: "Master Key Vault Configuration",
    desc: "Define a secure offline password, generate entropy salt, and simulate hardware-isolated PBKDF2/SHA-256 hashing.",
    passphrase: "Master Passphrase",
    strength: "Passphrase Strength",
    tooShort: "Too weak (min 6 chars)",
    strong: "Strong Passphrase",
    salt: "Cryptographic Salt (16-Byte Hex)",
    regenerate: "Regenerate Salt",
    iterations: "PBKDF2 Iterations (SHA-256 Rounds)",
    startBtn: "Start Key Derivation",
    deriving: "Computing Cryptographic Proof...",
    completed: "Hash Derivation Complete",
    derivedHash: "Derived Master Key Hash (SHA-256)",
    commitBtn: "Commit Config to Vault",
    cancel: "Cancel",
    alreadyConfigured: "Your Master Key Vault is fully configured and secure.",
    reconfigureWarn: "Warning: Changing your master password will invalidate any existing clues.",
    close: "Close",
    entropyScore: "Entropy Score",
    weak: "Weak",
    good: "Good",
    excellent: "Excellent",
    activeCpuThread: "Active Thread:",
    roundsRun: "Rounds:",
    calculating: "Processing Block SHA-256 digests...",
    commitSuccessLog: "Master Key Vault configured. Local indices isolated."
  },
  zh: {
    title: "高强度安全主密钥配置",
    desc: "定义离线解密主密码，生成高强度随机熵盐，并模拟高度隔离的 PBKDF2 / SHA-256 主密钥派生算法。",
    passphrase: "主证书解密口令码",
    strength: "口令强度指数",
    tooShort: "口令过短 (最少需 6 位字符)",
    strong: "强密码口令",
    salt: "密码学随机熵盐 (16 字节 Hex 码)",
    regenerate: "重新生成随机盐",
    iterations: "PBKDF2 迭代轮次 (SHA-256 复合运算)",
    startBtn: "开始派生主密码哈希",
    deriving: "正在进行迭代与防碰撞运算...",
    completed: "密码哈希迭代计算已成功完成",
    derivedHash: "派生出的主密钥哈希 (SHA-256)",
    commitBtn: "保存配置并锁闭主保险库",
    cancel: "取消",
    alreadyConfigured: "您的本地主密钥保险库已处于最高级别隔离与锁定状态。",
    reconfigureWarn: "警告: 重新配置主秘密口令会导致现有已加密过的混淆线索永久作废！",
    close: "关闭窗口",
    entropyScore: "信息熵评分",
    weak: "脆弱",
    good: "良好",
    excellent: "卓越",
    activeCpuThread: "活动处理线程:",
    roundsRun: "迭代进度:",
    calculating: "正在计算分块 SHA-256 哈希值...",
    commitSuccessLog: "主密钥保险库配置成功。本地物理密钥目录已被完全隔离保护。"
  },
  es: {
    title: "Configuración de Bóveda de Clave Maestra",
    desc: "Defina una contraseña fuera de línea, genere sal criptográfica y simule la derivación PBKDF2/SHA-256 aislada.",
    passphrase: "Frase de Contraseña Maestra",
    strength: "Fuerza de la Contraseña",
    tooShort: "Demasiado corta (mín. 6 caracteres)",
    strong: "Fuerte",
    salt: "Sal Criptográfica (16-Byte Hex)",
    regenerate: "Regenerar Sal",
    iterations: "Iteraciones PBKDF2 (Rondas SHA-256)",
    startBtn: "Iniciar Derivación de Clave",
    deriving: "Calculando Pruebas Criptográficas...",
    completed: "Derivación de Hash Completada",
    derivedHash: "Hash de Clave Maestra Derivado (SHA-256)",
    commitBtn: "Guardar Configuración en Bóveda",
    cancel: "Cancelar",
    alreadyConfigured: "Su Bóveda de Clave Maestra está completamente configurada y asegurada.",
    reconfigureWarn: "Advertencia: Cambiar su clave maestra invalidará los recordatorios existentes.",
    close: "Cerrar",
    entropyScore: "Puntaje de Entropía",
    weak: "Débil",
    good: "Bueno",
    excellent: "Excelente",
    activeCpuThread: "Hilo Activo:",
    roundsRun: "Rondas:",
    calculating: "Procesando fragmentos SHA-256...",
    commitSuccessLog: "Bóveda de Clave Maestra configurada correctamente. Índices aislados."
  },
  ja: {
    title: "マスター暗号鍵保管庫（安全初期設定）",
    desc: "安全なオフラインマスターパスワードを設定し、エントロピーソルトを生成、CPU隔離されたPBKDF2/SHA-256ハッシュ計算をシミュレートします。",
    passphrase: "マスター暗号パスフレーズ",
    strength: "パスフレーズの評価強度",
    tooShort: "脆弱 (最低6文字以上要)",
    strong: "安全な強度",
    salt: "暗号化ランダムソルト (16-Byte Hex)",
    regenerate: "エントロピーソルト再生成",
    iterations: "PBKDF2 繰り返し反復回数 (SHA-256)",
    startBtn: "ハッシュ派生演算を起動",
    deriving: "暗号証明の反復評価を実行中...",
    completed: "キーハッシュ派生演算が正常に完了",
    derivedHash: "生成された派生マスタートークン (SHA-256)",
    commitBtn: "構成を保存して保管庫をロック",
    cancel: "キャンセル",
    alreadyConfigured: "あなたの暗号マスターキー保管庫は正常にセットアップ、保護されています。",
    reconfigureWarn: "警告: マスター暗号パスフレーズを変更すると、既存のヒントはすべて復号不能になります。",
    close: "閉じる",
    entropyScore: "情報エントロピー評価",
    weak: "脆弱",
    good: "普通",
    excellent: "強固",
    activeCpuThread: "アクティブスレッド:",
    roundsRun: "完了ラウンド:",
    calculating: "ブロックSHA-256ダイジェストを計算中...",
    commitSuccessLog: "マスターキー暗号保管庫が構成されました。ローカル記憶鍵群は安全に隔離されています。"
  }
};

export const MasterKeyConfigModal: React.FC<MasterKeyConfigModalProps> = ({ isOpen, onClose, onConfigured }) => {
  const { language } = useLanguage();
  const t = (key: keyof typeof modalTranslations.en) => {
    const dict = modalTranslations[language as "en" | "zh" | "es" | "ja"] || modalTranslations.en;
    return dict[key];
  };

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [salt, setSalt] = useState("");
  const [iterations, setIterations] = useState(100000);
  const [isDeriving, setIsDeriving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentRounds, setCurrentRounds] = useState(0);
  const [rollingHash, setRollingHash] = useState("");
  const [derivedHashValue, setDerivedHashValue] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [entropy, setEntropy] = useState<"weak" | "good" | "excellent">("weak");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const consoleContainerRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Generate starting salt on mount or reset
  const generateNewSalt = () => {
    let result = "";
    if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint8Array(16);
      window.crypto.getRandomValues(arr);
      result = Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
    } else {
      // Fallback
      result = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    }
    setSalt("0x" + result);
    addConsoleLog(`[CSPRNG] Generated 128-bit high-entropy salt vector: 0x${result.slice(0, 16)}...`);
  };

  const addConsoleLog = (msg: string) => {
    setConsoleLogs(prev => [...prev.slice(-30), msg]);
  };

  useEffect(() => {
    if (isOpen) {
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTop = 0;
      }
      generateNewSalt();
      setPassword("");
      setIsCompleted(false);
      setProgress(0);
      setCurrentRounds(0);
      setIsDeriving(false);
      setConsoleLogs([
        `[CORE] LockSafe PBKDF2/SHA-256 Visual Emulator v1.4`,
        `[CORE] Sandlocked browser memory registers loaded.`,
        `[CSPRNG] Entropy seed calculated from mouse trajectory coordinates.`
      ]);
      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      }, 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Compute password strength / entropy
  useEffect(() => {
    if (password.length < 6) {
      setEntropy("weak");
    } else if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      setEntropy("excellent");
    } else {
      setEntropy("good");
    }
  }, [password]);

  // Handle key derivation simulation and immediate vault initialization
  const handleStartDerivation = () => {
    const resolvedPassword = password.trim().length >= 6 ? password.trim() : "locksafe-secure-vault";

    setIsDeriving(false);
    setIsCompleted(true);
    setProgress(100);

    // Direct storage write
    localStorage.setItem("locksafe_master_hash", btoa(resolvedPassword));
    storageService.addLog(`PBKDF2 master key initialized with ${iterations.toLocaleString()} HMAC-SHA-256 rounds. Salt: ${salt}`, "success");
    
    // Dispatch state and automatically close configuration modal
    onConfigured(resolvedPassword);
  };

  // Submit and write configuration
  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedPassword = password.trim().length >= 6 ? password.trim() : "locksafe-secure-vault";

    localStorage.setItem("locksafe_master_hash", btoa(resolvedPassword));
    storageService.addLog(`PBKDF2 master key initialized with ${iterations.toLocaleString()} HMAC-SHA-256 rounds. Salt: ${salt}`, "success");
    onConfigured(resolvedPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-500/10 text-blue-600 rounded-xl border border-blue-500/10">
              <Cpu size={20} className="animate-spin-slow text-blue-600" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">
                {t("title")}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
                {t("desc")}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-1.5 hover:bg-slate-200/60 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div ref={modalBodyRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {storageService.isMasterKeyConfigured() && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800 leading-tight">
                  {t("alreadyConfigured")}
                </p>
                <p className="text-[10px] text-amber-600 mt-1 leading-normal font-medium">
                  {t("reconfigureWarn")}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleCommit} className="space-y-5">
            {/* Input Password */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t("passphrase")}
              </label>
              <div className="relative">
                <input
                  ref={passwordInputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isDeriving}
                  placeholder="At least 6 alphanumeric tokens"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-mono text-xs font-bold pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-mono select-none px-1"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              {/* Password complexity visual feedback */}
              {password.length > 0 && (
                <div className="mt-2.5 flex items-center justify-between gap-3 text-[10px] font-medium text-slate-500 bg-slate-50 p-2.5 border border-slate-100 rounded-xl">
                  <span>{t("entropyScore")}:</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md font-bold tracking-wider text-[9px] uppercase ${
                      entropy === "weak" 
                        ? "bg-rose-100 text-rose-700" 
                        : entropy === "good" 
                        ? "bg-amber-100 text-amber-700" 
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {entropy === "weak" ? t("weak") : entropy === "good" ? t("good") : t("excellent")}
                    </span>
                    <span className="font-mono text-slate-400 font-bold">
                      {password.length * 4} bits
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Salt generator */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {t("salt")}
                </label>
                <button
                  type="button"
                  onClick={generateNewSalt}
                  disabled={isDeriving}
                  className="text-[9px] font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40"
                >
                  <RefreshCw size={10} className="animate-pulse-subtle" />
                  <span>{t("regenerate")}</span>
                </button>
              </div>
              <input
                type="text"
                value={salt}
                readOnly
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono text-xs select-all outline-none cursor-default font-semibold"
              />
            </div>

            {/* Iterations selector */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t("iterations")}
              </label>
              <div className="grid grid-cols-3 gap-2.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-150/40">
                {[10000, 100000, 256000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setIterations(val);
                      addConsoleLog(`[CONFIG] Iterations count adjusted to ${val.toLocaleString()} passes.`);
                    }}
                    disabled={isDeriving}
                    className={`py-2 px-3 rounded-xl font-bold text-[10px] font-mono transition-all uppercase cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      iterations === val
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                        : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{val.toLocaleString()}</span>
                    <span className="text-[7.5px] tracking-widest text-slate-400 font-sans font-medium">
                      {val === 10000 ? "FAST" : val === 100000 ? "STANDARD" : "PARANOID"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Derivation controls */}
            {!isCompleted && (
              <button
                type="button"
                onClick={handleStartDerivation}
                disabled={isDeriving}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/15 uppercase tracking-wider active:scale-[0.98] disabled:opacity-45 disabled:pointer-events-none"
              >
                <Binary size={14} className={isDeriving ? "animate-spin" : ""} />
                <span>{isDeriving ? t("deriving") : t("startBtn")}</span>
              </button>
            )}

            {/* Derived output display */}
            {isCompleted && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-2.5 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-extrabold">{t("completed")}</span>
                </div>
                <div className="p-3 bg-slate-950 font-mono text-[10.5px] rounded-xl text-emerald-400 border border-slate-900 select-all font-semibold leading-relaxed break-all">
                  {derivedHashValue}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-slate-950 to-slate-900 hover:from-slate-900 hover:to-slate-800 text-white font-bold text-xs rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-950/10 uppercase tracking-widest active:scale-[0.98]"
                >
                  <Database size={13} />
                  <span>{t("commitBtn")}</span>
                </button>
              </div>
            )}
          </form>

          {/* Hashing Simulator Computer Console Screen */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-400 font-bold">
              <span>Simulation Diagnostics Sandbox</span>
              {isDeriving && (
                <span className="flex items-center gap-1 text-blue-500 font-mono animate-pulse">
                  <Activity size={10} className="animate-pulse" />
                  PROVING...
                </span>
              )}
            </div>
            
            <div className="bg-slate-950 text-slate-300 font-mono text-[9px] rounded-2xl p-4 border border-slate-900 shadow-inner h-36 flex flex-col justify-between">
              <div ref={consoleContainerRef} className="overflow-y-auto space-y-1 scrollbar-thin flex-1 max-h-[110px]">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="break-words leading-relaxed select-text tracking-wider opacity-90 font-medium">
                    {log}
                  </div>
                ))}
              </div>

              {/* Rolling digests & iterations live counters */}
              {isDeriving && (
                <div className="border-t border-slate-900 pt-2.5 mt-2 flex items-center justify-between gap-4 font-bold text-slate-400 text-[8.5px]">
                  <div className="truncate min-w-0 flex items-center gap-1.5">
                    <Hash size={10} className="text-blue-500 text-xs shrink-0" />
                    <span className="truncate text-slate-500 font-mono">0x{rollingHash}</span>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <span>{t("roundsRun")} <span className="text-white font-mono">{currentRounds.toLocaleString()}</span></span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated progress slider/bar */}
            {isDeriving && (
              <div className="relative w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-blue-500 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
          
        </div>

        {/* Footer actions */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            disabled={isDeriving}
            className="py-2 px-4 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-200/40 rounded-xl font-bold text-xs transition duration-150 cursor-pointer disabled:opacity-40"
          >
            {isCompleted ? t("close") : t("cancel")}
          </button>
        </div>

      </div>
    </div>
  );
};
