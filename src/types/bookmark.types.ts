

export interface Bookmark {
    id: number
    url: string
    cntntsSj: string
    bneNm: string;
    hbdcNm: string
    createdAt: string

}

export interface BookmarkInfo {
    count: number
    bookmarks: Bookmark[]

}

export interface BookmarkMetadata {
    count: number;
    isBookmarked: boolean;
}