import { create } from "zustand";

interface UiStore {
    title: string;
    isOpen: boolean;

    setTitle: (newTitle: string) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    title: '지도',
    isOpen: false,

    setTitle: (newTitle) => set({ title: newTitle }),
}))