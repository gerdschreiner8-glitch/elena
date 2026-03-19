import React, { useState } from 'react';
import DocumentGenerator from '../components/DocumentGenerator';
import { getProfileData } from '../utils/profileStore';

interface FormsViewProps {
  language: string;
}

export default function FormsView({ language }: FormsViewProps) {
  const [activeStep, setActiveStep] = useState('st_lebach');
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const stepMapping: Record<string, number> = {
    'st_lebach': 1,
    'st_rathaus': 2,
    'st_bank': 3,
    'st_sozial': 4,
    'st_abh': 5,
    'st_kv': 6,
    'st_jc': 7
  };

  React.useEffect(() => {
    const status: Record<string, boolean> = {};
    Object.keys(stepMapping).forEach(id => {
      status[id] = localStorage.getItem(`app_chk_v2_${stepMapping[id]}`) === 'true';
    });
    setCompletedSteps(status);
  }, []);

  const toggleStepDone = (id: string) => {
    const isDone = !completedSteps[id];
    const newStatus = { ...completedSteps, [id]: isDone };
    setCompletedSteps(newStatus);
    localStorage.setItem(`app_chk_v2_${stepMapping[id]}`, isDone ? 'true' : 'false');
  };

  const handleGenerateDoc = (docType: string) => {
    const profile = getProfileData();
    
    // Check required fields
    if (docType !== 'vollmacht_preview' && docType !== 'custom_letter') {
      const missing = [];
      if (!profile.v) missing.push("Vorname");
      if (!profile.n) missing.push("Nachname");
      if (!profile.d) missing.push("Geburtsdatum");
      if (!profile.pers) missing.push("Personen im Haushalt");
      if (!profile.s) missing.push("Straße & Hausnummer");
      if (!profile.o) missing.push("Wohnort");
      if (!profile.e) missing.push("E-Mail Adresse");

      if (missing.length > 0) {
        alert(`Achtung: Für einen rechtsgültigen Antrag fehlen noch Daten im Profil:\n- ${missing.join('\n- ')}`);
        return;
      }
    }

    if (!profile.hasSig || !profile.sig) {
      alert("Aus rechtlichen Gründen musst du zuerst im Profil unterzeichnen, bevor du Dokumente verwenden kannst.");
      return;
    }

    setActiveDoc(docType);
  };

  const t = {
    title: { de: "Fahrplan & Anträge 📑", uk: "План та Заяви 📑", ru: "План и Заявления 📑", en: "Roadmap & Forms 📑" },
    desc: { de: "Das System generiert für dich rechtssichere, aber freundliche Schreiben. Wähle einfach eine Station:", uk: "Система генерує для тебе юридично правильні листи. Просто обери зупинку:", ru: "Система генерирует для тебя юридически правильные письма. Просто выбери остановку:", en: "The system generates legally secure but friendly letters for you. Just select a stop:" },
    steps: [
      { id: 'st_lebach', de: "1. Lebach", uk: "1. Лебах", ru: "1. Лебах", en: "1. Lebach" },
      { id: 'st_rathaus', de: "2. Rathaus", uk: "2. Ратуша", ru: "2. Ратуша", en: "2. Town Hall" },
      { id: 'st_bank', de: "3. Bank", uk: "3. Банк", ru: "3. Банк", en: "3. Bank" },
      { id: 'st_sozial', de: "4. Sozialamt", uk: "4. Соц. служба", ru: "4. Соц. служба", en: "4. Social Office" },
      { id: 'st_abh', de: "5. Aufenthaltstitel", uk: "5. Дозвіл на проживання", ru: "5. ВНЖ", en: "5. Residence Permit" },
      { id: 'st_kv', de: "6. Krankenkasse", uk: "6. Страхування", ru: "6. Страховка", en: "6. Health Ins." },
      { id: 'st_jc', de: "7. Jobcenter", uk: "7. Jobcenter", ru: "7. Jobcenter", en: "7. Jobcenter" }
    ],
    doneBtn: { de: "Schritt erledigt ✅", uk: "Крок виконано ✅", ru: "Шаг выполнен ✅", en: "Step completed ✅" },
    undoBtn: { de: "Schritt zurücksetzen ↩️", uk: "Скинути крок ↩️", ru: "Сбросить шаг ↩️", en: "Reset step ↩️" }
  };

  const getT = (k: keyof typeof t) => {
    const val = t[k];
    if (Array.isArray(val)) return val;
    return (val as any)[language] || (val as any).de;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {getT('title')}
      </h2>
      <p className="mb-6">{getT('desc')}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        {t.steps.map(step => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`border-2 p-2.5 sm:p-3 rounded-xl cursor-pointer text-center font-bold text-[11px] sm:text-xs transition-all relative flex items-center justify-center min-h-[50px] sm:min-h-0 ${activeStep === step.id ? 'border-secondary bg-secondary/5 text-primary shadow-sm' : 'border-gray-200 bg-white text-gray-600'}`}
          >
            <span className="line-clamp-2">{step[language as keyof typeof step] || step.de}</span>
            {completedSteps[step.id] && (
              <span className="absolute -top-1.5 -right-1.5 bg-success text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm border border-white">✓</span>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6 border-2 border-gray-200 rounded-2xl bg-white shadow-sm border-l-[6px] border-l-secondary">
        {activeStep === 'st_lebach' && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-xl font-bold mb-3 text-primary">1. Landesaufnahmestelle Lebach</h3>
            <p className="mb-4 text-sm sm:text-base text-gray-700">Dein erster Weg führt dich nach Lebach zur offiziellen Registrierung.</p>
            <h4 className="text-primary font-bold mb-3 text-sm uppercase tracking-wider">Bitte mitbringen:</h4>
            <ul className="list-none p-0 m-0 space-y-3 mb-6">
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Reisepass oder nationale Ausweisdokumente</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Geburtsurkunden (auch der Kinder)</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Heiratsurkunde (falls vorhanden)</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base"><b>Vermieterbescheinigung</b> (Wohnungsgeberbestätigung)</span>
              </li>
            </ul>
            <a href="https://maps.google.com/maps?q=Landesaufnahmestelle+Lebach+Schlesierallee+17" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary text-white p-4 rounded-xl font-bold no-underline mb-6 shadow-md active:scale-[0.98] transition-all">
              📍 Route nach Lebach
            </a>

            <button 
              onClick={() => toggleStepDone('st_lebach')}
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${completedSteps['st_lebach'] ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-success/5 border-success text-success hover:bg-success hover:text-white'}`}
            >
              {completedSteps['st_lebach'] ? getT('undoBtn') : getT('doneBtn')}
            </button>
          </div>
        )}

        {activeStep === 'st_rathaus' && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-xl font-bold mb-3 text-primary">2. Das örtliche Rathaus</h3>
            <p className="mb-4 text-sm sm:text-base text-gray-700">Melde deinen Wohnsitz in deiner Gemeinde an.</p>
            <h4 className="text-primary font-bold mb-3 text-sm uppercase tracking-wider">Bitte mitbringen:</h4>
            <ul className="list-none p-0 m-0 space-y-3 mb-6">
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Reisepass oder Ausweis</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Ankunftsnachweis (aus Lebach)</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Wohnungsgeberbestätigung (vom Vermieter)</span>
              </li>
            </ul>

            <button 
              onClick={() => toggleStepDone('st_rathaus')}
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${completedSteps['st_rathaus'] ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-success/5 border-success text-success hover:bg-success hover:text-white'}`}
            >
              {completedSteps['st_rathaus'] ? getT('undoBtn') : getT('doneBtn')}
            </button>
          </div>
        )}

        {activeStep === 'st_sozial' && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-xl font-bold mb-3 text-primary">4. Sozialamt (AsylbLG / SGB XII)</h3>
            
            <h4 className="text-primary font-bold mb-3 text-sm uppercase tracking-wider">Notwendige Dokumente (Kopie):</h4>
            <ul className="list-none p-0 m-0 space-y-3 mb-6">
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Reisepass, Meldebescheinigung & Ankunftsnachweis</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Mietvertrag / Mietbescheinigung</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Bankverbindung (Karte / Auszug) & Auszüge (3 Monate)</span>
              </li>
            </ul>

            <div className="mt-6 mb-8 bg-blue-50 border-2 border-blue-200 p-4 sm:p-5 rounded-2xl shadow-sm">
              <p className="text-[11px] font-extrabold text-blue-800 mb-2 uppercase tracking-widest">🌐 Offizielle Hauptanträge</p>
              <p className="text-sm text-blue-900 mb-4 leading-relaxed">Die originalen Anträge für das Kreissozialamt Merzig-Wadern findest du hier:</p>
              <div className="flex flex-col gap-3">
                <a href="https://www.merzig-wadern.de/media/custom/2875_6299_1.PDF?1616404179" target="_blank" rel="noopener noreferrer" className="bg-blue-600 border-2 border-blue-700 text-white p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-blue-700 transition-all no-underline shadow-md active:scale-[0.98]">
                  <span className="text-xl">📄</span> Formular AsylbLG
                </a>
                <a href="https://www.merzig-wadern.de/media/custom/2875_6300_1.PDF?1616404179" target="_blank" rel="noopener noreferrer" className="bg-blue-600 border-2 border-blue-700 text-white p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-blue-700 transition-all no-underline shadow-md active:scale-[0.98]">
                  <span className="text-xl">📄</span> Antrag Grundsicherung
                </a>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <p className="text-[11px] font-extrabold text-danger mb-3 uppercase tracking-widest">1. Akute Notlage</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleGenerateDoc('eil_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Eilantrag Leistungen
                  </button>
                  <button onClick={() => handleGenerateDoc('vorschuss_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Antrag auf Vorschuss
                  </button>
                  <button onClick={() => handleGenerateDoc('krankenschein_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Antrag auf Krankenschein
                  </button>
                  <button onClick={() => handleGenerateDoc('bekleidung_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Antrag auf Bekleidung
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-extrabold text-primary mb-3 uppercase tracking-widest">2. Eigene Wohnung</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleGenerateDoc('miete_zustimmung_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Antrag auf Mietübernahme
                  </button>
                  <button onClick={() => handleGenerateDoc('miete_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Mietabtretung (Direktzahlung)
                  </button>
                  <button onClick={() => handleGenerateDoc('erst_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Erstausstattung (Möbel)
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-extrabold text-primary mb-3 uppercase tracking-widest">3. Besondere Lebenslagen</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleGenerateDoc('mehrbedarf_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Mehrbedarf (Schwangerschaft)
                  </button>
                  <button onClick={() => handleGenerateDoc('but_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Bildung & Teilhabe
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => toggleStepDone('st_sozial')}
              className={`w-full p-4 mt-8 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${completedSteps['st_sozial'] ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-success/5 border-success text-success hover:bg-success hover:text-white'}`}
            >
              {completedSteps['st_sozial'] ? getT('undoBtn') : getT('doneBtn')}
            </button>
          </div>
        )}

        {activeStep === 'st_jc' && (
          <div className="animate-in fade-in duration-300">
            <h3 className="text-xl font-bold mb-3 text-primary">7. Jobcenter (SGB II)</h3>
            
            <h4 className="text-primary font-bold mb-3 text-sm uppercase tracking-wider">Für den Hauptantrag:</h4>
            <ul className="list-none p-0 m-0 space-y-3 mb-6">
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Aufenthaltstitel, Meldebescheinigung & Mietvertrag</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Kontoauszüge (3 Monate) & Steuer-ID</span>
              </li>
              <li className="bg-[#f8fbff] p-3.5 rounded-xl border border-blue-100 shadow-sm flex gap-3 items-start">
                <span className="text-xl shrink-0">📄</span> 
                <span className="text-sm sm:text-base">Krankenkassen-Bescheinigung & Vollmacht</span>
              </li>
            </ul>

            <div className="mt-2 mb-8 bg-orange-50 border-2 border-orange-200 p-4 sm:p-5 rounded-2xl shadow-sm">
              <p className="text-orange-800 font-bold mb-4 leading-relaxed">
                ⚠️ Wichtig: Anlagen zum Bürgergeldantrag unbedingt mit ausfüllen, sonst verzögert sich alles!
              </p>
              <div className="flex flex-col gap-3">
                <a href="https://www.arbeitsagentur.de/datei/antrag-buergergeld_ba043012.pdf" target="_blank" rel="noopener noreferrer" className="bg-orange-600 border-2 border-orange-700 text-white p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-orange-700 transition-all no-underline shadow-md active:scale-[0.98]">
                  <span className="text-xl">📄</span> Antrag Bürgergeld (PDF)
                </a>
                <div className="mt-2">
                  <label className="block text-[11px] font-extrabold text-orange-900 mb-2 uppercase tracking-widest">Notwendige Anlagen:</label>
                  <select 
                    className="w-full p-3.5 border-2 border-orange-300 rounded-xl bg-white font-bold text-orange-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 shadow-sm outline-none text-sm"
                    onChange={(e) => {
                      if (e.target.value) window.open(e.target.value, '_blank');
                      e.target.value = "";
                    }}
                  >
                    <option value="">-- Anlage wählen --</option>
                    <option value="https://www.arbeitsagentur.de/datei/anlage-wep_ba043048.pdf">Anlage WEP (Weitere Personen)</option>
                    <option value="https://www.arbeitsagentur.de/datei/anlage-ki_ba043022.pdf">Anlage KI (Kinder)</option>
                    <option value="https://www.arbeitsagentur.de/datei/anlage-kdu_ba043020.pdf">Anlage KdU (Wohnkosten)</option>
                    <option value="https://www.arbeitsagentur.de/datei/anlage-ek_ba043015.pdf">Anlage EK (Einkommen)</option>
                    <option value="https://www.arbeitsagentur.de/datei/anlage-vm_ba043046.pdf">Anlage VM (Vermögen)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <p className="text-[11px] font-extrabold text-danger mb-3 uppercase tracking-widest">1. Existenzsicherung & Wohnen</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleGenerateDoc('begl_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Anschreiben Hauptantrag
                  </button>
                  <button onClick={() => handleGenerateDoc('miete_zustimmung_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Antrag auf Mietübernahme
                  </button>
                  <button onClick={() => handleGenerateDoc('kaution_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Antrag auf Mietkaution
                  </button>
                  <button onClick={() => handleGenerateDoc('miete_abtretung_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Mietabtretung
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-extrabold text-primary mb-3 uppercase tracking-widest">2. Besonderer Grundbedarf</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleGenerateDoc('erst_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Erstausstattung (Wohnung)
                  </button>
                  <button onClick={() => handleGenerateDoc('bekleidung_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Erstausstattung Kleidung
                  </button>
                  <button onClick={() => handleGenerateDoc('mehrbedarf_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Antrag auf Mehrbedarf
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-extrabold text-primary mb-3 uppercase tracking-widest">3. Weitere Anträge</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleGenerateDoc('but_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Bildung & Teilhabe
                  </button>
                  <button onClick={() => handleGenerateDoc('fahrtkosten_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Übernahme von Fahrtkosten
                  </button>
                  <button onClick={() => handleGenerateDoc('oaw_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-xl font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
                    <span className="text-xl">📄</span> Antrag auf Urlaub (OAW)
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => toggleStepDone('st_jc')}
              className={`w-full p-4 mt-8 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${completedSteps['st_jc'] ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-success/5 border-success text-success hover:bg-success hover:text-white'}`}
            >
              {completedSteps['st_jc'] ? getT('undoBtn') : getT('doneBtn')}
            </button>
          </div>
        )}

        {activeStep !== 'st_lebach' && activeStep !== 'st_rathaus' && activeStep !== 'st_sozial' && activeStep !== 'st_jc' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center p-8 text-gray-400 italic mb-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              Dieser Bereich wird gerade in das neue System übertragen.
            </div>
            <button 
              onClick={() => toggleStepDone(activeStep)}
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${completedSteps[activeStep] ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-success/5 border-success text-success hover:bg-success hover:text-white'}`}
            >
              {completedSteps[activeStep] ? getT('undoBtn') : getT('doneBtn')}
            </button>
          </div>
        )}
      </div>

      {activeDoc && (
        <DocumentGenerator 
          docType={activeDoc} 
          profile={getProfileData()} 
          language={language} 
          onClose={() => setActiveDoc(null)} 
        />
      )}
    </div>
  );
}
