import React, { useState } from 'react';
import DocumentGenerator from '../components/DocumentGenerator';
import { getProfileData } from '../utils/profileStore';

interface EmergencyAppealViewProps {
  language: string;
}

export default function EmergencyAppealView({ language }: EmergencyAppealViewProps) {
  const [showDoc, setShowDoc] = useState(false);

  const t = {
    title: {
      de: "Dein Widerspruch ist fertig! 🚀",
      uk: "Ваша апеляція готова! 🚀",
      ru: "Ваша апелляция готова! 🚀",
      en: "Your appeal is ready! 🚀"
    },
    intro: {
      de: "Atme tief durch. Mit diesem Entwurf hast du jetzt die volle Kontrolle. Ich habe den passenden taktischen Widerspruch für dich vorbereitet, der dich rechtlich absichert.",
      uk: "Зробіть глибокий вдих. З цим проектом ви тепер маєте повний контроль. Підготовлено відповідну тактичну апеляцію, яка захистить вас юридично.",
      ru: "Сделайте глубокий вдох. С этим проектом у вас теперь полный контроль. Подготовлена соответствующая тактическая апелляция, которая защитит вас юридически.",
      en: "Take a deep breath. With this draft, you now have full control. I have prepared the appropriate tactical appeal for you that secures you legally."
    },
    whyGenius: {
      de: "Warum dieser Entwurf Gold wert ist:",
      uk: "Чому цей проект на вагу золота:",
      ru: "Почему этот проект на вес золота:",
      en: "Why this draft is worth its weight in gold:"
    },
    point1Title: {
      de: "🚀 Frist gerettet",
      uk: "🚀 Термін врятовано",
      ru: "🚀 Срок спасен",
      en: "🚀 Deadline saved"
    },
    point1Desc: {
      de: "Die Zeit läuft nicht mehr gegen uns. Dein Recht ist gesichert.",
      uk: "Час більше не працює проти нас. Ваше право захищено.",
      ru: "Время больше не работает против нас. Ваше право защищено.",
      en: "Time is no longer running against us. Your right is secured."
    },
    point2Title: {
      de: "🛡️ Spieß umgedreht",
      uk: "🛡️ Ситуація змінилася",
      ru: "🛡️ Ситуация изменилась",
      en: "🛡️ Tables turned"
    },
    point2Desc: {
      de: "Wir ersuchen das Amt rechtlich, ihre Ablehnung ganz genau zu erklären (sie müssen jetzt die entsprechende Begründungsarbeit leisten).",
      uk: "Ми юридично просимо відомство детально пояснити свою відмову (тепер вони повинні виконати відповідну роботу з обґрунтування).",
      ru: "Мы юридически просим ведомство детально объяснить свой отказ (теперь они должны выполнить соответствующую работу по обоснованию).",
      en: "We legally request the office to explain their rejection exactly (they have to do the corresponding justification work now)."
    },
    point3Title: {
      de: "⚖️ Anwalts-Vorbereitung",
      uk: "⚖️ Підготовка для адвоката",
      ru: "⚖️ Подготовка для адвоката",
      en: "⚖️ Lawyer Preparation"
    },
    point3Desc: {
      de: "Das ist die perfekte Vorbereitung für unsere Kooperationsanwälte. Sobald das Amt antwortet, haben unsere Anwälte die perfekte Angriffsfläche, um den Bescheid zu zerlegen.",
      uk: "Це ідеальна підготовка для наших адвокатів-партнерів. Як тільки відомство відповість, наші адвокати матимуть ідеальну можливість розібрати рішення.",
      ru: "Это идеальная подготовка для наших адвокатов-партнеров. Как только ведомство ответит, у наших адвокатов будет идеальная возможность разобрать решение.",
      en: "This is the perfect preparation for our cooperating lawyers. As soon as the office answers, our lawyers have the perfect target to take the decision apart."
    },
    previewTitle: {
      de: "Dein Dokumenten-Entwurf:",
      uk: "Проект вашого документа:",
      ru: "Проект вашего документа:",
      en: "Your document draft:"
    },
    nextStepsTitle: {
      de: "Deine nächsten Schritte:",
      uk: "Ваші наступні кроки:",
      ru: "Ваши следующие шаги:",
      en: "Your next steps:"
    },
    step1: {
      de: "📥 PDF herunterladen.",
      uk: "📥 Завантажити PDF.",
      ru: "📥 Скачать PDF.",
      en: "📥 Download PDF."
    },
    step2: {
      de: "✍️ Unterschreiben (ganz wichtig!).",
      uk: "✍️ Підписати (дуже важливо!).",
      ru: "✍️ Подписать (очень важно!).",
      en: "✍️ Sign (very important!)."
    },
    step3: {
      de: "✉️ Ans Amt schicken (oder direkt in der App an unseren Anwalt übergeben, der es für dich abschickt).",
      uk: "✉️ Відправити до відомства (або передати нашому адвокату прямо в додатку, який відправить його за вас).",
      ru: "✉️ Отправить в ведомство (или передать нашему адвокату прямо в приложении, который отправит его за вас).",
      en: "✉️ Send to the office (or hand it over directly in the app to our lawyer, who will send it for you)."
    },
    downloadBtn: {
      de: "📄 PDF jetzt herunterladen & unterschreiben",
      uk: "📄 Завантажити та підписати PDF зараз",
      ru: "📄 Скачать и подписать PDF сейчас",
      en: "📄 Download & sign PDF now"
    },
    signBtn: {
      de: "✍️ Jetzt digital unterschreiben",
      uk: "✍️ Підписати цифрово зараз",
      ru: "✍️ Подписать цифровой подписью сейчас",
      en: "✍️ Sign digitally now"
    },
    signSuccess: {
      de: "✅ Unterschrift eingefügt!",
      uk: "✅ Підпис додано!",
      ru: "✅ Подпись добавлена!",
      en: "✅ Signature added!"
    },
    signError: {
      de: "❌ Keine Unterschrift im Profil gefunden. Bitte im Profil hinterlegen oder ausdrucken.",
      uk: "❌ Підпис у профілі не знайдено. Будь ласка, додайте в профілі або роздрукуйте.",
      ru: "❌ Подпись в профиле не найдена. Пожалуйста, добавьте в профиле или распечатайте.",
      en: "❌ No signature found in profile. Please add in profile or print."
    }
  };

  const profile = getProfileData();
  const today = new Date().toLocaleDateString('de-DE');
  const recipient = "Jobcenter Merzig-Wadern<br>Leistungsabteilung<br>Gutenbergstraße 14<br>66663 Merzig";
  const subject = "Fristwahrender Widerspruch und Antrag auf Neuprüfung";

  const letterContent = `Bescheid vom: [Datum einfügen] | Aktenzeichen/BG-Nummer: [Nummer einfügen]<br><br>
Sehr geehrte Damen und Herren,<br><br>
gegen den oben genannten Bescheid lege ich hiermit form- und fristgerecht <b>Widerspruch</b> ein.<br><br>
Gleichzeitig beantrage ich die vollumfängliche rechtliche und tatsächliche Überprüfung der zugrundeliegenden Verwaltungsentscheidung. Der angefochtene Bescheid genügt nicht den gesetzlichen Begründungsanforderungen gemäß § 35 SGB X. Die tragenden Ermessens- und Sachverhaltsgesichtspunkte, die zu Ihrer Entscheidung geführt haben, sind für mich nicht nachvollziehbar dargelegt.<br><br>
Zur Wahrung meiner rechtlichen Interessen ersuche ich Sie hiermit höflich um Offenlegung der genauen tatsächlichen und rechtlichen Gründe für Ihre Entscheidung.<br><br>
Nach Eingang und Prüfung Ihrer ausführlichen Begründung behalte ich mir vor, den Widerspruch – gegebenenfalls durch meinen anwaltlichen Vertreter – inhaltlich vollumfänglich zu begründen. Bis zur rechtsmittelfähigen Entscheidung über diesen Widerspruch beantrage ich die Aussetzung der Vollziehung gemäß § 86a Abs. 3 SGG und ersuche Sie, von weiteren belastenden Maßnahmen abzusehen.`;

  const [useSignature, setUseSignature] = useState(false);
  const [signMessage, setSignMessage] = useState('');

  const handleSign = () => {
    if (profile.sig) {
      setUseSignature(true);
      setSignMessage(getT('signSuccess'));
    } else {
      setSignMessage(getT('signError'));
    }
  };

  const getT = (k: keyof typeof t) => {
    return (t[k] as any)?.[language] || (t[k] as any)?.de;
  };

  const modifiedProfile = { ...profile, sig: useSignature ? profile.sig : undefined };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-success to-emerald-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{getT('title')}</h2>
          <p className="text-emerald-50 text-lg">{getT('intro')}</p>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-4">{getT('whyGenius')}</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <div className="text-2xl mt-1">🚀</div>
              <div>
                <h4 className="font-bold text-emerald-900">{getT('point1Title').replace('🚀 ', '')}</h4>
                <p className="text-emerald-800 text-sm">{getT('point1Desc')}</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-2xl mt-1">🛡️</div>
              <div>
                <h4 className="font-bold text-blue-900">{getT('point2Title').replace('🛡️ ', '')}</h4>
                <p className="text-blue-800 text-sm">{getT('point2Desc')}</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="text-2xl mt-1">⚖️</div>
              <div>
                <h4 className="font-bold text-purple-900">{getT('point3Title').replace('⚖️ ', '')}</h4>
                <p className="text-purple-800 text-sm">{getT('point3Desc')}</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-primary mb-3">{getT('previewTitle')}</h3>
          <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8 text-sm text-black font-sans leading-relaxed shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">PRO</div>
            <div className="absolute top-0 left-0 w-full h-2 bg-[#f39c12]"></div>
            
            <div className="text-center font-bold text-[12pt] mb-6 leading-tight">
              {profile.v} {profile.n}<br/>
              <span className="text-[10pt] font-normal inline-block mt-1">{profile.s} · {profile.o}</span>
            </div>

            <div className="mb-6">
              <div className="text-[10pt] leading-snug" dangerouslySetInnerHTML={{ __html: recipient }} />
            </div>

            <div className="flex justify-between items-end mb-6 text-[10pt]">
              <div className="font-bold">{profile.a ? `Az.: ${profile.a}` : 'Az.: Neuaufnahme'}</div>
              <div className="text-right">Merzig, den {today}</div>
            </div>

            <div className="font-bold text-[11pt] mb-4">{subject}</div>

            <div dangerouslySetInnerHTML={{ __html: letterContent }} />

            <div className="mt-6">
              <p className="mb-2">Mit freundlichen Grüßen,</p>
              {useSignature && profile.sig ? (
                <img src={profile.sig} alt="Unterschrift" className="max-h-[50px] max-w-[200px] block mb-1" />
              ) : (
                <div className="h-[40px] w-[150px] block mb-1" />
              )}
              <span className="font-bold">{profile.v} {profile.n}</span>
            </div>
          </div>

          <div className="bg-[#fdf7e7] border-2 border-[#f39c12] p-5 rounded-xl">
            <h3 className="text-lg font-bold text-[#d35400] mb-3">{getT('nextStepsTitle')}</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-[#7f8c8d] font-medium">
                <span className="text-xl">📥</span> {getT('step1').replace('📥 ', '')}
              </li>
              <li className="flex items-center gap-2 text-[#7f8c8d] font-medium">
                <span className="text-xl">✍️</span> {getT('step2').replace('✍️ ', '')}
              </li>
              <li className="flex items-start gap-2 text-[#7f8c8d] font-medium">
                <span className="text-xl mt-0.5">✉️</span> 
                <span>{getT('step3').replace('✉️ ', '')}</span>
              </li>
            </ul>

            {!useSignature && (
              <div className="mb-4">
                <button 
                  onClick={handleSign}
                  className="w-full bg-white border-2 border-[#f39c12] text-[#d35400] hover:bg-[#fdf7e7] p-3 rounded-lg font-bold transition-all text-sm flex items-center justify-center gap-2"
                >
                  {getT('signBtn')}
                </button>
                {signMessage && (
                  <p className={`text-sm mt-2 text-center ${signMessage.includes('✅') ? 'text-green-600 font-bold' : 'text-red-600'}`}>
                    {signMessage}
                  </p>
                )}
              </div>
            )}

            <button 
              onClick={() => setShowDoc(true)}
              className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white p-4 rounded-lg font-bold shadow-md transition-all text-lg flex items-center justify-center gap-2"
            >
              <span>📄</span> {getT('downloadBtn').replace('📄 ', '')}
            </button>
          </div>
        </div>
      </div>

      {showDoc && (
        <DocumentGenerator 
          docType="custom_letter_with_header" 
          profile={modifiedProfile} 
          language={language} 
          customContent={letterContent}
          customSubject={subject}
          onClose={() => setShowDoc(false)} 
        />
      )}
    </div>
  );
}
