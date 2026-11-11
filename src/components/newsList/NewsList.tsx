import NewsItem from "../newsItem/NewsItem.tsx";
import "./NewsList.css";
import type { NewsType } from "../../data/news.ts";
import { listNews } from "../../data/news.ts";

interface NewsListProps {
    title?: string;
    data?: NewsType[];
    columns?: 1 | 3 ;
    variant?: "grid" | "horizontal" | "compact";
}


export default function NewsList({
    title = "LATEST",
    data = listNews,
    columns = 1, variant}:NewsListProps) {
    //hiển thị 1 newsItem
    const getVariant = (): "grid" | "horizontal" | "compact" => {
        if (variant) return variant;
        if (columns > 1) return "grid";
        return "horizontal";
    };
    const getColClass = () => {
        if (columns === 3) return "col-12 col-md-4";
        return "col-12";
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