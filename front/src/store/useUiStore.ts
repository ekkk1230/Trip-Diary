import { create } from "zustand";

interface UiStore {
    title: string;
    isOpen: boolean;
    
    setIsOpen: (open: boolean) => void;
    onClose: () => void;
    setTitle: (newTitle: string) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    title: '지도',
    isOpen: false,

    setIsOpen: (open) => set({ isOpen: open }),
    onClose: () => set({ isOpen: false }),
    setTitle: (newTitle) => set({ title: newTitle }),
}))