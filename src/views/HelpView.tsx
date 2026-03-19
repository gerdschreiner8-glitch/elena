import React from 'react';

interface HelpViewProps {
  language: string;
}

export default function HelpView({ language }: HelpViewProps) {
  const t = {
    title: { de: "Hilfe-Adressen & Lebensmittel 📍", uk: "Допомога & Продукти 📍", ru: "Помощь & Продукты 📍", en: "Help Addresses & Food 📍" },
    desc: { de: "Hier sind Menschen, die dir von Herzen gerne helfen.", uk: "Ось люди, які з радістю тобі допоможуть.", ru: "Здесь люди, которые с радостью тебе помогут.", en: "Here are people who are happy to help you." },
    food: { de: "Lebensmittel (Tafeln) 🍎", uk: "Продукти (Tafeln) 🍎", ru: "Продукты (Tafeln) 🍎", en: "Food banks (Tafel) 🍎" },
    clothes: { de: "Bekleidung & Hilfe 👕", uk: "Одяг та Допомога 👕", ru: "Одежда и Помощь 👕", en: "Clothing & Help 👕" },
    route: { de: "Route", uk: "Маршрут", ru: "Маршрут", en: "Route" },
    location: { de: "Ort:", uk: "Адреса:", ru: "Адрес:", en: "Location:" }
  };

  const getT = (k: keyof typeof t) => (t[k] as any)[language] || (t[k] as any).de;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {getT('title')}
      </h2>
      <p className="mb-6">{getT('desc')}</p>

      <h3 className="text-xl font-bold text-primary mt-6 mb-3">{getT('food')}</h3>
      
      <div className="bg-[#f8fbff] border-l-[6px] border-accent p-4 rounded-lg mb-4">
        <h4 className="font-bold m-0 mb-2">Tafel Merzig</h4>
        <p className="m-0 mb-3"><b>{getT('location')}</b> Am Gaswerk 10, 66663 Merzig</p>
        <a href="https://maps.google.com/maps?q=Am+Gaswerk+10+66663+Merzig" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm no-underline">
          {getT('route')}
        </a>
      </div>

      <div className="bg-[#f8fbff] border-l-[6px] border-accent p-4 rounded-lg mb-4">
        <h4 className="font-bold m-0 mb-2">Tafel Wadern</h4>
        <p className="m-0 mb-3"><b>{getT('location')}</b> Unterstraße 9, 66687 Wadern</p>
        <a href="https://maps.google.com/maps?q=Unterstraße+9+66687+Wadern" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm no-underline">
          {getT('route')}
        </a>
      </div>

      <div className="bg-[#f8fbff] border-l-[6px] border-accent p-4 rounded-lg mb-4">
        <h4 className="font-bold m-0 mb-2">Tafel Losheim</h4>
        <p className="m-0 mb-3"><b>{getT('location')}</b> Weiskircher Str. 24, 66679 Losheim</p>
        <a href="https://maps.google.com/maps?q=Weiskircher+Str.+24+66679+Losheim+am+See" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm no-underline">
          {getT('route')}
        </a>
      </div>

      <h3 className="text-xl font-bold text-primary mt-8 mb-3">{getT('clothes')}</h3>
      
      <div className="bg-[#f8fbff] border-l-[6px] border-[#f39c12] p-4 rounded-lg mb-4">
        <h4 className="font-bold m-0 mb-2">Schwalbennest e.V. (Wadern)</h4>
        <p className="m-0 mb-3">Noswendeler Straße 3, 66687 Wadern</p>
        <a href="https://maps.google.com/maps?q=Noswendeler+Straße+3+66687+Wadern" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm no-underline">
          {getT('route')}
        </a>
      </div>

      <div className="bg-[#f8fbff] border-l-[6px] border-[#8e44ad] p-4 rounded-lg mb-4">
        <h4 className="font-bold m-0 mb-2">Kleiderkammer Wadern</h4>
        <p className="m-0 mb-3">66687 Wadern</p>
        <a href="https://maps.google.com/maps?q=Kleiderkammer+66687+Wadern" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm no-underline">
          {getT('route')}
        </a>
      </div>

      <div className="bg-[#f8fbff] border-l-[6px] border-heart p-4 rounded-lg mb-4">
        <h4 className="font-bold m-0 mb-2">Flüchtlingshilfe (Merzig)</h4>
        <p className="m-0 mb-3">Am Gaswerk 10, 66663 Merzig</p>
        <a href="https://maps.google.com/maps?q=Am+Gaswerk+10+66663+Merzig" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm no-underline">
          {getT('route')}
        </a>
      </div>

      <div className="bg-[#f8fbff] border-l-[6px] border-success p-4 rounded-lg mb-4">
        <h4 className="font-bold m-0 mb-2">DRK Kleiderkammer (Merzig)</h4>
        <p className="m-0 mb-3">Losheimer Straße 1, 66663 Merzig</p>
        <a href="https://maps.google.com/maps?q=Losheimer+Straße+1+66663+Merzig" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm no-underline">
          {getT('route')}
        </a>
      </div>
    </div>
  );
}
