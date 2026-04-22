import { useState } from "react";
import type { PositionTab } from "../../types/models";
import { positionService } from "../../services/positionService";
import { Silhouette } from "../ui/Silhouette";
import { CloseIcon } from "../ui/Icon";

interface Step3Props {
  selectedPositionIds: string[];
  positionNote: string;
  onTogglePosition: (id: string) => void;
  onChangeNote: (note: string) => void;
}

const tabs: { id: PositionTab; label: string }[] = [
  { id: "vorne", label: "Vorne" },
  { id: "hinten", label: "Hinten" },
  { id: "aermel", label: "Ärmel" },
];

const positionCoords: Record<string, { x: number; y: number }> = {
  "vorne-brust-links": { x: 42, y: 56 },
  "vorne-brust-rechts": { x: 78, y: 56 },
  "vorne-mittig-gross": { x: 60, y: 80 },
  "hinten-mittig-gross": { x: 60, y: 80 },
  "hinten-nur-oben-klein": { x: 60, y: 36 },
  "aermel-links": { x: 60, y: 70 },
  "aermel-rechts": { x: 60, y: 70 },
};

export function Step3Position({
  selectedPositionIds,
  positionNote,
  onTogglePosition,
  onChangeNote,
}: Step3Props) {
  const [activeTab, setActiveTab] = useState<PositionTab>("vorne");
  const positions = positionService.getByTab(activeTab);
  const allPositions = positionService.getAll();

  function countForTab(tab: PositionTab) {
    return allPositions.filter((p) => p.tab === tab && selectedPositionIds.includes(p.id)).length;
  }

  return (
    <div>
      <div className="flex border-b border-dk-line mb-6">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          const count = countForTab(t.id);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 px-4 py-3 text-left transition-colors border-b-2 ${
                isActive ? "border-cyan text-white" : "border-transparent text-dk-muted hover:text-white"
              }`}
            >
              <span className="block font-medium">{t.label}</span>
              <span className="block text-xs text-dk-muted2 mt-0.5">
                {count > 0 ? `${count} ausgewählt` : "keine"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {positions.map((p) => {
          const isSelected = selectedPositionIds.includes(p.id);
          const coords = positionCoords[p.id];
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onTogglePosition(p.id)}
              className={`text-left p-4 rounded-m border-2 transition-all ${
                isSelected
                  ? "border-cyan bg-cyan-soft"
                  : "border-dk-line2 bg-white/[0.03] hover:border-white/30"
              }`}
            >
              <div className="aspect-square mb-3 flex items-center justify-center text-white/30">
                <Silhouette
                  view={activeTab}
                  highlight={coords ? { x: coords.x, y: coords.y, size: p.logoIndicator } : null}
                  className="w-full h-full"
                />
              </div>
              <p className="font-medium text-white">{p.name}</p>
              <p className="text-sm text-dk-muted mt-1">{p.shortDescription}</p>
            </button>
          );
        })}
      </div>

      {selectedPositionIds.length > 0 && (
        <div className="mb-6">
          <p className="caps-label text-dk-muted2 mb-2">Ausgewählte Positionen</p>
          <div className="flex flex-wrap gap-2">
            {selectedPositionIds.map((id) => {
              const p = positionService.getById(id);
              if (!p) return null;
              const tabLabel = tabs.find((t) => t.id === p.tab)?.label;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-2 pl-3 pr-1 py-1 bg-cyan-soft border border-cyan/40 rounded-full text-sm text-white"
                >
                  {tabLabel} · {p.name}
                  <button
                    type="button"
                    onClick={() => onTogglePosition(id)}
                    aria-label={`${p.name} entfernen`}
                    className="w-6 h-6 rounded-full hover:bg-white/10 inline-flex items-center justify-center"
                  >
                    <CloseIcon size={14} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      <p className="italic text-dk-muted text-sm mb-4">
        <em>Du kannst Positionen aus allen Bereichen gleichzeitig wählen.</em>
      </p>

      <div>
        <label htmlFor="position-note" className="caps-label text-dk-muted2 block mb-2">
          Notiz (optional)
        </label>
        <textarea
          id="position-note"
          rows={3}
          placeholder={'z.B. „Logo ca. 8cm breit auf Herzhöhe"'}
          value={positionNote}
          onChange={(e) => onChangeNote(e.target.value)}
          className="w-full bg-white/[0.03] border border-dk-line2 rounded-m px-4 py-3 text-white placeholder-dk-muted2/70 focus:border-cyan focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}
