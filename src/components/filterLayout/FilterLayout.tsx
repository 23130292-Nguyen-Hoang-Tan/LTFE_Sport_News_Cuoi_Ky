import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NewsList from "../newsList/NewsList";
import { fetchData } from "../../service/rssService";
import type { NewsType } from "../../data/news";
import { useFilter } from "../../context/FilterContext";
import "./FilterLayout.css";

interface FilterLayoutProps {
    children: React.ReactNode;
}

export default function FilterLayout({ children }: FilterLayoutProps) {
    const [allNews, setAllNews] = useState<NewsType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { searchKeyword, setSearchKeyword } = useFilter();
    const location = useLocation();

    // tải dữ liệu từ rss
    useEffect(() => {
        fetchData()
            .then((data) => setAllNews(data))
            .finally(() => setIsLoading(false));
    }, []);

    // tats giao diện tìm kiếm nếu người dùng chuyển trang hoặc tắt tìm kiếm
    useEffect(() => {
        setSearchKeyword("");
    }, [location.pathname, setSearchKeyword]);

    const keyword = searchKeyword.trim().toLowerCase();
    const searchedNews = keyword
        ? allNews.filter(
            (item) =>
                item.title.toLowerCase().includes(keyword) ||
                item.description?.toLowerCase().includes(keyword)
        )
        : [];

    return (
        <div className="main-content">
            {keyword !== "" ? (
                <div className="container my-4 filter-results-container">
                    <div className="filter-header-bar mb-4">
                        <span className="text-dark">
                            Tìm thấy <b className="text-danger">{searchedNews.length}</b> kết quả cho từ khóa{" "}
                            <b>"{searchKeyword}"</b>
                        </span>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setSearchKeyword("")}
                        >
                            <i className="bi bi-x-lg me-1"></i>Đóng tìm kiếm
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-danger" role="status"></div>
                            <p className="text-muted mt-2">Đang tải dữ liệu tin tức...</p>
                        </div>
                    ) : searchedNews.length > 0 ? (
                        <NewsList
                            title={`KẾT QUẢ TÌM KIẾM: "${searchKeyword.toUpperCase()}"`}
                            data={searchedNews}
                            columns={1}
                            variant="horizontal"
                        />
                    ) : (
                        <div className="filter-empty-state">
                            <i className="bi bi-search fs-1 text-secondary"></i>
                            <h5 className="mt-3 text-dark">Không tìm thấy bài viết nào</h5>
                            <p className="text-muted mb-3">
                                Không có kết quả nào khớp với từ khóa "{searchKeyword}". Hãy thử từ khóa khác!
                            </p>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => setSearchKeyword("")}
                            >
                                Quay lại trang hiện tại
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                children
            )}
        </div>
    );
}