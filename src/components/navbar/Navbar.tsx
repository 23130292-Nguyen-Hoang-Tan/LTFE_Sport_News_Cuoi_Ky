import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                {/*trang chủ*/}
                <div className="nav-left">
                    <Link to="/" className="nav-link-item active">TRANG CHỦ</Link>

                    {/* bóng đá */}
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

                    {/* Các môn thể thao phổ biến tại Việt Nam */}
                    <Link to="#" className="nav-link-item">DANH MỤC</Link>
                    <Link to="#" className="nav-link-item">ESPORTS</Link>
                </div>

                {/* tìm kiếm + lọc */}
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

                {/* tiện ích cá nhân */}
                <div className="nav-right">
                    {/* nút đọc sau có nền nổi bật */}
                    <Link to="#" className="bookmark-btn" title="Bài viết đã lưu (Đọc sau)">
                        <i className="bi bi-bookmark-star-fill"></i>
                        <span>Đọc sau</span>
                    </Link>

                    {/* nếu đã login hiện avatar */}
                    {isAuthenticated && user ? (
                        <div className="nav-dropdown">
                            <div className="user-profile-trigger">
                                <img
                                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                                    alt={user.name}
                                    className="user-avatar"
                                />
                                <span className="username" title={user.name}>{user.name}</span>
                            </div>
                            <div className="dropdown-content dropdown-right">
                                <Link to="/profile">
                                    <i className="bi bi-person me-2"></i>Trang cá nhân
                                </Link>
                                <Link to="/profile">
                                    <i className="bi bi-card-text me-2"></i>Bài viết cá nhân
                                </Link>
                                <hr className="dropdown-divider" />
                                <button type="button" onClick={logout} className="logout-btn">
                                    <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link-item text-white d-flex align-items-center gap-1">
                            <i className="bi bi-person-circle"></i>
                            <span className="d-none d-sm-inline">Tài khoản</span>
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    );
}
