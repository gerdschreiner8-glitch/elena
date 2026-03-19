import React from 'react';
import { ProfileData } from '../utils/profileStore';

interface DocumentGeneratorProps {
  docType: string;
  profile: ProfileData;
  language: string;
  onClose: () => void;
  customContent?: string;
  customSubject?: string;
}

export default function DocumentGenerator({ docType, profile, language, onClose, customContent, customSubject }: DocumentGeneratorProps) {
  const today = new Date().toLocaleDateString('de-DE');
  
  let recipient = docType.includes('sozial') 
    ? "Landkreis Merzig-Wadern<br>Sozialamt / AsylbLG<br>Bahnhofstraße 44<br>66663 Merzig" 
    : "Jobcenter Merzig-Wadern<br>Leistungsabteilung<br>Gutenbergstraße 14<br>66663 Merzig";
      
  let subject = customSubject || "Dokumenten-Service";
  let body = customContent || "";

  const bedarfsGemeinschaftText = parseInt(profile.pers) > 1 ? `für mich und meine Bedarfsgemeinschaft (${profile.pers} Personen)` : `für mich`;
  const notlageText = profile.f ? `<p><b>Darlegung der besonderen Dringlichkeit:</b><br>${profile.f}<br>Aufgrund dieser Umstände ist eine sofortige Bearbeitung zur Abwendung einer existenziellen Notlage zwingend geboten. Ich bitte um Berücksichtigung dieser besonderen Härte.</p>` : "<p>Ich bitte um eine zeitnahe Prüfung und einen rechtsmittelfähigen Bescheid, um meine Existenzgrundlage zu sichern.</p>";

  if(docType === 'vorschuss_sozial') {
      subject = "Antrag auf Gewährung eines Vorschusses gem. § 42 SGB I";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die Gewährung eines angemessenen Vorschusses auf die mir zustehenden Leistungen zur Sicherung des Lebensunterhalts gemäß § 42 Abs. 1 SGB I.</p>
      <p>Mein regulärer Leistungsantrag liegt Ihnen bereits vor. Da ich aktuell über keinerlei finanzielle Mittel verfüge, ist mein menschenwürdiges Existenzminimum ${bedarfsGemeinschaftText} nicht mehr gedeckt. Ein weiteres Zuwarten auf die abschließende Bearbeitung des Hauptantrags ist mir unzumutbar, da eine existenzielle Notlage (insbesondere hinsichtlich Ernährung und Hygiene) unmittelbar droht bzw. bereits eingetreten ist.</p>
      <p>Der Anspruch auf die Hauptleistung besteht dem Grunde nach und ist zur Abwendung wesentlicher Nachteile sofort fällig. Ich ersuche Sie daher höflich, den Vorschuss unverzüglich – gegebenenfalls in Form einer Barauszahlung oder eines Schecks – anzuweisen.</p>
      ${notlageText}`;
  }
  else if(docType === 'eil_sozial') {
      subject = "Eilantrag auf Gewährung von Leistungen zur Sicherung des Lebensunterhalts";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich formell die unverzügliche Gewährung von Leistungen zur Sicherung des Lebensunterhalts nach dem Asylbewerberleistungsgesetz (AsylbLG) ${bedarfsGemeinschaftText}.</p>
      <p>Ich bin unter der genannten Adresse im Landkreis gemeldet und verfüge über keinerlei anrechenbares Einkommen oder Vermögen. Zur Sicherstellung meines verfassungsrechtlich garantierten menschenwürdigen Existenzminimums bin ich zwingend und sofort auf diese Leistungen angewiesen.</p>
      <p>Ich ersuche um eine umgehende Bearbeitung und Bescheidung meines Antrags. Relevante Unterlagen (Meldebescheinigung, Ankunftsnachweis) liegen bei. Etwaige weitere Dokumente werde ich im Rahmen meiner Mitwirkungspflichten nach § 60 SGB I unverzüglich nachreichen.</p>
      ${notlageText}`;
  }
  else if(docType === 'miete_zustimmung_sozial' || docType === 'miete_zustimmung_jc') {
      subject = "Antrag auf Zusicherung zur Übernahme der Kosten der Unterkunft";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die vorherige Zusicherung zur Berücksichtigung der Aufwendungen für die neue Unterkunft gemäß § 22 Abs. 4 SGB II bzw. den entsprechenden Regelungen des AsylbLG/SGB XII sowie die Übernahme der Kosten für Unterkunft und Heizung.</p>
      <p>Ein angemessener und sicherer Wohnraum ist zur Integration und Sicherung der Existenzgrundlage zwingend erforderlich. <b>Das konkrete Mietangebot sowie die erforderliche Vermieterbescheinigung (Wohnungsgeberbestätigung) liegen diesem Antrag als Anlage bei.</b> Die Aufwendungen für die neue Unterkunft sind nach den örtlichen Richtlinien angemessen.</p>
      <p>Da das vorliegende Wohnungsangebot seitens des Vermieters nur für einen sehr kurzen Zeitraum verbindlich aufrechterhalten wird, beantrage ich eine sofortige Prüfung und die Erteilung der schriftlichen Zusicherung. Eine Verzögerung würde zum Verlust des Wohnraums führen.</p>`;
  }
  else if(docType === 'erst_sozial' || docType === 'erst_jc') {
      subject = docType === 'erst_sozial' 
          ? "Antrag auf Erstausstattung für die Wohnung gem. § 3 AsylbLG" 
          : "Antrag auf Erstausstattung für die Wohnung gem. § 24 Abs. 3 Nr. 1 SGB II";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die Bewilligung von Leistungen für die Erstausstattung der Wohnung einschließlich Haushaltsgeräten gemäß § 24 Abs. 3 Nr. 1 SGB II bzw. § 3 AsylbLG ${bedarfsGemeinschaftText}.</p>
      <p>Aufgrund meiner Flucht und der vorherigen Unterbringungssituation verfüge ich über keinerlei eigenen Hausrat. Zur Sicherstellung einer menschenwürdigen Unterbringung und einer geordneten Haushaltsführung ist eine vollständige Grundausstattung (insbesondere Bett, Matratze, Kleiderschrank, Tisch, Stühle, Waschmaschine, Kühlschrank, Herd sowie grundlegender Hausrat) unabweisbar erforderlich.</p>
      <p>Da ich mittellos bin, kann dieser Sonderbedarf nicht aus dem Regelbedarf gedeckt werden. Ich beantrage die zeitnahe Feststellung des Bedarfs und die Bewilligung der Leistungen in Form von Sach- oder Geldleistungen.</p>
      ${profile.f ? '<p><b>Ergänzende Begründung:</b><br>' + profile.f + '</p>' : ''}`;
  }
  else if(docType === 'bekleidung_sozial' || docType === 'bekleidung_jc') {
      subject = "Antrag auf Erstausstattung für Bekleidung";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die Gewährung einer Erstausstattung für Bekleidung (bzw. Schwangerschaftsbekleidung oder Babyerstausstattung) gemäß § 24 Abs. 3 Nr. 2 SGB II bzw. den entsprechenden Regelungen des AsylbLG ${bedarfsGemeinschaftText}.</p>
      <p>Bedingt durch die Umstände meiner Flucht und den vollständigen Verlust meiner persönlichen Habe fehlt es an grundlegender, witterungsangepasster Kleidung. Dieser unabweisbare Sonderbedarf ist nicht durch den regulären Regelsatz abgegolten und kann aus eigenen Mitteln nicht bestritten werden.</p>
      <p>Ich beantrage eine zeitnahe Prüfung und Bewilligung der erforderlichen Leistungen zur Sicherstellung eines angemessenen Lebensbedarfs.</p>`;
  }
  else if(docType === 'krankenschein_sozial') {
      subject = "Antrag auf Ausstellung eines Krankenbehandlungsscheins";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die umgehende Ausstellung und Aushändigung eines Krankenbehandlungsscheins für das laufende Quartal gemäß § 4 AsylbLG.</p>
      <p>Zur Sicherstellung der medizinischen Grundversorgung und aufgrund akut behandlungsbedürftiger, schmerzhafter Beschwerden ist die unverzügliche Konsultation eines Arztes zwingend erforderlich. Eine Verzögerung der Behandlung würde eine akute Gefährdung meiner Gesundheit bedeuten.</p>
      <p>Ich ersuche um eine sofortige Bearbeitung zur Wahrung meines Rechts auf körperliche Unversehrtheit.</p>`;
  }
  else if(docType === 'fahrtkosten_sozial' || docType === 'fahrtkosten_jc') {
      subject = "Antrag auf Übernahme von Fahrtkosten";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die Übernahme der Fahrtkosten, die durch zwingend notwendige und unabdingbare Termine (z.B. behördliche Vorladungen, medizinische Behandlungen oder Integrationsmaßnahmen) entstanden sind oder entstehen werden.</p>
      <p>Die Übernahme dieser Kosten ist zur Erfüllung meiner gesetzlichen Mitwirkungspflichten bzw. zur Eingliederung zwingend erforderlich. Eine Deckung aus dem regulären Leistungssatz ist nicht möglich und würde eine unzumutbare Härte darstellen. Die entsprechenden Nachweise (Fahrkarten, amtliche Einladungen) sind als Anlage beigefügt.</p>
      <p>Ich beantrage die Prüfung und antragsgemäße Erstattung der Aufwendungen auf mein Konto.</p>`;
  }
  else if(docType === 'mehrbedarf_sozial' || docType === 'mehrbedarf_jc') {
      subject = "Antrag auf Gewährung eines Mehrbedarfs";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die Gewährung eines Mehrbedarfszuschlags (z.B. wegen Schwangerschaft, Alleinerziehung, dezentraler Warmwassererzeugung oder krankheitsbedingter kostenaufwändiger Ernährung) gemäß § 21 SGB II bzw. den entsprechenden Regelungen des AsylbLG/SGB XII.</p>
      <p>Die gesetzlichen Voraussetzungen für die Gewährung des Mehrbedarfs sind erfüllt. Die entsprechenden ärztlichen Bescheinigungen oder sonstigen zwingenden Nachweise, die diesen Sonderbedarf belegen, sind beigefügt bzw. werden unverzüglich nachgereicht.</p>
      <p>Ich beantrage die Anpassung meiner laufenden Leistungsbewilligung sowie die entsprechende Nachzahlung ab Eintritt des bedarfsbegründenden Ereignisses.</p>`;
  }
  else if(docType === 'but_sozial' || docType === 'but_jc') {
      subject = "Antrag auf Leistungen für Bildung und Teilhabe (BuT)";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich Leistungen für Bildung und Teilhabe (BuT) gemäß § 28 SGB II bzw. § 34 SGB XII zur Sicherstellung der schulischen und vorschulischen Förderung meiner Kinder.</p>
      <p>Der Antrag umfasst insbesondere die Aufwendungen für den persönlichen Schulbedarf, eintägige Ausflüge, mehrtägige Klassenfahrten sowie die gemeinschaftliche Mittagsverpflegung. Die entsprechenden Nachweise der Schule bzw. Kindertagesstätte sind beigefügt.</p>
      <p>Zur Wahrung der Chancengleichheit und des Kindeswohls beantrage ich eine zügige Bearbeitung und vollumfängliche Kostenübernahme.</p>`;
  }
  else if(docType === 'dolmetscher_sozial') {
      subject = "Antrag auf Übernahme von Dolmetscher- und Übersetzungskosten";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die Übernahme der Kosten für eine qualifizierte Sprachmittlung (Dolmetscher) bzw. für die beglaubigte Übersetzung verfahrensrelevanter Dokumente.</p>
      <p>Die Einbindung eines Sprachmittlers ist zur Wahrung meiner rechtlichen Interessen, zum Verständnis des behördlichen Handelns und zur Erfüllung meiner Mitwirkungspflichten im laufenden Verfahren zwingend erforderlich. Einen entsprechenden Kostenvoranschlag füge ich bei.</p>
      <p>Ich beantrage die vorherige schriftliche Kostenzusage, da ich diese Aufwendungen nicht aus eigenen Mitteln bestreiten kann.</p>`;
  }
  else if(docType === 'miete_sozial' || docType === 'miete_abtretung_jc') {
      subject = "Abtretungserklärung / Einverständnis zur direkten Mietzahlung";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit trete ich meinen Anspruch auf Leistungen für Unterkunft und Heizung für die o.g. Wohnung an meinen Vermieter ab und beantrage die Direktzahlung der Miete an den Vermieter gemäß § 22 Abs. 7 SGB II.</p>
      <p>Die Direktzahlung ist zur Sicherung der Unterkunft und zur Vermeidung von Mietrückständen zweckmäßig und geboten. Bitte überweisen Sie die anerkannten Kosten der Unterkunft ab sofort und bis auf Widerruf direkt auf das im Mietvertrag angegebene Konto des Vermieters.</p>
      <p>Ich bitte um schriftliche Bestätigung der Direktzahlung.</p>`;
  }
  else if(docType === 'kaution_jc') {
      subject = "Antrag auf Übernahme der Mietkaution gem. § 22 Abs. 6 SGB II";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich die Übernahme der vertraglich geschuldeten Mietkaution für die von Ihnen bereits genehmigte neue Unterkunft gemäß § 22 Abs. 6 SGB II in Form eines Darlehens.</p>
      <p>Da ich über kein anrechenbares Vermögen verfüge, ist die Darlehensgewährung zur Beschaffung der Unterkunft zwingend erforderlich. Ohne die Übernahme der Kaution ist der Abschluss des Mietvertrages und der Einzug gefährdet. <b>Die entsprechende Vermieterbescheinigung und die vertraglichen Angaben zur Kaution liegen Ihnen vor.</b></p>
      <p>Mit der gesetzlich geregelten monatlichen Aufrechnung des Darlehens mit meinen Leistungsansprüchen (in Höhe von max. 10 % des maßgebenden Regelbedarfs) erkläre ich mich einverstanden. Ich beantrage die umgehende Ausstellung einer Kostenübernahmeerklärung gegenüber dem Vermieter.</p>`;
  }
  else if(docType === 'oaw_jc') {
      subject = "Antrag auf Zustimmung zur Ortsabwesenheit";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit beantrage ich formell die vorherige Zustimmung zu einer Ortsabwesenheit gemäß § 7 Abs. 4a SGB II für mich (und meine Familie).</p>
      <p>Im geplanten Abwesenheitszeitraum stehen meinerseits keine wichtigen Termine, Eingliederungsmaßnahmen oder Vermittlungsangebote an. Meine berufliche Eingliederung wird durch diese Abwesenheit nicht beeinträchtigt.</p>
      <p>Ich beantrage eine zeitnahe schriftliche Bestätigung Ihrer Zustimmung, um Rechtsnachteile zu vermeiden.</p>`;
  }
  else if(docType === 'wba_jc') {
      subject = "Einreichung des Weiterbewilligungsantrags (WBA)";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>in der Anlage übersende ich Ihnen meinen fristgerecht gestellten Weiterbewilligungsantrag auf Leistungen zur Sicherung des Lebensunterhalts nach dem SGB II nebst allen erforderlichen Anlagen und den aktuellen Kontoauszügen.</p>
      <p>Da die Hilfebedürftigkeit unverändert fortbesteht, beantrage ich die nahtlose Weiterbewilligung der Leistungen vor Ablauf des aktuellen Bewilligungsabschnitts, um eine existenzielle Versorgungslücke zu vermeiden.</p>`;
  }
  else if(docType === 'begl_jc') {
      subject = "Einreichung des Hauptantrags auf Leistungen nach dem SGB II";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>in der Anlage übersende ich Ihnen meinen vollständig ausgefüllten Hauptantrag auf Leistungen zur Sicherung des Lebensunterhalts nach dem Zweiten Buch Sozialgesetzbuch (SGB II) nebst allen erforderlichen Anlagen und Nachweisen.</p>
      <p>Da ich meinen Lebensunterhalt nicht aus eigenen Mitteln oder durch die Hilfe Dritter bestreiten kann, besteht akute Hilfebedürftigkeit. Zur Vermeidung einer existenziellen Notlage beantrage ich eine zügige Prüfung und Bescheidung des Antrags sowie die unverzügliche Aufnahme der laufenden Leistungszahlung.</p>
      ${notlageText}`;
  }
  else if(docType === 'sachstand_sozial' || docType === 'sachstand_jc') {
      subject = "Sachstandsanfrage zu meinem Antrag auf Leistungen";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit ersuche ich Sie um Auskunft über den aktuellen Bearbeitungsstand meines bei Ihnen eingereichten Antrags.</p>
      <p>Da mein Lebensunterhalt derzeit ungesichert ist, ist eine zeitnahe Entscheidung von existenzieller Bedeutung. Sollten Ihnen zur abschließenden Prüfung und Bescheidung noch Unterlagen fehlen, bitte ich Sie im Rahmen Ihrer Beratungspflicht (§ 14 SGB I) um eine umgehende konkrete und schriftliche Mitteilung darüber, damit ich meine Mitwirkungspflichten erfüllen kann.</p>
      <p>Ich bitte höflich um eine Bescheidung oder Zwischennachricht innerhalb von 14 Tagen. Nach fruchtlosem Verstreichen behalte ich mir die Einleitung gerichtlicher Schritte (Antrag auf einstweiligen Rechtsschutz beim Sozialgericht bzw. Erhebung einer Untätigkeitsklage gemäß § 88 SGG) ausdrücklich vor.</p>`;
  }
  else if(docType === 'widerspruch_sozial' || docType === 'widerspruch_jc') {
      subject = "Widerspruch gegen Ihren Bescheid";
      body = `<p>Sehr geehrte Damen und Herren,</p>
      <p>gegen Ihren oben genannten Bescheid lege ich hiermit form- und fristgerecht <b>Widerspruch</b> ein.</p>
      <p><b>Begründung:</b><br>Der angefochtene Bescheid ist sachlich und rechtlich fehlerhaft. Die zugrundeliegende Sachverhaltsermittlung ist unvollständig. Entscheidungsrelevante Umstände meiner persönlichen und wirtschaftlichen Situation ${bedarfsGemeinschaftText} wurden rechtsfehlerhaft nicht oder nicht ausreichend gewürdigt.</p>
      <p>Ich beantrage die vollumfängliche rechtliche und tatsächliche Überprüfung der Verwaltungsentscheidung und die Aufhebung bzw. Abänderung des Bescheides zu meinen Gunsten.</p>
      <p>Bis zur rechtsmittelfähigen Entscheidung über diesen Widerspruch beantrage ich die Aussetzung der Vollziehung gemäß § 86a Abs. 3 SGG.</p>`;
  }
  else if(docType === 'custom_letter' || docType === 'custom_letter_with_header') {
      subject = customSubject || "Individueller Antrag";
      body = customContent || "<p>Fehler bei der Generierung.</p>";
      recipient = "An die zuständige Behörde";
  }
  else if (docType.includes('vollmacht')) {
      subject = "Vollmacht - " + (profile.v || "Begleiter") + " " + (profile.n || "App");
  }

  const handlePrint = () => window.print();
  const handlePdf = () => {
    alert(language === 'de' ? "Tipp: Wähle im nun folgenden Druckmenü als Drucker 'Als PDF speichern' aus." : "Tip: In the print menu, select 'Save as PDF' as your printer.");
    setTimeout(() => window.print(), 1000);
  };

  const [isSigned, setIsSigned] = React.useState(
    docType === 'vollmacht_preview' || docType === 'custom_letter_with_header'
  );
  const [signMessage, setSignMessage] = React.useState('');

  const uploadToNextcloud = async (dataUrl: string) => {
    if (!docType.includes('vollmacht')) return;
    try {
      await fetch('/api/nextcloud/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: `Vollmacht_${profile.v}_${profile.n}.png`,
          userName: `${profile.v} ${profile.n}`,
          fileData: dataUrl
        })
      });
    } catch (err) {
      console.error('Nextcloud upload failed:', err);
    }
  };

  const handleSign = () => {
    if (profile.sig) {
      setIsSigned(true);
      setSignMessage(language === 'de' ? "✅ Unterschrift eingefügt!" : "✅ Signature added!");
      uploadToNextcloud(profile.sig);
    } else {
      setSignMessage(language === 'de' ? "❌ Keine Unterschrift im Profil gefunden. Bitte im Profil hinterlegen oder ausdrucken." : "❌ No signature found in profile. Please add in profile or print.");
    }
  };

  const t = {
    nextSteps: {
      de: "Deine nächsten Schritte:",
      uk: "Ваші наступні кроки:",
      ru: "Ваши следующие шаги:",
      en: "Your next steps:"
    },
    step1: {
      de: "Dokument herunterladen oder ausdrucken.",
      uk: "Завантажити або роздрукувати документ.",
      ru: "Скачать или распечатать документ.",
      en: "Download or print the document."
    },
    step2: {
      de: "Unterschreiben (ganz wichtig!).",
      uk: "Підписати (дуже важливо!).",
      ru: "Подписать (очень важно!).",
      en: "Sign (very important!)."
    },
    step3: {
      de: "Per Post, Fax oder persönlich beim zuständigen Amt einreichen.",
      uk: "Надіслати поштою, факсом або подати особисто до відповідного відомства.",
      ru: "Отправить по почте, факсу или подать лично в соответствующее ведомство.",
      en: "Submit by mail, fax, or in person to the responsible office."
    },
    signBtn: {
      de: "✍️ Jetzt digital unterschreiben",
      uk: "✍️ Підписати цифрово зараз",
      ru: "✍️ Подписать цифровой подписью сейчас",
      en: "✍️ Sign digitally now"
    },
    printBtn: {
      de: "🖨️ Drucken",
      uk: "🖨️ Друк",
      ru: "🖨️ Печать",
      en: "🖨️ Print"
    },
    pdfBtn: {
      de: "💾 Als PDF speichern",
      uk: "💾 Зберегти як PDF",
      ru: "💾 Сохранить как PDF",
      en: "💾 Save as PDF"
    },
    explainBtn: {
      de: "✨ Dokument einfach erklären lassen",
      uk: "✨ Пояснити документ просто",
      ru: "✨ Объяснить документ просто",
      en: "✨ Explain document simply"
    }
  };

  const getT = (k: keyof typeof t) => (t[k] as any)[language] || (t[k] as any).de;

  const saveToHistory = () => {
    if (docType === 'vollmacht_preview') return;
    
    const history = JSON.parse(localStorage.getItem('app_doc_history') || '[]');
    const newItem = {
      id: Date.now().toString(),
      type: docType,
      title: subject,
      date: new Date().toISOString(),
      customContent: body
    };
    
    const isDuplicate = history.some((item: any) => 
      item.type === newItem.type && 
      item.title === newItem.title && 
      (Date.now() - new Date(item.date).getTime()) < 300000
    );

    if (!isDuplicate) {
      localStorage.setItem('app_doc_history', JSON.stringify([newItem, ...history]));
    }
  };

  React.useEffect(() => {
    saveToHistory();
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-[9999] overflow-y-auto print:static print:bg-transparent">
      <div className="max-w-[800px] mx-auto p-4 sm:p-8 print:p-0">
        <div className="flex justify-between items-center mb-4 sm:mb-8 print:hidden">
          <h2 className="text-lg sm:text-xl font-bold text-primary m-0">Dokumentenvorschau</h2>
          <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-sm sm:text-base">
            Schließen
          </button>
        </div>

        <div className="bg-white border border-gray-200 p-6 sm:p-12 shadow-sm print:border-none print:shadow-none print:p-0 text-black font-sans text-[10pt] sm:text-[11pt] leading-relaxed overflow-x-auto">
          <div className="min-w-[600px] sm:min-w-0">
            {docType !== 'vollmacht_preview' && docType !== 'custom_letter' && (
              <>
                <div className="text-center font-bold text-[12pt] sm:text-[14pt] mb-6 sm:mb-8 leading-tight">
                  {profile.v} {profile.n}<br/>
                  <span className="text-[10pt] sm:text-[11pt] font-normal inline-block mt-1">{profile.s} · {profile.o}</span><br/>
                  <span className="text-[9pt] sm:text-[10pt] font-normal text-gray-600 inline-block mt-1">
                    {profile.e ? `E-Mail: ${profile.e}` : ''} {profile.e && profile.t ? ' | ' : ''} {profile.t ? `Tel: ${profile.t}` : ''}
                  </span>
                </div>

                <div className="h-[35mm] sm:h-[45mm] w-[85mm] mb-6 overflow-hidden">
                  <div className="text-[7pt] sm:text-[8pt] mt-[4mm] sm:mt-[6mm] mb-[1mm] sm:mb-[2mm] whitespace-nowrap overflow-hidden text-ellipsis leading-none underline">
                    {profile.v} {profile.n} · {profile.s} · {profile.o}
                  </div>
                  <div className="text-[10pt] sm:text-[11pt] leading-snug" dangerouslySetInnerHTML={{ __html: recipient }} />
                </div>

                <div className="flex justify-between items-end mb-6">
                  <div className="font-bold text-[10pt] sm:text-[11pt]">{profile.a ? `Az.: ${profile.a}` : 'Az.: Neuaufnahme'}</div>
                  <div className="text-right text-[10pt] sm:text-[11pt]">Merzig, den {today}</div>
                </div>

                <div className="font-bold text-[10.5pt] sm:text-[11.5pt] mb-6">{subject}</div>
              </>
            )}

            <div className="text-justify" dangerouslySetInnerHTML={{ __html: body }} />

            {docType !== 'vollmacht_preview' && (
              <>
                <p className="mt-6 mb-2">Für eventuelle Rückfragen stehe ich Ihnen gerne zur Verfügung.</p>
                <p className="mt-0">Mit freundlichen Grüßen,</p>
                <div className="mt-6">
                  {profile.sig && isSigned ? (
                    <img src={profile.sig} alt="Unterschrift" className="max-h-[60px] sm:max-h-[70px] max-w-[200px] sm:max-w-[250px] border-b border-black pb-1 block" />
                  ) : (
                    <div className="h-[50px] sm:h-[60px] border-b border-black mb-1 w-[180px] sm:w-[200px] block" />
                  )}
                  <span className="text-[9pt] sm:text-[10pt] text-black font-bold">{profile.v} {profile.n}</span>
                </div>
              </>
            )}

            {(docType === 'begl_jc' || docType === 'eil_sozial' || docType.includes('vollmacht')) && (
              <div className={docType !== 'vollmacht_preview' ? "break-before-page pt-[10mm] sm:pt-[15mm]" : ""}>
                {docType === 'vollmacht_preview' && (
                  <div className="bg-[#f39c12] text-white text-center p-3 font-bold mb-[8mm] sm:mb-[10mm] rounded text-sm">
                    {profile.sig ? "Dies ist die Vorschau deiner Vollmacht (mit Unterschrift)." : "Dies ist eine ununterschriebene Vorschau. Bitte unterschreibe im Profil."}
                  </div>
                )}
                
                <div className="text-[14pt] sm:text-[16pt] font-bold text-center mb-[10mm] sm:mb-[12mm] underline tracking-wide">VOLLMACHT</div>
                
                <p>Hiermit bevollmächtige ich,</p>
                
                <table className="w-full mb-[6mm] sm:mb-[8mm] ml-[2mm] sm:ml-[5mm] text-[10pt] sm:text-[11pt]">
                  <tbody>
                    <tr><td className="w-[100px] sm:w-[120px] font-bold">Name, Vorname:</td><td>{profile.n || '_______________'}, {profile.v || '_______________'}</td></tr>
                    <tr><td className="font-bold">Geburtsdatum:</td><td>{profile.d ? new Date(profile.d).toLocaleDateString('de-DE') : '_______________'}</td></tr>
                    <tr><td className="font-bold align-top">Anschrift:</td><td>{profile.s || '_______________'}<br/>{profile.o || '_______________'}</td></tr>
                    <tr><td className="font-bold">E-Mail:</td><td>{profile.e || '_______________'}</td></tr>
                    <tr><td className="font-bold">Telefon:</td><td>{profile.t || '-'}</td></tr>
                  </tbody>
                </table>

                <p className="text-justify mb-[4mm] sm:mb-[5mm]">
                  <b>Herrn Gerd Schreiner</b> (geb. 10.01.1962) und <b>Frau Sigrid Schreiner</b> (geb. 15.01.1962), Zum Franzenkreuz 1 (Betreuer-Team / Flüchtlingshilfe),<br/><br/>
                  mich in allen Angelegenheiten gegenüber dem Jobcenter, dem Sozialamt, der Ausländerbehörde, den Meldebehörden und sonstigen öffentlichen oder privaten Stellen als Beistand und Vertretung (gem. § 13 SGB X bzw. § 14 VwVfG) vollumfänglich zu vertreten, zu unterstützen und <b>alle erforderlichen Auskünfte einzuholen</b>.
                </p>
                <p className="text-justify mb-[4mm] sm:mb-[5mm]">
                  Diese Vollmacht umfasst insbesondere die Begleitung zu persönlichen Vorsprachen, die vollumfängliche Unterstützung bei der Antragsstellung, das Einholen von Auskünften zum Bearbeitungsstand sowie die Entgegennahme von entscheidungsrelevanten Informationen und Schriftstücken in meinem Namen. 
                </p>
                <p className="text-justify mb-[15mm] sm:mb-[20mm]">
                  Die Vollmacht gilt bis auf schriftlichen Widerruf meinerseits.
                </p>

                <div className="flex justify-between items-end">
                  <div>
                    {profile.o ? profile.o.split(' ').slice(1).join(' ') : 'Ort'}, den {today}<br/>
                    <span className="text-[7pt] sm:text-[8pt] text-gray-600">Ort, Datum</span>
                  </div>
                  <div className="text-center">
                    {profile.sig && isSigned ? (
                      <img src={profile.sig} alt="Unterschrift" className="max-h-[60px] sm:max-h-[80px] max-w-[200px] sm:max-w-[250px] border-b border-black pb-1 block mx-auto" />
                    ) : (
                      <div className="h-[50px] sm:h-[60px] border-b border-black mb-1 w-[180px] sm:w-[200px] inline-block" />
                    )}<br/>
                    <span className="text-[7pt] sm:text-[8pt] text-gray-600">Unterschrift Vollmachtgeber/in</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-[#fdf7e7] border-2 border-[#f39c12] p-5 rounded-xl mt-8 print:hidden">
          <h3 className="text-lg font-bold text-[#d35400] mb-3">{getT('nextSteps')}</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-[#7f8c8d] font-medium">
              <span className="text-xl">📥</span> {getT('step1')}
            </li>
            <li className="flex items-center gap-2 text-[#7f8c8d] font-medium">
              <span className="text-xl">✍️</span> {getT('step2')}
            </li>
            <li className="flex items-start gap-2 text-[#7f8c8d] font-medium">
              <span className="text-xl mt-0.5">✉️</span> 
              <span>{getT('step3')}</span>
            </li>
          </ul>

          {!docType.includes('vollmacht') && docType !== 'custom_letter_with_header' && !isSigned && (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button onClick={handlePrint} className="bg-primary text-white p-3.5 rounded-lg font-bold text-[15px] shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              {getT('printBtn')}
            </button>
            <button onClick={handlePdf} className="bg-[#34495e] text-white p-3.5 rounded-lg font-bold text-[15px] shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              {getT('pdfBtn')}
            </button>
          </div>
          <button className="w-full mt-3 bg-[#8e44ad] text-white p-3.5 rounded-lg font-bold text-[15px] shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            {getT('explainBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
