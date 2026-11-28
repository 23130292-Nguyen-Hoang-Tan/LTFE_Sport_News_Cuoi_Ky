import { type FormEvent, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFilter } from '../../context/FilterContext';
import './Navbar.css';
import type { SortOption } from "../../context/FilterContext";


export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const {
        searchKeyword,
        setSearchKeyword,
        sortBy,
        setSortBy,
        setIsSearchOpen,
        setSelectedCategory,
    } = useFilter();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            setIsSearchOpen(true);
        } else {
            setIsSearchOpen(false);
        }
    };

    const handleSelectCategory = (e: MouseEvent<HTMLAnchorElement>, category: string) => {
        e.preventDefault();
        setSelectedCategory(category);
        setIsSearchOpen(true);
    };

    const isHome = location.pathname === '/';
    const canSort = isHome;
    const isLiveScores = location.pathname === '/live-scores' || location.pathname === '/match-detail' || location.pathname === '/standings';
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
                        <Link to="/live-scores" className={`nav-link-item ${isLiveScores ? 'active highlight' : ''}`}>
                            ⚽ BÓNG ĐÁ <i className="bi bi-chevron-down ms-1"></i>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="/live-scores" className="text-danger fw-bold d-flex align-items-center justify-content-between">
                                <span>🔴 Tỉ số trực tiếp</span>
                                <span className="badge bg-danger" style={{ fontSize: '10px' }}>LIVE</span>
                            </Link>
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
                            <Link to="#" onClick={(e) => handleSelectCategory(e, "Bóng rổ")}>Bóng rổ</Link>
                            <Link to="#" onClick={(e) => handleSelectCategory(e, "Bóng đá")}>Bóng đá</Link>
                            <Link to="#" onClick={(e) => handleSelectCategory(e, "Quần vợt (Tennis)")}>Quần vợt (Tennis)</Link>
                            <Link to="#" onClick={(e) => handleSelectCategory(e, "Cầu lông")}>Cầu lông</Link>
                            <Link to="#" onClick={(e) => handleSelectCategory(e, "Đua xe (F1 / MotoGP)")}>Đua xe (F1 / MotoGP)</Link>
                            <Link to="#" onClick={(e) => handleSelectCategory(e, "Võ thuật (Boxing / UFC)")}>Võ thuật (Boxing / UFC)</Link>
                            <Link to="#" onClick={(e) => handleSelectCategory(e, "Bơi lội")}>Bơi lội</Link>
                        </div>
                    </div>

                    {/* Esports có menu thả xuống */}
                    <div className="nav-dropdown">
                        <Link to="#" className="nav-link-item">
                            ESPORTS <i className="bi bi-chevron-down ms-1"></i>
                        </Link>
                        <div className="dropdown-content">
                            <Link to="#">Liên Minh Huyền Thoại (LoL)</Link>
                            <Link to="#">Dota 2</Link>
                            <Link to="#">CS2 (Counter-Strike)</Link>
                            <Link to="#">Valorant</Link>
                            <Link to="#">PUBG / Mobile</Link>
                            <Link to="#">FC Online (FIFA)</Link>
                        </div>
                    </div>
                </div>

                {/* Tìm kiếm + sắp xếp */}
                <div className="nav-center">
                    <form onSubmit={handleSearch} className="search-group">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tin tức, đội bóng..."
                            className="search-input"
                            value={searchKeyword}
                            onFocus={() => setIsSearchOpen(true)}
                            onChange={(e) => {
                                setIsSearchOpen(true);
                                setSearchKeyword(e.target.value);
                            }}
                        />
                        <select
                            className="filter-select"
                            value={sortBy}
                            disabled={!canSort}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                        >
                            <option value="default">Sắp xếp</option>
                            <option value="newest">Mới nhất</option>
                            <option value="oldest">Cũ nhất</option>
                            <option value="popular">Phổ biến</option>
                        </select>
                        <button
                            type="button"
                            className="search-btn"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>

                {/* Tiện ích cá nhân */}
                <div className="nav-right">
                    {/* Nút Đọc sau */}
                    <Link to="/saved-articles" className="bookmark-btn" title="Bài viết đã lưu (Đọc sau)">
                        <i className="bi bi-bookmark-star-fill"></i>
                        <span>Đọc sau</span>
                    </Link>

                    {/* Nếu đã login hiện Avatar */}
                    {isAuthenticated && user ? (
                        <div className="nav-dropdown">
                            <div className={`user-profile-trigger ${isProfile ? 'active-profile' : ''}`}>
                                <img
                                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                                    alt={user.name || "User"}
                                    className="user-avatar"
                                />
                                <span className="username" title={user.name}>{user.name || "Người dùng"}</span>
                            </div>
                            <div className="dropdown-content dropdown-right shadow">
                                <div className="px-3 py-2 border-bottom bg-light">
                                    <div className="fw-bold small text-dark">{user.name}</div>
                                    <div className="text-muted" style={{ fontSize: '11px' }}>{user.email}</div>
                                </div>
                                <Link to="/profile">
                                    <i className="bi bi-person me-2 text-primary"></i>Trang cá nhân
                                </Link>
                                <Link to="/saved-articles">
                                    <i className="bi bi-bookmark-check me-2 text-warning"></i>Bài viết đã lưu
                                </Link>
                                <hr className="dropdown-divider my-1" />
                                <button type="button" onClick={logout} className="logout-btn text-danger">
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
                            <div className="dropdown-content dropdown-right shadow">
                                <Link to="/login">
                                    <i className="bi bi-box-arrow-in-right me-2 text-primary"></i>Đăng nhập
                                </Link>
                                <Link to="/register">
                                    <i className="bi bi-person-plus me-2 text-success"></i>Đăng ký
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}
