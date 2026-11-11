import "./NewsItem.css";
import { Link } from "react-router-dom";
import type { NewsType } from "../../data/news.ts";

interface NewsItemProps {
    news: NewsType;
    variant?: "grid" | "horizontal" | "compact";
}

export default function NewsItem({ news, variant = "horizontal" }: NewsItemProps) {
    const newsLink = `/news/${news.id || 1}`;

    // kểu 1 1 dòng 3 bài
    if (variant === "grid") {
        return (
            <div className="news-item h-100 pb-2">
                <Link to={newsLink} className="d-block overflow-hidden rounded mb-2">
                    <img src={news.imageUrl} alt={news.title} className="w-100 object-fit-cover rounded" style={{ aspectRatio: "16/9" }} />
                </Link>
                <h5 className="fw-bold fs-6 mb-1">
                    <Link to={newsLink} className="text-dark text-decoration-none line-clamp-2 hover-red">
                        {news.title}
                    </Link>
                </h5>
                <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: "12px" }}>
                    <span>{news.author}</span>
                    <span>💬 {news.commentsCount || 0}</span>
                </div>
            </div>
        );
    }

    // kiểu 2 1 dòng 1 bài
    if (variant === "compact") {
        return (
            <div className="news-item py-2 border-bottom row g-2 align-items-center">
                <div className="col-4">
                    <Link to={newsLink} className="d-block overflow-hidden rounded">
                        <img src={news.imageUrl} alt={news.title} className="w-100 object-fit-cover rounded" style={{ aspectRatio: "4/3" }} />
                    </Link>
                </div>
                <div className="col-8">
                    <h5 className="fw-bold fs-6 mb-1 line-clamp-2" style={{ fontSize: "14px" }}>
                        <Link to={newsLink} className="text-dark text-decoration-none hover-red">
                            {news.title}
                        </Link>
                    </h5>
                    <div className="text-muted" style={{ fontSize: "12px" }}>{news.author}</div>
                </div>
            </div>
        );
    }

    // kiểu 3 1 dòng 1 bài ngắn gọn
    return (
        <div className="news-item py-3 border-bottom row g-3">
            <div className="col-4 col-md-3">
                <Link to={newsLink} className="d-block overflow-hidden rounded">
                    <img src={news.imageUrl} alt={news.title} className="w-100 object-fit-cover rounded" style={{ aspectRatio: "16/10" }} />
                </Link>
            </div>
            <div className="col-8 col-md-9">
                <h5 className="fw-bold fs-6 mb-1">
                    <Link to={newsLink} className="text-dark text-decoration-none hover-red">
                        {news.title}
                    </Link>
                </h5>
                <div className="d-flex align-items-center gap-2 mb-2 text-muted" style={{ fontSize: "12px" }}>
                    <span>{news.author}</span>
                    <span>💬 {news.commentsCount || 0}</span>
                </div>
                <p className="text-secondary mb-0 line-clamp-2" style={{ fontSize: "13px" }}>{news.description}</p>
            </div>
        </div>
    );
}