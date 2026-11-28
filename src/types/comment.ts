export interface Comment {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    authorRole?: 'admin' | 'user';
    content: string;
    createdAt: string;
    likes: number;
    isLiked?: boolean;
    matchId?: number;
}
