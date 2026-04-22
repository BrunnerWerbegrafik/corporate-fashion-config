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
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Position wählen</h2>
        <p className="text-white/70">Wo soll dein Logo platziert werden? Mehrfachauswahl möglich – auch über Bereiche hinweg.</p>
      </div>

      <div className="flex border-b border-white/10 mb-6">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          const count = countForTab(t.id);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 px-4 py-3 text-left transition-colors border-b-2 ${
                isActive ? "border-brunner-cyan text-white" : "border-transparent text-white/60 hover:text-white"
              }`}
            >
              <span className="block font-semibold">{t.label}</span>
              <span className="block text-xs text-white/50">
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
              className={`text-left p-4 rounded-sm border-2 transition-all ${
                isSelected
                  ? "border-brunner-cyan bg-brunner-cyan/10"
                  : "border-white/15 bg-white/5 hover:border-white/40"
              }`}
            >
              <div className="aspect-square mb-3 flex items-center justify-center text-white/30">
                <Silhouette
                  view={activeTab}
                  highlight={coords ? { x: coords.x, y: coords.y, size: p.logoIndicator } : null}
                  className="w-full h-full"
                />
              </div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-white/60 mt-1">{p.shortDescription}</p>
            </button>
          );
        })}
      </div>

      {selectedPositionIds.length > 0 && (
        <div className="mb-6">
          <p className="caps-label text-white/50 mb-2">Ausgewählte Positionen</p>
          <div className="flex flex-wrap gap-2">
            {selectedPositionIds.map((id) => {
              const p = positionService.getById(id);
              if (!p) return null;
              const tabLabel = tabs.find((t) => t.id === p.tab)?.label;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-2 pl-3 pr-1 py-1 bg-brunner-cyan/15 border border-brunner-cyan/40 rounded-full text-sm"
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

      <p className="italic text-white/60 text-sm mb-4">
        <em>Du kannst Positionen aus allen Bereichen gleichzeitig wählen.</em>
      </p>

      <div>
        <label htmlFor="position-note" className="caps-label text-white/50 block mb-2">
          Notiz (optional)
        </label>
        <textarea
          id="position-note"
          rows={3}
          placeholder="z.B. 'Logo ca. 8cm breit auf Herzhöhe'"
          value={positionNote}
          onChange={(e) => onChangeNote(e.target.value)}
          className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:border-brunner-cyan focus:outline-none"
        />
      </div>
    </div>
  );
}
