import React from 'react';

interface IntroViewProps {
  language: string;
  setCurrentView: (view: string) => void;
}

export default function IntroView({ language, setCurrentView }: IntroViewProps) {
  const t = {
    title: {
      de: "Herzlich Willkommen in Deutschland im Saarland 👋",
      uk: "Ласкаво просимо до Німеччини, у Саар 👋",
      ru: "Добро пожаловать в Германию, в Саар 👋",
      en: "Welcome to Germany, to Saarland 👋"
    },
    desc: {
      de: "Dieser digitale Ankunfts-Begleiter hilft dir Schritt für Schritt, alle wichtigen Behördengänge nach deiner Einreise zu erledigen – einfach, verständlich und ohne Papierchaos.",
      uk: "Цей цифровий помічник по прибуттю допоможе тобі крок за кроком вирішити всі важливі адміністративні питання після в'їзду — просто, зрозуміло та без зайвих паперів.",
      ru: "Этот цифровой помощник по прибытию поможет тебе шаг за шагом решить все важные административные вопросы после въезда — просто, понятно и без лишних бумаг.",
      en: "This digital arrival guide helps you step by step to complete all important administrative procedures after your arrival - simply, understandably, and without paperwork."
    },
    howItWorks: {
      de: "So funktioniert die App:",
      uk: "Як працює додаток:",
      ru: "Как работает приложение:",
      en: "How the app works:"
    },
    btn: {
      de: "Jetzt starten ➔",
      uk: "Почати зараз ➔",
      ru: "Начать сейчас ➔",
      en: "Start now ➔"
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {t.title[language as keyof typeof t.title]}
      </h2>
      <p className="mb-6">
        {t.desc[language as keyof typeof t.desc]}
      </p>

      <div className="bg-[#f0fdf4] border-l-[6px] border-success p-5 rounded-lg mb-4 relative">
        <h3 className="mt-0 text-success font-bold text-lg mb-4">
          {t.howItWorks[language as keyof typeof t.howItWorks]}
        </h3>
        <ul className="pl-0 list-none m-0 space-y-4">
          <li className="flex gap-3">
            <span className="text-xl">📝</span>
            <div>
              <b>{language === 'de' ? 'Profil ausfüllen:' : language === 'uk' ? 'Заповнити профіль:' : language === 'ru' ? 'Заполнить профиль:' : 'Fill out profile:'}</b><br/>
              {language === 'de' ? 'Gib deine Grunddaten einmalig ein.' : language === 'uk' ? 'Введи свої основні дані один раз.' : language === 'ru' ? 'Введи свои основные данные один раз.' : 'Enter your basic data once.'}
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">✅</span>
            <div>
              <b>{language === 'de' ? 'Checkliste nutzen:' : language === 'uk' ? 'Використовувати список:' : language === 'ru' ? 'Использовать список:' : 'Use checklist:'}</b><br/>
              {language === 'de' ? 'Hake ab, welche Ämter du schon besucht hast.' : language === 'uk' ? 'Відмічай, які установи ти вже відвідав.' : language === 'ru' ? 'Отмечай, какие учреждения ты уже посетил.' : 'Check off which authorities you have already visited.'}
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">📄</span>
            <div>
              <b>{language === 'de' ? 'Anträge erstellen:' : language === 'uk' ? 'Створювати заяви:' : language === 'ru' ? 'Создавать заявления:' : 'Create forms:'}</b><br/>
              {language === 'de' ? 'Die App schreibt für Dich personalisierte Anträge und formuliert fertige Behördenbriefe.' : language === 'uk' ? 'Додаток автоматично пише для тебе заяви та формулює офіційні листи.' : language === 'ru' ? 'Приложение автоматически пишет заявления и формулирует официальные письма.' : 'The app automatically writes customized applications and drafts formal letters.'}
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">💬</span>
            <div>
              <b>{language === 'de' ? 'Direkte Chat Hilfe:' : language === 'uk' ? 'Пряма допомога в чаті:' : language === 'ru' ? 'Прямая помощь в чате:' : 'Direct chat help:'}</b><br/>
              {language === 'de' ? 'Unten rechts findest du unseren Hilfe-Chat, wenn du Fragen hast.' : language === 'uk' ? 'Внизу праворуч ти знайдеш наш чат допомоги, якщо в тебе є питання.' : language === 'ru' ? 'Внизу справа ты найдешь наш чат помощи, если у тебя есть вопросы.' : 'You can find our help chat in the bottom right corner if you have any questions.'}
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-[#faf5ff] border-l-[6px] border-[#8e44ad] p-5 rounded-lg mb-4">
        <p className="m-0 flex items-center gap-3">
          <span className="text-2xl">🔒</span>
          <span>
            <b>{language === 'de' ? 'Sicher:' : language === 'uk' ? 'Безпечно:' : language === 'ru' ? 'Безопасно:' : 'Secure:'}</b>{' '}
            {language === 'de' ? 'Wir speichern nichts im Internet. Alle deine Daten bleiben ausschließlich lokal auf deinem Handy oder Computer.' : language === 'uk' ? 'Ми нічого не зберігаємо в Інтернеті. Усі твої дані залишаються виключно на твоєму пристрої.' : language === 'ru' ? 'Мы ничего не сохраняем в интернете. Все твои данные остаются исключительно на твоем устройстве.' : 'We do not store anything on the internet. All your data remains exclusively on your device.'}
          </span>
        </p>
      </div>

      <button 
        onClick={() => setCurrentView('welcome')}
        className="w-full flex items-center justify-center p-4 mt-6 text-lg bg-success text-white rounded-xl font-extrabold cursor-pointer shadow-lg transition-opacity hover:opacity-90"
      >
        {t.btn[language as keyof typeof t.btn]}
      </button>
    </div>
  );
}
