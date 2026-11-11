import NewsItem from "../newsItem/NewsItem.tsx";
import "./NewsList.css";

interface NewsListProps {
    title?: string;
    data?: any[];
    columns?: 1 | 2 | 3 | 4;
    variant?: "grid" | "horizontal" | "compact";
}

const newsData: any[] = [
    {
        id: 1,
        title: "Hậu vệ Thái Lan làm nên lịch sử tại Bundesliga, cổ động viên phát cuồng",
        author: "Nguyễn Anh Đức",
        commentsCount: 1,
        description: "Hậu vệ Nicholas Mickelson vừa có cho mình kiến tạo đầu tiên trong màu áo CLB Elversberg tại Bundesliga.",
        imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80",
    },
    {
        id: 2,
        title: "NÓNG: Vừa dự World Cup, tuyển Việt Nam đã hưởng lợi cực lớn vì luật FIFA",
        author: "QH",
        commentsCount: 1,
        description: "Quy định nhả quân của FIFA có thể mang đến lợi thế bất ngờ cho U17 Việt Nam, khi đối thủ rất mạnh là U17 Bỉ đứng trước nguy cơ không có lực lượng tốt nhất tại World Cup 2026.",
        imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80",
    },
    {
        id: 3,
        title: "Xác định cầu thủ thứ 7 lên tuyển Việt Nam đấu Hàn Quốc, Trung Quốc",
        author: "QH",
        commentsCount: 1,
        description: "Danh sách U19 Việt Nam tham dự Panda Cup 2026 tiếp tục được hé lộ khi thủ môn Lương Anh Chiến của Thể Công Viettel được trao cơ hội góp mặt trong đợt tập trung tháng 11.",
        imageUrl: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=500&q=80",
    },
    {
        id: 4,
        title: "CHÍNH THỨC: Đối thủ Tây Á ra quyết định cực quan trọng, U23 Việt Nam sẽ hưởng lợi lớn",
        author: "Ngọc Thanh",
        commentsCount: 1,
        description: "U23 Qatar vừa đưa ra quyết định quan trọng khi không triệu tập dàn sao tham dự World Cup.",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=80",
    },
    {
        id: 5,
        title: "CHÍNH THỨC: Đối thủ Tây Á ra quyết định cực quan trọng, U23 Việt Nam sẽ hưởng lợi lớn",
        author: "Ngọc Thanh",
        commentsCount: 1,
        description: "U23 Qatar vừa đưa ra quyết định quan trọng khi không triệu tập dàn sao tham dự World Cup.",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=80",
    },
    {
        id: 6,
        title: "CHÍNH THỨC: Đối thủ Tây Á ra quyết định cực quan trọng, U23 Việt Nam sẽ hưởng lợi lớn",
        author: "Ngọc Thanh",
        commentsCount: 1,
        description: "U23 Qatar vừa đưa ra quyết định quan trọng khi không triệu tập dàn sao tham dự World Cup.",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=80",
    },
    {
        id: 7,
        title: "CHÍNH THỨC: Đối thủ Tây Á ra quyết định cực quan trọng, U23 Việt Nam sẽ hưởng lợi lớn",
        author: "Ngọc Thanh",
        commentsCount: 1,
        description: "U23 Qatar vừa đưa ra quyết định quan trọng khi không triệu tập dàn sao tham dự World Cup.",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=80",
    },
    {
        id: 8,
        title: "CHÍNH THỨC: Đối thủ Tây Á ra quyết định cực quan trọng, U23 Việt Nam sẽ hưởng lợi lớn",
        author: "Ngọc Thanh",
        commentsCount: 1,
        description: "U23 Qatar vừa đưa ra quyết định quan trọng khi không triệu tập dàn sao tham dự World Cup.",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=80",
    },
    {
        id: 9,
        title: "CHÍNH THỨC: Đối thủ Tây Á ra quyết định cực quan trọng, U23 Việt Nam sẽ hưởng lợi lớn",
        author: "Ngọc Thanh",
        commentsCount: 1,
        description: "U23 Qatar vừa đưa ra quyết định quan trọng khi không triệu tập dàn sao tham dự World Cup.",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=80",
    },

];

export default function NewsList({
    title = "LATEST",
    data = newsData,
    columns = 1, variant}:NewsListProps) {
    //hiển thị 1 newsItem
    const getVariant = (): "grid" | "horizontal" | "compact" => {
        if (variant) return variant;
        if (columns > 1) return "grid";
        return "horizontal";
    };
    const getColClass = () => {
        switch (columns) {
            case 3: return "col-12 col-md-4"; // 1 dòng 3 bài
            default: return "col-12";          // 1 dòng 1 bài
        }
    };
    const currentVariant = getVariant();
    return (
        <div className="news-list-wrapper">
            {/* tiêu đề */}
            <div className="latest-header position-relative mb-2">
                <div className="latest-tab d-inline-flex align-items-center text-white fw-bold px-3 py-1 fs-6">
                    {title}
                </div>
            </div>

            {/* danh sách newsItem */}
            <div className="news-items-container row g-3">
                {data.map((item) => (
                    <div className={getColClass()} key={item.id}>
                        <NewsItem news={item} variant={currentVariant} />
                    </div>
                ))}
            </div>
        </div>
    );
}