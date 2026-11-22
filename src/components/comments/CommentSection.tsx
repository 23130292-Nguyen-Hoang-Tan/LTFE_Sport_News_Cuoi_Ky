import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { Comment } from '../../types/comment';
import './CommentSection.css';

const COMMENTS_STORAGE_KEY = 'thethao247_comments_list';

// 3 bình luận mẫu ban đầu theo yêu cầu
const DEFAULT_COMMENTS: Comment[] = [
    {
        id: 'cmt-1',
        authorId: 'user-002',
        authorName: 'Anh7CR7',
        authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        authorRole: 'user',
        content: 'Trận đấu quá kịch tính! Arsenal đá nửa đầu trận rất hay nhưng hiệp 2 Chelsea phản công sắc nét. Đáng khen cho Palmer và Ødegaard.',
        createdAt: '15 phút trước',
        likes: 12,
        isLiked: false
    },
    {
        id: 'cmt-2',
        authorId: 'user-003',
        authorName: 'Người Dùng Thể Thao',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        authorRole: 'user',
        content: 'Pha va chạm ở phút 42 căng thẳng thật sự, trọng tài rút thẻ đỏ là chuẩn xác. Hy vọng hai đội tiếp tục giữ tinh thần cống hiến ở các vòng tới!',
        createdAt: '45 phút trước',
        likes: 8,
        isLiked: false
    },
    {
        id: 'cmt-3',
        authorId: 'user-001',
        authorName: 'Đặng Thanh Tân',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        authorRole: 'admin',
        content: 'Chiến thuật của hai đội trận này rất linh hoạt và đáng học hỏi. Trận derby London luôn mang lại cảm xúc bùng nổ cho người hâm mộ! 🔥⚽',
        createdAt: '2 giờ trước',
        likes: 24,
        isLiked: false
    }
];

interface CommentSectionProps {
    title?: string;
    matchId?: number;
}

export default function CommentSection({ title = 'Bình luận & Thảo luận sôi nổi', matchId }: CommentSectionProps) {
    const { user, isAuthenticated } = useAuth();

    // Danh sách bình luận
    const [comments, setComments] = useState<Comment[]>(() => {
        try {
            const saved = localStorage.getItem(COMMENTS_STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Lỗi khi đọc comments từ localStorage:', e);
        }
        return DEFAULT_COMMENTS;
    });

    const [commentText, setCommentText] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Lưu danh sách vào localStorage khi có thay đổi
    useEffect(() => {
        try {
            localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
        } catch (e) {
            console.error('Lỗi khi ghi comments vào localStorage:', e);
        }
    }, [comments]);

    // Gửi bình luận mới
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        if (!isAuthenticated || !user) {
            setErrorMsg('Vui lòng đăng nhập để tham gia thảo luận.');
            return;
        }

        const trimmed = commentText.trim();
        if (!trimmed) {
            setErrorMsg('Nội dung bình luận không được để trống.');
            return;
        }

        if (trimmed.length < 3) {
            setErrorMsg('Bình luận phải có ít nhất 3 ký tự.');
            return;
        }

        const newComment: Comment = {
            id: 'cmt-' + Date.now(),
            authorId: user.id,
            authorName: user.name,
            authorAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
            authorRole: user.role,
            content: trimmed,
            createdAt: 'Vừa xong',
            likes: 0,
            isLiked: false,
            matchId
        };

        setComments([newComment, ...comments]);
        setCommentText('');
        setSuccessMsg('Gửi bình luận thành công!');

        setTimeout(() => {
            setSuccessMsg(null);
        }, 3000);
    };

    // Thả tim / Bỏ thả tim
    const handleToggleLike = (commentId: string) => {
        setComments(prev =>
            prev.map(c => {
                if (c.id === commentId) {
                    const isLiked = !c.isLiked;
                    return {
                        ...c,
                        isLiked,
                        likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
                    };
                }
                return c;
            })
        );
    };

    // Xóa bình luận (tác giả hoặc admin)
    const handleDelete = (commentId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
            setComments(prev => prev.filter(c => c.id !== commentId));
            setSuccessMsg('Đã xóa bình luận.');
            setTimeout(() => setSuccessMsg(null), 2500);
        }
    };

    // Lọc theo matchId (nếu có) và sắp xếp
    const filteredComments = comments.filter(c => matchId === undefined || c.matchId === matchId || !c.matchId);

    const sortedComments = [...filteredComments].sort((a, b) => {
        if (sortBy === 'popular') {
            return b.likes - a.likes;
        }
        return 0; // Giữ thứ tự mới nhất (đã prepend)
    });

    return (
        <section className="comment-section-wrapper card shadow-sm border-0 my-4">
            <div className="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-chat-left-dots-fill text-primary fs-5"></i>
                    <h5 className="mb-0 fw-bold text-dark">{title}</h5>
                    <span className="badge bg-primary rounded-pill px-2 py-1 ms-1">
                        {filteredComments.length}
                    </span>
                </div>

                {/* Sắp xếp bình luận */}
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small">Sắp xếp:</span>
                    <div className="btn-group btn-group-sm" role="group">
                        <button
                            type="button"
                            className={`btn ${sortBy === 'newest' ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => setSortBy('newest')}
                        >
                            Mới nhất
                        </button>
                        <button
                            type="button"
                            className={`btn ${sortBy === 'popular' ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => setSortBy('popular')}
                        >
                            Phổ biến nhất
                        </button>
                    </div>
                </div>
            </div>

            <div className="card-body p-3 p-md-4">
                {/* Thông báo phản hồi */}
                {errorMsg && (
                    <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-3 py-2" role="alert">
                        <i className="bi bi-exclamation-circle-fill"></i>
                        <span className="small">{errorMsg}</span>
                        <button type="button" className="btn-close" onClick={() => setErrorMsg(null)} aria-label="Close"></button>
                    </div>
                )}

                {successMsg && (
                    <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-3 py-2" role="alert">
                        <i className="bi bi-check-circle-fill"></i>
                        <span className="small">{successMsg}</span>
                        <button type="button" className="btn-close" onClick={() => setSuccessMsg(null)} aria-label="Close"></button>
                    </div>
                )}

                {/* Khung nhập bình luận */}
                {isAuthenticated && user ? (
                    <form onSubmit={handleSubmit} className="comment-form mb-4 p-3 bg-light rounded border">
                        <div className="d-flex gap-3 align-items-start">
                            <img
                                src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                                alt={user.name}
                                className="comment-user-avatar rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <span className="fw-bold text-dark small">{user.name}</span>
                                    {user.role === 'admin' && (
                                        <span className="badge bg-danger" style={{ fontSize: '10px' }}>Admin</span>
                                    )}
                                </div>
                                <textarea
                                    className="form-control comment-textarea"
                                    rows={3}
                                    placeholder="Viết nhận định, bình luận về trận đấu hoặc tin tức..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    maxLength={500}
                                />
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <span className="text-muted small">
                                        {commentText.length}/500 ký tự
                                    </span>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-1"
                                        disabled={!commentText.trim()}
                                    >
                                        <i className="bi bi-send-fill"></i>
                                        <span>Gửi bình luận</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="comment-login-prompt text-center p-3 mb-4 bg-light rounded border">
                        <i className="bi bi-chat-quote display-6 text-primary mb-2 d-block"></i>
                        <p className="text-muted small mb-2">
                            Bạn cần đăng nhập để tham gia bình luận cùng cộng đồng người hâm mộ thể thao.
                        </p>
                        <Link to="/login" className="btn btn-primary btn-sm px-4">
                            <i className="bi bi-box-arrow-in-right me-1"></i> Đăng nhập ngay
                        </Link>
                    </div>
                )}

                {/* Danh sách hiển thị bình luận */}
                <div className="comment-list">
                    {sortedComments.length === 0 ? (
                        <div className="text-center py-4 text-muted">
                            <i className="bi bi-chat-dots display-5 d-block mb-2 text-secondary opacity-50"></i>
                            <p className="small mb-0">Chưa có bình luận nào. Hãy là người đầu tiên nêu nhận định!</p>
                        </div>
                    ) : (
                        sortedComments.map(comment => {
                            const isAuthor = user?.id === comment.authorId;
                            const isAdmin = user?.role === 'admin';
                            const canDelete = isAuthor || isAdmin;

                            return (
                                <div key={comment.id} className="comment-item p-3 mb-3 rounded bg-white border">
                                    <div className="d-flex gap-3 align-items-start">
                                        <img
                                            src={comment.authorAvatar}
                                            alt={comment.authorName}
                                            className="comment-item-avatar rounded-circle flex-shrink-0"
                                        />
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-1 mb-1">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="fw-bold text-dark">{comment.authorName}</span>
                                                    {comment.authorRole === 'admin' && (
                                                        <span className="badge bg-danger" style={{ fontSize: '10px' }}>Admin</span>
                                                    )}
                                                    <span className="text-muted comment-time small">
                                                        <i className="bi bi-clock me-1"></i>{comment.createdAt}
                                                    </span>
                                                </div>

                                                {/* Nút xóa bình luận */}
                                                {canDelete && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-link text-danger p-0 text-decoration-none small"
                                                        onClick={() => handleDelete(comment.id)}
                                                        title="Xóa bình luận này"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Nội dung bình luận */}
                                            <p className="comment-content mb-2 text-secondary">
                                                {comment.content}
                                            </p>

                                            {/* Nút Like / Thích */}
                                            <div className="d-flex align-items-center gap-3">
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm comment-like-btn d-flex align-items-center gap-1 ${comment.isLiked ? 'liked' : ''}`}
                                                    onClick={() => handleToggleLike(comment.id)}
                                                >
                                                    <i className={`bi ${comment.isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
                                                    <span>{comment.likes > 0 ? comment.likes : 'Thích'}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-link text-muted p-0 text-decoration-none small"
                                                    onClick={() => {
                                                        setCommentText(`@${comment.authorName} `);
                                                    }}
                                                >
                                                    <i className="bi bi-reply me-1"></i>Trả lời
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
