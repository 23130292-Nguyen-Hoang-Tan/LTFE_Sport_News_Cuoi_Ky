import { Link } from 'react-router-dom';
import './NewsComment.css';

export default function NewsComments() {
    return (
        <section className="news-comments-section mt-4">
            {/* header bình luận */}
            <div className="comments-header d-flex align-items-center gap-2 mb-3">
    <i className="bi bi-chat-square-dots-fill comments-icon"></i>
        <h3 className="comments-title m-0">Bình luận</h3>
    </div>

    {/* khung đăng nhập để bình luận */}
    <div className="comment-input-box mb-3">
    <p className="m-0 text-muted">
        Vui lòng <Link to="/login" className="login-link fw-bold">Đăng nhập</Link> để bình luận
    </p>
    </div>

    {/* báo cáo nội dung/khiếu nại bản quyền */}
    <div className="d-flex justify-content-end">
    <button className="btn-report">
        BÁO CÁO NỘI DUNG / KHIẾU NẠI BẢN QUYỀN <i className="bi bi-file-earmark-text ms-1"></i>
        </button>
        </div>
        </section>
);
}