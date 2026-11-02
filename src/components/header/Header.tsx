import logo from "../../assets/images/logo.png";
import "./Header.css";

function Header() {
    return (
        <header className="main-header">
            <div className="header-content">
                <div className="container d-flex align-items-center justify-content-between py-2">
                    {/* logo */}
                    <a href="#" className="logo">
                        <img src={logo} alt="Thể Thao 247" />
                    </a>

                    {/* menu bên phải */}
                    <div className="nav-right d-flex align-items-center gap-3">
                        <a href="#" className="nav-item qc">
                            <i className="bi bi-bullseye red"></i>
                            <span>QUẢNG CÁO</span>
                        </a>

                        <a href="#" className="nav-item post">
                            <i className="bi bi-pencil"></i>
                            <span>Đăng bài</span>
                        </a>

                        <a href="#" className="btn-box">
                            <i className="bi bi-person-plus"></i>
                            <span>Đăng ký</span>
                        </a>

                        <a href="#" className="btn-box">
                            <i className="bi bi-person"></i>
                            <span>Đăng nhập</span>
                        </a>

                        <a href="#" className="btn-group-custom">
                            <i className="bi bi-people-fill"></i>
                            <span>Nhóm cộng đồng</span>
                            <i className="bi bi-chevron-down"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;