// Single Source of Truth – alle Domain-Typen für den Konfigurator.

export interface TextileType {
  id: string;
  name: string;
  shortDescription: string;
  coverImage: string;
  displayOrder: number;
}

export interface QualityLevel {
  id: "essential" | "premium" | "performance" | "active";
  name: string;
  tagline: string;
  manufacturer: string;
  targetGroup: string;
  accentColorHex: string;
}

export interface ColorVariant {
  id: string;
  name: string;
  colorHex: string;
  images: string[];
}

export interface Product {
  id: string;
  textileTypeId: string;
  qualityLevelId: QualityLevel["id"];
  name: string;
  shortDescription: string;
  longDescription: string;
  fit: string;
  weight: string;
  material: string;
  washTemperature: string;
  certifications: string[];
  minQuantity: number;
  availableSizes: string[];
  colorVariants: ColorVariant[];
  defaultImage: string;
}

export type FinishingMainType = "druck" | "stick";

export type FinishingSubType =
  | "siebdruck"
  | "dtf"
  | "digitaldruck"
  | "flach-stick"
  | "3d-stick";

export interface FinishingInfo {
  id: FinishingSubType;
  parent: FinishingMainType;
  name: string;
  description: string;
  useHint: string;
  exampleImage: string;
}

export type PositionTab = "vorne" | "hinten" | "aermel";

export interface PositionOption {
  id: string;
  tab: PositionTab;
  name: string;
  shortDescription: string;
  logoIndicator: "small" | "large";
}

export interface CartEntry {
  id: string;
  productId: string;
  colorVariantId: string;
  quantity: number;
  finishingType: FinishingMainType;
  positions: string[];
  positionNote?: string;
  finalNote?: string;
  createdAt: string;
}

export interface RequestSubmission {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  note?: string;
  dataPrivacyAccepted: boolean;
  cartEntries: CartEntry[];
  logoFileName?: string;
  submittedAt: string;
  requestNumber: string;
}
