import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/models";

export const productService = {
  getAll(): Product[] {
    return mockProducts;
  },

  getByTextileType(textileTypeId: string): Product[] {
    return mockProducts.filter((p) => p.textileTypeId === textileTypeId);
  },

  getById(id: string): Product | undefined {
    return mockProducts.find((p) => p.id === id);
  },
};
