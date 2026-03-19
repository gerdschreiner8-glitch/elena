import React from 'react';

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  language: string;
}

export default function Navigation({ currentView, setCurrentView, language }: NavigationProps) {
  const navItems = [
    { id: 'intro', de: 'Start', uk: 'Старт', ru: 'Старт', en: 'Start' },
    { id: 'profil', de: 'Dein Profil', uk: 'Твій профіль', ru: 'Твой профиль', en: 'Your Profile' },
    { id: 'dashboard', de: 'Schritte', uk: 'Кроки', ru: 'Шаги', en: 'Steps' },
    { id: 'formulare', de: 'Fahrplan\n& Anträge', uk: 'План &\nЗаяви', ru: 'План &\nЗаявления', en: 'Roadmap\n& Forms' },
    { id: 'kurs', de: 'Hilfen &\nAdressen', uk: 'Допомога &\nАдреси', ru: 'Помощь &\nАдреса', en: 'Help &\nAddresses' },
    { id: 'probleme', de: 'Probleme\nlösen 🛡️', uk: 'Вирішення\nпроблем 🛡️', ru: 'Решение\nпроблем 🛡️', en: 'Solve\nProblems 🛡️' },
    { id: 'dokumente', de: 'Deine Dokumente', uk: 'Твої документи', ru: 'Твои документы', en: 'Your Documents' },
  ];

  return (
    <nav className="flex overflow-x-auto bg-[#eef1f5] shadow-sm sticky top-0 z-40 no-scrollbar border-b border-[#d1d8dd]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className={`flex-none min-w-[90px] bg-transparent border-r border-[#d1d8dd] border-b-4 p-4 text-xs leading-tight cursor-pointer font-bold text-primary transition-all uppercase whitespace-pre-line
            ${currentView === item.id || (currentView === 'welcome' && item.id === 'intro') ? 'border-b-secondary bg-white' : 'border-b-transparent'}`}
        >
          {item[language as keyof typeof item]}
        </button>
      ))}
    </nav>
  );
}
