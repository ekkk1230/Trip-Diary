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
    fetchComments: (journalId: number) => Promise<void>;
    
    setIsEdit: (detailType?: string | null, mood?: string | null, forceValue?: boolean) => void;
    searchJournals: (keyowrd: string, categoy: string | null) => void;
    likedJournal: (id: string) => Promise<void>;
    updateJournal: (id: string, updateData: any) => Promise<void>;
    updateComment: (id: string, updateData: any) => Promise<void>;
    addJournal: (newJounal: JournalLog, imageFile: File | null) => Promise<void>;
    addComment: (newComment: Comment) => Promise<void>;
    removeJournal: (id: string) => Promise<void>;
    removeComment: (id: string) => Promise<void>;
    updateViews: (id: string) => Promise<void>;
}

export const useJournalStore = create<JournalStore>((set) => ({
    journals: [],
    filteredJournals: [],
    likedJournalIds: [],
    comments: [],
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
    
    fetchComments: async(journalId) => {

        if (!journalId) {
            set({ comments: [] });
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/comments/journal/${journalId}`);
            const data = await response.json();
            
            set({ comments: data });
        } catch (err) {
            console.error('fetchComments 연결 실패 ', err);
        };
    },
    
    setIsEdit: (detailType, mood, forceValue) => set(state => {
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
    likedJournal: async(id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/journals/${id}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(id)
            });
            if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);

            set(state => {
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

            const response = await fetch(`http://localhost:8080/api/journals`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);
            const savedJournal = await response.json();
            console.log("서버에서 받은 데이터:", savedJournal);

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
            const response = await fetch(`http://localhost:8080/api/journals/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);
            const updatedJournal = await response.json();

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
            const response = await fetch(`http://localhost:8080/api/comments/journal/${newComment.journalId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment)
            });
            if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);
            set(state => ({ comments: [newComment, ...state.comments] }))
        } catch (err) {
            console.error(`addComment 실패: ${err}`);
        }
    },
    updateComment: async(id, updateData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/comments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);

            set(state => ({ comments: updateArray.update(state.comments, id, updateData) }))
        } catch (err) {
            console.error(`updateComment 실패: ${err} `);
        }
    },
    removeJournal: async(id) => {
        try {
            const response = await fetch (`http://localhost:8080/api/journals/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);

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
            const response = await fetch(`http://localhost:8080/api/comments/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error(`서버 에러 발생 - ${response.status}`);

            set(state => ({ comments: state.comments.filter(c => c.id !== id) }));
        } catch (err) {
            console.error('removeComment 실패: ', err);
        }
    },
    updateViews: async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/journals/${id}/view`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(id)
            });

            if(!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);

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