import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    nickname: string;
    userId: string;
    password: string;
    gender: string;
    birth: string;
}

interface LoginData {
    userId: string;
    password: string;
}

interface UserStore {
    users: User[];
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;

    joinUser: (user: User) => void;
    removeUser: (user: User) => void;

    login: (LoginData: LoginData) => boolean;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            users: [],
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),

            joinUser: (user) => {
                const newUser = {
                    id: user.id,
                    nickname: user.nickname,
                    userId: user.userId,
                    password: user.password,
                    gender: user.gender,
                    birth: user.birth,
                };

                set((state) => ({ users: [newUser, ...state.users] }));
            },
            removeUser: (user) => {
                set((state) => ({ 
                    users: state.users.filter(u => u.id !== user.id),
                    user: state.user?.id === user.id ? null : state.user
                }));
            },

            login: (loginData) => {
                const { users } = get();

                const foundUser = users.find(
                    u => u.userId === loginData.userId && u.password === loginData.password
                );

                if (foundUser) {
                    set ({ user: foundUser });
                    return true;
                } else return false;
            },
        }),
        {
            name: "user-storage",
        }
    )
);