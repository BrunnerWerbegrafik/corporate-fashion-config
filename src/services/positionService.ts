import { mockPositions } from "../data/mockPositions";
import type { PositionOption, PositionTab } from "../types/models";

export const positionService = {
  getAll(): PositionOption[] {
    return mockPositions;
  },

  getByTab(tab: PositionTab): PositionOption[] {
    return mockPositions.filter((p) => p.tab === tab);
  },

  getById(id: string): PositionOption | undefined {
    return mockPositions.find((p) => p.id === id);
  },
};
