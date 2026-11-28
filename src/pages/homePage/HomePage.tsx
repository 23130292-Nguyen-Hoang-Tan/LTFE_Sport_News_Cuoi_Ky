import "./HomePage.css";
import FeatureNews from "../../components/featureNews/FeatureNews";
import NewsList from "../../components/newsList/NewsList";
import type { NewsType } from "../../data/news.ts";
import { useState, useEffect } from "react";
import { fetchData } from "../../service/rssService.ts";
import { Link } from "react-router-dom";
import CommentSection from "../../components/comments/CommentSection";

export default function HomePage() {
    //lưu danh sách news lấy ra từ rss
    const [newsList, setNewsList] = useState<NewsType[]>([]);

    useEffect(() => {
        async function loadNews() {
            const data = await fetchData();
            setNewsList(data);
        }
        loadNews();
    }, []);

    return (
        <div className="site-wrapper">
            <main className="main-content site-layout py-3 px-3">
                <div className="news-container">
                    {/*truyền bài đầu tiên làm tin nổi bật*/}
                    <FeatureNews news={newsList[0]} />
                    <NewsList data={newsList.slice(1)}/>
                </div>

                {/* Banner chuyển đến Tỉ số trực tiếp */}
                <div className="live-match-banner p-3 p-md-4 rounded mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <div className="live-pulse-icon">
                            <i className="bi bi-broadcast text-danger fs-3"></i>
                        </div>
                        <div>
                            <h5 className="fw-bold text-white mb-1">Theo dõi Tỉ số Trực tiếp các Trận đấu Đỉnh cao</h5>
                            <p className="text-white-50 small mb-0">Cập nhật bàn thắng, thẻ phạt, sự kiện và cùng thảo luận với cộng đồng người hâm mộ.</p>
                        </div>
                    </div>
                    <Link to="/live-scores" className="btn btn-warning fw-bold px-4">
                        🔴 Xem Tỉ số Trực tiếp
                    </Link>
                </div>

                {/* Khối tin tức từ nhóm (FeatureNews + NewsList) */}
                <div className="news-container mb-4">
                    <FeatureNews />
                    <NewsList />
                </div>

                {/* Phần bình luận & diễn đàn thảo luận thể thao */}
                <CommentSection title="Diễn Đàn Thể Thao 247 - Nhận Định & Thảo Luận" />
            </main>
        </div>
    );
}
