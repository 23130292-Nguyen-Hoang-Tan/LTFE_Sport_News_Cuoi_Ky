import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    // Biến kiểm tra user đăng nhập chưa
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                {/* Trang chủ */}
                <div className="nav-left">
                    <Link to="#" className="nav-link-item active">TRANG CHỦ</Link>

                    {/* Bóng đá */}
                    <div className="nav-dropdown">
                        <Link to="#" className="nav-link-item highlight">
                            ⚽ BÓNG ĐÁ <i className="bi bi-chevron-down ms-1"></i>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/live-scores" className="text-danger fw-bold">🔴 Tỉ số trực tiếp</Link>
                            <Link to="#">Chi tiết trận đấu</Link>
                            <Link to="#">Bảng xếp hạng & Đội bóng</Link>
                        </div>
                    </div>

                    {/* Danh mục các môn thể thao khác (Giao diện tĩnh giả lập từ API) */}
                    <div className="nav-dropdown">
                        <Link to="#" className="nav-link-item">
                            DANH MỤC <i className="bi bi-chevron-down ms-1"></i>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/category/basketball">Bóng rổ</Link>
                            <Link to="/category/tennis">Quần vợt (Tennis)</Link>
                            <Link to="/category/badminton">Cầu lông</Link>
                            <Link to="/category/motorsport">Đua xe (F1 / MotoGP)</Link>
                            <Link to="/category/martial-arts">Võ thuật (Boxing / UFC)</Link>
                            <Link to="/category/swimming">Bơi lội</Link>
                        </div>
                    </div>

                    <Link to="#" className="nav-link-item">ESPORTS</Link>
                </div>

                {/* Tìm kiếm + lọc */}
                <div className="nav-center">
                    <div className="search-group">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tin tức, đội bóng..."
                            className="search-input"
                        />
                        <select className="filter-select">
                            <option value="newest">Mới nhất</option>
                            <option value="popular">Phổ biến</option>
                        </select>
                        <button className="search-btn">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                {/* Tiện ích cá nhân */}
                <div className="nav-right">
                    {/* Nút đọc sau có nền nổi bật */}
                    <Link to="#" className="bookmark-btn" title="Bài viết đã lưu (Đọc sau)">
                        <i className="bi bi-bookmark-star-fill"></i>
                        <span>Đọc sau</span>
                    </Link>

                    {/* Nếu đã login hiện avatar */}
                    {isLoggedIn && (
                        <div className="nav-dropdown">
                            <div className="user-profile-trigger">
                                <img src="https://via.placeholder.com/32" alt="Avatar" className="user-avatar" />
                                <span className="username">Anh7CR7</span>
                            </div>
                            <div className="dropdown-content dropdown-right">
                                <Link to="#"><i className="bi bi-person me-2"></i>Trang cá nhân</Link>
                                <Link to="#"><i className="bi bi-card-text me-2"></i>Bài viết cá nhân</Link>
                                <hr className="dropdown-divider" />
                                <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
                                    <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}