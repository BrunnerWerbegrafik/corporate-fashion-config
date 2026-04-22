import type { ReactNode } from "react";
import { PageWrapper } from "../components/layout/PageWrapper";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <PageWrapper theme="light">
      <section className="max-w-3xl px-6 md:px-12 lg:px-[72px] pt-12 md:pt-16 pb-20">
        <h1 className="text-[44px] md:text-[64px] font-medium text-ink tracking-tightest leading-[1.0] m-0 mb-10">
          {title}
        </h1>
        <div className="space-y-5 text-ink-2 leading-relaxed">{children}</div>
      </section>
    </PageWrapper>
  );
}

export function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <p className="italic text-muted">
        <em>Platzhalter – finaler Text wird vom Auftraggeber geliefert.</em>
      </p>
      <h2 className="text-xl font-medium text-ink mt-8">Angaben gemäß § 5 TMG</h2>
      <p>
        Brunner Werbegrafik OHG<br />
        Lagerhausstraße 8<br />
        83109 Großkarolinenfeld
      </p>
      <h2 className="text-xl font-medium text-ink mt-8">Kontakt</h2>
      <p>
        Telefon: +49 000 0000000<br />
        E-Mail: <a href="mailto:info@brunner-werbegrafik.de" className="text-cyan hover:underline">info@brunner-werbegrafik.de</a>
      </p>
      <h2 className="text-xl font-medium text-ink mt-8">Vertretungsberechtigte Geschäftsführer</h2>
      <p>Martin Brunner</p>
    </LegalLayout>
  );
}

export function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutz">
      <p className="italic text-muted">
        <em>Platzhalter – finaler Text wird vom Auftraggeber geliefert.</em>
      </p>
      <p>
        Wir freuen uns über dein Interesse an unserem Konfigurator. Der Schutz deiner persönlichen Daten ist uns wichtig.
      </p>
      <h2 className="text-xl font-medium text-ink mt-8">1. Verantwortlicher</h2>
      <p>Brunner Werbegrafik OHG, Lagerhausstraße 8, 83109 Großkarolinenfeld.</p>
      <h2 className="text-xl font-medium text-ink mt-8">2. Kontaktanfragen</h2>
      <p>
        Wenn du uns über das Anfrageformular kontaktierst, werden die von dir angegebenen Daten zur Bearbeitung der Anfrage gespeichert. Eine Weitergabe an Dritte findet nicht statt.
      </p>
      <h2 className="text-xl font-medium text-ink mt-8">3. Speicherdauer</h2>
      <p>
        Wir löschen deine Daten, sobald sie für die Bearbeitung deiner Anfrage nicht mehr benötigt werden, spätestens nach Ablauf gesetzlicher Aufbewahrungsfristen.
      </p>
    </LegalLayout>
  );
}

export function AgbPage() {
  return (
    <LegalLayout title="AGB">
      <p className="italic text-muted">
        <em>Platzhalter – finaler Text wird vom Auftraggeber geliefert.</em>
      </p>
      <h2 className="text-xl font-medium text-ink mt-8">1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäfte zwischen der Brunner Werbegrafik OHG und ihren Kunden im Bereich Corporate Fashion.
      </p>
      <h2 className="text-xl font-medium text-ink mt-8">2. Anfrage und Angebot</h2>
      <p>
        Über den Konfigurator stellst du eine unverbindliche Anfrage. Innerhalb von 24 Stunden erhältst du ein individuelles Angebot per E-Mail.
      </p>
      <h2 className="text-xl font-medium text-ink mt-8">3. Vertragsschluss</h2>
      <p>
        Ein Vertrag kommt erst durch ausdrückliche Annahme unseres Angebots durch dich zustande.
      </p>
    </LegalLayout>
  );
}
