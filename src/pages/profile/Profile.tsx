import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

export default function Profile() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated || !user) {
        return (
            <div className="profile-container text-center py-5">
                <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '420px' }}>
                    <i className="bi bi-shield-lock-fill text-warning display-4 mb-3"></i>
                    <h4>Bạn chưa đăng nhập</h4>
                    <p className="text-muted">Vui lòng đăng nhập để xem thông tin cá nhân và quản lý tài khoản.</p>
                    <Link to="/login" className="btn btn-primary mt-2">
                        <i className="bi bi-box-arrow-in-right me-2"></i>Đến trang Đăng nhập
                    </Link>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-wrapper py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card profile-card shadow border-0 overflow-hidden">
                            <div className="profile-banner">
                                <div className="banner-content text-white text-center">
                                    <span className="badge bg-warning text-dark mb-2">
                                        <i className="bi bi-star-fill me-1"></i>
                                        {user.role === 'admin' ? 'Quản trị viên (Admin)' : 'Thành viên thân thiết'}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body text-center pt-0 position-relative">
                                <div className="avatar-wrapper mb-3">
                                    <img
                                        src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                                        alt={user.name}
                                        className="profile-avatar shadow"
                                    />
                                    <span className="online-indicator" title="Đang trực tuyến"></span>
                                </div>

                                <h3 className="profile-name mb-1">{user.name}</h3>
                                <p className="text-muted mb-3">
                                    <i className="bi bi-envelope me-1"></i>{user.email}
                                </p>

                                <div className="profile-stats row text-center py-3 my-3 border-top border-bottom">
                                    <div className="col-4">
                                        <div className="stat-number text-primary fw-bold">12</div>
                                        <div className="stat-label text-muted small">Bài viết lưu</div>
                                    </div>
                                    <div className="col-4 border-start border-end">
                                        <div className="stat-number text-primary fw-bold">5</div>
                                        <div className="stat-label text-muted small">Bình luận</div>
                                    </div>
                                    <div className="col-4">
                                        <div className="stat-number text-primary fw-bold">3</div>
                                        <div className="stat-label text-muted small">Đội yêu thích</div>
                                    </div>
                                </div>

                                <div className="profile-details text-start mb-4">
                                    <h6 className="fw-bold mb-3 text-secondary">
                                        <i className="bi bi-person-lines-fill me-2"></i>Chi tiết tài khoản
                                    </h6>
                                    <div className="detail-item d-flex justify-content-between py-2 border-bottom">
                                        <span className="text-muted">Mã tài khoản:</span>
                                        <span className="fw-semibold">{user.id}</span>
                                    </div>
                                    <div className="detail-item d-flex justify-content-between py-2 border-bottom">
                                        <span className="text-muted">Vai trò hệ thống:</span>
                                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    {user.phone && (
                                        <div className="detail-item d-flex justify-content-between py-2 border-bottom">
                                            <span className="text-muted">Số điện thoại:</span>
                                            <span className="fw-semibold">{user.phone}</span>
                                        </div>
                                    )}
                                    <div className="detail-item d-flex justify-content-between py-2 border-bottom">
                                        <span className="text-muted">Ngày tham gia:</span>
                                        <span className="fw-semibold">{user.createdAt || 'Hôm nay'}</span>
                                    </div>
                                </div>

                                <div className="d-flex gap-2 justify-content-center">
                                    <Link to="/" className="btn btn-outline-secondary px-4">
                                        <i className="bi bi-arrow-left me-1"></i> Trang chủ
                                    </Link>
                                    <button onClick={handleLogout} className="btn btn-danger px-4">
                                        <i className="bi bi-box-arrow-right me-1"></i> Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
