import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';
import './Login.css';

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy trang trước đó để redirect sau khi login thành công (nếu có)
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Xử lý submit đăng nhập
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim()) {
            setError('Vui lòng nhập địa chỉ email!');
            return;
        }

        if (!password) {
            setError('Vui lòng nhập mật khẩu!');
            return;
        }

        setIsLoading(true);
        const result = await login({ email, password, remember });
        setIsLoading(false);

        if (result.success) {
            setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...');
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 800);
        } else {
            setError(result.message || 'Đăng nhập không thành công.');
        }
    };

    // Điền nhanh tài khoản mẫu
    const handleQuickFill = (demoEmail: string, demoPass: string) => {
        setEmail(demoEmail);
        setPassword(demoPass);
        setError(null);
    };

    return (
        <div className="login-page">
            <div className="login-card-wrapper">
                <div className="login-card">
                    {/* Header Card */}
                    <div className="login-header">
                        <Link to="/" className="login-logo-link">
                            <img src={logo} alt="Thể Thao 247" className="login-logo" />
                        </Link>
                        <h2 className="login-title">Đăng Nhập Tài Khoản</h2>
                        <p className="login-subtitle">Chào mừng bạn quay lại với chuyên trang Thể Thao 247</p>
                    </div>

                    {/* Thông báo đã đăng nhập */}
                    {isAuthenticated && !successMsg && (
                        <div className="alert alert-info d-flex align-items-center gap-2 mb-3">
                            <i className="bi bi-info-circle-fill"></i>
                            <div>
                                Bạn hiện đang đăng nhập. <Link to="/" className="fw-bold">Về trang chủ</Link>
                            </div>
                        </div>
                    )}

                    {/* Thông báo lỗi */}
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center gap-2 mb-3 animate-fade-in" role="alert">
                            <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
                            <div className="error-text">{error}</div>
                        </div>
                    )}

                    {/* Thông báo thành công */}
                    {successMsg && (
                        <div className="alert alert-success d-flex align-items-center gap-2 mb-3 animate-fade-in" role="alert">
                            <i className="bi bi-check-circle-fill flex-shrink-0"></i>
                            <div>{successMsg}</div>
                        </div>
                    )}

                    {/* Form đăng nhập */}
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="email-input">
                                <i className="bi bi-envelope me-1"></i> Email
                            </label>
                            <div className="input-group-custom">
                                <span className="input-icon">
                                    <i className="bi bi-envelope-at"></i>
                                </span>
                                <input
                                    id="email-input"
                                    type="email"
                                    className="form-control-custom"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <label className="form-label mb-0" htmlFor="password-input">
                                    <i className="bi bi-lock me-1"></i> Mật khẩu
                                </label>
                                <a
                                    href="#forgot"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert('Vui lòng liên hệ quản trị viên (admin@thethao247.vn) hoặc dùng mật khẩu mặc định "123456" để đăng nhập.');
                                    }}
                                    className="forgot-password-link"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <div className="input-group-custom">
                                <span className="input-icon">
                                    <i className="bi bi-shield-lock"></i>
                                </span>
                                <input
                                    id="password-input"
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control-custom"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                <span className="checkbox-label">Ghi nhớ đăng nhập</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn-submit-login"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Đăng Nhập
                                </>
                            )}
                        </button>
                    </form>

                    {/* Tài khoản demo để tiện chấm bài / kiểm thử */}
                    <div className="demo-accounts-box mt-4">
                        <div className="demo-title">
                            <i className="bi bi-lightning-charge-fill text-warning me-1"></i>
                            Tài khoản mẫu (Nhấp để điền nhanh):
                        </div>
                        <div className="demo-chips">
                            <button
                                type="button"
                                className="demo-chip-btn"
                                onClick={() => handleQuickFill('admin@thethao247.vn', '123456')}
                            >
                                <span className="badge bg-danger me-1">Admin</span>
                                admin@thethao247.vn (123456)
                            </button>
                            <button
                                type="button"
                                className="demo-chip-btn"
                                onClick={() => handleQuickFill('cr7@thethao247.vn', '123456')}
                            >
                                <span className="badge bg-primary me-1">User</span>
                                cr7@thethao247.vn (123456)
                            </button>
                        </div>
                    </div>

                    {/* Phân cách */}
                    <div className="separator-container my-4">
                        <div className="separator-line"></div>
                        <span className="separator-text">hoặc đăng nhập bằng</span>
                        <div className="separator-line"></div>
                    </div>

                    {/* Social Login buttons */}
                    <div className="social-buttons d-flex gap-2">
                        <button
                            type="button"
                            className="social-btn google-btn"
                            onClick={() => handleQuickFill('cr7@thethao247.vn', '123456')}
                        >
                            <i className="bi bi-google text-danger me-2"></i>
                            Google
                        </button>
                        <button
                            type="button"
                            className="social-btn facebook-btn"
                            onClick={() => handleQuickFill('user@thethao247.vn', '123456')}
                        >
                            <i className="bi bi-facebook text-primary me-2"></i>
                            Facebook
                        </button>
                    </div>

                    {/* Chuyển sang Đăng ký */}
                    <div className="login-footer text-center mt-4 pt-3 border-top">
                        <span className="text-muted">Chưa có tài khoản? </span>
                        <Link to="/register" className="register-link fw-bold">
                            Đăng ký ngay <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
