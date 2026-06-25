import React, { useState } from "react";
import { EmergencyContact } from "../types";
import { useLanguage } from "../services/LanguageContext";
import { 
  Users, 
  Plus, 
  Trash2, 
  Phone, 
  Mail, 
  Notebook, 
  Search, 
  UserPlus, 
  UserCheck,
  ShieldCheck
} from "lucide-react";

interface ContactManagerProps {
  contacts: EmergencyContact[];
  onUpdate: (contacts: EmergencyContact[]) => void;
}

const ContactManager: React.FC<ContactManagerProps> = ({ contacts, onUpdate }) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !relation.trim() || !phone.trim()) return;

    const newContact: EmergencyContact = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      name: name.trim(),
      relation: relation.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      note: note.trim() || undefined,
      createdAt: Date.now(),
    };

    onUpdate([newContact, ...contacts]);
    setName("");
    setRelation("");
    setPhone("");
    setEmail("");
    setNote("");
  };

  const handleDeleteContact = (id: string) => {
    onUpdate(contacts.filter(c => c.id !== id));
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.relation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="contact-manager-screen">
      
      {/* Forms column */}
      <section className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm p-6 md:p-8">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-5">
            <UserPlus size={16} className="text-rose-500" />
            <span>{t("contacts.mapGuardian")}</span>
          </h3>

          <form onSubmit={handleAddContact} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t("contacts.nameLabel")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("contacts.namePlaceholder")}
                className="w-full px-4 py-3 bg-slate-5/65 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs font-semibold transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t("contacts.relationLabel")}
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder={t("contacts.relationPlaceholder")}
                  className="w-full px-4 py-3 bg-slate-5/65 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs font-semibold transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t("contacts.phoneLabel")}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("contacts.phonePlaceholder")}
                  className="w-full px-4 py-3 bg-slate-5/65 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs font-semibold transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t("contacts.emailLabel")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("contacts.emailPlaceholder")}
                className="w-full px-4 py-3 bg-slate-5/65 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs font-semibold transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t("contacts.noteLabel")}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t("contacts.notePlaceholder")}
                className="w-full px-4 py-3 bg-slate-5/65 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs font-semibold h-20 resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider mt-5 active:scale-[0.98] shadow-md shadow-rose-500/10"
            >
              <UserCheck size={14} />
              <span>{t("contacts.registerAnchorBtn")}</span>
            </button>
          </form>
        </div>

        {/* Note on hardware security */}
        <div className="bg-slate-100/40 border border-slate-200/50 rounded-3xl p-6">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <ShieldCheck size={14} className="text-rose-500" />
            <span>{t("contacts.ringUtilityTitle")}</span>
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
            {t("contacts.ringUtilityDesc")}
          </p>
        </div>
      </section>

      {/* Directory column */}
      <section className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm p-6 md:p-8 min-h-[420px] flex flex-col justify-between">
          <div>
            {/* Header filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Users size={16} className="text-slate-800" />
                <span>{t("contacts.matrixTitle")}</span>
              </h3>

              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("contacts.searchPlaceholder")}
                  className="w-full sm:w-52 pl-9 pr-4 py-2 bg-slate-5/65 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-semibold transition-all"
                />
                <Search size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* List */}
            {filteredContacts.length === 0 ? (
              <div className="text-center py-24 flex flex-col items-center justify-center">
                <Users size={36} className="text-slate-350 stroke-1 mb-3" />
                <p className="text-xs text-slate-500 font-bold">{t("contacts.noContacts")}</p>
                <p className="text-[11px] text-slate-400 mt-1.5 max-w-xs px-4 leading-relaxed font-semibold">
                  {t("contacts.noContactsDesc")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-h-[500px] overflow-y-auto pr-1">
                {filteredContacts.map((contact) => (
                  <article key={contact.id} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between hover-lift transition-all duration-300 relative group overflow-hidden">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-none tracking-tight">{contact.name}</h4>
                          <span className="inline-block mt-2 text-[8px] font-bold text-rose-700 bg-rose-500/10 px-2.5 py-1 rounded-lg uppercase tracking-widest font-mono">
                            {contact.relation}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="text-slate-400 hover:text-red-600 p-2 rounded-xl bg-white hover:bg-red-50 hover:border-red-100 border border-slate-200 shadow-sm transition active:scale-95"
                          title={t("contacts.eraseGuardianTooltip")}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      {/* Info details */}
                      <div className="mt-5 space-y-2.5 text-xs font-medium text-slate-600">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone size={12} className="text-slate-400 shrink-0" />
                          <span className="font-mono">{contact.phone}</span>
                        </div>

                        {contact.email && (
                          <div className="flex items-center gap-2 text-slate-600 truncate">
                            <Mail size={12} className="text-slate-400 shrink-0" />
                            <span className="font-mono truncate">{contact.email}</span>
                          </div>
                        )}

                        {contact.note && (
                          <div className="mt-3.5 pt-3.5 border-t border-slate-200/40 text-[10px] text-slate-500 flex gap-2.5 items-start bg-slate-100/40 p-3 rounded-xl">
                            <Notebook size={12} className="text-slate-400 mt-0.5 shrink-0" />
                            <p className="leading-relaxed">{contact.note}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 text-[9px] text-slate-400 font-mono tracking-wider font-semibold flex items-center justify-between">
            <span>{t("contacts.registeredCompanions").replace("{count}", filteredContacts.length.toString())}</span>
            <span>{t("contacts.shardsOperated")}</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactManager;
