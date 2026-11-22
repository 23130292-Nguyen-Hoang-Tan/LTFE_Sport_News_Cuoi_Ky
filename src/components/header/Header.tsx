import logo from "../../assets/images/logo.png";
import "./Header.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="main-header">
            <div className="header-content">
                <div className="container d-flex align-items-center justify-content-between py-2">
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <img src={logo} alt="Thể Thao 247" />
                    </Link>

                    {/* Tagline / Thông tin cập nhật */}
                    <div className="header-tagline d-none d-lg-flex align-items-center gap-2 text-muted small">
                        <i className="bi bi-broadcast text-danger animate-pulse"></i>
                        <span>Kênh tin tức & Bình luận thể thao hàng đầu 24/7</span>
                    </div>

                    {/* Menu bên phải */}
                    <div className="nav-right d-flex align-items-center gap-3">
                        <Link to="/live-scores" className="btn-group-custom text-decoration-none">
                            <i className="bi bi-people-fill"></i>
                            <span>Góc cộng đồng</span>
                        </Link>

                        {/* Cụm User Authentication được tách biệt bằng viền dọc */}
                        <div className="d-flex align-items-center gap-2 border-start ps-3 ms-2">
                            {isAuthenticated && user ? (
                                <>
                                    <Link to="/profile" className="header-user-badge text-decoration-none" title="Xem thông tin cá nhân">
                                        <img
                                            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                                            alt={user.name}
                                            className="header-user-avatar"
                                        />
                                        <span className="header-user-name">{user.name}</span>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="btn-box header-logout-btn"
                                        title="Đăng xuất"
                                    >
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Đăng xuất</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn-box login-btn text-decoration-none">
                                        <i className="bi bi-person"></i>
                                        <span>Đăng nhập</span>
                                    </Link>

                                    <Link to="/register" className="btn-box text-decoration-none">
                                        <i className="bi bi-person-plus"></i>
                                        <span>Đăng ký</span>
                                    </Link>
                                </>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
