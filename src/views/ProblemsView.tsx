import React, { useState, useEffect } from 'react';
import DocumentGenerator from '../components/DocumentGenerator';
import { getProfileData } from '../utils/profileStore';
import { GoogleGenAI } from '@google/genai';
import { setChatContext } from '../utils/chatContextStore';

interface ProblemsViewProps {
  language: string;
  setCurrentView: (view: string) => void;
}

export default function ProblemsView({ language, setCurrentView }: ProblemsViewProps) {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [assessmentInput, setAssessmentInput] = useState('');
  const [assessmentFiles, setAssessmentFiles] = useState<File[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setChatContext({
      input: assessmentInput,
      result: assessmentResult || '',
      files: assessmentFiles
    });
  }, [assessmentInput, assessmentResult, assessmentFiles]);

  const handleGenerateDoc = (docType: string) => {
    const profile = getProfileData();
    
    if (!profile.hasSig || !profile.sig) {
      alert("Aus rechtlichen Gründen musst du zuerst im Profil unterzeichnen, bevor du Dokumente verwenden kannst.");
      return;
    }

    setActiveDoc(docType);
  };

  const handleAssessment = async () => {
    const profile = getProfileData();
    if (!profile.v || !profile.n || !profile.hasSig) {
      alert("Bitte fülle zuerst dein Profil aus und unterschreibe die Vollmacht.");
      return;
    }

    if (!assessmentInput && assessmentFiles.length === 0) {
      alert("Bitte beschreibe dein Problem oder lade ein Dokument hoch.");
      return;
    }

    setIsAnalyzing(true);
    setAssessmentResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: "AIzaSyCTgFNm7KElo3wFUqBJAOnhKneL4wq3mmo" });
      const userName = profile.v || "Nutzer";

      const systemPrompt = `Du bist ein hochqualifiziertes Experten-System für deutsches Sozial- und Verwaltungsrecht.
Deine Aufgabe: Gib eine Ersteinschätzung zu dem Anliegen oder dem hochgeladenen Dokument des Nutzers.
WICHTIG: Du handelst als Beistand und Unterstützer. Deine Einschätzung ist eine fachliche Orientierungshilfe, keine Rechtsberatung.
1. Sprich den Nutzer immer direkt mit seinem Vornamen an: "${userName}". Nutze konsequent die "Du"-Form.
2. Verwende NIEMALS das Wort "generieren" oder "Generierung" in deiner Antwort. Verwende stattdessen Begriffe wie "erstellen", "schreiben" oder "formulieren".
3. Schreibe sehr einfach und beruhigend, vermeide kompliziertes Juristendeutsch. 
4. Zeige aber klar, dass deine Antwort fachlich absolut fundiert ist (nenne z.B. kurz den passenden Paragraphen, die Frist oder das entsprechende Gesetz als Beweis deiner Kompetenz).
5. Erkläre die Sachlage und zeige auf, wie das Anliegen behoben werden kann.
6. KEINE RECHTSBERATUNG (RDG-KONFORM): Du darfst KEINE verbindliche Rechtsberatung im Einzelfall leisten. Gib NIEMALS eine prozentuale Erfolgschance an. Erkläre lediglich allgemein die Rechtslage und mögliche nächste Schritte, ohne eine Erfolgsgarantie zu geben.
7. VERWEIS AUF CHAT: Weise den Nutzer darauf hin, dass er jederzeit unten rechts auf den Hilfe-Button klicken kann, um mit uns über dieses Anliegen zu chatten und weitere Fragen zu stellen.
8. Formuliere die Antwort in sauberen HTML-Absätzen (<b>, <p>, <ul>).
9. Verfasse die Antwort zwingend in der Sprache, in der der Nutzer die Eingabe gemacht hat (oder in der Systemsprache).
10. Schreibe KEINEN eigenen rechtlichen Disclaimer ans Ende, das übernimmt das System.
11. ANTI-HALLUZINATION (100% SICHERHEIT): Erfinde NIEMALS Fakten, Gesetze, Fristen oder Adressen. Wenn du etwas nicht zu 100% sicher weißt, MUSST du antworten: "Dazu liegen mir keine gesicherten Informationen vor. Bitte wende dich an eine offizielle Beratungsstelle." Gib unter keinen Umständen falsche Auskünfte.`;

      let promptText = `Nutzeranliegen: "${assessmentInput}"\nBitte analysiere dieses Anliegen rechtlich fundiert, verständlich und extrem motivierend wie gefordert.`;
      
      const parts: any[] = [{ text: promptText }];

      if (assessmentFiles.length > 0) {
        for (const file of assessmentFiles) {
          const base64String = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
          });
          parts.push({ inlineData: { data: base64String, mimeType: file.type } });
        }
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
        config: { 
          systemInstruction: systemPrompt,
          temperature: 0.0
        }
      });

      if (response.text) {
        let cleanHtml = response.text.replace(/```html/g, '').replace(/```/g, '').trim();
        cleanHtml = cleanHtml.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
        setAssessmentResult(cleanHtml);
      } else {
        throw new Error("No response text");
      }
    } catch (error) {
      console.error("Assessment error:", error);
      setAssessmentResult("<span style='color:red;'>Fehler bei der Analyse. Bitte überprüfe deine Internetverbindung.</span>");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const t = {
    title: { de: "Probleme lösen 🛡️", uk: "Вирішення проблем 🛡️", ru: "Решение проблем 🛡️", en: "Solve Problems 🛡️" },
    desc: { de: "Manchmal dauern Anträge ungewöhnlich lange oder werden versehentlich abgelehnt. Das ist normal und lässt sich oft klären.", uk: "Іноді розгляд заяв триває надзвичайно довго або їх помилково відхиляють.", ru: "Иногда рассмотрение заявлений длится слишком долго или их ошибочно отклоняют.", en: "Sometimes applications take unusually long or are accidentally rejected." }
  };

  const getT = (k: keyof typeof t) => (t[k] as any)[language] || (t[k] as any).de;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {getT('title')}
      </h2>
      <p className="mb-6">{getT('desc')}</p>

      <div className="bg-[#f8fbff] border-l-[6px] border-accent p-4 sm:p-5 rounded-lg mb-4 shadow-sm">
        <h3 className="text-lg font-bold mb-2">1. Der Antrag dauert zu lange?</h3>
        <p className="mb-4 text-sm sm:text-base">Mit einer freundlichen Sachstandsanfrage erinnerst du das Amt.</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => handleGenerateDoc('sachstand_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-lg font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
            <span className="text-xl">📄</span> Nachfrage beim Sozialamt
          </button>
          <button onClick={() => handleGenerateDoc('sachstand_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-lg font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
            <span className="text-xl">📄</span> Nachfrage beim Jobcenter
          </button>
        </div>
      </div>

      <div className="bg-[#fff5f5] border-l-[6px] border-danger p-4 sm:p-5 rounded-lg mb-4 shadow-sm">
        <h3 className="text-lg font-bold mb-2">2. Dein Antrag wurde abgelehnt?</h3>
        <p className="mb-4 text-sm sm:text-base">Wenn das Geld falsch berechnet wurde, kannst du Widerspruch einlegen (Frist: 1 Monat!).</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => handleGenerateDoc('widerspruch_sozial')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-lg font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
            <span className="text-xl">📄</span> Widerspruch (Sozialamt)
          </button>
          <button onClick={() => handleGenerateDoc('widerspruch_jc')} className="bg-white border-2 border-primary text-primary p-3.5 rounded-lg font-bold text-left flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-[0.98]">
            <span className="text-xl">📄</span> Widerspruch (Jobcenter)
          </button>
        </div>
      </div>
      
      <div className="bg-white border-l-[6px] border-[#2980b9] p-4 sm:p-5 rounded-lg mt-5 shadow-md">
        <h3 className="text-lg font-bold mb-2">3. Allgemeine rechtliche Orientierung 🌟</h3>
        <p className="mb-4 text-sm">
          Verstehst du einen Brief vom Amt nicht? Lade ihn hier hoch oder beschreibe deine Situation. Unser System übersetzt das Behördendeutsch in einfache Sprache und erklärt dir, worum es geht.<br/><br/>
          <span className="text-gray-500 text-[11px] sm:text-xs leading-tight block"><b>⚠️ Wichtig:</b> Dies ist ausdrücklich keine Rechtsberatung, sondern nur eine allgemeine Orientierungshilfe.</span>
        </p>
        
        <textarea 
          rows={4} 
          value={assessmentInput}
          onChange={(e) => setAssessmentInput(e.target.value)}
          placeholder="Beschreibe deine Situation so genau wie möglich..." 
          className="w-full p-3 border-2 border-gray-200 rounded-lg mb-4 focus:border-[#2980b9] focus:ring-4 focus:ring-[#2980b9]/10 outline-none transition-all text-base"
        />
        
        <div className="mb-4">
          <label className="cursor-pointer bg-[#eef1f5] text-primary p-4 rounded-lg font-bold flex items-center justify-center gap-2 text-sm border-2 border-dashed border-primary transition-all hover:bg-gray-200 active:scale-[0.98]">
            <span className="text-xl">📎</span> Brief hochladen (Foto oder PDF)
            <input 
              type="file" 
              multiple
              accept="image/*,application/pdf" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files) {
                  setAssessmentFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                }
              }}
            />
          </label>
          {assessmentFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {assessmentFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200 text-sm">
                  <span className="truncate flex-1 text-primary font-medium">📄 {file.name}</span>
                  <button 
                    onClick={() => setAssessmentFiles(prev => prev.filter((_, i) => i !== index))}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={handleAssessment}
          disabled={isAnalyzing || (!assessmentInput && assessmentFiles.length === 0)}
          className="w-full bg-[#2980b9] text-white p-3.5 rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isAnalyzing ? "⏳ Analysiere..." : "🔍 Dokument jetzt analysieren lassen"}
        </button>

        {assessmentResult && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-2">
            <div className="bg-[#f4f6f7] border border-[#d5dbdb] p-5 rounded-lg text-[#2c3e50] leading-relaxed text-sm">
              <div dangerouslySetInnerHTML={{ __html: assessmentResult }} />
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-100 p-5 rounded-lg">
              <h4 className="font-bold text-[#2980b9] mb-2 text-base flex items-center gap-2">
                <span>📎</span> Fehlen noch Unterlagen?
              </h4>
              <p className="text-sm text-blue-800 mb-4">
                Wenn in der Orientierung steht, dass Dokumente fehlen, kannst du diese hier direkt nachreichen. Wir helfen dir dann im Chat weiter.
              </p>
              <label className="cursor-pointer bg-white text-[#2980b9] p-3 rounded-lg font-bold flex items-center justify-center gap-2 text-sm border border-dashed border-[#2980b9] transition-all hover:bg-blue-100">
                <span>➕</span> Fehlendes Dokument hochladen
                <input 
                  type="file" 
                  multiple
                  accept="image/*,application/pdf" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files) {
                      setAssessmentFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                      window.dispatchEvent(new CustomEvent('open-help-chat'));
                    }
                  }}
                />
              </label>
              {assessmentFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {assessmentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-blue-200 text-sm">
                      <span className="truncate flex-1 text-[#2980b9] font-medium">📄 {file.name}</span>
                      <button 
                        onClick={() => setAssessmentFiles(prev => prev.filter((_, i) => i !== index))}
                        className="ml-2 text-red-500 hover:text-red-700 font-bold px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-6 bg-gradient-to-br from-[#e8f4f8] to-[#d1e8f1] border border-[#bce0ec] p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-[#1a5276] mb-2 text-base flex items-center gap-2">
                <span>✍️</span> Du möchtest dich wehren oder antworten?
              </h4>
              <p className="text-sm text-[#1a5276] mb-4">
                Wir helfen dir dabei, deinen Widerspruch oder Antrag in perfektem Amtsdeutsch zu formulieren. Das System bereitet alles rechtssicher für dich vor – und bei Bedarf übergeben wir den Fall an echte Anwälte.
              </p>
              <button 
                onClick={() => setCurrentView('pro-upsell')}
                className="w-full bg-[#2980b9] hover:bg-[#2471a3] text-white p-3.5 rounded-lg font-bold shadow transition-colors flex items-center justify-center gap-2"
              >
                <span>🚀</span> Problem jetzt prüfen lassen (Pro)
              </button>
            </div>
            
            <div className="mt-4 text-[11px] text-[#7f8c8d] text-center leading-snug">
              <b>Wichtiger rechtlicher Hinweis:</b> Die Ersteinschätzung stellt ausdrücklich <b>keine Rechtsberatung</b> nach dem Rechtsdienstleistungsgesetz (RDG) dar. Sie dient nur der allgemeinen Orientierung.
            </div>
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
