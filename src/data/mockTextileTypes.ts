import type { TextileType } from "../types/models";

export const mockTextileTypes: TextileType[] = [
  {
    id: "tshirts",
    name: "T-Shirts",
    shortDescription: "Der Klassiker für Team und Auftritt.",
    coverImage: "/images/kategorien/kategorie-tshirts.jpg",
    displayOrder: 1,
  },
  {
    id: "polos",
    name: "Polos",
    shortDescription: "Edler Auftritt für Service und Vertrieb.",
    coverImage: "/images/kategorien/kategorie-polos.jpg",
    displayOrder: 2,
  },
  {
    id: "hemden",
    name: "Hemden",
    shortDescription: "Klassisch, repräsentativ, gepflegt.",
    coverImage: "/images/kategorien/kategorie-hemden.jpg",
    displayOrder: 3,
  },
  {
    id: "sweatshirts",
    name: "Sweatshirts",
    shortDescription: "Bequem und lässig – inkl. Hoodies.",
    coverImage: "/images/kategorien/kategorie-sweatshirts.jpg",
    displayOrder: 4,
  },
  {
    id: "outerwear",
    name: "Outerwear",
    shortDescription: "Jacken und Westen für jedes Wetter.",
    coverImage: "/images/kategorien/kategorie-outerwear.jpg",
    displayOrder: 5,
  },
  {
    id: "accessoires",
    name: "Accessoires",
    shortDescription: "Caps, Mützen, Handtücher und mehr.",
    coverImage: "/images/kategorien/kategorie-accessoires.jpg",
    displayOrder: 6,
  },
];
