import { mockQualityLevels } from "../data/mockQualityLevels";
import type { QualityLevel } from "../types/models";

export const qualityLevelService = {
  getAll(): QualityLevel[] {
    return mockQualityLevels;
  },

  getById(id: QualityLevel["id"]): QualityLevel | undefined {
    return mockQualityLevels.find((l) => l.id === id);
  },
};
