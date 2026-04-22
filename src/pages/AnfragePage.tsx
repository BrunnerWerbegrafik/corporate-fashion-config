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
      <section className="max-w-3xl mx-auto px-6 pt-12 md:pt-16 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Deine <em className="text-brunner-cyan">Daten</em>
        </h1>
        <p className="text-white/70 mt-3 mb-10 max-w-xl">
          Damit wir dir das Angebot zuschicken können, brauchen wir kurz deine Kontaktdaten. Es dauert nur einen Moment.
        </p>

        <AnfrageForm entries={entries} logoFile={logoFile} onSubmit={handleSubmit} />
      </section>
    </PageWrapper>
  );
}
