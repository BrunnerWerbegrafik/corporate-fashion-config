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
        <h3 className="font-semibold">Logo hochladen</h3>
        <span className="px-2 py-0.5 text-[10px] caps-label bg-brunner-cyan text-white rounded-sm">
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
          className={`block cursor-pointer rounded-sm border-2 border-dashed p-6 text-center transition-colors ${
            drag ? "border-brunner-cyan bg-brunner-cyan/10" : "border-white/20 hover:border-white/40 bg-white/5"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            onChange={(e) => validateAndSet(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
          <UploadIcon size={32} className="mx-auto text-white/60 mb-3" />
          <p className="text-sm text-white/80 mb-2">
            Lade dein Logo hoch – wir erstellen dir damit eine Visualisierung deiner konfigurierten Textilien.
          </p>
          <p className="text-xs text-white/50">SVG, PDF, AI, EPS, PNG, JPG · Vektor bevorzugt · max. 20 MB</p>
        </label>
      ) : (
        <div className="flex items-center gap-3 p-3 rounded-sm bg-brunner-cyan/15 border border-brunner-cyan/40">
          <CheckIcon size={18} className="text-brunner-cyan flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{file.name}</p>
            <p className="text-xs text-white/60">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={() => validateAndSet(null)}
            aria-label="Datei entfernen"
            className="p-1 rounded-sm hover:bg-white/10"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-300 mt-2">{error}</p>}
    </div>
  );
}
