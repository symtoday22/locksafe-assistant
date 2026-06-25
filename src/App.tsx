import React, { useState, useEffect } from "react";
import { AppTab, PasswordHint, EmergencyContact } from "./types";
import { storageService } from "./services/storageService";
import { sessionService } from "./services/sessionService";
import Dashboard from "./screens/Dashboard";
import HintManager from "./screens/HintManager";
import ContactManager from "./screens/ContactManager";
import RecoveryGuides from "./screens/RecoveryGuides";
import Settings from "./screens/Settings";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import SecurityGate from "./components/SecurityGate";
import { useLanguage } from "./services/LanguageContext";

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [masterKey, setMasterKey] = useState<string | null>(sessionService.getSessionKey());
  const [hints, setHints] = useState<PasswordHint[]>([]);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  // Load basic data
  useEffect(() => {
    setContacts(storageService.getContacts());
  }, []);

  // Sync masterKey with Volatile Session Service
  useEffect(() => {
    const unsubscribe = sessionService.subscribe(() => {
      const currentKey = sessionService.getSessionKey();
      setMasterKey(currentKey);
      if (!currentKey) {
        // Clear references immediately upon key destruction
        setHints([]);
      }
    });
    return unsubscribe;
  }, []);

  // Sync hints when master key changes
  useEffect(() => {
    if (masterKey) {
      setHints(storageService.getHints(masterKey));
    } else {
      setHints([]);
    }
  }, [masterKey]);

  const handleAuthSuccess = (key: string) => {
    sessionService.startSession(key);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return (
          <Dashboard 
            hintsCount={hints.length} 
            contactsCount={contacts.length} 
            onNavigate={setActiveTab} 
          />
        );
      case AppTab.HINTS:
        return (
          <SecurityGate isAuthorized={!!masterKey} onAuthSuccess={handleAuthSuccess}>
            <HintManager 
              hints={hints} 
              onUpdate={(newHints) => {
                setHints(newHints);
                if (masterKey) storageService.saveHints(newHints, masterKey);
              }} 
            />
          </SecurityGate>
        );
      case AppTab.CONTACTS:
        return (
          <ContactManager 
            contacts={contacts} 
            onUpdate={(newContacts) => {
              setContacts(newContacts);
              storageService.saveContacts(newContacts);
            }} 
          />
        );
      case AppTab.RECOVERY:
        return <RecoveryGuides />;
      case AppTab.SETTINGS:
        return <Settings logout={() => sessionService.terminateSession()} />;
      default:
        return (
          <Dashboard 
            hintsCount={hints.length} 
            contactsCount={contacts.length} 
            onNavigate={setActiveTab} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-800">
      {/* Sidebar / Bottom Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Right Column Container: Prevents squishing and handles sidebar padding constraints */}
            <div className="flex-1 flex flex-col min-w-0 md:pl-64 pb-20 md:pb-4">

        <Header activeTab={activeTab} />
        
        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
          {renderContent()}
        </main>

        <footer className="bg-white border-t border-slate-100 p-6 text-center text-xs text-slate-400 mt-auto">
          <p>{t("app.footerDisclaimer")}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
