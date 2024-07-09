import { ItemCategory } from "@prisma/client";
import { create } from "zustand";
import { getCategories } from "./api";

interface CategoryStore {
  categories: ItemCategory[];
  setCategories: () => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  setCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
}));
