import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ArrowRightIcon } from "../ui/Icon";
import { LogoUploader } from "./LogoUploader";
import { useCart } from "../../contexts/CartContext";

interface CartSidebarProps {
  logoFile: File | null;
  onLogoChange: (f: File | null) => void;
}

export function CartSidebar({ logoFile, onLogoChange }: CartSidebarProps) {
  const { entries, totalQuantity, totalItems } = useCart();
  const druckCount = entries.filter((e) => e.finishingType === "druck").length;
  const stickCount = entries.filter((e) => e.finishingType === "stick").length;

  return (
    <aside className="bg-white/5 border border-white/10 rounded-sm p-6 md:p-7 flex flex-col gap-6 sticky top-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Zusammenfassung</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-white/60">Artikel</dt>
            <dd className="font-semibold">{totalItems}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/60">Gesamtmenge</dt>
            <dd className="font-semibold">{totalQuantity} Stück</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/60">Veredelungen</dt>
            <dd className="font-semibold">
              {druckCount > 0 && `${druckCount}× Druck`}
              {druckCount > 0 && stickCount > 0 && ", "}
              {stickCount > 0 && `${stickCount}× Stick`}
              {druckCount === 0 && stickCount === 0 && "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-white/10 pt-6">
        <LogoUploader file={logoFile} onChange={onLogoChange} />
      </div>

      <div className="border-t border-white/10 pt-6">
        <p className="text-sm text-white/70 leading-relaxed mb-5">
          Du erhältst innerhalb von 24 Stunden ein <em>individuelles Angebot</em> per E-Mail – inkl. Veredelungs-Vorschau und finalem Preis.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/anfrage">
            <Button variant="primary" size="lg" className="w-full" disabled={entries.length === 0}>
              Anfrage absenden <ArrowRightIcon size={18} />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline-dark" size="md" className="w-full">
              Weiter einkaufen
            </Button>
          </Link>
        </div>
      </div>

      <p className="text-xs text-white/40 italic border-t border-white/10 pt-4">
        Dein Anfragekorb wird automatisch gespeichert – du kannst später zurückkehren.
      </p>
    </aside>
  );
}
