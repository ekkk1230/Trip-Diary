import { create } from "zustand";

import mockJournals from "../assets/data/mock_journal.json"
import mockComments from "../assets/data/mock_comment.json"

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

interface Comment {
    id: string;
    user: string;
    journalId: number;
    date: string;
    text: string;
}

interface JournalStore {
    journals: JournalLog[];
    comments: Comment[];

    addJournal: (newJounal: any) => void;
    addComment: (newComment: any) => void;
    updateJournal: (id: string, updateData: any) => void;
    updateComment: (id: string, updateData: any) => void;
    removeJournal: (id: string) => void;
    removeComment: (id: string) => void;
}

export const useJournalStore = create<JournalStore>((set) => ({
    journals: mockJournals,
    comments: mockComments,

    addJournal: newJournal => set(state => ({ journals: [newJournal, ...state.journals] })),
    addComment: newComment => set(state => ({ comments: [newComment, ...state.comments] })),
    updateJournal: (id, updateData) => set((state) => ({
        journals: state.journals.map(j => j.id === id ? { ...j, ...updateData } : j)
    })),
    updateComment: (id, updateData) => set((state) => ({
        comments: state.comments.map(c => c.id === id ? { ...c, ...updateData } : c)
    })),
    removeJournal: (id) => set((state) => ({ journals: state.journals.filter(j => j.id !== id) })),
    removeComment: (id) => set((state) => ({ comments: state.comments.filter(c => c.id !== id) }))
}))