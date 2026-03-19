import React, { useState, useEffect } from 'react';
import SignaturePad from '../components/SignaturePad';
import DocumentGenerator from '../components/DocumentGenerator';
import { getProfileData, saveProfileData, ProfileData } from '../utils/profileStore';

interface ProfileViewProps {
  language: string;
  setCurrentView: (view: string) => void;
}

export default function ProfileView({ language, setCurrentView }: ProfileViewProps) {
  const [profile, setProfile] = useState<Partial<ProfileData>>({});
  const [showVollmacht, setShowVollmacht] = useState(false);

  useEffect(() => {
    setProfile(getProfileData());
  }, []);

  const handleChange = (field: keyof ProfileData, value: any) => {
    const newProfile = { ...profile, [field]: value };
    setProfile(newProfile);
    saveProfileData(newProfile);
  };

  const handleSignatureSave = (data: string) => {
    const newProfile = { ...profile, sig: data, hasSig: !!data };
    setProfile(newProfile);
    saveProfileData(newProfile);
  };

  const t = {
    title: { de: "Dein Profil", uk: "Твій профіль", ru: "Твой профиль", en: "Your Profile" },
    desc: { de: "Diese Daten helfen mir, deine Anträge sicher und fehlerfrei auszufüllen. Alles bleibt privat auf deinem Handy.", uk: "Ці дані допоможуть мені безпечно та без помилок заповнити твої заяви. Все залишається приватно на твоєму телефоні.", ru: "Эти данные помогут мне безопасно и без ошибок заполнить твои заявления. Всё остается приватно на твоем телефоне.", en: "These details help me to fill out your applications safely and without errors. Everything remains private on your phone." },
    vorname: { de: "Vorname", uk: "Ім'я", ru: "Имя", en: "First Name" },
    nachname: { de: "Nachname", uk: "Прізвище", ru: "Фамилия", en: "Last Name" },
    geburtsdatum: { de: "Geburtsdatum", uk: "Дата народження", ru: "Дата рождения", en: "Date of Birth" },
    personen: { de: "Personen im Haushalt (inkl. dir)", uk: "Осіб у домогосподарстві (вкл. тебе)", ru: "Человек в семье (вкл. тебя)", en: "Persons in household (incl. you)" },
    strasse: { de: "Straße & Hausnummer", uk: "Вулиця та номер будинку", ru: "Улица и номер дома", en: "Street & House Number" },
    ort: { de: "Wohnort", uk: "Місто / Село", ru: "Город / Село", en: "City / Village" },
    email: { de: "E-Mail Adresse", uk: "Електронна пошта", ru: "Электронная почта", en: "Email Address" },
    telefon: { de: "Telefon (für Rückfragen)", uk: "Телефон (для зв'язку)", ru: "Телефон (для связи)", en: "Phone (for callbacks)" },
    az: { de: "Aktenzeichen (falls bekannt)", uk: "Номер справи (якщо відомо)", ru: "Номер дела (если известен)", en: "File number (if known)" },
    fluchtgrund: { de: "Besondere Notlage (wichtig für Eilanträge!)", uk: "Особлива ситуація (для термінових заяв)", ru: "Особая ситуация (для срочных заявлений)", en: "Special emergency situation (important for urgent requests!)" },
    vollmachtTitle: { de: "Vollmacht zur Unterstützung & Unterschrift 🌟", uk: "Довіреність на допомогу та Підпис 🌟", ru: "Доверенность на помощь и Подпись 🌟", en: "Power of Attorney for Support & Signature 🌟" },
    vollmachtDesc: { de: "Damit unser Betreuer-Team offiziell für dich als Beistand (gem. § 13 SGB X) tätig werden darf, benötigen wir deine Unterschrift. Diese Vollmacht wird dem Hauptantrag bei Sozialamt und Jobcenter beigefügt.", uk: "Щоб наша команда кураторів могла офіційно допомагати тобі як представник (згідно § 13 SGB X), нам потрібен твій підпис. Ця довіреність додається до головної заяви до соц. служби та Jobcenter.", ru: "Чтобы наша команда кураторов могла официально помогать тебе как представитель (согл. § 13 SGB X), нам нужна твоя подпись. Эта доверенность прилагается к главному заявлению в соц. службу и Jobcenter.", en: "So that our support team can officially act for you as an assistant (acc. to § 13 SGB X), we need your signature. This power of attorney is attached to the main application at the social office and Jobcenter." },
    btn: { de: "Weiter zur Checkliste ➔", uk: "Далі до списку ➔", ru: "Далее к списку ➔", en: "Continue to checklist ➔" },
    previewBtn: { de: "🔍 Vorschau der Vollmacht (zur Einsicht)", uk: "🔍 Перегляд довіреності (для ознайомлення)", ru: "🔍 Предпросмотр доверенности (для ознакомления)", en: "🔍 Preview power of attorney (for review)" }
  };

  const getT = (k: keyof typeof t) => (t[k] as any)[language] || (t[k] as any).de;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {getT('title')}
      </h2>
      <p className="mb-6">{getT('desc')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('vorname')} <span className="text-danger">*</span></label>
          <input type="text" value={profile.v || ''} onChange={e => handleChange('v', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('nachname')} <span className="text-danger">*</span></label>
          <input type="text" value={profile.n || ''} onChange={e => handleChange('n', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('geburtsdatum')} <span className="text-danger">*</span></label>
          <input type="date" value={profile.d || ''} onChange={e => handleChange('d', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('personen')} <span className="text-danger">*</span></label>
          <input type="number" min="1" max="15" value={profile.pers || ''} onChange={e => handleChange('pers', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('strasse')} <span className="text-danger">*</span></label>
          <input type="text" value={profile.s || ''} onChange={e => handleChange('s', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('ort')} <span className="text-danger">*</span></label>
          <select value={profile.o || ''} onChange={e => handleChange('o', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-white">
            <option value="">Bitte wählen...</option>
            <option value="66663 Merzig">66663 Merzig</option>
            <option value="66687 Wadern">66687 Wadern</option>
            <option value="66679 Losheim am See">66679 Losheim am See</option>
            <option value="66701 Beckingen">66701 Beckingen</option>
            <option value="66693 Mettlach">66693 Mettlach</option>
            <option value="66708 Perl">66708 Perl</option>
            <option value="66689 Weiskirchen">66689 Weiskirchen</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('email')} <span className="text-danger">*</span></label>
          <input type="email" value={profile.e || ''} onChange={e => handleChange('e', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('telefon')}</label>
          <input type="text" value={profile.t || ''} onChange={e => handleChange('t', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-sm mb-1 text-primary">{getT('az')}</label>
          <input type="text" value={profile.a || ''} onChange={e => handleChange('a', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>
        <div className="flex flex-col sm:col-span-2">
          <label className="font-bold text-sm mb-1 text-primary">{getT('fluchtgrund')}</label>
          <textarea rows={3} value={profile.f || ''} onChange={e => handleChange('f', e.target.value)} className="p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
        </div>

        <div className="flex flex-col sm:col-span-2 mt-4">
          <div className="bg-[#fff5f5] border-l-[6px] border-danger p-4 rounded-lg">
            <h4 className="mt-0 text-danger font-bold">{getT('vollmachtTitle')}</h4>
            <p className="text-sm">{getT('vollmachtDesc')}</p>
            <SignaturePad initialData={profile.sig} onSave={handleSignatureSave} language={language} />
            
            <button 
              onClick={() => setShowVollmacht(true)}
              className="w-full mt-4 bg-white border-2 border-primary text-primary p-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
            >
              {getT('previewBtn')}
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setCurrentView('dashboard')}
        className="w-full flex items-center justify-center p-4 mt-6 text-lg bg-success text-white rounded-xl font-extrabold cursor-pointer shadow-lg transition-opacity hover:opacity-90"
      >
        {getT('btn')}
      </button>

      {showVollmacht && (
        <DocumentGenerator 
          docType="vollmacht_preview" 
          profile={getProfileData()} 
          language={language} 
          onClose={() => setShowVollmacht(false)} 
        />
      )}
    </div>
  );
}
