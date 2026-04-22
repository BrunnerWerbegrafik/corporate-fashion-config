import { useState } from "react";
import type { CartEntry } from "../../types/models";
import { Button } from "../ui/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../ui/Icon";
import { Link } from "react-router-dom";

export interface AnfrageFormValues {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  note: string;
  dataPrivacyAccepted: boolean;
}

interface AnfrageFormProps {
  entries: CartEntry[];
  logoFile: File | null;
  onSubmit: (values: AnfrageFormValues) => Promise<void>;
}

const initial: AnfrageFormValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  note: "",
  dataPrivacyAccepted: false,
};

const inputClass =
  "w-full bg-white/[0.03] border border-dk-line2 rounded-m px-4 py-3 text-white placeholder-dk-muted2/70 focus:border-cyan focus:outline-none transition-colors";

export function AnfrageForm({ entries, logoFile, onSubmit }: AnfrageFormProps) {
  const [values, setValues] = useState<AnfrageFormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof AnfrageFormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(v: AnfrageFormValues) {
    const e: Partial<Record<keyof AnfrageFormValues, string>> = {};
    if (!v.firstName.trim()) e.firstName = "Bitte Vornamen angeben.";
    if (!v.lastName.trim()) e.lastName = "Bitte Nachnamen angeben.";
    if (!v.company.trim()) e.company = "Bitte Firma angeben.";
    if (!v.email.trim()) e.email = "Bitte E-Mail angeben.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = "Ungültige E-Mail-Adresse.";
    if (!v.phone.trim()) e.phone = "Bitte Telefonnummer angeben.";
    else if (v.phone.replace(/\D/g, "").length < 5) e.phone = "Telefonnummer wirkt zu kurz.";
    if (!v.dataPrivacyAccepted) e.dataPrivacyAccepted = "Bitte Datenschutzerklärung bestätigen.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Beim Absenden ist ein Fehler aufgetreten. Versuche es bitte erneut."
      );
      setSubmitting(false);
    }
  }

  function update<K extends keyof AnfrageFormValues>(key: K, val: AnfrageFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const noEntries = entries.length === 0;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="caps-label text-dk-muted2 block mb-2" htmlFor="firstName">
            Vorname *
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && <p className="text-xs text-red-300 mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="caps-label text-dk-muted2 block mb-2" htmlFor="lastName">
            Nachname *
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            value={values.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && <p className="text-xs text-red-300 mt-1">{errors.lastName}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="caps-label text-dk-muted2 block mb-2" htmlFor="company">
            Firma *
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.company}
          />
          {errors.company && <p className="text-xs text-red-300 mt-1">{errors.company}</p>}
        </div>
        <div>
          <label className="caps-label text-dk-muted2 block mb-2" htmlFor="email">
            E-Mail *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-red-300 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="caps-label text-dk-muted2 block mb-2" htmlFor="phone">
            Telefon *
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-xs text-red-300 mt-1">{errors.phone}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="caps-label text-dk-muted2 block mb-2" htmlFor="note">
            Notiz (optional)
          </label>
          <textarea
            id="note"
            rows={4}
            value={values.note}
            placeholder="Hintergrund, Wunschtermin, Zusatzinfos …"
            onChange={(e) => update("note", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.dataPrivacyAccepted}
            onChange={(e) => update("dataPrivacyAccepted", e.target.checked)}
            className="mt-1 w-4 h-4 accent-cyan"
          />
          <span className="text-sm text-white/85">
            Ich habe die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">Datenschutzerklärung</a> gelesen und willige in die Verarbeitung meiner Daten ein. *
          </span>
        </label>
        {errors.dataPrivacyAccepted && (
          <p className="text-xs text-red-300 mt-1 ml-7">{errors.dataPrivacyAccepted}</p>
        )}
        <p className="text-xs text-dk-muted2 mt-2 ml-7 italic">
          <em>Deine Daten werden ausschließlich zur Beantwortung deiner Anfrage verwendet.</em>
        </p>
      </div>

      <div className="mt-4 text-xs text-dk-muted2">
        Logo-Datei: {logoFile ? <strong className="text-white/85">{logoFile.name}</strong> : "Keine hochgeladen"}
        <span className="mx-2 text-dk-muted2/50">·</span>
        Artikel im Korb: <strong className="text-white/85">{entries.length}</strong>
      </div>

      {submitError && (
        <div className="mt-4 p-3 rounded-m bg-red-500/15 border border-red-400/40 text-sm text-red-200">
          {submitError}
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse md:flex-row gap-3 md:items-center md:justify-between">
        <Link to="/anfragekorb">
          <Button variant="outline-dark" size="md" type="button">
            <ArrowLeftIcon size={16} /> Zurück zum Korb
          </Button>
        </Link>
        <div className="flex flex-col items-stretch md:items-end">
          <Button variant="primary" size="lg" type="submit" disabled={submitting || noEntries}>
            {submitting ? "Wird gesendet …" : "Anfrage absenden"} <ArrowRightIcon size={18} />
          </Button>
          <span className="text-xs text-dk-muted2 mt-2 md:text-right">
            Du erhältst eine Bestätigung per E-Mail.
          </span>
        </div>
      </div>
    </form>
  );
}
