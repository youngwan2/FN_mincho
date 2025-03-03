

export interface Bookmark {
    id: number
    url: string
}

export interface BookmarkInfo {
    count: number
    bookmarks: Bookmark[]
}

export interface BookmarkMetadata {
    count: number;
    isBookmarked: boolean;
}