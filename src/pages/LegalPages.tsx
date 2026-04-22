import type { ReactNode } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <PageWrapper theme="light">
      <section className="max-w-3xl mx-auto px-6 pt-12 md:pt-16 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-brunner-dark tracking-tight mb-8">
          {title}
        </h1>
        <div className="prose-content space-y-5 text-brunner-dark/80 leading-relaxed">
          {children}
        </div>
      </section>
    </PageWrapper>
  );
}

export function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <p className="italic text-brunner-dark/60">
        <em>Platzhalter – finaler Text wird vom Auftraggeber geliefert.</em>
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">Angaben gemäß § 5 TMG</h2>
      <p>
        Brunner Werbegrafik OHG<br />
        Beispielstraße 12<br />
        12345 Musterstadt
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">Kontakt</h2>
      <p>
        Telefon: +49 000 0000000<br />
        E-Mail: <a href="mailto:info@brunner-werbegrafik.de" className="text-brunner-cyan hover:underline">info@brunner-werbegrafik.de</a>
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">Vertretungsberechtigte Geschäftsführer</h2>
      <p>Martin Brunner</p>
    </LegalLayout>
  );
}

export function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <p className="italic text-brunner-dark/60">
        <em>Platzhalter – finaler Text wird vom Auftraggeber geliefert.</em>
      </p>
      <p>
        Wir freuen uns über dein Interesse an unserem Konfigurator. Der Schutz deiner persönlichen Daten ist uns wichtig. Im Folgenden informieren wir dich darüber, wie wir mit deinen Daten umgehen.
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">1. Verantwortlicher</h2>
      <p>
        Brunner Werbegrafik OHG, Beispielstraße 12, 12345 Musterstadt.
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">2. Kontaktanfragen</h2>
      <p>
        Wenn du uns über das Anfrageformular kontaktierst, werden die von dir angegebenen Daten zur Bearbeitung der Anfrage gespeichert. Eine Weitergabe an Dritte findet nicht statt.
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">3. Speicherdauer</h2>
      <p>
        Wir löschen deine Daten, sobald sie für die Bearbeitung deiner Anfrage nicht mehr benötigt werden, spätestens nach Ablauf gesetzlicher Aufbewahrungsfristen.
      </p>
    </LegalLayout>
  );
}

export function AgbPage() {
  return (
    <LegalLayout title="AGB">
      <p className="italic text-brunner-dark/60">
        <em>Platzhalter – finaler Text wird vom Auftraggeber geliefert.</em>
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäfte zwischen der Brunner Werbegrafik OHG und ihren Kunden im Bereich Corporate Fashion.
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">2. Anfrage und Angebot</h2>
      <p>
        Über den Konfigurator stellst du eine unverbindliche Anfrage. Innerhalb von 24 Stunden erhältst du ein individuelles Angebot per E-Mail.
      </p>
      <h2 className="text-xl font-bold text-brunner-dark mt-8">3. Vertragsschluss</h2>
      <p>
        Ein Vertrag kommt erst durch ausdrückliche Annahme unseres Angebots durch dich zustande.
      </p>
    </LegalLayout>
  );
}
