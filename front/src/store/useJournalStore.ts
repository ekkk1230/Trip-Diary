import { create } from "zustand";

import mockJournals from "../assets/data/mock_journal.json"
import mockComments from "../assets/data/mock_comment.json"
import type { Comment, JournalLog } from "../types/journal";

const updateArray = {
    update: (arr: any[], id: any, data: any) => arr.map(item => item.id === id ? { ...item, ...data } : item),
    remove: (arr: any[], id: any) => arr.filter(item => item.id !== id),
};

interface JournalStore {
    journals: JournalLog[];
    filteredJournals: JournalLog[];
    likedJournalIds: string[];
    comments: Comment[];
    isEdit: boolean;
    
    setIsEdit: (detailType?: string | null, mood?: string | null, forceValue?: boolean) => void;
    searchJournals: (keyowrd: string, categoy: string) => void;
    likedJournal: (id: string) => void;
    updateJournal: (id: string, updateData: any) => void;
    updateComment: (id: string, updateData: any) => void;
    removeJournal: (id: string) => void;
    addJournal: (newJounal: JournalLog) => void;
    addComment: (newComment: Comment) => void;
    removeComment: (id: string) => void;
}

export const useJournalStore = create<JournalStore>((set) => ({
    journals: mockJournals,
    filteredJournals: mockJournals,
    likedJournalIds: [],
    comments: mockComments,
    isEdit: false,

    setIsEdit: (detailType, mood, forceValue) => set(state => {
        if (typeof forceValue === 'boolean') {
            return { isEdit: forceValue };
        };
    
        if (!detailType && !mood) {
            return { isEdit: !state.isEdit };
        };
    
        const shouldEdit = detailType === "edit" || mood === "new";
        return { isEdit: shouldEdit };
    }),
    searchJournals: (keyword, category) => set(state => {
        if (!keyword && !category) return { filteredJournals: state.journals };

        const filtered = state.journals.filter(j => {
            const matchesKeyword = keyword
                ? (j.logTitle.includes(keyword) ||
                   j.description.includes(keyword) ||
                   j.location.includes(keyword) ||
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
    addJournal: (newJournal) => set(state => ({ 
        journals: [newJournal, ...state.journals], 
        filteredJournals: [newJournal, ...state.filteredJournals],
    })),
    updateJournal: (id, updateData) => set((state) => ({
        journals: updateArray.update(state.journals, id, updateData),
        filteredJournals: updateArray.update(state.filteredJournals, id, updateData),
    })),
    removeJournal: (id) => set((state) => ({
        journals: updateArray.remove(state.journals, id),
        filteredJournals: updateArray.remove(state.filteredJournals, id),
    })),
    addComment: (newComment) => set(state => ({ comments: [newComment, ...state.comments] })),
    updateComment: (id, updateData) => set((state) => ({
        comments: updateArray.update(state.comments, id, updateData),
    })),
    removeComment: (id) => set((state) => ({ comments: updateArray.remove(state.comments, id) }))
}))