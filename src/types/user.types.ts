

export interface User {
    email: string
    profile: Profile
}

export interface AvatarUrl {
    avatarUrl?: string;
}
export interface Profile extends AvatarUrl {
    nickname: string;
    introduction: string;
}

export interface UserStats {
    bookmarkCount:number
    commentCount:number
    postCount:number
}