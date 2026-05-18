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
    isLoading: boolean;

    fetchJournals: () => Promise<void>;
    
    setIsEdit: (detailType?: string | null, mood?: string | null, forceValue?: boolean) => void;
    searchJournals: (keyowrd: string, categoy: string) => void;
    likedJournal: (id: string) => void;
    updateJournal: (id: string, updateData: any) => Promise<void>;
    updateComment: (id: string, updateData: any) => void;
    removeJournal: (id: string) => void;
    addJournal: (newJounal: JournalLog) => Promise<void>;
    addComment: (newComment: Comment) => void;
    removeComment: (id: string) => void;
}

export const useJournalStore = create<JournalStore>((set) => ({
    journals: [],
    filteredJournals: [],
    likedJournalIds: [],
    comments: mockComments,
    isEdit: false,
    isLoading: false,
    
    fetchJournals: async() => {
        set({ isLoading: true });
        try {
            const response = await fetch("http://localhost:8080/api/journals");
            const data = await response.json();
            
            set({
                journals: data,
                filteredJournals: data,
                isLoading: false
            });
        } catch (err) {
            console.error('fetchJournals 연결 실패 ', err);
            set({ isLoading: false });
        };
    },

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
    addJournal: async(newJournal) => {
        set({ isLoading: true });
        try {
            const response = await fetch("http://localhost:8080/api/journals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newJournal)
            });
            if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);
            const savedJournal = await response.json();

            set(state => ({ 
                journals: [savedJournal, ...state.journals], 
                filteredJournals: [savedJournal, ...state.filteredJournals],
                isLoading: false,
            }));
        } catch (err) {
            console.error('addJournal 실패: ', err);
            set({ isLoading: false });
        }
    },
    updateJournal: async(id, updateData) => {
        try {
            const response = await fetch('http://localhost:8080/api/journals/update', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);
            const updatedJournal = await response.json();

            set((state) => ({
                journals: updateArray.update(state.journals, id, updatedJournal),
                filteredJournals: updateArray.update(state.filteredJournals, id, updatedJournal),
            }))
        } catch (err) {
            console.error('updateJournal 실패: ', err);
        }
    },
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