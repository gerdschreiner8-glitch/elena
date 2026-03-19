import React, { useState, useEffect } from 'react';
import { getProfileData } from '../utils/profileStore';
import DocumentGenerator from '../components/DocumentGenerator';
import { GoogleGenAI } from '@google/genai';
import { setChatContext } from '../utils/chatContextStore';

interface ProViewProps {
  language: string;
}

export default function ProView({ language }: ProViewProps) {
  const [proInput, setProInput] = useState('');
  const [proFiles, setProFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [showDoc, setShowDoc] = useState(false);
  const [showLawyerInfo, setShowLawyerInfo] = useState(false);
  const [isContactRequested, setIsContactRequested] = useState(false);

  useEffect(() => {
    setChatContext({
      input: proInput,
      result: generatedLetter || '',
      files: proFiles
    });
  }, [proInput, generatedLetter, proFiles]);

  const handleGenerateLetter = async () => {
    const profile = getProfileData();
    if (!profile.v || !profile.n || !profile.hasSig) {
      alert("Bitte fülle zuerst dein Profil aus und unterschreibe die Vollmacht.");
      return;
    }

    if (!proInput && proFiles.length === 0) {
      alert("Bitte beschreibe, was du brauchst, oder lade ein Dokument hoch.");
      return;
    }

    setIsGenerating(true);
    setGeneratedLetter(null);

    try {
      const ai = new GoogleGenAI({ apiKey: "AIzaSyCTgFNm7KElo3wFUqBJAOnhKneL4wq3mmo" });
      const userName = profile.v || "Nutzer";

      const systemPrompt = `Du bist ein hochspezialisiertes Experten-System für deutsches Sozialrecht (SGB II, XII, AsylbLG) und Verwaltungsrecht.
Deine Aufgabe: Verfasse einen absolut hieb- und stichfesten, rechtssicheren und formellen Schriftsatz an eine deutsche Behörde.
WICHTIG: Der Brief wird im Namen des Nutzers (Antragsteller) verfasst (Ich-Form). Du bist NICHT der Absender, sondern der Beistand, der den Text formuliert.
DEIN ZIEL: Der Schriftsatz muss so präzise und fachlich fundiert sein, dass die Behörde keine sachliche Handhabe für eine Ablehnung hat.
REGELN:
1. FACHLICHE PRÄZISION: Nutze zwingend die exakten Fachbegriffe und zitiere die relevanten Paragraphen (z.B. aus SGB I, II, X, XII, VwVfG oder AsylbLG).
2. STRATEGIE: Antizipiere mögliche Ablehnungsgründe der Behörde und entkräfte diese bereits im Text durch klare sachliche Herleitungen.
3. TONFALL: Hochprofessionell, sachlich, aber bestimmt. Es muss klar sein, dass hier jemand schreibt, der seine Rechte genau kennt.
4. STRUKTUR: Generiere NUR den reinen Text des Briefes (den Hauptteil). KEINEN Briefkopf, KEIN Datum, KEINE Grußformel am Ende.
5. BEGINN: Starte direkt mit einer aussagekräftigen Betreffzeile (z.B. "Betreff: Antrag auf... / Widerspruch gegen...") und der Anrede "Sehr geehrte Damen und Herren,".
6. HINWEIS AUF CHAT: Füge am Ende (außerhalb des eigentlichen Brieftextes, z.B. als kurze Notiz an den Nutzer) den Hinweis hinzu, dass er bei Fragen jederzeit unten rechts auf den Hilfe-Button klicken kann, um mit uns über den Brief zu chatten.
7. FORMATIERUNG: Nutze HTML-Tags (<b>, <p>, <br>) für eine perfekte, lesbare Struktur.`;

      let promptText = `Nutzeranliegen für den Brief: "${proInput}"\nBitte verfasse den Hauptteil des Briefes wie in den Anweisungen beschrieben.`;
      
      const parts: any[] = [{ text: promptText }];

      if (proFiles.length > 0) {
        for (const file of proFiles) {
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
        config: { systemInstruction: systemPrompt }
      });

      if (response.text) {
        let cleanHtml = response.text.replace(/```html/g, '').replace(/```/g, '').trim();
        cleanHtml = cleanHtml.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
        setGeneratedLetter(cleanHtml);
        setShowDoc(true);
      } else {
        throw new Error("No response text");
      }
    } catch (error) {
      console.error("Generation error:", error);
      alert("Fehler bei der Erstellung des Briefes. Bitte überprüfe deine Internetverbindung.");
    } finally {
      setIsGenerating(false);
    }
  };

  const t = {
    title: { de: "Pro-Service 🌟", uk: "Pro-Сервіс 🌟", ru: "Pro-Сервис 🌟", en: "Pro Service 🌟" },
    desc: { de: "Maximale Unterstützung für deine Anträge und Widersprüche.", uk: "Максимальна підтримка ваших заяв та апеляцій.", ru: "Максимальная поддержка ваших заявлений и апелляций.", en: "Maximum support for your applications and appeals." },
    lawyerTitle: { de: "⚖️ Komplexer Fall? Hilfe vom Fachanwalt", uk: "⚖️ Складна справа? Допомога адвоката", ru: "⚖️ Сложное дело? Помощь адвоката", en: "⚖️ Complex case? Help from a lawyer" },
    lawyerBtn: { de: "Warum brauche ich hier einen Anwalt?", uk: "Чому мені тут потрібен адвокат?", ru: "Почему мне здесь нужен адвокат?", en: "Why do I need a lawyer here?" },
    lawyerText: { 
      de: "Manchmal sind Fälle so komplex, dass ein automatisierter Schriftsatz nicht ausreicht. Wir dürfen gesetzlich keine individuelle Rechtsberatung durchführen und eine Vertretung vor Gericht durch uns würde deinen Fall gefährden. In solchen Fällen ist eine Vertretung durch einen spezialisierten Rechtsanwalt zwingend erforderlich, um deine Rechte optimal durchzusetzen. Aber keine Angst: Wir begleiten dich auch weiterhin und arbeiten mit renommierten Fachanwälten zusammen, die auf solche Fälle spezialisiert sind. Das Beste daran: In der Regel kostet dich das nichts (über Beratungshilfe oder Prozesskostenhilfe).",
      uk: "Іноді справи настільки складні, що автоматизованого листа недостатньо. За законом ми не маємо права надавати індивідуальні юридичні консультації, а представництво в суді з нашого боку поставило б вашу справу під загрозу. У таких випадках представництво спеціалізованого адвоката є обов’язковим. Але не хвилюйтеся: ми продовжуємо супроводжувати вас і співпрацюємо з відомими адвокатами. Найкраще те, що зазвичай це нічого не коштує вам (через правову допомогу).",
      ru: "Иногда дела настолько сложны, что автоматизированного письма недостаточно. По закону мы не имеем права давать индивидуальные юридические консультации, а представительство в суде с нашей стороны поставило бы ваше дело под угрозу. В таких случаях представительство специализированного адвоката обязательно. Но не волнуйтесь: мы продолжаем сопровождать вас и сотрудничаем с известными адвокатами. Самое лучшее в этом то, что обычно это ничего не стоит вам (через юридическую помощь).",
      en: "Sometimes cases are so complex that an automated letter is not enough. Legally, we are not allowed to provide individual legal advice, and representation in court by us would jeopardize your case. In such cases, representation by a specialized lawyer is mandatory. But don't worry: we will continue to accompany you and work with renowned specialist lawyers. The best part: usually it costs you nothing (via legal aid)."
    },
    contactLawyerBtn: { de: "Anwalt jetzt kontaktieren 📞", uk: "Зв'язатися з адвокатом 📞", ru: "Связаться с адвокатом 📞", en: "Contact lawyer now 📞" },
    contactLawyerSuccess: { 
      de: "Alles klar! Wir übernehmen das für dich. Wir geben alle deine Unterlagen sortiert an den Fachanwalt weiter und informieren ihn über den bisherigen Sachstand. Der Anwalt wird sich in Kürze bei dir melden, um alles Weitere zu besprechen. Du bist in guten Händen, und wir sind ja auch noch da als Beistand für dich. Du kannst dich jederzeit bei uns melden! ✨",
      uk: "Зрозуміло! Ми беремо це на себе. Ми передамо всі ваші документи адвокату в упорядкованому вигляді та проінформуємо його про поточний стан справи. Адвокат зв'яжеться з вами найближчим часом, щоб обговорити подальші кроки. Ви в надійних руках, і ми все ще поруч як ваша підтримка. Ви можете звернутися до нас у будь-який час! ✨",
      ru: "Понятно! Мы берем это на себя. Мы передадим все ваши документы адвокату в упорядкованом виде и проинформируем его о текущем состоянии дела. Адвокат свяжется с вами в ближайшее время, чтобы обсудить дальнейшие шаги. Вы в надежных руках, и мы все еще рядом как ваша поддержка. Вы можете обратиться к нам в любое время! ✨",
      en: "All right! We'll take care of that for you. We will pass all your documents to the specialist lawyer in a sorted manner and inform him about the current status. The lawyer will contact you shortly to discuss everything else. You are in good hands, and we are still here as your support. You can contact us at any time! ✨"
    }
  };

  const getT = (k: keyof typeof t) => (t[k] as any)[language] || (t[k] as any).de;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {getT('title')}
      </h2>
      <p className="mb-6">{getT('desc')}</p>

      <div className="bg-gradient-to-br from-[#1a252f] to-[#2c3e50] text-white p-6 rounded-xl shadow-lg mb-6 relative border-b-4 border-accent">
        <div className="absolute -top-3 left-5 bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-white px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-md border-2 border-white flex items-center gap-1">
          🌟 EXPERTEN-CHECK AKTIV
        </div>
        <h3 className="text-xl font-bold mt-2 mb-3 flex items-center gap-2">
          <span>✍️</span> Hieb- und stichfesten Schriftsatz erstellen
        </h3>
        <p className="mb-4 text-sm opacity-90">
          Das System prüft dein Anliegen jetzt mit der Expertise eines erfahrenen Beistands für Sozialrecht. Es formuliert den Brief so rechtssicher, dass die Behörde sachlich kaum Spielraum für eine Ablehnung hat.
        </p>

        <textarea 
          rows={5} 
          value={proInput}
          onChange={(e) => setProInput(e.target.value)}
          placeholder="Beispiel: Ich brauche einen Antrag auf Kostenübernahme für einen Kinderwagen, da mein Kind nächsten Monat geboren wird..." 
          className="w-full p-4 rounded-lg text-black mb-4 focus:ring-2 focus:ring-accent outline-none"
        />

        <div className="mb-4">
          <label className="cursor-pointer bg-white/10 text-white p-3 rounded-lg font-bold flex items-center justify-center gap-2 text-sm border border-dashed border-white/30 transition-all hover:bg-white/20">
            <span>📎</span> Dokument(e) anhängen (Optional)
            <input 
              type="file" 
              multiple
              accept="image/*,application/pdf" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files) {
                  setProFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                }
              }}
            />
          </label>
          {proFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {proFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white/10 p-2 rounded border border-white/20 text-sm">
                  <span className="truncate flex-1 text-accent font-medium">📄 {file.name}</span>
                  <button 
                    onClick={() => setProFiles(prev => prev.filter((_, i) => i !== index))}
                    className="ml-2 text-red-400 hover:text-red-300 font-bold px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={handleGenerateLetter}
          disabled={isGenerating}
          className="w-full bg-accent text-white p-4 rounded-lg font-bold shadow-md hover:bg-opacity-90 transition-all text-lg disabled:opacity-50"
        >
          {isGenerating ? "⏳ Erstelle Brief..." : "✨ Brief jetzt generieren"}
        </button>
      </div>

      <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-bold mb-3 text-primary">Wie funktioniert der Pro-Service?</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Du schreibst in deiner Muttersprache, was du brauchst.</li>
          <li>Das System übersetzt und formuliert es in perfektes deutsches Amtsdeutsch.</li>
          <li>Rechtliche Paragraphen werden automatisch ergänzt, falls nötig.</li>
          <li>Dein Profil (Name, Adresse) und deine Unterschrift werden automatisch eingefügt.</li>
          <li>Du erhältst ein fertiges PDF zum Ausdrucken oder Versenden.</li>
        </ul>
      </div>

      <div className="bg-[#fdf7e7] border-2 border-[#f39c12] p-5 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold mb-2 text-[#d35400] flex items-center gap-2">
          {getT('lawyerTitle')}
        </h3>
        <p className="text-sm mb-4 text-[#7f8c8d]">
          Gibt es Probleme, die wir allein nicht lösen können? Das System erkennt, wann echte juristische Power nötig ist.
        </p>
        
        {!showLawyerInfo ? (
          <button 
            onClick={() => setShowLawyerInfo(true)}
            className="w-full bg-white border-2 border-[#f39c12] text-[#d35400] p-3 rounded-lg font-bold hover:bg-[#f39c12] hover:text-white transition-all text-sm"
          >
            {getT('lawyerBtn')}
          </button>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white p-4 rounded-lg border border-[#f39c12]/30 text-sm leading-relaxed text-[#2c3e50] mb-4 shadow-inner">
              {getT('lawyerText')}
            </div>
            
            {!isContactRequested ? (
              <button 
                onClick={() => setIsContactRequested(true)}
                className="w-full bg-[#f39c12] text-white p-3 rounded-lg font-bold hover:bg-opacity-90 transition-all shadow-md mb-4"
              >
                {getT('contactLawyerBtn')}
              </button>
            ) : (
              <div className="bg-success/10 border-2 border-success p-4 rounded-lg text-success text-sm font-bold mb-4 animate-in zoom-in-95">
                {getT('contactLawyerSuccess')}
              </div>
            )}

            <button 
              onClick={() => setShowLawyerInfo(false)}
              className="text-xs text-[#d35400] font-bold underline"
            >
              Schließen
            </button>
          </div>
        )}
      </div>

      {showDoc && generatedLetter && (
        <DocumentGenerator 
          docType="custom_letter" 
          profile={getProfileData()} 
          language={language} 
          customContent={generatedLetter}
          onClose={() => setShowDoc(false)} 
        />
      )}
    </div>
  );
}
