import { useRef, useState } from "react";
import { UploadIcon, CheckIcon, CloseIcon } from "../ui/Icon";

interface LogoUploaderProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const ACCEPTED = ".svg,.pdf,.ai,.eps,.png,.jpg,.jpeg";
const MAX_BYTES = 20 * 1024 * 1024;

export function LogoUploader({ file, onChange }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validateAndSet(f: File | null) {
    setError(null);
    if (!f) {
      onChange(null);
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("Datei ist zu groß. Maximal 20 MB erlaubt.");
      return;
    }
    onChange(f);
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-medium text-white">Logo hochladen</h3>
        <span className="px-2 py-0.5 text-[10px] caps-label bg-cyan text-white rounded-s">
          Empfohlen
        </span>
      </div>

      {!file ? (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) validateAndSet(f);
          }}
          className={`block cursor-pointer rounded-m border-2 border-dashed p-6 text-center transition-colors ${
            drag ? "border-cyan bg-cyan-soft" : "border-dk-line2 hover:border-white/30 bg-white/[0.03]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            onChange={(e) => validateAndSet(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
          <UploadIcon size={32} className="mx-auto text-dk-muted mb-3" />
          <p className="text-sm text-white/85 mb-2 leading-relaxed">
            Lade dein Logo hoch – wir erstellen damit eine Visualisierung deiner konfigurierten Textilien.
          </p>
          <p className="text-xs text-dk-muted2">
            SVG, PDF, AI, EPS, PNG, JPG · <em className="italic">Vektor bevorzugt</em> · max. 20 MB
          </p>
        </label>
      ) : (
        <div className="flex items-center gap-3 p-3 rounded-m bg-cyan-soft border border-cyan/40">
          <CheckIcon size={18} className="text-cyan flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{file.name}</p>
            <p className="text-xs text-dk-muted">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={() => validateAndSet(null)}
            aria-label="Datei entfernen"
            className="p-1 rounded-s hover:bg-white/10 text-white"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-300 mt-2">{error}</p>}
    </div>
  );
}
