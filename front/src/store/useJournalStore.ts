import { create } from "zustand";
import API from "../api/axios";

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
    fetchComments: (journalId: number) => Promise<void>;
    
    setIsEdit: (detailType?: string | null, mood?: string | null, forceValue?: boolean) => void;
    searchJournals: (keyowrd: string, categoy: string | null) => void;
    likedJournal: (userId: string, postId: string) => Promise<void>;
    updateJournal: (id: string, updateData: any) => Promise<void>;
    updateComment: (id: string, updateData: any) => Promise<void>;
    addJournal: (newJounal: JournalLog, imageFile: File | null) => Promise<void>;
    addComment: (newComment: Comment) => Promise<void>;
    removeJournal: (id: string) => Promise<void>;
    removeComment: (id: string) => Promise<void>;
    updateViews: (id: string) => Promise<void>;
}

export const useJournalStore = create<JournalStore>((set, get) => ({
    journals: [],
    filteredJournals: [],
    likedJournalIds: [],
    comments: [],
    isEdit: false,
    isLoading: false,
    
    fetchJournals: async() => {
        set({ isLoading: true });
        try {
            const response = await API.get("/journals");
            const data = response.data;
            
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
    
    fetchComments: async(journalId) => {

        if (!journalId) {
            set({ comments: [] });
            return;
        }

        try {
            const response = await API.get(`/comments/journal/${journalId}`);
            const data = await response.data;
            
            set({ comments: data });
        } catch (err) {
            console.error('fetchComments 연결 실패 ', err);
        };
    },

    setIsEdit: (detailType, mood, forceValue) => set(() => {
        if (typeof forceValue === 'boolean') return { isEdit: forceValue };
        
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
    likedJournal: async(journalId, memberId) => {
        try {
            await API.post(`/journals/${journalId}/like`, { journalId, memberId });
            
            set(state => {
                const journal = state.filteredJournals.find(j => j.id === journalId);
                if (!journal) return state;
        
                const isAlreadyLiked = state.likedJournalIds.includes(journalId);
                
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
                    ? state.likedJournalIds.filter(likedId => likedId !== journalId)
                    : [...state.likedJournalIds, journalId];
        
                return {
                    likedJournalIds: newLikedIds,
                    journals: state.journals.map(j => j.id === journalId ? updatedJournal : j),
                    filteredJournals: state.filteredJournals.map(j => j.id === journalId ? updatedJournal : j)
                }
            })
        } catch (err) {
            console.error(`likedJournal 실패: ${err}`);
        }
    },
    addJournal: async(newJournal, imageFile) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append(
                "journalDto",
                new Blob([JSON.stringify(newJournal)], { type: "application/json" })
            );

            if (imageFile) formData.append("image", imageFile);

            const response = await API.post("/journals", formData);
            const savedJournal = response.data;

            set(state => ({
                journals: [savedJournal, ...state.journals],
                filteredJournals: [savedJournal, ...state.filteredJournals],
                isLoading: false,
            }));

            return savedJournal;
        } catch (err) {
            console.error('addJournal 실패: ', err);
            set({ isLoading: false });
        }
    },
    updateJournal: async(id, updateData) => {
        try {
            const response = await API.put(`/journals/${id}`, updateData);
            const updatedJournal = response.data;

            set((state) => ({
                journals: state.journals.map(j => String(j.id) === String(id) ? updatedJournal : j),
                filteredJournals: state.filteredJournals.map(j => String(j.id) === String(id) ? updatedJournal : j)
            }));

            return updatedJournal;
        } catch (err) {
            console.error('updateJournal 실패: ', err);
        }
    },
    addComment: async(newComment) => {
        try {
            await API.post(`/comments/journal/${newComment.journalId}`, newComment);
            set(state => ({ comments: [newComment, ...state.comments] }))
        } catch (err) {
            console.error(`addComment 실패: ${err}`);
        }
    },
    updateComment: async(id, updateData) => {
        try {
            await API.put(`/comments/${id}`, updateData);

            set(state => ({ comments: updateArray.update(state.comments, id, updateData) }))
        } catch (err) {
            console.error(`updateComment 실패: ${err} `);
        }
    },
    removeJournal: async(id) => {
        try {
            await API.delete(`/journals/${id}`);

            set(state => ({
                journals: state.journals.filter(j => String(j.id) !== String(id)),
                filteredJournals: state.filteredJournals.filter(j => String(j.id) !== String(id))
            }))
        } catch (err) {
            console.error('removeJournal 실패: ', err);
        }
    },
    removeComment: async(id) => {
        try {
            await API.delete(`/comments/${id}`);

            set(state => ({ comments: state.comments.filter(c => c.id !== id) }));
        } catch (err) {
            console.error('removeComment 실패: ', err);
        }
    },
    updateViews: async (id) => {
        try {
            await API.post(`/journals/${id}/view`, id);

            set(state => {
                const updateJournalStats = (j: JournalLog) => {
                    if (String(j.id) !== String(id)) return j;
                    return {
                        ...j,
                        stats: {
                            ...j.stats,
                            views: (j.stats.views || 0) + 1
                        }
                    }
                };

                return {
                    journals: state.journals.map(updateJournalStats),
                    filteredJournals: state.filteredJournals.map(updateJournalStats)
                }
            })
        } catch (err) {
            console.error(`updateViews 실패: ${err}`);
        }
    }
}))