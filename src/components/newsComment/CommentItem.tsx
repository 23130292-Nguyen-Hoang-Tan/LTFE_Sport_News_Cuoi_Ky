import type { CommentType } from '../../data/comments';
import './CommentItem.css';

interface CommentItemProps {
    comment: CommentType;
}

export default function CommentItem({ comment }: CommentItemProps) {
    const firstLetter = comment.author.charAt(0).toUpperCase();

    return (
        <div className="comment-item mb-2 text-start">
            <div className="d-flex gap-2">
                {/* avatar */}
                <div className="flex-shrink-0">
                    {comment.avatarUrl ? (
                        <img
                            src={comment.avatarUrl}
                            alt={comment.author}
                            className="rounded-circle"
                            width="36"
                            height="36"
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="avatar-placeholder">
                            {firstLetter}
                        </div>
                    )}
                </div>

                {/* nội dung */}
                <div className="flex-grow-1">
                    <div className="comment-bubble">
                        <div className="d-flex justify-content-between align-items-center mb-1 gap-3">
                            <span className="fw-bold comment-author">{comment.author}</span>
                            <button className="comment-more-btn" title="Khác">•••</button>
                        </div>
                        <div className="comment-text">
                            {comment.content}
                            <span className="see-more-btn">Xem thêm</span>
                        </div>
                    </div>

                    {/* like + reply + time */}
                    <div className="d-flex align-items-center gap-2 ms-2 comment-actions">
                        <button className="action-btn">Thích</button>
                        <span className="action-dot">·</span>
                        <button className="action-btn">Phản hồi</button>
                        <span className="action-dot">·</span>
                        <span>{comment.createdAt}</span>
                    </div>
                </div>
            </div>

            {/* comment con*/}
            {comment.replies && comment.replies.length > 0 && (
                <div className="comment-replies">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    );
}