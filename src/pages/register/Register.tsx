import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';
import '../login/Login.css';

export default function Register() {
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError('Vui lòng nhập họ và tên của bạn!');
            return;
        }

        if (!email.trim()) {
            setError('Vui lòng nhập địa chỉ email!');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu nhập lại không trùng khớp!');
            return;
        }

        if (!agreeTerms) {
            setError('Vui lòng đồng ý với điều khoản sử dụng!');
            return;
        }

        setIsLoading(true);
        const result = await register({ name, email, password, confirmPassword });
        setIsLoading(false);

        if (result.success) {
            setSuccessMsg('Đăng ký tài khoản thành công! Đang chuyển đến trang chủ...');
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1000);
        } else {
            setError(result.message || 'Đăng ký không thành công.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card-wrapper">
                <div className="login-card">
                    <div className="login-header">
                        <Link to="/" className="login-logo-link">
                            <img src={logo} alt="Thể Thao 247" className="login-logo" />
                        </Link>
                        <h2 className="login-title">Đăng Ký Thành Viên</h2>
                        <p className="login-subtitle">Tham gia cộng đồng người hâm mộ thể thao sôi động</p>
                    </div>

                    {isAuthenticated && !successMsg && (
                        <div className="alert alert-info d-flex align-items-center gap-2 mb-3">
                            <i className="bi bi-info-circle-fill"></i>
                            <div>
                                Bạn hiện đang đăng nhập. <Link to="/" className="fw-bold">Về trang chủ</Link>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger d-flex align-items-center gap-2 mb-3 animate-fade-in" role="alert">
                            <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
                            <div className="error-text">{error}</div>
                        </div>
                    )}

                    {successMsg && (
                        <div className="alert alert-success d-flex align-items-center gap-2 mb-3 animate-fade-in" role="alert">
                            <i className="bi bi-check-circle-fill flex-shrink-0"></i>
                            <div>{successMsg}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="name-input">
                                <i className="bi bi-person me-1"></i> Họ và tên
                            </label>
                            <div className="input-group-custom">
                                <span className="input-icon">
                                    <i className="bi bi-person-badge"></i>
                                </span>
                                <input
                                    id="name-input"
                                    type="text"
                                    className="form-control-custom"
                                    placeholder="Ví dụ: Đặng Thanh Tân"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="register-email">
                                <i className="bi bi-envelope me-1"></i> Địa chỉ Email
                            </label>
                            <div className="input-group-custom">
                                <span className="input-icon">
                                    <i className="bi bi-envelope-at"></i>
                                </span>
                                <input
                                    id="register-email"
                                    type="email"
                                    className="form-control-custom"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="register-password">
                                <i className="bi bi-lock me-1"></i> Mật khẩu (tối thiểu 6 ký tự)
                            </label>
                            <div className="input-group-custom">
                                <span className="input-icon">
                                    <i className="bi bi-shield-lock"></i>
                                </span>
                                <input
                                    id="register-password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control-custom"
                                    placeholder="Tạo mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="confirm-password">
                                <i className="bi bi-check2-circle me-1"></i> Xác nhận mật khẩu
                            </label>
                            <div className="input-group-custom">
                                <span className="input-icon">
                                    <i className="bi bi-shield-check"></i>
                                </span>
                                <input
                                    id="confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control-custom"
                                    placeholder="Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                                <span className="checkbox-label">
                                    Tôi đồng ý với <a href="#terms" onClick={(e) => e.preventDefault()} className="text-primary text-decoration-none">Điều khoản & Quy định</a> của Thể Thao 247
                                </span>
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
                                    Đang tạo tài khoản...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-person-plus-fill me-2"></i>
                                    Đăng Ký
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer text-center mt-4 pt-3 border-top">
                        <span className="text-muted">Đã có tài khoản? </span>
                        <Link to="/login" className="register-link fw-bold">
                            Đăng nhập ngay <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
