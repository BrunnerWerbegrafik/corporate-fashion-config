import type { FinishingInfo } from "../types/models";

export const mockFinishings: FinishingInfo[] = [
  {
    id: "siebdruck",
    parent: "druck",
    name: "Siebdruck",
    description: "Der Klassiker für einfarbige bis mehrfarbige Logos und große Flächen. Sehr brillant, sehr langlebig.",
    useHint: "Ab 20 Stück ideal.",
    exampleImage: "/images/veredelungen/veredelung-siebdruck-beispiel.jpg",
  },
  {
    id: "dtf",
    parent: "druck",
    name: "DTF (Direct-to-Film)",
    description: "Foto-realistische Drucke und kleine Auflagen mit komplexen Farbverläufen. Sehr flexibel, weicher Griff.",
    useHint: "Auch für kleine Stückzahlen.",
    exampleImage: "/images/veredelungen/veredelung-dtf-beispiel.jpg",
  },
  {
    id: "digitaldruck",
    parent: "druck",
    name: "Digitaldruck",
    description: "Direkter Druck auf das Textil – perfekt für detailreiche Motive und Fotos.",
    useHint: "Ideal bei Einzelstücken bis ca. 50 Stück.",
    exampleImage: "/images/veredelungen/veredelung-digitaldruck-beispiel.jpg",
  },
  {
    id: "flach-stick",
    parent: "stick",
    name: "Flach-Stick",
    description: "Klassischer Stick – hochwertig, langlebig, perfekt für Logos auf Polos und Hemden.",
    useHint: "Ab 10 Stück wirtschaftlich.",
    exampleImage: "/images/veredelungen/veredelung-flachstick-beispiel.jpg",
  },
  {
    id: "3d-stick",
    parent: "stick",
    name: "3D-Stick",
    description: "Plastischer Stick mit Tiefenwirkung – besonders edel auf Caps und im Premium-Bereich.",
    useHint: "Ideal für Caps und Mützen.",
    exampleImage: "/images/veredelungen/veredelung-3dstick-beispiel.jpg",
  },
];
