import { mockFinishings } from "../data/mockFinishings";
import type { FinishingInfo, FinishingMainType } from "../types/models";

export const finishingService = {
  getAll(): FinishingInfo[] {
    return mockFinishings;
  },

  getByParent(parent: FinishingMainType): FinishingInfo[] {
    return mockFinishings.filter((f) => f.parent === parent);
  },
};
