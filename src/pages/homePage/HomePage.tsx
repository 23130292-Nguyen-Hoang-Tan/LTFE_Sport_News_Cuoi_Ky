import { Link } from 'react-router-dom';
import CommentSection from '../../components/comments/CommentSection';
import './HomePage.css';

const FEATURED_NEWS = [
    {
        id: 1,
        title: 'Arsenal đại chiến Chelsea: Kịch tính derby London và bước ngoặt phút 65',
        summary: 'Trận cầu tâm điểm vòng đấu diễn ra với tốc độ nghẹt thở, thẻ đỏ gây tranh cãi và những bàn thắng đẳng cấp của các ngôi sao.',
        category: 'Ngoại Hạng Anh',
        badgeColor: 'bg-danger',
        time: '35 phút trước',
        commentsCount: 12,
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 2,
        title: 'Cập nhật trực tiếp lượt trận vòng bảng UEFA Champions League 2026',
        summary: 'Real Madrid, Manchester City và Bayern Munich đồng loạt xuất trận trong đêm nay với quyết tâm giành trọn 3 điểm.',
        category: 'Cúp C1',
        badgeColor: 'bg-primary',
        time: '1 giờ trước',
        commentsCount: 8,
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 3,
        title: 'Phân tích chiến thuật: Xu hướng pressing tầm cao của bóng đá hiện đại',
        summary: 'Cách các huấn luyện viên hàng đầu thế giới tối ưu hóa cự ly đội hình và chuyển đổi trạng thái chớp nhoáng.',
        category: 'Góc Chuyên Gia',
        badgeColor: 'bg-success',
        time: '3 giờ trước',
        commentsCount: 15,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80'
    }
];

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

                {/* Khối tin tức nổi bật (Featured Grid) */}
                <div className="row g-4 mb-4">
                    {/* Tin chính lớn bên trái */}
                    <div className="col-12 col-lg-8">
                        <div className="card news-card-main border-0 shadow-sm overflow-hidden h-100">
                            <div className="news-img-wrapper position-relative">
                                <img
                                    src={FEATURED_NEWS[0].image}
                                    alt={FEATURED_NEWS[0].title}
                                    className="w-100 main-news-img"
                                />
                                <span className={`badge ${FEATURED_NEWS[0].badgeColor} position-absolute top-0 start-0 m-3 px-3 py-2`}>
                                    {FEATURED_NEWS[0].category}
                                </span>
                            </div>
                            <div className="card-body p-4">
                                <h4 className="fw-bold text-dark mb-2">
                                    <Link to="/live-scores" className="text-decoration-none text-dark hover-primary">
                                        {FEATURED_NEWS[0].title}
                                    </Link>
                                </h4>
                                <p className="text-muted mb-3">{FEATURED_NEWS[0].summary}</p>
                                <div className="d-flex align-items-center justify-content-between text-muted small border-top pt-3">
                                    <span><i className="bi bi-clock me-1"></i>{FEATURED_NEWS[0].time}</span>
                                    <Link to="/live-scores" className="text-decoration-none text-primary fw-semibold">
                                        <i className="bi bi-chat-left-text me-1"></i>{FEATURED_NEWS[0].commentsCount} bình luận
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2 Tin phụ bên phải */}
                    <div className="col-12 col-lg-4 d-flex flex-column gap-3">
                        {FEATURED_NEWS.slice(1).map(news => (
                            <div key={news.id} className="card border-0 shadow-sm overflow-hidden news-sub-card">
                                <img src={news.image} alt={news.title} className="w-100 sub-news-img" />
                                <div className="card-body p-3">
                                    <span className={`badge ${news.badgeColor} mb-2`}>{news.category}</span>
                                    <h6 className="fw-bold mb-2">
                                        <Link to="/live-scores" className="text-decoration-none text-dark hover-primary">
                                            {news.title}
                                        </Link>
                                    </h6>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span><i className="bi bi-clock me-1"></i>{news.time}</span>
                                        <span><i className="bi bi-chat-left-text me-1"></i>{news.commentsCount} bình luận</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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

                {/* Phần bình luận & diễn đàn thảo luận thể thao */}
                <CommentSection title="Diễn Đàn Thể Thao 247 - Nhận Định & Thảo Luận" />
            </main>
        </div>
    );
}
