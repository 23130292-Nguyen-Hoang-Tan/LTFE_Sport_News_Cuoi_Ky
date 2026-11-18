import { Link } from 'react-router-dom';
import './NewsDetail.css';
import NewsComment from "../newsComment/NewsComment.tsx";
import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { fetchHomePage } from "../../service/rssService.ts";
import type { NewsType } from "../../data/news.ts";

export default function NewsDetail() {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<NewsType | null>(null);

    useEffect(() => {
        async function loadNewsDetail() {
            const allNews = await fetchHomePage();
            const found = allNews.find((item) => String(item.id) === id);
            setNews(found || allNews[0] || null);
        }
        loadNewsDetail();
    }, [id]);

    if (!news) return null;

    return (
        <article className="news-detail-container">
            <div className="news-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span className="separator">&gt;</span>
                <Link to="#">{news.category}</Link>
            </div>
            {/* tiêu đề */}
            <h1 className="news-title">
                {news.title}
            </h1>

            {/* thông tin tác giả*/}
            <div className="news-meta-bar">
                {/* tác giả */}
                <div className="news-author-info">
                    <img src="https://via.placeholder.com/38" alt={news.author} className="author-avatar" />
                    <div>
                        <span className="author-name">{news.author}</span>
                        <i className="bi bi-check-circle-fill author-tick ms-1"></i>
                        <span className="publish-time ms-2">{news.createdAt}</span>
                    </div>
                </div>

                {/* nút chia sẻ + tăng giảm cỡ chữ */}
                <div className="news-actions">
                    <Link to="#" className="btn-action-icon" title="Twitter"><i className="bi bi-twitter"></i></Link>
                    <Link to="#" className="btn-action-icon" title="Facebook"><i className="bi bi-facebook"></i></Link>
                    <Link to="#" className="btn-action-icon" title="Zalo"><b>Z</b></Link>
                    <Link to="#" className="btn-action-icon" title="In bài viết"><i className="bi bi-printer"></i></Link>
                    <button className="btn-font-size ms-1">A</button>
                    <button className="btn-font-size">A<sup>+</sup></button>
                </div>
            </div>

            {/* đoạn sapo */}
            <div className="news-sapo">
                {news.summary || news.description}
            </div>

            {/* nội dung chi tiết */}
            <div className="news-content">
                <figure>
                    <img
                        src={news.imageUrl}
                        alt={news.title}
                    />
                    <figcaption>{news.title}</figcaption>
                </figure>

                <p>{news.content || news.description}</p>
            </div>

            {/* thẻ tag bài viết */}
            <div className="news-tags">
                <span className="tag-label">Chủ đề:</span>
                <Link to="#" className="tag-item">{news.category}</Link>
                <Link to="#" className="tag-item">U23 Singapore</Link>
                <Link to="#" className="tag-item">VTV Cup 2026</Link>
            </div>
            <NewsComment/>
        </article>
    );
}