import React from 'react';

interface WelcomeViewProps {
  language: string;
  setCurrentView: (view: string) => void;
}

export default function WelcomeView({ language, setCurrentView }: WelcomeViewProps) {
  const t = {
    title: {
      de: "Dein persönlicher Begleiter 🤝",
      uk: "Ваш особистий супутник 🤝",
      ru: "Ваш личный спутник 🤝",
      en: "Your personal companion 🤝"
    },
    p1: {
      de: "Hallo. Wir wissen, wie schwer die letzte Zeit für dich war. Hier im Landkreis Merzig-Wadern bist du jetzt in Sicherheit.",
      uk: "Вітаю. Ми знаємо, яким важким був для тебе останній час. Тут, у районі Мерциг-Вадерн, ти тепер у безпеці.",
      ru: "Здравствуйте. Мы знаем, как тяжело тебе было в последнее время. Здесь, в районе Мерциг-Вадерн, ти теперь в безопасности.",
      en: "Hello. We know how difficult the recent times have been for you. Here in the district of Merzig-Wadern you are safe now."
    },
    p2: {
      de: "Dieses System begleitet dich als dein persönlicher Wegweiser Schritt für Schritt durch alle Erledigungen. Wir bereiten die Briefe für die Ämter so vor, dass sie freundlich, aber rechtlich sicher formuliert sind.",
      uk: "Ця система супроводжуватиме тебе як твій особистий путівник крок за кроком у всіх справах. Ми готуємо листи до установ так, щоб вони були дружніми, але юридично правильними.",
      ru: "Эта система будет сопровождать тебя как твой личный путеводитель шаг за шагом во всех делах. Мы готовим письма в учреждения так, чтобы они были дружелюбными, но юридически правильными.",
      en: "This system will accompany you as your personal guide step by step through all tasks. We prepare the letters for the authorities so that they are friendly but legally secure."
    },
    tipTitle: {
      de: "Unser Soforthilfe-Tipp: ✨",
      uk: "Наша порада для швидкої допомоги: ✨",
      ru: "Наш совет для быстрой помощи: ✨",
      en: "Our quick help tip: ✨"
    },
    tipText: {
      de: "Du brauchst heute Kleidung oder etwas zu essen? Schau direkt unter <b>\"Hilfen & Adressen\"</b>. Dort findest du Orte, die dir sofort und unbürokratisch helfen.",
      uk: "Тобі сьогодні потрібен одяг чи щось поїсти? Подивись прямо в розділі <b>\"Допомога & Адреси\"</b>. Там ти знайдеш місця, де тобі допоможуть відразу і без бюрократії.",
      ru: "Тебе сегодня нужна одежда или еда? Посмотри прямо в разделе <b>\"Помощь и Адреса\"</b>. Там ты найдешь места, где тебе помогут сразу и без бюрократии.",
      en: "Do you need clothes or something to eat today? Look directly under <b>\"Help & Addresses\"</b>. There you will find places that will help you immediately and unbureaucratically."
    },
    btn: {
      de: "Jetzt Dein Profil anlegen ➔",
      uk: "Створити свій профіль зараз ➔",
      ru: "Создать свой профиль сейчас ➔",
      en: "Create your profile now ➔"
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {t.title[language as keyof typeof t.title]}
      </h2>
      
      <div className="bg-[#f8fbff] border-l-[6px] border-primary p-5 rounded-lg mb-4">
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.p1[language as keyof typeof t.p1] }} />
        <p className="m-0" dangerouslySetInnerHTML={{ __html: t.p2[language as keyof typeof t.p2] }} />
      </div>
      
      <div className="bg-[#fffdf5] border-l-[6px] border-accent p-5 rounded-lg mb-4">
        <h3 className="mt-0 text-lg font-bold mb-2">
          {t.tipTitle[language as keyof typeof t.tipTitle]}
        </h3>
        <p className="m-0" dangerouslySetInnerHTML={{ __html: t.tipText[language as keyof typeof t.tipText] }} />
      </div>
      
      <button 
        onClick={() => setCurrentView('profil')}
        className="w-full flex items-center justify-center p-4 mt-6 text-lg bg-success text-white rounded-xl font-extrabold cursor-pointer shadow-lg transition-opacity hover:opacity-90"
      >
        {t.btn[language as keyof typeof t.btn]}
      </button>
    </div>
  );
}
