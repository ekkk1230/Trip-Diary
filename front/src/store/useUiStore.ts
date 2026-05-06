import { create } from "zustand";

interface UiStore {
    title: string;

    setTitle: (newTitle: string) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    title: '지도',

    setTitle: (newTitle) => set({ title: newTitle }),
}))