import type { PositionOption } from "../types/models";

export const mockPositions: PositionOption[] = [
  {
    id: "vorne-brust-links",
    tab: "vorne",
    name: "Brust links",
    shortDescription: "Kleines Logo auf Herzhöhe – der Klassiker.",
    logoIndicator: "small",
  },
  {
    id: "vorne-brust-rechts",
    tab: "vorne",
    name: "Brust rechts",
    shortDescription: "Kleines Logo rechts auf Brusthöhe.",
    logoIndicator: "small",
  },
  {
    id: "vorne-mittig-gross",
    tab: "vorne",
    name: "Mittig groß",
    shortDescription: "Großes Motiv mittig auf der Front.",
    logoIndicator: "large",
  },
  {
    id: "hinten-mittig-gross",
    tab: "hinten",
    name: "Mittig groß",
    shortDescription: "Großes Motiv mittig auf dem Rücken.",
    logoIndicator: "large",
  },
  {
    id: "hinten-nur-oben-klein",
    tab: "hinten",
    name: "Nur oben klein",
    shortDescription: "Kleines Logo am oberen Rücken (Nackenbereich).",
    logoIndicator: "small",
  },
  {
    id: "aermel-links",
    tab: "aermel",
    name: "Ärmel links",
    shortDescription: "Kleines Logo am linken Ärmel.",
    logoIndicator: "small",
  },
  {
    id: "aermel-rechts",
    tab: "aermel",
    name: "Ärmel rechts",
    shortDescription: "Kleines Logo am rechten Ärmel.",
    logoIndicator: "small",
  },
];
