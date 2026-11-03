import  { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    //biến kiểm tra user đăng nhập chưa
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                {/*trang chủ*/}
                <div className="nav-left">
                    <Link to="#" className="nav-link-item active">TRANG CHỦ</Link>

                    {/* bóng đá */}
                    <div className="nav-dropdown">
                        <Link to="#" className="nav-link-item highlight">
                            ⚽ BÓNG ĐÁ <i className="bi bi-chevron-down ms-1"></i>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="#" className="text-danger fw-bold">🔴 Tỉ số trực tiếp</Link>
                            <Link to="#">Chi tiết trận đấu</Link>
                            <Link to="#">Bảng xếp hạng & Đội bóng</Link>
                        </div>
                    </div>

                    {/* các môn thể thao khác */}
                    <Link to="#" className="nav-link-item">BÓNG CHUYỀN</Link>
                    <Link to="#" className="nav-link-item">TENNIS</Link>
                    <Link to="#" className="nav-link-item">ESPORTS</Link>
                </div>

                {/* tìm kiếm + lọc */}
                <div className="nav-center">
                    <div className="search-group">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tin tức..."
                            className="search-input"
                        />
                        <select className="filter-select">
                            <option value="newest">Mới nhất</option>
                            <option value="popular">Xem nhiều</option>
                        </select>
                        <button className="search-btn">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                {/* tiện ích cá nhân */}
                <div className="nav-right">
                    {/* nút đọc sau */}
                    <Link to="#" className="bookmark-btn" title="Bài viết đã lưu (Đọc sau)">
                        <i className="bi bi-bookmark-fill"></i>
                    </Link>

                    {/* nếu đã login hiện avatar */}
                    {isLoggedIn && (
                        <div className="nav-dropdown">
                            <div className="user-profile-trigger">
                                <img src="" alt="Avatar" className="user-avatar" />
                                <span className="username">Anh7CR7</span>
                            </div>
                            <div className="dropdown-content dropdown-right">
                                <Link to="#"><i className="bi bi-person me-2"></i>Trang cá nhân</Link>
                                <Link to="#"><i className="bi bi-bookmark me-2"></i>Mục đọc sau</Link>
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