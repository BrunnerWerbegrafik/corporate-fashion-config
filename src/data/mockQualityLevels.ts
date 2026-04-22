import type { QualityLevel } from "../types/models";

export const mockQualityLevels: QualityLevel[] = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Büro, Events, Alltag",
    manufacturer: "Stanley/Stella",
    targetGroup: "Büro, Events, Alltag",
    accentColorHex: "#009FE3",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Führungskräfte, Außendienst, Repräsentation",
    manufacturer: "Nimbus",
    targetGroup: "Führungskräfte, Außendienst, Repräsentation",
    accentColorHex: "#0A1A2F",
  },
  {
    id: "performance",
    name: "Performance",
    tagline: "Handwerk, Werkstatt, Produktion",
    manufacturer: "HAKRO",
    targetGroup: "Handwerk, Werkstatt, Produktion",
    accentColorHex: "#FF6A00",
  },
  {
    id: "active",
    name: "Active",
    tagline: "Sport, Events, Teambuilding",
    manufacturer: "Sportmarken",
    targetGroup: "Sport, Events, Teambuilding",
    accentColorHex: "#9333EA",
  },
];
