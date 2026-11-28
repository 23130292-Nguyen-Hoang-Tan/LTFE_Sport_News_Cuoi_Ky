import "./FeatureNews.css";
import { Link } from "react-router-dom";
import type { NewsType } from "../../data/news";

interface FeatureNewsProps {
    news?: NewsType;
}

function FeatureNews({ news }: FeatureNewsProps) {
    if (!news) return null;
    const detailUrl = `/news/${encodeURIComponent(String(news.id))}`;
    return (
        <div className="news-card">
            {/* ảnh */}
            <Link to={detailUrl} className="news-thumb d-block">
                <img src={news?.imageUrl} alt={news?.title} className="w-100" />
            </Link>

            {/* nội dung bài viết */}
            <div className="news-content pt-3">
                <span className="news-cate">{news?.category?.toUpperCase()}</span>

                <h2 className="news-title mt-1 mb-2">
                    <Link to={`/news/${encodeURIComponent(String(news?.id))}`}>
                        {news?.title}
                    </Link>
                </h2>

                <p className="news-desc text-secondary">
                    {news?.description}
                </p>

                <div className="news-meta d-flex align-items-center gap-3 text-muted fs-7">
          <span className="d-flex align-items-center gap-1">
            <i className="bi bi-person-circle text-danger"></i> {news?.author}
          </span>
                    <span className="d-flex align-items-center gap-1">
            <i className="bi bi-chat-dots"></i> {news?.commentsCount}
          </span>
                </div>
            </div>
        </div>
    );
}

export default FeatureNews;