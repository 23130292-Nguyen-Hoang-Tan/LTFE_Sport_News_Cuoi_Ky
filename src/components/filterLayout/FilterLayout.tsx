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
    const { searchKeyword, sortBy, isSearchOpen, selectedCategory, clearFilters } = useFilter();
    const location = useLocation();

    // tải dữ liệu từ rss
    useEffect(() => {
        fetchData()
            .then((data) => setAllNews(data))
            .finally(() => setIsLoading(false));
    }, []);

    // tats giao diện tìm kiếm nếu người dùng chuyển trang hoặc tắt tìm kiếm
    useEffect(() => {
        clearFilters();
    }, [clearFilters, location.pathname]);

    const keyword = searchKeyword.trim().toLowerCase();

    //kiểm tra có đang ở trang chủ hay không
    const isHomePage = location.pathname === "/";
    const showFilterLayout =
        isSearchOpen || selectedCategory !== "" || (isHomePage && sortBy !== "default");

    //nếu không có từ khóa thì sắp xếp toàn bộ danh sách
    const filteredNews = allNews.filter((item) => {
        const matchCategory = selectedCategory ? item.category === selectedCategory : true;
        const matchKeyword = keyword
            ? item.title.toLowerCase().includes(keyword) ||
            item.description?.toLowerCase().includes(keyword)
            : true;
        return matchCategory && matchKeyword;
    });

    //sắp xếp danh sách theo lựa chọn
    const sortedNews = [...filteredNews].sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        if (sortBy === "oldest") {
            return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        }
        if (sortBy === "popular") {
            return (b.viewsCount || 0) - (a.viewsCount || 0);
        }
        return 0;
    });

    //nhãn hiển thị tương ứng với kiểu sắp xếp đang chọn
    const sortLabels: Record<string, string> = {
        newest: "Mới nhất",
        oldest: "Cũ nhất",
        popular: "Phổ biến",
    };

    return (
        <div className="main-content">
            {showFilterLayout ? (
                <div className="container my-4 filter-results-container">
                    <div className="filter-header-bar mb-4">
                        <span className="text-dark">
                            Tìm thấy <b className="text-danger">{sortedNews.length}</b> kết quả
                            {/* hiển thị tên danh mục đang chọn*/}
                            {selectedCategory && (
                                <>
                                    {" "}trong danh mục <b className="text-danger">{selectedCategory}</b>
                                </>
                            )}
                            {/* ...cho từ khóa */}
                            {keyword && (
                                <>
                                    {" "}cho từ khóa <b>"{searchKeyword}"</b>
                                </>
                            )}
                            {/* hiển thị nhãn theo kiểu sắp xếp người dùng chọn */}
                            {sortBy !== "default" && (
                                <>
                                    {" "}— Sắp xếp: <b className="text-danger">{sortLabels[sortBy]}</b>
                                </>
                            )}
                        </span>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={clearFilters}
                        >
                            <i className="bi bi-x-lg me-1"></i>Đóng tìm kiếm
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-danger" role="status"></div>
                            <p className="text-muted mt-2">Đang tải dữ liệu tin tức...</p>
                        </div>
                    ) : sortedNews.length > 0 ? (
                        <NewsList
                            // ưu tiên hiênr thị tên danh mục nếu đang lọc danh mục
                            title={
                                selectedCategory
                                    ? `CHUYÊN MỤC: ${selectedCategory.toUpperCase()}`
                                    : keyword
                                        ? `KẾT QUẢ TÌM KIẾM: "${searchKeyword.toUpperCase()}"`
                                        : sortBy !== "default"
                                            ? `TIN TỨC THEO: ${sortLabels[sortBy]?.toUpperCase()}`
                                            : "TẤT CẢ TIN TỨC"
                            }
                            data={sortedNews}
                            columns={1}
                            variant="horizontal"
                        />
                    ) : (
                        <div className="filter-empty-state">
                            <i className="bi bi-search fs-1 text-secondary"></i>
                            <h5 className="mt-3 text-dark">Không tìm thấy bài viết nào</h5>
                            {/* thông báo không timf thấy theo danh mục hoặc từ khái */}
                            <p className="text-muted mb-3">
                                {selectedCategory
                                    ? `Hiện chưa có bài viết mới nào thuộc chuyên mục "${selectedCategory}".`
                                    : `Không có kết quả nào khớp với từ khóa "${searchKeyword}". Hãy thử từ khóa khác!`}
                            </p>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={clearFilters}
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