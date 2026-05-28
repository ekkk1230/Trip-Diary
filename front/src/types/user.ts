export interface User {
    id?: string;
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

export interface LoginData {
    userId: string;
    password: string;
}