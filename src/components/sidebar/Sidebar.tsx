import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <aside className="sidebar-wrapper">
            {/* tiện ích bóng đá */}
            <div className="utility-widget mb-4">
                <div className="latest-header position-relative">
                    <div className="latest-tab d-inline-flex align-items-center text-white fw-bold px-3 py-1 fs-6">
                        TIỆN ÍCH BÓNG ĐÁ
                    </div>
                </div>
                <div className="utility-list p-3">
                    <Link to="#" className="utility-item d-flex align-items-center text-decoration-none">
                        <i className="bi bi-calendar3 utility-icon me-3"></i>
                        <span>Lịch thi đấu</span>
                    </Link>

                    <Link to="#" className="utility-item d-flex align-items-center text-decoration-none">
                        <i className="bi bi-broadcast text-danger utility-icon me-3"></i>
                        <span>Trực tiếp bóng đá</span>
                    </Link>

                    <Link to="#" className="utility-item d-flex align-items-center text-decoration-none">
                        <i className="bi bi-award utility-icon me-3"></i>
                        <span>Kết quả bóng đá</span>
                    </Link>

                    <Link to="#" className="utility-item d-flex align-items-center text-decoration-none">
                        <i className="bi bi-camera-video utility-icon me-3"></i>
                        <span>Livescore</span>
                    </Link>

                    <Link to="#" className="utility-item d-flex align-items-center text-decoration-none">
                        <i className="bi bi-trophy utility-icon me-3"></i>
                        <span>Bảng xếp hạng bóng đá</span>
                    </Link>
                </div>
            </div>

            {/* liên kết hữu ích */}
            <div className="useful-links-widget mb-4">
                <div className="useful-header px-3 py-2 fw-bold d-flex align-items-center">
                    <span>LIÊN KẾT HỮU ÍCH</span>
                    <i className="bi bi-link-45deg ms-1 fs-5"></i>
                </div>
                <div className="useful-list">
                    <Link to="#" className="useful-item d-flex align-items-center px-3 py-2 text-decoration-none">
                        <i className="bi bi-chevron-right me-2 fw-bold"></i>
                        <span>Ngôi sao</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}