import { create } from "zustand";

import mockJournals from "../assets/data/mock_journal.json"

interface JournalLog {
    id: string;
    contentId: string;
    logTitle: string;
    location: string;
    travelDate: string;
    weather: string;
    mood: string;
    mainImage: string;
    author: string;
    description: string;
    stats: { likes: number, comments: number };
    keywords: string[];
}

interface JournalStore {
    journals: JournalLog[];

    updateJournal: (id: string, updateData: any) => void;
}

export const useJournalStore = create<JournalStore>((set) => ({
    journals: mockJournals,

    updateJournal: (id, updateData) => set((state) => ({
        journals: state.journals.map(j => j.id === id ? { ...j, ...updateData } : j)
    })),
}))