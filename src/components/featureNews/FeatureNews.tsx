import "./FeatureNews.css";
import { Link } from "react-router-dom";
import mainImg from "../../assets/images/feature.png";

function FeatureNews() {
    return (
        <div className="news-card">
            {/* ảnh */}
            <Link to={'/news/1'} className="news-thumb d-block">
                <img src={mainImg} alt="Messi & Suarez" className="w-100" />
            </Link>

            {/* nội dung bài viết */}
            <div className="news-content pt-3">
                <span className="news-cate">BÓNG ĐÁ QUỐC TẾ</span>

                <h2 className="news-title mt-1 mb-2">
                    <a href="#">
                        Trực tiếp bóng đá <span className="highlight">NEW ENGLAND REVOLUTION 1-2 INTER MIAMI</span>: Messi tỏa sáng
                    </a>
                    <span className="badge-live ms-2">LIV</span>
                </h2>

                <p className="news-desc text-secondary">
                    (Trực tiếp bóng đá) - New England đang thăng hoa với chuỗi chiến thắng ấn tượng, nhưng Inter Miami cùng Lionel Messi quyết tâm tìm lại niềm vui chiến thắng tại Vòng 13 MLS.
                </p>

                <div className="news-meta d-flex align-items-center gap-3 text-muted fs-7">
          <span className="d-flex align-items-center gap-1">
            <i className="bi bi-person-circle text-danger"></i> Hin
          </span>
                    <span className="d-flex align-items-center gap-1">
            <i className="bi bi-chat-dots"></i> 3
          </span>
                </div>
            </div>
        </div>
    );
}

export default FeatureNews;