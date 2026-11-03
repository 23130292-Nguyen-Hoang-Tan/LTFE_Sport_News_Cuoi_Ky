import logo from "../../assets/images/logo.png";
import "./Header.css";
import { Link } from 'react-router-dom';

function Header() {
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

                        <Link to="#" className="nav-item post">
                            <i className="bi bi-pencil"></i>
                            <span>Đăng bài</span>
                        </Link>
                        
                        <Link to="#" className="btn-group-custom">
                            <i className="bi bi-people-fill"></i>
                            <span>Góc cộng đồng</span>
                        </Link>

                        {/* Cụm User Authentication được tách biệt bằng viền dọc */}
                        <div className="d-flex align-items-center gap-2 border-start ps-3 ms-2">
                            <Link to="#" className="btn-box login-btn">
                                <i className="bi bi-person"></i>
                                <span>Đăng nhập</span>
                            </Link>

                            <Link to="#" className="btn-box">
                                <i className="bi bi-person-plus"></i>
                                <span>Đăng ký</span>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;