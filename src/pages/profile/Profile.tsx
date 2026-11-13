import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

// Danh sách avatar mẫu để người dùng chọn nhanh
const PRESET_AVATARS = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80'
];

// Danh sách bài viết đã lưu mẫu
const INITIAL_SAVED_ARTICLES = [
    {
        id: 1,
        title: 'Lịch thi đấu và bảng xếp hạng Ngoại Hạng Anh mùa giải 2026',
        category: 'Bóng đá Anh',
        date: '10/11/2026',
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=160&auto=format&fit=crop&q=80'
    },
    {
        id: 2,
        title: 'Cập nhật trực tiếp kết quả UEFA Champions League đêm nay',
        category: 'Cúp C1',
        date: '11/11/2026',
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=160&auto=format&fit=crop&q=80'
    }
];

export default function Profile() {
    const { user, isAuthenticated, logout, updateProfile, changePassword } = useAuth();
    const navigate = useNavigate();

    // Tab hiện tại: 'info' | 'password' | 'saved'
    const [activeTab, setActiveTab] = useState<'info' | 'password' | 'saved'>('info');

    // Chế độ chỉnh sửa thông tin cá nhân
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(user?.name || '');
    const [editPhone, setEditPhone] = useState(user?.phone || '');
    const [editAvatar, setEditAvatar] = useState(user?.avatar || '');

    // Form đổi mật khẩu
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Danh sách bài viết đã lưu
    const [savedArticles, setSavedArticles] = useState(INITIAL_SAVED_ARTICLES);

    // Thông báo phản hồi
    const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

    // Nếu chưa đăng nhập
    if (!isAuthenticated || !user) {
        return (
            <div className="profile-page-wrapper py-5">
                <div className="container">
                    <div className="card simple-card text-center p-4 mx-auto" style={{ maxWidth: '440px' }}>
                        <div className="my-3 text-warning">
                            <i className="bi bi-shield-lock display-3"></i>
                        </div>
                        <h4 className="fw-bold text-dark">Bạn chưa đăng nhập</h4>
                        <p className="text-muted small">
                            Vui lòng đăng nhập để xem và quản lý thông tin hồ sơ của bạn.
                        </p>
                        <Link to="/login" className="btn btn-primary mt-2">
                            <i className="bi bi-box-arrow-in-right me-2"></i>Đến trang Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Xử lý lưu thông tin cá nhân
    const handleSaveProfile = (e: FormEvent) => {
        e.preventDefault();
        setAlertMsg(null);

        if (!editName.trim()) {
            setAlertMsg({ type: 'danger', text: 'Họ và tên không được để trống!' });
            return;
        }

        const res = updateProfile({
            name: editName,
            phone: editPhone,
            avatar: editAvatar
        });

        if (res.success) {
            setAlertMsg({ type: 'success', text: 'Cập nhật thông tin thành công!' });
            setIsEditing(false);
        } else {
            setAlertMsg({ type: 'danger', text: res.message || 'Lỗi khi cập nhật.' });
        }
    };

    // Xử lý đổi mật khẩu
    const handleChangePassword = (e: FormEvent) => {
        e.preventDefault();
        setAlertMsg(null);

        if (!oldPassword || !newPassword) {
            setAlertMsg({ type: 'danger', text: 'Vui lòng nhập đầy đủ các trường!' });
            return;
        }

        if (newPassword.length < 6) {
            setAlertMsg({ type: 'danger', text: 'Mật khẩu mới phải có ít nhất 6 ký tự!' });
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setAlertMsg({ type: 'danger', text: 'Mật khẩu xác nhận không khớp!' });
            return;
        }

        const res = changePassword(oldPassword, newPassword);
        if (res.success) {
            setAlertMsg({ type: 'success', text: 'Đổi mật khẩu thành công!' });
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } else {
            setAlertMsg({ type: 'danger', text: res.message || 'Mật khẩu hiện tại không đúng.' });
        }
    };

    // Xử lý bỏ lưu bài viết
    const handleRemoveArticle = (id: number) => {
        setSavedArticles(prev => prev.filter(a => a.id !== id));
        setAlertMsg({ type: 'success', text: 'Đã bỏ lưu bài viết!' });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-page-wrapper py-4">
            <div className="container">
                {/* Header thanh điều hướng đơn giản */}
                <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                    <div>
                        <h4 className="fw-bold mb-1 text-dark">
                            <i className="bi bi-person-circle text-primary me-2"></i>
                            Hồ Sơ Người Dùng
                        </h4>
                        <span className="text-muted small">Quản lý thông tin tài khoản và bài viết của bạn</span>
                    </div>
                    <Link to="/" className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-arrow-left me-1"></i> Trang chủ
                    </Link>
                </div>

                {/* Thông báo Alert */}
                {alertMsg && (
                    <div className={`alert alert-${alertMsg.type} alert-dismissible fade show d-flex align-items-center gap-2 mb-4`} role="alert">
                        <i className={`bi ${alertMsg.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`}></i>
                        <div className="flex-grow-1">{alertMsg.text}</div>
                        <button type="button" className="btn-close" onClick={() => setAlertMsg(null)} aria-label="Close"></button>
                    </div>
                )}

                <div className="row g-4">
                    {/* CỘT TRÁI: Thẻ tóm tắt người dùng & Menu */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <div className="card simple-card text-center p-3 mb-3">
                            <div className="avatar-box mb-3">
                                <img
                                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                                    alt={user.name}
                                    className="simple-avatar"
                                />
                            </div>
                            <h5 className="fw-bold text-dark mb-1">{user.name}</h5>
                            <p className="text-muted small mb-2">{user.email}</p>
                            <div>
                                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                    {user.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                                </span>
                            </div>
                        </div>

                        {/* Menu Tab */}
                        <div className="list-group simple-tab-menu shadow-sm">
                            <button
                                type="button"
                                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${activeTab === 'info' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('info'); setAlertMsg(null); }}
                            >
                                <i className="bi bi-person-lines-fill"></i>
                                <span>Thông tin cá nhân</span>
                            </button>
                            <button
                                type="button"
                                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${activeTab === 'password' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('password'); setAlertMsg(null); }}
                            >
                                <i className="bi bi-key-fill"></i>
                                <span>Đổi mật khẩu</span>
                            </button>
                            <button
                                type="button"
                                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${activeTab === 'saved' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('saved'); setAlertMsg(null); }}
                            >
                                <i className="bi bi-bookmark-star-fill"></i>
                                <span>Bài viết đã lưu</span>
                                <span className="badge bg-secondary ms-auto">{savedArticles.length}</span>
                            </button>
                            <button
                                type="button"
                                className="list-group-item list-group-item-action text-danger d-flex align-items-center gap-2"
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right"></i>
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>

                    {/* CỘT PHẢI: Nội dung chi tiết */}
                    <div className="col-12 col-md-8 col-lg-9">
                        <div className="card simple-card p-4">
                            {/* TAB 1: THÔNG TIN CÁ NHÂN */}
                            {activeTab === 'info' && (
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                                        <h5 className="fw-bold text-dark mb-0">
                                            <i className="bi bi-card-text text-primary me-2"></i>
                                            Thông Tin Chi Tiết
                                        </h5>
                                        {!isEditing ? (
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => {
                                                    setEditName(user.name);
                                                    setEditPhone(user.phone || '');
                                                    setEditAvatar(user.avatar || '');
                                                    setIsEditing(true);
                                                    setAlertMsg(null);
                                                }}
                                            >
                                                <i className="bi bi-pencil-square me-1"></i> Chỉnh sửa
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => setIsEditing(false)}
                                            >
                                                <i className="bi bi-x-lg me-1"></i> Hủy chỉnh sửa
                                            </button>
                                        )}
                                    </div>

                                    {!isEditing ? (
                                        /* CHẾ ĐỘ XEM THÔNG TIN */
                                        <div className="row g-3">
                                            <div className="col-12 col-sm-6">
                                                <div className="info-block">
                                                    <span className="info-label text-muted">Họ và tên:</span>
                                                    <div className="info-val fw-bold">{user.name}</div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="info-block">
                                                    <span className="info-label text-muted">Địa chỉ Email:</span>
                                                    <div className="info-val">{user.email}</div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="info-block">
                                                    <span className="info-label text-muted">Số điện thoại:</span>
                                                    <div className="info-val">{user.phone || 'Chưa cập nhật'}</div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="info-block">
                                                    <span className="info-label text-muted">Vai trò tài khoản:</span>
                                                    <div className="info-val">
                                                        <span className="badge bg-light text-dark border">
                                                            {user.role === 'admin' ? 'Quản trị viên (Admin)' : 'Thành viên'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="info-block">
                                                    <span className="info-label text-muted">Mã tài khoản (ID):</span>
                                                    <div className="info-val text-secondary small">{user.id}</div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="info-block">
                                                    <span className="info-label text-muted">Ngày tham gia:</span>
                                                    <div className="info-val">{user.createdAt || '01/01/2026'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* CHẾ ĐỘ FORM CHỈNH SỬA */
                                        <form onSubmit={handleSaveProfile} className="edit-profile-form">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold" htmlFor="edit-name">
                                                    Họ và tên:
                                                </label>
                                                <input
                                                    id="edit-name"
                                                    type="text"
                                                    className="form-control"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold" htmlFor="edit-phone">
                                                    Số điện thoại:
                                                </label>
                                                <input
                                                    id="edit-phone"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Ví dụ: 0901234567"
                                                    value={editPhone}
                                                    onChange={(e) => setEditPhone(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold" htmlFor="edit-avatar">
                                                    Link ảnh đại diện (URL):
                                                </label>
                                                <input
                                                    id="edit-avatar"
                                                    type="url"
                                                    className="form-control"
                                                    placeholder="https://example.com/avatar.jpg"
                                                    value={editAvatar}
                                                    onChange={(e) => setEditAvatar(e.target.value)}
                                                />
                                                {/* Ảnh mẫu chọn nhanh */}
                                                <div className="mt-2 d-flex align-items-center gap-2">
                                                    <span className="small text-muted">Chọn nhanh:</span>
                                                    {PRESET_AVATARS.map((av, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={av}
                                                            alt={`avatar-${idx}`}
                                                            className={`preset-avatar-thumb ${editAvatar === av ? 'active-thumb' : ''}`}
                                                            onClick={() => setEditAvatar(av)}
                                                            title="Bấm để chọn ảnh này"
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="d-flex gap-2 mt-4">
                                                <button type="submit" className="btn btn-primary px-4">
                                                    <i className="bi bi-check2-circle me-1"></i> Lưu thay đổi
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-light border px-3"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )}

                            {/* TAB 2: ĐỔI MẬT KHẨU */}
                            {activeTab === 'password' && (
                                <div>
                                    <h5 className="fw-bold text-dark mb-4 pb-2 border-bottom">
                                        <i className="bi bi-shield-lock text-primary me-2"></i>
                                        Thay Đổi Mật Khẩu
                                    </h5>
                                    <form onSubmit={handleChangePassword} style={{ maxWidth: '480px' }}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold" htmlFor="old-pass">
                                                Mật khẩu hiện tại:
                                            </label>
                                            <input
                                                id="old-pass"
                                                type="password"
                                                className="form-control"
                                                placeholder="Nhập mật khẩu hiện tại"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold" htmlFor="new-pass">
                                                Mật khẩu mới:
                                            </label>
                                            <input
                                                id="new-pass"
                                                type="password"
                                                className="form-control"
                                                placeholder="Tối thiểu 6 ký tự"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-semibold" htmlFor="confirm-pass">
                                                Xác nhận mật khẩu mới:
                                            </label>
                                            <input
                                                id="confirm-pass"
                                                type="password"
                                                className="form-control"
                                                placeholder="Nhập lại mật khẩu mới"
                                                value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary px-4">
                                            <i className="bi bi-key me-1"></i> Cập nhật mật khẩu
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* TAB 3: BÀI VIẾT ĐÃ LƯU */}
                            {activeTab === 'saved' && (
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                                        <h5 className="fw-bold text-dark mb-0">
                                            <i className="bi bi-bookmark-star text-primary me-2"></i>
                                            Bài Viết Đã Lưu ({savedArticles.length})
                                        </h5>
                                    </div>

                                    {savedArticles.length === 0 ? (
                                        <div className="text-center py-5 text-muted">
                                            <i className="bi bi-bookmarks display-4 d-block mb-2 text-secondary"></i>
                                            <p className="mb-2">Bạn chưa lưu bài viết nào.</p>
                                            <Link to="/" className="btn btn-outline-primary btn-sm">
                                                Khám phá tin tức thể thao
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="saved-articles-list d-flex flex-column gap-3">
                                            {savedArticles.map(article => (
                                                <div key={article.id} className="saved-article-item d-flex align-items-center gap-3 p-2 border rounded">
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="saved-article-thumb rounded"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <span className="badge bg-light text-primary border mb-1">
                                                            {article.category}
                                                        </span>
                                                        <h6 className="fw-bold mb-1 text-dark">
                                                            <Link to="#" className="text-decoration-none text-dark hover-primary">
                                                                {article.title}
                                                            </Link>
                                                        </h6>
                                                        <span className="text-muted small">
                                                            <i className="bi bi-clock me-1"></i>{article.date}
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleRemoveArticle(article.id)}
                                                        title="Bỏ lưu bài viết"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
