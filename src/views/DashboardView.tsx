import React, { useState, useEffect } from 'react';

interface DashboardViewProps {
  language: string;
  setCurrentView: (view: string) => void;
}

export default function DashboardView({ language, setCurrentView }: DashboardViewProps) {
  const [checks, setChecks] = useState<boolean[]>(Array(7).fill(false));

  useEffect(() => {
    const loadedChecks = [];
    for (let i = 1; i <= 7; i++) {
      loadedChecks.push(localStorage.getItem(`app_chk_v2_${i}`) === 'true');
    }
    setChecks(loadedChecks);
  }, []);

  const handleCheck = (index: number, checked: boolean) => {
    const newChecks = [...checks];
    newChecks[index] = checked;
    setChecks(newChecks);
    localStorage.setItem(`app_chk_v2_${index + 1}`, checked ? 'true' : 'false');
  };

  const checkedCount = checks.filter(Boolean).length;
  const percent = Math.round((checkedCount / 7) * 100);

  const t = {
    title: { de: "Deine Schritte ✅", uk: "Твої кроки ✅", ru: "Твои шаги ✅", en: "Your Steps ✅" },
    progressLabel: { de: "Dein Weg zum Ziel", uk: "Твій шлях до мети", ru: "Твой путь к цели", en: "Your path to the goal" },
    btn: { de: "Zum Fahrplan & Anträge ➔", uk: "До Плану та Заяв ➔", ru: "К Плану и Заявлениям ➔", en: "To Roadmap & Forms ➔" }
  };

  const getMsg = () => {
    if (language === 'uk') {
      if (percent === 0) return "Кожен крок має значення. Давай почнемо разом!";
      if (percent < 40) return "Гарний початок! Ти поступово просуваєшся. ❤️";
      if (percent < 70) return "Вже більше половини зроблено! Ти молодець. ✨";
      if (percent < 100) return "Майже на місці! Залишився останній ривок. 🕊️";
      return "Чудово! Ти подолав усі важливі кроки. Ласкаво просимо! 🏠❤️";
    }
    if (language === 'ru') {
      if (percent === 0) return "Каждый шаг имеет значение. Давай начнем вместе!";
      if (percent < 40) return "Хорошее начало! Ты постепенно продвигаешься. ❤️";
      if (percent < 70) return "Уже больше половины сделано! Ты молодец. ✨";
      if (percent < 100) return "Почти у цели! Остался последний рывок. 🕊️";
      return "Отлично! Ты преодолел все важные шаги. Добро пожаловать! 🏠❤️";
    }
    if (language === 'en') {
      if (percent === 0) return "Every step counts. Let's start together!";
      if (percent < 40) return "A good start! You are progressing step by step. ❤️";
      if (percent < 70) return "More than halfway there! You are doing great. ✨";
      if (percent < 100) return "Almost there! Just a little bit more. 🕊️";
      return "Excellent! You have mastered all important steps. Welcome! 🏠❤️";
    }
    if (percent === 0) return "Jeder Schritt zählt. Lass uns gemeinsam anfangen!";
    if (percent < 40) return "Ein guter Start! Du kommst Stück für Stück an. ❤️";
    if (percent < 70) return "Schon über die Hälfte geschafft! Du machst das toll. ✨";
    if (percent < 100) return "Fast am Ziel! Nur noch ein kleiner Endspurt. 🕊️";
    return "Hervorragend! Du hast alle wichtigen Schritte gemeistert. Willkommen! 🏠❤️";
  };

  const items = [
    { de: "1. Registrierung in Lebach abgeschlossen", uk: "1. Реєстрація в Лебаху завершена", ru: "1. Регистрация в Лебахе завершена", en: "1. Registration in Lebach completed" },
    { de: "2. Meldebescheinigung vom Rathaus erhalten", uk: "2. Довідка про прописку з ратуші отримана", ru: "2. Справка о прописке из ратуши получена", en: "2. Registration certificate from town hall received" },
    { de: "3. Bankkonto eröffnet", uk: "3. Банківський рахунок відкрито", ru: "3. Банковский счет открыт", en: "3. Bank account opened" },
    { de: "4. Antrag beim Sozialamt gestellt", uk: "4. Заява до соціальної служби подана", ru: "4. Заявление в социальную службу подано", en: "4. Application submitted to social welfare office" },
    { de: "5. Fiktionsbescheinigung / Aufenthaltstitel beantragt", uk: "5. Дозвіл на проживання подано", ru: "5. ВНЖ / вид на жительство запрошен", en: "5. Residence permit / Fiktionsbescheinigung applied for" },
    { de: "6. Krankenversicherung angemeldet", uk: "6. Медичне страхування оформлено", ru: "6. Медицинская страховка оформлена", en: "6. Health insurance registered" },
    { de: "7. Hauptantrag beim Jobcenter eingereicht", uk: "7. Головна заява до Jobcenter подана", ru: "7. Главное заявление в Jobcenter подано", en: "7. Main application submitted to Jobcenter" }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {t.title[language as keyof typeof t.title] || t.title.de}
      </h2>

      <div className="bg-white p-4 rounded-xl mb-5 border border-[#e1e8ed]">
        <div className="flex justify-between font-extrabold text-sm text-primary mb-2">
          <span>{t.progressLabel[language as keyof typeof t.progressLabel] || t.progressLabel.de}</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full h-3.5 bg-[#edf2f7] rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-success to-[#2ecc71] transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="text-[13px] text-gray-500 mt-2.5 italic text-center">
          {getMsg()}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <label key={idx} className="bg-[#f8fbff] border-l-[6px] border-primary p-4 rounded-lg flex items-center gap-4 cursor-pointer">
            <input 
              type="checkbox" 
              checked={checks[idx]} 
              onChange={(e) => handleCheck(idx, e.target.checked)}
              className="w-6 h-6 shrink-0"
            />
            <span>{item[language as keyof typeof item] || item.de}</span>
          </label>
        ))}
      </div>

      <button 
        onClick={() => setCurrentView('formulare')}
        className="w-full flex items-center justify-center p-4 mt-6 text-lg bg-success text-white rounded-xl font-extrabold cursor-pointer shadow-lg transition-opacity hover:opacity-90"
      >
        {t.btn[language as keyof typeof t.btn] || t.btn.de}
      </button>
    </div>
  );
}
