import React from 'react';

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const texts = {
    de: "Dein persönlicher Wegweiser für deine erste Zeit in Deutschland",
    uk: "Твій особистий путівник на перший час в Німеччині",
    ru: "Твой личный путеводитель на первое время в Германии",
    en: "Your personal guide for your first time in Germany"
  };

  return (
    <header className="bg-primary text-white p-4 sm:p-6 text-center border-b-4 border-secondary shadow-md relative">
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1 sm:gap-2 z-50 flex-wrap justify-end max-w-[140px] sm:max-w-[200px]">
        <button 
          onClick={() => setLanguage('de')}
          className={`w-[36px] h-[28px] sm:w-[42px] sm:h-[32px] rounded-lg flex items-center justify-center transition-all ${language === 'de' ? 'bg-secondary border-white shadow-lg scale-110 z-10' : 'bg-white border-transparent shadow-sm'}`}
          title="Deutsch"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-[22px] h-[14px] sm:w-[26px] sm:h-[18px] rounded-sm shadow-sm object-cover">
            <rect width="5" height="1" fill="#000"/><rect width="5" height="1" y="1" fill="#D00"/><rect width="5" height="1" y="2" fill="#FFCE00"/>
          </svg>
        </button>
        <button 
          onClick={() => setLanguage('uk')}
          className={`w-[36px] h-[28px] sm:w-[42px] sm:h-[32px] rounded-lg flex items-center justify-center transition-all ${language === 'uk' ? 'bg-secondary border-white shadow-lg scale-110 z-10' : 'bg-white border-transparent shadow-sm'}`}
          title="Українська"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-[22px] h-[14px] sm:w-[26px] sm:h-[18px] rounded-sm shadow-sm object-cover">
            <rect width="3" height="1" fill="#0057B7"/><rect width="3" height="1" y="1" fill="#FFD700"/>
          </svg>
        </button>
        <button 
          onClick={() => setLanguage('ru')}
          className={`w-[36px] h-[28px] sm:w-[42px] sm:h-[32px] rounded-lg flex items-center justify-center transition-all ${language === 'ru' ? 'bg-secondary border-white shadow-lg scale-110 z-10' : 'bg-white border-transparent shadow-sm'}`}
          title="Русский"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className="w-[22px] h-[14px] sm:w-[26px] sm:h-[18px] rounded-sm shadow-sm object-cover">
            <rect width="9" height="2" fill="#fff"/><rect width="9" height="2" y="2" fill="#0039a6"/><rect width="9" height="2" y="4" fill="#d52b1e"/>
          </svg>
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className={`w-[36px] h-[28px] sm:w-[42px] sm:h-[32px] rounded-lg flex items-center justify-center transition-all ${language === 'en' ? 'bg-secondary border-white shadow-lg scale-110 z-10' : 'bg-white border-transparent shadow-sm'}`}
          title="English"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-[22px] h-[14px] sm:w-[26px] sm:h-[18px] rounded-sm shadow-sm object-cover">
            <clipPath id="t"><path d="M0,0h60v30H0z"/></clipPath><g clipPath="url(#t)"><path d="M0,0h60v30H0z" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="#fff" strokeWidth="6"/><path d="M0,0L60,30M60,0L0,30" stroke="#C8102E" strokeWidth="4"/><path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6"/></g>
          </svg>
        </button>
      </div>
      <h1 className="m-0 text-2xl sm:text-3xl font-extrabold flex items-center justify-center gap-2 mt-4 sm:mt-6">
        Begleiter <span className="text-[1.1em]">🤝</span>
      </h1>
      <p className="mt-2 text-[0.85rem] sm:text-[0.95rem] opacity-90 italic px-4">
        {texts[language as keyof typeof texts]}
      </p>
    </header>
  );
}
