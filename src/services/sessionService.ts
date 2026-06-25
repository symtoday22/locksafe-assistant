import { storageService } from "./storageService";

class VolatileSessionService {
  // Scrambled memory buffer and salt
  private scrambledBuffer: Uint8Array | null = null;
  private salt: Uint8Array | null = null;
  private timer: NodeJS.Timeout | null = null;
  private lastActive: number = Date.now();
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      const resetActivity = () => this.refreshActivity();
      
      // Monitor physical user interactions to reset physical session timeout parameters
      ["mousedown", "keydown", "touchstart", "mousemove", "click"].forEach(evt => {
        window.addEventListener(evt, resetActivity, { passive: true });
      });
      
      this.startInactivityChecker();
    }
  }

  /**
   * Scramble the plain text cryptographic code in memory using an XOR random cipher byte array.
   * This mitigates client-side heap dumps or simple string inspection vulnerabilities.
   */
  private scramble(plain: string): { buffer: Uint8Array; salt: Uint8Array } {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(plain);
    const salt = new Uint8Array(encoded.length);
    
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(salt);
    } else {
      for (let i = 0; i < salt.length; i++) {
        salt[i] = Math.floor(Math.random() * 256);
      }
    }
    
    const buffer = new Uint8Array(encoded.length);
    for (let i = 0; i < encoded.length; i++) {
      buffer[i] = encoded[i] ^ salt[i];
    }
    
    return { buffer, salt };
  }

  /**
   * Reconstitutes the temporary key byte values only on demand in local stack scope.
   */
  private descramble(buffer: Uint8Array, salt: Uint8Array): string {
    const decoded = new Uint8Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      decoded[i] = buffer[i] ^ salt[i];
    }
    const decoder = new TextDecoder();
    return decoder.decode(decoded);
  }

  /**
   * Initialize a new session
   */
  public startSession(passphrase: string): void {
    const { buffer, salt } = this.scramble(passphrase);
    this.scrambledBuffer = buffer;
    this.salt = salt;
    this.lastActive = Date.now();
    storageService.addLog("Secure Volatile Keyspace Session established in scrambled RAM", "success");
    this.notify();
  }

  /**
   * Safe access function returning the temporary decrypted master key.
   */
  public getSessionKey(): string | null {
    if (!this.scrambledBuffer || !this.salt) return null;
    return this.descramble(this.scrambledBuffer, this.salt);
  }

  /**
   * Check if a session is alive
   */
  public isSessionActive(): boolean {
    return this.scrambledBuffer !== null;
  }

  /**
   * Clear, scramble, and nullify references
   */
  public terminateSession(): void {
    if (this.scrambledBuffer) {
      // Direct byte overwrites with zeros before discarding reference
      this.scrambledBuffer.fill(0);
      this.salt?.fill(0);
    }
    this.scrambledBuffer = null;
    this.salt = null;
    storageService.addLog("Active keyspace session destroyed and volatile RAM scrubbed", "info");
    this.notify();
  }

  private refreshActivity(): void {
    if (this.isSessionActive()) {
      this.lastActive = Date.now();
    }
  }

  private startInactivityChecker(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    this.timer = setInterval(() => {
      const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 Minutes
      if (this.isSessionActive() && Date.now() - this.lastActive > INACTIVITY_LIMIT) {
        storageService.addLog("Session automatically expired due to 5 minutes of total user inactivity", "warning");
        this.terminateSession();
      }
    }, 5000); // Audit interval of 5 seconds
  }

  /**
   * Subscribe to session modifications (e.g. timeout self-destruction logs)
   */
  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }

  /**
   * Returns exact decimal seconds left on active session
   */
  public getInactivitySecondsLeft(): number {
    if (!this.isSessionActive()) return 0;
    const elapsed = Date.now() - this.lastActive;
    const remaining = (5 * 60 * 1000) - elapsed;
    return Math.max(0, Math.floor(remaining / 1000));
  }
}

export const sessionService = new VolatileSessionService();
