import { create } from "zustand";

import mockJournals from "../assets/data/mock_journal.json"
import mockComments from "../assets/data/mock_comment.json"

interface JournalLog {
    id: string;
    contentId: string;
    logTitle: string;
    location: string;
    placeName: string;
    travelDate: string;
    weather: string;
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
    likedJournalIds: string[];
    comments: Comment[];
    
    searchJournals: (keyowrd: string, categoy: any) => void;
    likedJournal: (id: string) => void;
    addJournal: (newJounal: JournalLog) => void;
    addComment: (newComment: Comment) => void;
    updateJournal: (id: string, updateData: any) => void;
    updateComment: (id: string, updateData: any) => void;
    removeJournal: (id: string) => void;
    removeComment: (id: string) => void;
}

export const useJournalStore = create<JournalStore>((set) => ({
    journals: mockJournals,
    filteredJournals: mockJournals,
    likedJournalIds: [],
    comments: mockComments,

    searchJournals: (keyword, category) => set(state => {
        if (!keyword && !category) return { filteredJournals: state.journals };

        const filtered = state.journals.filter(j => {
            const matchesKeyword = keyword
                ? (j.logTitle.includes(keyword) ||
                   j.description.includes(keyword) ||
                   j.keywords.some(k => k.includes(keyword)))
                : true;
            
            const matchesCategory = true;

            return matchesKeyword && matchesCategory;
        })

        return { filteredJournals: filtered };
    }),
    likedJournal: id => set(state => {
        const journal = state.filteredJournals.find(j => j.id === id);
        if (!journal) return state;

        const isAlreadyLiked = state.likedJournalIds.includes(id);
        
        const newLikes = isAlreadyLiked
            ? Math.max(0, (journal.stats.likes || 0) - 1)
            : (journal.stats.likes || 0) + 1;

        const updatedJournal = {
            ...journal,
            stats: {
                ...journal.stats,
                likes: newLikes
            }
        };

        const newLikedIds = isAlreadyLiked
            ? state.likedJournalIds.filter(likedId => likedId !== id)
            : [...state.likedJournalIds, id];

        return {
            likedJournalIds: newLikedIds,
            journals: state.journals.map(j => j.id === id ? updatedJournal : j),
            filteredJournals: state.filteredJournals.map(j => j.id === id ? updatedJournal : j)
        }
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