import { mockTextileTypes } from "../data/mockTextileTypes";
import type { TextileType } from "../types/models";

export const textileTypeService = {
  getAll(): TextileType[] {
    return [...mockTextileTypes].sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getById(id: string): TextileType | undefined {
    return mockTextileTypes.find((t) => t.id === id);
  },
};
