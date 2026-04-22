import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { Button } from "../components/ui/Button";
import { CheckIcon } from "../components/ui/Icon";

export function AnfrageErfolgPage() {
  const [params] = useSearchParams();
  const requestNumber = params.get("nr") ?? "BRU-XXXX-XX-XXXX";
  const location = useLocation();
  const warning = (location.state as { warning?: string } | null)?.warning;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <PageWrapper theme="light">
      <section className="max-w-2xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-cyan-soft inline-flex items-center justify-center text-cyan">
          <CheckIcon size={44} />
        </div>

        <div className="caps-eyebrow text-muted mb-5 inline-flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          Anfrage eingegangen
        </div>
        <h1 className="text-[56px] md:text-[76px] lg:text-[92px] font-medium text-ink tracking-tightest leading-[0.98] m-0 mb-4">
          Alles <em className="text-cyan">klar.</em>
        </h1>
        <p className="text-lg md:text-xl text-muted mb-10">
          Wir melden uns innerhalb von <em className="text-cyan">24 Stunden</em> mit dem Angebot.
        </p>

        <div className="bg-well rounded-m p-6 md:p-8 mb-8">
          <p className="caps-label text-muted-2 mb-2">Deine Anfragenummer</p>
          <p className="text-2xl md:text-3xl font-medium text-ink tracking-wide tabular-nums">
            {requestNumber}
          </p>
          <p className="text-sm text-muted mt-3">Bei Rückfragen bitte diese Nummer angeben.</p>
        </div>

        <p className="text-sm text-muted mb-10 leading-relaxed">
          Eine Bestätigung ist auf dem Weg zu deiner E-Mail-Adresse. Falls du keine E-Mail erhältst, prüfe deinen Spam-Ordner.
        </p>

        {warning && (
          <div className="mb-10 mx-auto max-w-md p-4 rounded-m border border-amber-300 bg-amber-50 text-sm text-amber-900 text-left">
            <strong className="block mb-1">Hinweis (Entwicklungsmodus):</strong>
            {warning}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <Link to="/">
            <Button variant="primary-light" size="md">
              Zurück zur Startseite
            </Button>
          </Link>
          <a
            href="https://www.brunner-werbegrafik.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-[#0086C0] text-sm font-medium"
          >
            brunner-werbegrafik.de besuchen →
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}
