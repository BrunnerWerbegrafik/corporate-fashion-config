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
      <section className="max-w-2xl mx-auto px-6 pt-16 md:pt-24 pb-20 text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-brunner-cyan/15 inline-flex items-center justify-center text-brunner-cyan">
          <CheckIcon size={44} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-brunner-dark tracking-tight mb-4">
          Alles klar.
        </h1>
        <p className="text-lg md:text-xl text-brunner-dark/70 mb-10">
          Wir melden uns innerhalb von <em className="text-brunner-cyan">24 Stunden</em> mit dem Angebot.
        </p>

        <div className="bg-brunner-light rounded-sm p-6 md:p-8 mb-8">
          <p className="caps-label text-brunner-dark/50 mb-2">Deine Anfragenummer</p>
          <p className="text-2xl md:text-3xl font-bold text-brunner-dark tracking-wide">
            {requestNumber}
          </p>
          <p className="text-sm text-brunner-dark/60 mt-3">
            Bei Rückfragen bitte diese Nummer angeben.
          </p>
        </div>

        <p className="text-sm text-brunner-dark/70 mb-10 leading-relaxed">
          Eine Bestätigung ist auf dem Weg zu deiner E-Mail-Adresse. Falls du keine E-Mail erhältst, prüfe deinen Spam-Ordner.
        </p>

        {warning && (
          <div className="mb-10 mx-auto max-w-md p-4 rounded-sm border border-amber-300 bg-amber-50 text-sm text-amber-900 text-left">
            <strong className="block mb-1">Hinweis (Entwicklungsmodus):</strong>
            {warning}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <Link to="/">
            <Button variant="primary" size="md">
              Zurück zur Startseite
            </Button>
          </Link>
          <a
            href="https://www.brunner-werbegrafik.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brunner-cyan hover:text-brunner-cyanDark text-sm font-semibold"
          >
            brunner-werbegrafik.de besuchen →
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}
