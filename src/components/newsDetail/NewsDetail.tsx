import { Link } from 'react-router-dom';
import './NewsDetail.css';
import NewsComment from "../newsComment/NewsComment.tsx";

export default function NewsDetail() {
    return (
        <article className="news-detail-container">
            <div className="news-breadcrumb">
                <Link to="#">Trang chủ</Link>
                <span className="separator">&gt;</span>
                <Link to="#">Bóng đá Việt Nam</Link>
            </div>

            {/* tiêu đề */}
            <h1 className="news-title">
                CĐV ĐNÁ đồng loạt nhắc tên Việt Nam sau địa chấn của U23 Singapore tại Pleiku
            </h1>

            {/* thông tin tác giả*/}
            <div className="news-meta-bar">
                {/* tác giả */}
                <div className="news-author-info">
                    <img src="https://via.placeholder.com/38" alt="Hoàng Cầm" className="author-avatar" />
                    <div>
                        <span className="author-name">Hoàng Cầm</span>
                        <i className="bi bi-check-circle-fill author-tick ms-1"></i>
                        <span className="publish-time ms-2">6 phút trước</span>
                    </div>
                </div>

                {/* nút chia sẻ + tăng giảm cỡ chữ */}
                <div className="news-actions">
                    <a href="#" className="btn-action-icon" title="Twitter"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="btn-action-icon" title="Facebook"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="btn-action-icon" title="Zalo"><b>Z</b></a>
                    <a href="#" className="btn-action-icon" title="In bài viết"><i className="bi bi-printer"></i></a>
                    <button className="btn-font-size ms-1">A</button>
                    <button className="btn-font-size">A<sup>+</sup></button>
                </div>
            </div>

            {/* đoạn sapo */}
            <div className="news-sapo">
                Chiến tích cầm hòa U23 Qatar của U23 Singapore khiến cuộc đua vô địch Gia Lai VTV Cup 2026 thêm hấp dẫn, đồng thời mở ra cơ hội lớn cho chủ nhà U23 Việt Nam.
            </div>

            {/* nội dung chi tiết */}
            <div className="news-content">
                <p>
                    Chiều 10/11, U23 Singapore tạo nên bất ngờ lớn khi xuất sắc cầm hòa U23 Qatar với tỷ số 0-0 trong trận khai màn giải giao hữu quốc tế Gia Lai VTV Cup 2026 trên sân Pleiku. Dù bị đánh giá thấp hơn đáng kể, đại diện Đông Nam Á vẫn thi đấu đầy kiên cường, khiến đối thủ đến từ Tây Á bất lực trong việc tìm kiếm bàn thắng.
                </p>

                <figure>
                    <img
                        src=""
                        alt="U23 Singapore thi đấu kiên cường trước U23 Qatar"
                    />
                    <figcaption>
                        U23 Singapore (áo đỏ) thi đấu quả cảm trước đối thủ mạnh U23 Qatar.
                    </figcaption>
                </figure>

                <p>
                    Kết quả này khiến cục diện bảng đấu trở nên cực kỳ khó đoán. Ngay sau khi trận đấu kết thúc, trên các diễn đàn bóng đá khu vực Đông Nam Á, người hâm mộ đã để lại hàng loạt bình luận tán dương màn trình diễn của U23 Singapore, đồng thời liên tục réo tên U23 Việt Nam cho trận đấu tiếp theo.
                </p>
            </div>

            {/* thẻ tag bài viết */}
            <div className="news-tags">
                <span className="tag-label">Chủ đề:</span>
                <Link to="#" className="tag-item">U23 Việt Nam</Link>
                <Link to="#" className="tag-item">U23 Singapore</Link>
                <Link to="#" className="tag-item">VTV Cup 2026</Link>
            </div>
            <NewsComment/>
        </article>
    );
}