import React from 'react';

interface ProUpsellViewProps {
  language: string;
  setCurrentView: (view: string) => void;
}

export default function ProUpsellView({ language, setCurrentView }: ProUpsellViewProps) {
  // Translations for the upsell screen
  const t = {
    ahaTitle: {
      de: "⚠️ Achtung: Ein Problem wurde erkannt!",
      uk: "⚠️ Увага: Виявлено проблему!",
      ru: "⚠️ Внимание: Обнаружена проблема!",
      en: "⚠️ Attention: A problem has been detected!"
    },
    ahaText1: {
      de: "Es geht um dein Geld und eine wichtige Frist läuft bald ab. Keine Panik, wir lassen dich nicht allein.",
      uk: "Йдеться про ваші гроші, і важливий термін скоро закінчується. Не панікуйте, ми не залишимо вас наодинці.",
      ru: "Речь идет о ваших деньгах, и важный срок скоро истекает. Не паникуйте, мы не оставим вас одних.",
      en: "It's about your money and an important deadline is expiring soon. Don't panic, we won't leave you alone."
    },
    ahaText2: {
      de: "Um das sicher zu lösen, helfen wir dir jetzt bei der perfekten Antwort.",
      uk: "Щоб безпечно вирішити це, ми зараз допоможемо вам з ідеальною відповіддю.",
      ru: "Чтобы безопасно решить это, мы сейчас поможем вам с идеальным ответом.",
      en: "To solve this safely, we will now help you with the perfect answer."
    },
    pitchTitle: {
      de: "🛡️ Das \"Notfall & Abwehr\"-Paket (Pro)",
      uk: "🛡️ Пакет \"Екстрена допомога та захист\" (Pro)",
      ru: "🛡️ Пакет \"Экстренная помощь и защита\" (Pro)",
      en: "🛡️ The \"Emergency & Defense\" Package (Pro)"
    },
    pitchSubtitle: {
      de: "Sichere dir jetzt den vollen Schutz für deinen Fall:",
      uk: "Отримайте повний захист для вашої справи зараз:",
      ru: "Получите полную защиту для вашего дела прямо сейчас:",
      en: "Get full protection for your case now:"
    },
    feat1Title: {
      de: "👨‍⚖️ Echter Anwalt für oft nur 15 €",
      uk: "👨‍⚖️ Справжній адвокат часто лише за 15 €",
      ru: "👨‍⚖️ Настоящий адвокат часто всего за 15 €",
      en: "👨‍⚖️ Real lawyer for often only 15 €"
    },
    feat1Desc: {
      de: "Wir übergeben deinen Fall an einen echten Anwalt und bereiten den Antrag auf staatliche Beratungshilfe vor.",
      uk: "Ми передаємо вашу справу справжньому адвокату та готуємо заяву на державну правову допомогу.",
      ru: "Мы передаем ваше дело настоящему адвокату и готовим заявление на государственную юридическую помощь.",
      en: "We hand over your case to a real lawyer and prepare the application for state legal aid."
    },
    feat2Title: {
      de: "⚡ 1-Klick Notfall-Widerspruch",
      uk: "⚡ Екстрена апеляція в 1 клік",
      ru: "⚡ Экстренная апелляция в 1 клик",
      en: "⚡ 1-Click Emergency Appeal"
    },
    feat2Desc: {
      de: "Sichere sofort deine Frist mit einem Klick, auch wenn es extrem schnell gehen muss.",
      uk: "Негайно забезпечте свій термін одним кліком, навіть якщо це потрібно зробити дуже швидко.",
      ru: "Немедленно обеспечьте свой срок одним кликом, даже если это нужно сделать очень быстро.",
      en: "Secure your deadline immediately with one click, even if it has to be extremely fast."
    },
    feat3Title: {
      de: "📄 Perfekte Abwehr-Schreiben",
      uk: "📄 Ідеальні листи-відповіді",
      ru: "📄 Идеальные письма-ответы",
      en: "📄 Perfect Defense Letters"
    },
    feat3Desc: {
      de: "Das System formuliert deinen Widerspruch oder Antrag in fehlerfreiem Amtsdeutsch.",
      uk: "Система формулює вашу апеляцію або заяву бездоганною офіційною німецькою мовою.",
      ru: "Система формулирует вашу апелляцию или заявление на безупречном официальном немецком языке.",
      en: "The system formulates your appeal or application in flawless official German."
    },
    feat4Title: {
      de: "⏰ Priorisierter Fristen-Schutz",
      uk: "⏰ Пріоритетний захист термінів",
      ru: "⏰ Приоритетная защита сроков",
      en: "⏰ Prioritized Deadline Protection"
    },
    feat4Desc: {
      de: "Express-Analyse deiner Dokumente und automatische Warnung per Push-Nachricht vor Fristablauf.",
      uk: "Експрес-аналіз ваших документів та автоматичне попередження через push-повідомлення до закінчення терміну.",
      ru: "Экспресс-анализ ваших документов и автоматическое предупреждение через push-уведомление до истечения срока.",
      en: "Express analysis of your documents and automatic warning via push message before the deadline expires."
    },
    disclaimer: {
      de: "Hinweis: Wir können keine rechtliche Garantie geben, dass du den Fall gewinnst. Wir garantieren aber die perfekte Vorbereitung und Übergabe an echte Anwälte.",
      uk: "Примітка: Ми не можемо дати юридичну гарантію, що ви виграєте справу. Але ми гарантуємо ідеальну підготовку та передачу справжнім адвокатам.",
      ru: "Примечание: Мы не можем дать юридическую гарантию, что вы выиграете дело. Но мы гарантируем идеальную подготовку и передачу настоящим адвокатам.",
      en: "Note: We cannot give a legal guarantee that you will win the case. But we guarantee perfect preparation and handover to real lawyers."
    },
    btnText: {
      de: "🔓 Jetzt Pro-Paket freischalten (einmalig 49 €)",
      uk: "🔓 Розблокувати Pro-пакет зараз (одноразово 49 €)",
      ru: "🔓 Разблокировать Pro-пакет сейчас (единоразово 49 €)",
      en: "🔓 Unlock Pro Package now (one-time 49 €)"
    },
    btnSubtext: {
      de: "✅ In 2 Minuten erledigt. Keine versteckten Kosten.",
      uk: "✅ Готово за 2 хвилини. Жодних прихованих витрат.",
      ru: "✅ Готово за 2 минуты. Никаких скрытых расходов.",
      en: "✅ Done in 2 minutes. No hidden costs."
    }
  };

  const getT = (k: keyof typeof t) => (t[k] as any)[language] || (t[k] as any).de;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-md mx-auto">
      
      {/* Teil 1: Der Aha-Moment */}
      <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg mb-6 shadow-sm">
        <h2 className="text-red-700 font-bold text-lg mb-2 flex items-center gap-2">
          {getT('ahaTitle')}
        </h2>
        <p className="text-red-900 text-sm mb-3 font-medium">
          {getT('ahaText1')}
        </p>
        <div className="bg-red-100 p-3 rounded text-red-800 font-bold text-sm text-center">
          {getT('ahaText2')}
        </div>
      </div>

      {/* Teil 2: Der Verkaufs-Pitch */}
      <div className="bg-gradient-to-br from-[#1a252f] to-[#2c3e50] p-6 rounded-xl shadow-lg mb-6 text-white border-t-4 border-[#f39c12]">
        <h2 className="text-2xl font-bold mb-2 text-[#f39c12]">
          {getT('pitchTitle')}
        </h2>
        <p className="text-gray-300 text-sm mb-6">
          {getT('pitchSubtitle')}
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex gap-3 items-start">
            <div className="bg-white/10 p-2 rounded-full mt-1">👨‍⚖️</div>
            <div>
              <h4 className="font-bold text-white text-base">{getT('feat1Title')}</h4>
              <p className="text-gray-300 text-sm leading-snug mt-1">{getT('feat1Desc')}</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <div className="bg-white/10 p-2 rounded-full mt-1">⚡</div>
            <div>
              <h4 className="font-bold text-white text-base">{getT('feat2Title')}</h4>
              <p className="text-gray-300 text-sm leading-snug mt-1">{getT('feat2Desc')}</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-white/10 p-2 rounded-full mt-1">📄</div>
            <div>
              <h4 className="font-bold text-white text-base">{getT('feat3Title')}</h4>
              <p className="text-gray-300 text-sm leading-snug mt-1">{getT('feat3Desc')}</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-white/10 p-2 rounded-full mt-1">⏰</div>
            <div>
              <h4 className="font-bold text-white text-base">{getT('feat4Title')}</h4>
              <p className="text-gray-300 text-sm leading-snug mt-1">{getT('feat4Desc')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs text-gray-400 italic">
          {getT('disclaimer')}
        </div>
      </div>

      {/* Teil 3: Call to Action */}
      <div className="text-center">
        <button 
          onClick={() => setCurrentView('emergency-appeal')}
          className="w-full bg-[#27ae60] hover:bg-[#2ecc71] text-white p-4 rounded-xl font-black text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          {getT('btnText')}
        </button>
        <p className="text-gray-500 text-sm mt-3 font-medium">
          {getT('btnSubtext')}
        </p>
      </div>

    </div>
  );
}
