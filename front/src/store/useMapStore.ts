import { create } from "zustand";

interface MapStore {
    title: string;
    setTitle: string;
}

export const useMapStore = create<MapStore>((set) => ({
    title: '지도',
    setTitle: (newTitle) => set({ title: newTitle }),
}))