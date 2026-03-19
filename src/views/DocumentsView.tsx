import React, { useState, useEffect } from 'react';
import DocumentGenerator from '../components/DocumentGenerator';
import { getProfileData } from '../utils/profileStore';

interface DocumentHistoryItem {
  id: string;
  type: string;
  title: string;
  date: string;
  customContent?: string;
}

interface DocumentsViewProps {
  language: string;
}

export default function DocumentsView({ language }: DocumentsViewProps) {
  const [history, setHistory] = useState<DocumentHistoryItem[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocumentHistoryItem | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('app_doc_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('app_doc_history', JSON.stringify(newHistory));
  };

  const t = {
    title: { de: "Deine Dokumente 📂", uk: "Твої документи 📂", ru: "Твои документы 📂", en: "Your Documents 📂" },
    desc: { de: "Hier findest du alle Dokumente, die du erstellt hast. Du kannst sie jederzeit erneut ansehen oder drucken.", uk: "Тут ви знайдете всі створені вами документи. Ви можете переглянути або роздрукувати їх знову в будь-який час.", ru: "Здесь вы найдете все созданные вами документы. Вы можете просмотреть или распечатать их снова в любое время.", en: "Here you can find all the documents you have created. You can view or print them again at any time." },
    empty: { de: "Du hast noch keine Dokumente erstellt.", uk: "Ви ще не створили жодного документа.", ru: "Вы еще не создали ни одного документа.", en: "You haven't created any documents yet." },
    delete: { de: "Löschen", uk: "Видалити", ru: "Удалить", en: "Delete" },
    view: { de: "Ansehen", uk: "Переглянути", ru: "Проглянути", en: "View" }
  };

  const getT = (k: keyof typeof t) => (t[k] as any)[language] || (t[k] as any).de;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
        {getT('title')}
      </h2>
      <p className="mb-6">{getT('desc')}</p>

      {history.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-500">
          <span className="text-4xl mb-2 block">📄</span>
          {getT('empty')}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex justify-between items-center hover:border-primary transition-colors">
              <div>
                <h4 className="font-bold text-primary">{item.title}</h4>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleString(language)}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveDoc(item)}
                  className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  {getT('view')}
                </button>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="bg-danger/10 text-danger px-3 py-2 rounded-lg text-sm font-bold hover:bg-danger hover:text-white transition-colors"
                >
                  {getT('delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeDoc && (
        <DocumentGenerator 
          docType={activeDoc.type} 
          profile={getProfileData()} 
          language={language} 
          customContent={activeDoc.customContent}
          onClose={() => setActiveDoc(null)} 
        />
      )}
    </div>
  );
}
