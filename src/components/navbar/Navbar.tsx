import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            alert(`Đang tìm kiếm tin tức với từ khóa: "${searchTerm.trim()}"`);
            setSearchTerm('');
        }
    };

    const isHome = location.pathname === '/';
    const isLiveScores = location.pathname === '/live-scores';
    const isProfile = location.pathname === '/profile';

    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                {/* Trang chủ & Menu chính */}
                <div className="nav-left">
                    <Link to="/" className={`nav-link-item ${isHome ? 'active' : ''}`}>
                        TRANG CHỦ
                    </Link>

                    {/* Bóng đá Dropdown */}
                    <div className="nav-dropdown">
                        <Link to="/live-scores" className={`nav-link-item highlight ${isLiveScores ? 'active' : ''}`}>
                            ⚽ BÓNG ĐÁ <i className="bi bi-chevron-down ms-1"></i>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/live-scores" className="text-danger fw-bold d-flex align-items-center justify-content-between">
                                <span>🔴 Tỉ số trực tiếp</span>
                                <span className="badge bg-danger" style={{ fontSize: '10px' }}>LIVE</span>
                            </Link>
                            <Link to="/live-scores">Chi tiết trận đấu & Bình luận</Link>
                            <Link to="/">Bảng xếp hạng & Đội bóng</Link>
                        </div>
                    </div>

                    {/* Các môn thể thao phổ biến tại Việt Nam */}
                    <Link to="/" className="nav-link-item">DANH MỤC</Link>
                    <Link to="/" className="nav-link-item">ESPORTS</Link>
                </div>

                {/* Tìm kiếm + Lọc */}
                <div className="nav-center">
                    <form onSubmit={handleSearch} className="search-group">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tin tức, đội bóng..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select className="filter-select" aria-label="Bộ lọc tìm kiếm">
                            <option value="newest">Mới nhất</option>
                            <option value="popular">Phổ biến</option>
                        </select>
                        <button type="submit" className="search-btn" title="Tìm kiếm">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>

                {/* Tiện ích cá nhân */}
                <div className="nav-right">
                    {/* Nút Đọc sau dẫn về Profile */}
                    <Link to="/profile" className="bookmark-btn" title="Xem các bài viết đã lưu">
                        <i className="bi bi-bookmark-star-fill"></i>
                        <span>Đọc sau</span>
                    </Link>

                    {/* Nếu đã login hiện Avatar */}
                    {isAuthenticated && user ? (
                        <div className="nav-dropdown">
                            <div className={`user-profile-trigger ${isProfile ? 'active-profile' : ''}`}>
                                <img
                                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                                    alt={user.name}
                                    className="user-avatar"
                                />
                                <span className="username" title={user.name}>{user.name}</span>
                            </div>
                            <div className="dropdown-content dropdown-right shadow">
                                <div className="px-3 py-2 border-bottom bg-light">
                                    <div className="fw-bold small text-dark">{user.name}</div>
                                    <div className="text-muted" style={{ fontSize: '11px' }}>{user.email}</div>
                                </div>
                                <Link to="/profile">
                                    <i className="bi bi-person me-2 text-primary"></i>Trang cá nhân
                                </Link>
                                <Link to="/profile">
                                    <i className="bi bi-card-text me-2 text-success"></i>Sở thích & Bình luận
                                </Link>
                                <hr className="dropdown-divider my-1" />
                                <button type="button" onClick={logout} className="logout-btn text-danger">
                                    <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link-item text-white d-flex align-items-center gap-1">
                            <i className="bi bi-person-circle"></i>
                            <span className="d-none d-sm-inline">Đăng nhập</span>
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    );
}
