import { create } from "zustand";

interface State {
  activeCategoryId: number;
  setActiveCategoryId: (id: number) => void;
}

export const useCategoryState = create<State>((set) => ({
  activeCategoryId: 1,
  setActiveCategoryId: (id) => set({ activeCategoryId: id }),
}));
