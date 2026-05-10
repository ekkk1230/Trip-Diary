import { create } from "zustand";
import { type ReactNode } from "react";

type ModalType = 'check' | 'confirm';

interface UiStore {
    title: string;
    setTitle: (newTitle: string) => void;

    isOpen: boolean;
    modalType: ModalType | null;
    modalTitle: string;
    modalContent: ReactNode;
    onConfirm: (() => void) | null;
    openModal: (type: ModalType, title: string, content: ReactNode, onConfirm?: () => void) => void;
    closeModal: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
    title: '지도',
    setTitle: (newTitle) => set({ title: newTitle }),

    isOpen: false,
    modalType: null,
    modalTitle: '',
    modalContent: '',
    onConfirm: null,
    openModal: (type, title, content, onConfirm) => set({
        isOpen: true,
        modalType: type,
        modalTitle: title,
        modalContent: content,
        onConfirm: onConfirm || null,
    }),
    closeModal: () => set({ isOpen: false, modalType: null, modalTitle: '', modalContent: '', onConfirm: null }),
}))