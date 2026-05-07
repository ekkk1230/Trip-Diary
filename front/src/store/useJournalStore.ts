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
    filteredJournals: JournalLog[];
    comments: Comment[];
    
    searchJournals: (keyowrd: string, categoy: any) => void;
    addJournal: (newJounal: any) => void;
    addComment: (newComment: any) => void;
    updateJournal: (id: string, updateData: any) => void;
    updateComment: (id: string, updateData: any) => void;
    removeJournal: (id: string) => void;
    removeComment: (id: string) => void;
}

export const useJournalStore = create<JournalStore>((set) => ({
    journals: mockJournals,
    filteredJournals: mockJournals,
    comments: mockComments,

    searchJournals: (keyword, category) => set(state => {
        if (!keyword && !category) return { filteredJournals: state.journals };

        const filtered = state.journals.filter(j => {
            const matchesKeyword = keyword
                ? (j.logTitle.includes(keyword) ||
                   j.description.includes(keyword) ||
                   j.mood.includes(keyword) ||
                   j.keywords.some(k => k.includes(keyword)))
                : true;
            
            const matchesCategory = category
                ? j.mood === category
                : true;

            return matchesKeyword && matchesCategory;
        })

        return { filteredJournals: filtered };
    }),
    addJournal: newJournal => set(state => ({ 
        journals: [newJournal, ...state.journals], 
        filteredJournals: [newJournal, ...state.filteredJournals],
    })),
    addComment: newComment => set(state => ({ comments: [newComment, ...state.comments] })),
    updateJournal: (id, updateData) => set((state) => ({
        journals: state.journals.map(j => j.id === id ? { ...j, ...updateData } : j),
        filteredJournals: state.filteredJournals.map(j => j.id === id ? { ...j, ...updateData} : j),
    })),
    updateComment: (id, updateData) => set((state) => ({
        comments: state.comments.map(c => c.id === id ? { ...c, ...updateData } : c)
    })),
    removeJournal: (id) => set((state) => ({
        journals: state.journals.filter(j => j.id !== id) ,
        filteredJournals: state.filteredJournals.filter(j => j.id !== id),
    })),
    removeComment: (id) => set((state) => ({ comments: state.comments.filter(c => c.id !== id) }))
}))