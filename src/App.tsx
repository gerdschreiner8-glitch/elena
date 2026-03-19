import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import IntroView from './views/IntroView';
import WelcomeView from './views/WelcomeView';
import ProfileView from './views/ProfileView';
import DashboardView from './views/DashboardView';
import HelpView from './views/HelpView';
import FormsView from './views/FormsView';
import ProblemsView from './views/ProblemsView';
import ProView from './views/ProView';
import ProUpsellView from './views/ProUpsellView';
import EmergencyAppealView from './views/EmergencyAppealView';
import DocumentsView from './views/DocumentsView';
import ChatWidget from './components/ChatWidget';
import { setChatContext } from './utils/chatContextStore';

export default function App() {
  const [language, setLanguage] = useState('de');
  const [currentView, setCurrentView] = useState('intro');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang');
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem('app_lang', language);
  }, [language]);

  useEffect(() => {
    setChatContext({ view: currentView });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-bg pb-24">
      <Header language={language} setLanguage={setLanguage} />
      <Navigation currentView={currentView} setCurrentView={setCurrentView} language={language} />
      
      <main className="w-full max-w-[700px] mx-auto sm:mt-4 p-4 sm:p-6 bg-white sm:rounded-xl shadow-sm min-h-[calc(100vh-200px)]">
        {currentView === 'intro' && <IntroView language={language} setCurrentView={setCurrentView} />}
        {currentView === 'welcome' && <WelcomeView language={language} setCurrentView={setCurrentView} />}
        {currentView === 'profil' && <ProfileView language={language} setCurrentView={setCurrentView} />}
        {currentView === 'dashboard' && <DashboardView language={language} setCurrentView={setCurrentView} />}
        {currentView === 'formulare' && <FormsView language={language} />}
        {currentView === 'kurs' && <HelpView language={language} />}
        {currentView === 'probleme' && <ProblemsView language={language} setCurrentView={setCurrentView} />}
        {currentView === 'pro-upsell' && <ProUpsellView language={language} setCurrentView={setCurrentView} />}
        {currentView === 'pro' && <ProView language={language} />}
        {currentView === 'emergency-appeal' && <EmergencyAppealView language={language} />}
        {currentView === 'dokumente' && <DocumentsView language={language} />}
      </main>

      <ChatWidget language={language} currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}
