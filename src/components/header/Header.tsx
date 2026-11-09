import logo from "../../assets/images/logo.png";
import "./Header.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
    // Chỉ lấy biến isAuthenticated để kiểm tra trạng thái ẩn/hiện nút
    const { isAuthenticated } = useAuth();

    return (
        <header className="main-header">
            <div className="header-content">
                <div className="container d-flex align-items-center justify-content-between py-2">
                    {/* logo */}
                    <Link to="/" className="logo">
                        <img src={logo} alt="Thể Thao 247" />
                    </Link>

                    {/* menu bên phải */}
                    <div className="nav-right d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center gap-2 border-start ps-3 ms-2">
                            {/* Sửa lỗi merge: Đặt điều kiện nếu CHƯA đăng nhập thì hiện 2 nút này */}
                            {!isAuthenticated && (
                                <>
                                    <Link to="/login" className="btn-box login-btn">
                                        <i className="bi bi-person"></i>
                                        <span>Đăng nhập</span>
                                    </Link>

                                    <Link to="/register" className="btn-box">
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