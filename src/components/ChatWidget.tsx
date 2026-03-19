import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { getProfileData } from '../utils/profileStore';
import { getChatContext } from '../utils/chatContextStore';

interface ChatWidgetProps {
  language: string;
  currentView?: string;
  setCurrentView?: (view: string) => void;
}

export default function ChatWidget({ language, currentView, setCurrentView }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGivenAssessment, setHasGivenAssessment] = useState(false);
  const [chatFiles, setChatFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: language === 'de' ? 'Hallo! Wie kann ich dir helfen?' : language === 'uk' ? 'Привіт! Чим я можу вам допомогти?' : language === 'ru' ? 'Привет! Чем я могу вам помочь?' : 'Hello! How can I help you?' }
  ]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-help-chat', handleOpenChat);
    return () => window.removeEventListener('open-help-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
      setMessages([{ role: 'model', text: language === 'de' ? 'Hallo! Wie kann ich dir helfen?' : language === 'uk' ? 'Привіт! Чим я можу вам допомогти?' : language === 'ru' ? 'Привет! Чем я могу вам помочь?' : 'Hello! How can I help you?' }]);
    }
  }, [language]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    const newMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: "AIzaSyCTgFNm7KElo3wFUqBJAOnhKneL4wq3mmo" });
      const profile = getProfileData();
      const userName = profile.v || "Nutzer";
      const context = getChatContext();

      let systemPrompt = `Du bist ein einfühlsamer, professioneller Begleiter und absoluter Experte für deutsches Sozialrecht (SGB II, SGB XII, AsylbLG) und Jobcenter-Prozesse.
WICHTIG: Du handelst als Beistand und Unterstützer. Deine Antworten dienen der fachlichen Orientierung und Information, sie sind keine Rechtsberatung.
REGELN:
1. SPRACHE: Antworte IMMER in der Sprache des Nutzers.
2. ANSPRACHE: Sprich den Nutzer immer direkt mit seinem Vornamen an: "${userName}". Nutze konsequent die "Du"-Form.
3. KOMPAKTHEIT: Fasse dich EXTREM KURZ (max. 1-3 Sätze). Gib zuerst nur eine kompakte Kernantwort. Gehe erst ins Detail, wenn der Nutzer konkret nachfragt.
4. TONFALL: Wirke wie ein Psychologe – emotional auffangend, beruhigend, aber höchst professionell.
5. ANTI-HALLUZINATION (100% SICHERHEIT): Erfinde NIEMALS Fakten, Gesetze, Fristen oder Adressen. Wenn du etwas nicht zu 100% sicher weißt, MUSST du antworten: "Dazu liegen mir keine gesicherten Informationen vor. Bitte wende dich an eine offizielle Beratungsstelle." Gib unter keinen Umständen falsche Auskünfte.`;

      if (context.view === 'probleme') {
        systemPrompt = `Du bist ein hochqualifiziertes Experten-System, Stratege und Fachanwalt für deutsches Sozial- und Verwaltungsrecht.
Deine Aufgabe: Der Nutzer hat ein Problem geschildert oder Dokumente hochgeladen. Du hilfst ihm, eine Lösung zu finden.
REGELN:
1. SPRACHE: Antworte IMMER in der Sprache des Nutzers. Wenn der Nutzer in seiner Muttersprache schreibt, antworte automatisch in dieser Sprache weiter.
2. ANSPRACHE: Sprich den Nutzer immer direkt mit seinem Vornamen an: "${userName}". Nutze konsequent die "Du"-Form.
3. KOMPAKTHEIT & KÜRZE: Fasse dich EXTREM KURZ und antworte präzise ohne Geschwafel (max. 2-3 Sätze). Bringe die Lösung sofort auf den Punkt, damit es schnell gelesen werden kann.
4. DETAILS ERST AUF NACHFRAGE: Gehe erst ins Detail und erkläre ausführlicher, wenn der Nutzer konkret danach fragt.
5. VERSTÄNDLICHKEIT: Erkläre alles so einfach, dass es jeder versteht.
6. MENSCHLICHKEIT: Formuliere NIEMALS "generieren", sondern "anfertigen", "erstellen" oder "schreiben". Es darf nie den Anschein haben, dass du ein automatisiertes System bist. Der Nutzer soll das Gefühl haben, dass wir als Team im Hintergrund für ihn da sind (nutze "wir").
7. MITDENKEN & NACHFRAGEN: Denke mit! Fehlt ein Zusammenhang oder ein Nachweis (z.B. ob etwas schriftlich festgehalten wurde)? Frage den Nutzer gezielt nach dem noch benötigten Dokument, um die Sache gerecht und korrekt zu beantworten.
8. KEINE RECHTSBERATUNG (RDG-KONFORM): Du darfst KEINE verbindliche Rechtsberatung im Einzelfall leisten. Gib NIEMALS eine prozentuale Erfolgschance an. Erkläre lediglich allgemein die Rechtslage und mögliche nächste Schritte, ohne eine Erfolgsgarantie zu geben.
9. KEINE BRIEFE SCHREIBEN: Biete NIEMALS an, den Widerspruch oder Brief hier im Chat zu formulieren. Schreibe keine Entwürfe im Chat.
10. RÜCKFRAGE: Frage am Ende deiner Antwort IMMER NUR, ob der Nutzer noch weitere Fragen hat.
11. ANTI-HALLUZINATION (100% SICHERHEIT): Erfinde NIEMALS Fakten, Gesetze, Fristen oder Adressen. Wenn du etwas nicht zu 100% sicher weißt, MUSST du antworten: "Dazu liegen mir keine gesicherten Informationen vor. Bitte wende dich an eine offizielle Beratungsstelle." Gib unter keinen Umständen falsche Auskünfte.`;
      } else if (context.view === 'pro') {
        systemPrompt = `Du bist ein hochspezialisiertes Experten-System für deutsches Sozialrecht und Verwaltungsrecht.
Deine Aufgabe: Der Nutzer möchte einen hieb- und stichfesten Schriftsatz erstellen oder hat Fragen dazu.
REGELN:
1. SPRACHE: Antworte IMMER in der Sprache des Nutzers.
2. ANSPRACHE: Sprich den Nutzer immer direkt mit seinem Vornamen an: "${userName}". Nutze konsequent die "Du"-Form.
3. TONFALL & STIL: Antworte FORMELL, RECHTSSICHER und in AMTSPRACHE. Du bist der juristische Profi an der Seite des Nutzers.
4. PRÜFUNG: Prüfe den Sachverhalt und die Dokumente auf rechtliche Haltbarkeit.`;
      } else if (context.view === 'dokumente') {
        systemPrompt = `Du bist ein hochspezialisiertes Experten-System für deutsches Sozialrecht und Verwaltungsrecht.
Deine Aufgabe: Der Nutzer befindet sich im Bereich "Dokumente". Du kannst auf seine gespeicherten Dokumente zugreifen, um Prüfungen durchzuführen und rechtssicher zu antworten.
REGELN:
1. SPRACHE: Antworte IMMER in der Sprache des Nutzers.
2. ANSPRACHE: Sprich den Nutzer immer direkt mit seinem Vornamen an: "${userName}". Nutze konsequent die "Du"-Form.
3. TONFALL: Professionell und rechtssicher.`;
      }

      let contextInfo = "";
      if (context.input) contextInfo += `\nBisherige Eingabe des Nutzers im Formular: "${context.input}"`;
      if (context.result) contextInfo += `\nBisheriges Ergebnis/Entwurf: "${context.result}"`;
      
      if (context.view === 'dokumente') {
        const savedHistory = localStorage.getItem('app_doc_history');
        if (savedHistory) {
          contextInfo += `\nGespeicherte Dokumente des Nutzers: ${savedHistory}`;
        }
      }

      if (contextInfo) {
        systemPrompt += `\n\nAKTUELLER KONTEXT DES NUTZERS:${contextInfo}`;
      }

      const contents: any[] = [];
      
      // Add history
      for (let i = 1; i < newMessages.length - 1; i++) {
        contents.push({
          role: newMessages[i].role,
          parts: [{ text: newMessages[i].text }]
        });
      }

      // Add current message with files if any
      const currentParts: any[] = [{ text: userMessage }];
      
      const allFiles = [...(context.files || []), ...chatFiles];
      if (allFiles.length > 0) {
        for (const file of allFiles) {
          const base64String = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
          });
          currentParts.push({ inlineData: { data: base64String, mimeType: file.type } });
        }
      }
      
      // Clear chat files after sending
      setChatFiles([]);

      contents.push({
        role: 'user',
        parts: currentParts
      });

      // Implement the 10-second delay for the first assessment in 'probleme' view
      if (context.view === 'probleme' && !hasGivenAssessment) {
        setHasGivenAssessment(true);
        const placeholderMsg = language === 'de' ? "Wir prüfen deinen Fall, bitte warte..." :
                               language === 'uk' ? "Ми перевіряємо вашу справу, будь ласка, зачекайте..." :
                               language === 'ru' ? "Мы проверяем ваше дело, пожалуйста, подождите..." :
                               "We are checking your case, please wait...";
        setMessages(prev => [...prev, { role: 'model', text: placeholderMsg }]);
        
        await new Promise(resolve => setTimeout(resolve, 10000));
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.0,
        }
      });
      
      if (response.text) {
        setMessages(prev => [...prev, { role: 'model', text: response.text as string }]);
      } else {
        throw new Error("No response text");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Entschuldigung, ich habe gerade Verbindungsprobleme. Bitte versuche es später noch einmal.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-primary text-white border-none rounded-full px-6 py-3 text-sm font-extrabold shadow-xl z-50 cursor-pointer"
      >
        {language === 'de' ? '💬 Hilfe-Chat' : language === 'uk' ? '💬 Допомога' : language === 'ru' ? '💬 Помощь' : '💬 Help Chat'}
      </button>

      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full sm:bottom-[85px] sm:right-5 sm:w-[350px] sm:max-w-[85vw] h-full sm:h-auto bg-white sm:rounded-2xl shadow-2xl flex flex-col z-[1001] border-t sm:border border-gray-200 overflow-hidden">
          <div className="bg-primary text-white p-4 font-extrabold flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">Hilfe-Chat 🤝</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-transparent border-none text-white text-2xl p-2 cursor-pointer">×</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-[#f9f9f9] flex flex-col gap-3">
            {messages.map((msg, idx) => {
              const hasProButton = msg.text.includes('[PRO_SERVICE_BUTTON]');
              const cleanText = msg.text.replace('[PRO_SERVICE_BUTTON]', '').trim();
              
              return (
                <div 
                  key={idx} 
                  className={`p-3 rounded-2xl text-sm max-w-[90%] sm:max-w-[85%] leading-relaxed ${
                    msg.role === 'model' 
                      ? 'bg-white border border-gray-200 self-start shadow-sm' 
                      : 'bg-primary text-white self-end shadow-md'
                  }`}
                >
                  {cleanText}
                  {hasProButton && msg.role === 'model' && (
                    <button 
                      onClick={() => {
                        const profile = getProfileData();
                        if (profile.isPro) {
                          if (setCurrentView) setCurrentView('pro');
                          setIsOpen(false);
                        } else {
                          window.open('https://copecart.com/products/YOUR_PRODUCT_ID/checkout', '_blank');
                        }
                      }}
                      className="mt-3 block w-full bg-primary text-white font-bold py-3 px-4 rounded-xl text-center cursor-pointer hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      {language === 'de' ? 'Jetzt zum Pro-Service' : language === 'uk' ? 'Перейти до Pro-Сервісу' : language === 'ru' ? 'Перейти к Pro-Сервису' : 'Go to Pro Service'}
                    </button>
                  )}
                </div>
              );
            })}
            {isTyping && (
              <div className="p-3 rounded-2xl text-sm max-w-[85%] leading-relaxed bg-white border border-gray-200 self-start italic text-gray-500 animate-pulse">
                Antwort wird erstellt...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-orange-50 p-2 text-[10px] text-orange-800 border-t border-orange-200 text-center leading-tight shrink-0">
            {language === 'de' ? '⚠️ Das System kann Fehler machen. Keine verbindliche Rechtsberatung.' : 
             language === 'uk' ? '⚠️ Система може помилятися. Не є юридичною консультацією.' : 
             language === 'ru' ? '⚠️ Система может ошибаться. Не является юридической консультацией.' : 
             '⚠️ The system can make mistakes. Not legal advice.'}
          </div>
          <div className="flex flex-col p-3 border-t border-gray-200 bg-white shrink-0 pb-6 sm:pb-3">
            {chatFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {chatFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">
                    <span className="truncate max-w-[120px] text-gray-700">{file.name}</span>
                    <button onClick={() => setChatFiles(prev => prev.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700 font-bold ml-1">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 items-center">
              <label className="cursor-pointer text-gray-400 hover:text-primary transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files) {
                      setChatFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                    }
                  }}
                />
              </label>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'de' ? 'Schreib mir...' : language === 'uk' ? 'Напиши мені...' : language === 'ru' ? 'Напиши мне...' : 'Write me...'}
                className="flex-1 p-3 border border-gray-300 rounded-full outline-none focus:border-primary text-base sm:text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="bg-primary text-white border-none w-10 h-10 flex items-center justify-center rounded-full font-bold cursor-pointer disabled:opacity-50 shadow-md"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
