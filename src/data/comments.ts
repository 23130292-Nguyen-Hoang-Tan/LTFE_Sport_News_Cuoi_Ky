export interface CommentType {
    id: string;
    author: string;
    avatarUrl?: string;
    content: string;
    createdAt: string;
    replies?: CommentType[];
}

export const comments: CommentType[] = [
    {
        id: "c1",
        author: "Hữu An",
        content: "Đừng vội trao vương miện, nhưng cũng đừng xem nhẹ màn trình diễn này! Ghi hai bàn vào lưới đối thủ khu vực là dấu hiệu rất đáng khích...",
        createdAt: "1 giờ",
        replies: [
            {
                id: "c1-1",
                author: "Ngọc Thanh",
                avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=NgocThanh",
                content: "Chuẩn, cứ khen đúng lúc nhưng chừa chỗ cho cậu ấy phát triển. Còn cơ hội tiếp theo, bạn muốn thấy Minh Tâm đá chính hay vào sân từ ghế dự...",
                createdAt: "42 phút"
            }
        ]
    },
    {
        id: "c2",
        author: "namday",
        content: "Một cú đúp chưa biến ai thành siêu tiền đạo, nhưng đủ khiến người ta phải để mắt! Theo tôi, điều đáng mừng là Minh Tâm đã biết tận...",
        createdAt: "2 giờ"
    }
];