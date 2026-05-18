import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginData, User } from "../types/user";

const updateUserInState = (state: any, userId: string, partialUpdate: any) => {
    const updateUsers = state.users.map((u: any) => u.userId === userId ? { ...u, ...partialUpdate } : u);
    const updateUser = state.user?.userId === userId ? { ...state.user, ...partialUpdate } : state.user;

    return { users: updateUsers, user: updateUser };
};

interface UserStore {
    users: User[];
    user: User | null;
    setUser: (user: User) => void;

    login: (LoginData: LoginData) => Promise<boolean>;
    clearUser: () => void;

    joinUser: (user: User) => Promise<void>;
    removeUser: (user: User) => void;

    profileImgChange: (userId: string, updateProfileImg: string) => void;
    profileDetailChange: (userId: string, updateProfile: any) => void;
    passwordChage: (userId: string, updatePassword: string) => void;

    checkNickname: () => string[];
    checkId: () => string[];
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            users: [],
            user: null,
            setUser: (user) => set({ user }),

            login: async(loginData) => {
                try {
                    const response = await fetch('http://localhost:8080/api/user/login', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(loginData)
                    })

                    if (!response.ok) {
                        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
                        return false;
                    }
                    const loginMember = await response.json();

                    // const { users } = get();

                    // const foundUser = users.find(u => u.userId === loginData.userId && u.password === loginData.password);

                    if (loginMember) {
                        set ({ user: loginMember });
                        return true;
                    } else return false;
                } catch (err) {
                    console.error('login 실패: ', err);
                    return false;
                }
            },
            clearUser: () => set({ user: null }),

            joinUser: async(user) => {
                const newUser = {
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
                try {
                    const response = await fetch('http://localhost:8080/api/user', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUser)
                    });

                    if (!response.ok) throw new Error(`서버 에러 발생 - 상태코드: ${response.status}`);
                    const joinMember = await response.json();

                    set((state) => ({ users: [joinMember, ...state.users] }));
                } catch (err) {
                    console.error('joinUser 실패: ', err);
                }                
            },
            removeUser: (user) => {
                set((state) => ({ 
                    users: state.users.filter(u => u.id !== user.id),
                    user: state.user?.id === user.id ? null : state.user
                }));
            },

            profileImgChange: (userId, updateProfileImg) => set((state): any => updateUserInState(state, userId, { profileImg: updateProfileImg })),
            profileDetailChange: (userId, updateProfile) => set((state): any => updateUserInState(state, userId, updateProfile)),
            passwordChage: (userId, updatePassword) => set((state): any => updateUserInState(state, userId, { password: updatePassword })),

            checkNickname: () => { return get().users.map(u => u.nickname) },
            checkId: () => { return get().users.map(u => u.userId) }
        }),
        {
            name: "user-storage",
        }
    )
);