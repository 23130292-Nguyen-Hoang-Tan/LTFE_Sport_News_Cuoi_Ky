import "./NewsList.css";

export default function NewsItem({ news }: { news: any }) {
    return (
        <div className="news-item py-3 border-bottom">
            <div className="row g-3">
                {/* img */}
                <div className="col-4 col-sm-3 col-md-4 col-lg-3">
                    <a href={news.link || "#"} className="d-block overflow-hidden rounded">
                        <img
                            src={news.imageUrl}
                            alt={news.title}
                            className="img-fluid w-100 object-fit-cover hover-zoom"
                            style={{ aspectRatio: "16/10" }}
                        />
                    </a>
                </div>

                {/* noi dung */}
                <div className="col-8 col-sm-9 col-md-8 col-lg-9 text-start">
                    {/* tieu de */}
                    <h5 className="fw-bold fs-6 mb-1">
                        <a href={news.link || "#"} className="text-dark text-decoration-none hover-red">
                            {news.title}
                        </a>
                    </h5>

                    {/* tac gia + binh luan */}
                    <div className="d-flex align-items-center gap-2 mb-2 text-muted" style={{ fontSize: "12px" }}>
            <span
                className="author-icon d-inline-flex align-items-center justify-content-center bg-secondary text-white rounded-circle overflow-hidden"
                style={{ width: "18px", height: "18px" }}
            >
              {news.authorAvatar ? (
                  <img src={news.authorAvatar} alt={news.author} className="w-100 h-100 object-fit-cover" />
              ) : (
                  <i className="bi bi-person-fill" style={{ fontSize: "10px" }}></i>
              )}
            </span>
                        <span className="fw-semibold text-secondary">{news.author}</span>
                        <span className="d-inline-flex align-items-center gap-1 border px-1 rounded text-muted">
              <i className="bi bi-chat-left-text" style={{ fontSize: "10px" }}></i>
                            {news.commentsCount}
            </span>
                    </div>

                    {/* mô tả  */}
                    <p className="text-secondary mb-0 line-clamp-2" style={{ fontSize: "13px", lineHeight: "1.4" }}>
                        {news.description}
                    </p>
                </div>
            </div>
        </div>
    );
}