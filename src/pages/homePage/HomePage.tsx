import { Link } from 'react-router-dom';
import FeatureNews from '../../components/featureNews/FeatureNews';
import NewsList from '../../components/newsList/NewsList';
import CommentSection from '../../components/comments/CommentSection';
import './HomePage.css';

export default function HomePage() {
    return (
        <div className="site-wrapper">
            <main className="main-content site-layout py-3 px-3">
                {/* Thanh tin vắn / Breaking news ticker */}
                <div className="breaking-news-bar d-flex align-items-center gap-2 p-2 px-3 mb-4 rounded border">
                    <span className="badge bg-danger text-uppercase fw-bold px-2 py-1">
                        <i className="bi bi-lightning-fill me-1"></i>Tin nóng
                    </span>
                    <span className="breaking-news-text text-truncate flex-grow-1 small">
                        Trận derby London giữa Arsenal và Chelsea đang diễn biến căng thẳng với tỉ số 2 - 1. Xem ngay tại Tỉ số trực tiếp!
                    </span>
                    <Link to="/live-scores" className="btn btn-sm btn-outline-danger py-0 px-2 small">
                        Xem ngay
                    </Link>
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
