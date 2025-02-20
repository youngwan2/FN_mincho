

export interface User {
    email: string
    profile: Profile
}

export interface Profile {
    avatarUrl: string;
    nickname: string;
    introduction: string;
}