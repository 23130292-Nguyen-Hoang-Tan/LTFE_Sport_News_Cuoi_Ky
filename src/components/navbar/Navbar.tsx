import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                {/* Trang chủ */}
                <div className="nav-left">
                    <Link to="/" className="nav-link-item">TRANG CHỦ</Link>

                    {/* Bóng đá */}
                    <div className="nav-dropdown">
                        <Link to="#" className="nav-link-item">
                             BÓNG ĐÁ <i className="bi bi-chevron-down ms-1"></i>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/live-scores" className="text-danger fw-bold">Tỉ số trực tiếp</Link>
                            <Link to="/match-detail" className="text-primary fw-bold">Chi tiết trận đấu</Link>
                            <Link to="/standings" className="text-success fw-bold">Bảng xếp hạng & Đội bóng</Link>
                        </div>
                    </div>

                    {/* Danh mục các môn thể thao khác */}
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

                    {/* Esports có menu thả xuống */}
                    <div className="nav-dropdown">
                        <Link to="#" className="nav-link-item">
                            ESPORTS <i className="bi bi-chevron-down ms-1"></i>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/esports/lol">Liên Minh Huyền Thoại (LoL)</Link>
                            <Link to="/esports/dota2">Dota 2</Link>
                            <Link to="/esports/cs2">CS2 (Counter-Strike)</Link>
                            <Link to="/esports/valorant">Valorant</Link>
                            <Link to="/esports/pubg">PUBG / Mobile</Link>
                            <Link to="/esports/fifa">FC Online (FIFA)</Link>
                        </div>
                    </div>
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
                    <Link to="/saved-articles" className="bookmark-btn" title="Bài viết đã lưu (Đọc sau)">
                        <i className="bi bi-bookmark-star-fill"></i>
                        <span>Đọc sau</span>
                    </Link>

                    {isAuthenticated ? (
                        <div className="nav-dropdown">
                            <div className="user-profile-trigger">
                                <img
                                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                                    alt={user?.name || "User"}
                                    className="user-avatar"
                                />
                                <span className="username" title={user?.name}>{user?.name || "Người dùng"}</span>
                            </div>
                            <div className="dropdown-content dropdown-right">
                                <Link to="/profile"><i className="bi bi-person me-2"></i>Trang cá nhân</Link>
                                <Link to="#"><i className="bi bi-card-text me-2"></i>Bài viết cá nhân</Link>
                                <hr className="dropdown-divider" />
                                <button type="button" onClick={logout} className="logout-btn">
                                    <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="nav-dropdown">
                            <Link to="/login" className="nav-link-item text-white d-flex align-items-center gap-1">
                                <i className="bi bi-person-circle"></i>
                                <span className="d-none d-sm-inline">Tài khoản</span>
                            </Link>
                            <div className="dropdown-content dropdown-right">
                                <Link to="/profile"><i className="bi bi-person me-2"></i>Trang cá nhân</Link>
                                <Link to="/login"><i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập</Link>
                                <Link to="/register"><i className="bi bi-person-plus me-2"></i>Đăng ký</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}