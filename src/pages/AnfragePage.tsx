import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { AnfrageForm, type AnfrageFormValues } from "../components/forms/AnfrageForm";
import { useCart } from "../contexts/CartContext";
import { useLogoFile } from "../contexts/LogoFileContext";
import { submissionService } from "../services/submissionService";

export function AnfragePage() {
  const { entries, clear } = useCart();
  const { logoFile, setLogoFile } = useLogoFile();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  async function handleSubmit(values: AnfrageFormValues) {
    const result = await submissionService.submit({
      firstName: values.firstName,
      lastName: values.lastName,
      company: values.company,
      email: values.email,
      phone: values.phone,
      note: values.note || undefined,
      dataPrivacyAccepted: values.dataPrivacyAccepted,
      cartEntries: entries,
      logoFile,
    });
    clear();
    setLogoFile(null);
    navigate(`/anfrage/erfolg?nr=${encodeURIComponent(result.requestNumber)}`, {
      replace: true,
      state: { warning: result.warning },
    });
  }

  return (
    <PageWrapper theme="dark">
      <header className="px-6 md:px-12 lg:px-[72px] pt-12 md:pt-16 pb-8 relative">
        <div className="cyan-glow" aria-hidden="true" />
        <div className="caps-eyebrow text-dk-muted mb-5 inline-flex items-center gap-2.5 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          Letzter Schritt
        </div>
        <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-medium leading-[1.0] tracking-tightest text-white m-0 relative z-10">
          Deine <em className="text-cyan">Daten</em>
        </h1>
        <p className="text-base md:text-lg text-dk-muted mt-4 max-w-xl relative z-10">
          Damit wir dir das Angebot zuschicken können, brauchen wir kurz deine Kontaktdaten. Es dauert nur einen Moment.
        </p>
      </header>

      <section className="px-6 md:px-12 lg:px-[72px] pb-24 relative z-10">
        <div className="max-w-3xl">
          <AnfrageForm entries={entries} logoFile={logoFile} onSubmit={handleSubmit} />
        </div>
      </section>
    </PageWrapper>
  );
}
