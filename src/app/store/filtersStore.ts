import { create } from 'zustand';

interface FilterState {
  category: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  dressStyles: string[];
  isFiltersOpen: boolean;
  sortBy: string;
  selectedCategoryName: string;
  setCategory: (category: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setColors: (colors: string[]) => void;
  setSizes: (sizes: string[]) => void;
  setDressStyles: (styles: string[]) => void;
  setIsFiltersOpen: (isOpen: boolean) => void;
  setSortBy: (sortBy: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: [],
  priceRange: [50, 200],
  colors: [],
  sizes: [],
  dressStyles: [],
  isFiltersOpen: true,
  sortBy: 'Most Popular',
  selectedCategoryName: '',
  setCategory: (category) => {
    set(() => {
      const newCategoryName = category.length === 1 ? category[0] : '';
      return {
        category,
        selectedCategoryName: newCategoryName,
      };
    });
  },
  setPriceRange: (priceRange) => set({ priceRange }),
  setColors: (colors) => set({ colors }),
  setSizes: (sizes) => set({ sizes }),
  setDressStyles: (dressStyles) => set({ dressStyles }),
  setIsFiltersOpen: (isFiltersOpen) => set({ isFiltersOpen }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () =>
    set({
      category: [],
      priceRange: [50, 200],
      colors: [],
      sizes: [],
      dressStyles: [],
      isFiltersOpen: true,
      sortBy: 'Most Popular',
      selectedCategoryName: '',
    }),
}));