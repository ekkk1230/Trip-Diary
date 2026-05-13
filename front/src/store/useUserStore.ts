import { create } from "zustand";
import { persist } from "zustand/middleware";

const updateUserInState = (state: any, userId: string, partialUpdate: any) => {
    const updateUsers = state.users.map((u: any) => u.userId === userId ? { ...u, ...partialUpdate } : u);
    const updateUser = state.user?.userId === userId ? { ...state.user, ...partialUpdate } : state.user;

    return { users: updateUsers, user: updateUser };
};

interface User {
    id: string;
    nickname: string;
    userId: string;
    password: string;
    gender: string;
    birth: string;
    profileImg: string;
    agreements: {
        service: boolean,
        privacy: boolean,
        agreedAt: string,
    }
}

interface LoginData {
    userId: string;
    password: string;
}

interface UserStore {
    users: User[];
    user: User | null;
    setUser: (user: User) => void;

    login: (LoginData: LoginData) => boolean;
    clearUser: () => void;

    joinUser: (user: User) => void;
    removeUser: (user: User) => void;

    profileImgChange: (userId: string, updateProfileImg: string) => void;
    profileDetailChange: (userId: string, updateProfile: any) => void;
    passwordChage: (userId: string, updatePassword: string) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            users: [],
            user: null,
            setUser: (user) => set({ user }),

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
            clearUser: () => set({ user: null }),

            joinUser: (user) => {
                const newUser = {
                    id: user.id,
                    nickname: user.nickname,
                    userId: user.userId,
                    password: user.password,
                    gender: user.gender,
                    birth: user.birth,
                    profileImg: user.profileImg,
                    agreements: {
                        service: user.agreements.service,
                        privacy: user.agreements.privacy,
                        agreedAt: user.agreements.agreedAt,
                    }
                };

                set((state) => ({ users: [newUser, ...state.users] }));
            },
            removeUser: (user) => {
                set((state) => ({ 
                    users: state.users.filter(u => u.id !== user.id),
                    user: state.user?.id === user.id ? null : state.user
                }));
            },

            profileImgChange: (userId, updateProfileImg) => set((state): any => updateUserInState(state, userId, { profileImg: updateProfileImg })),
            profileDetailChange: (userId, updateProfile) => set((state): any => updateUserInState(state, userId, updateProfile)),
            passwordChage: (userId, updatePassword) => set((state): any => updateUserInState(state, userId, { password: updatePassword }))
        }),
        {
            name: "user-storage",
        }
    )
);