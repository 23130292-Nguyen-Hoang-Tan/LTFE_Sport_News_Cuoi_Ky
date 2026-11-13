import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SavedArticles.css';

// 1. Định nghĩa cấu trúc dữ liệu tĩnh
interface SavedArticle {
    id: string;
    title: string;
    thumbnail: string;
    category: string;
    readTime: number;
    savedAt: string;
    isRead: boolean;
}

// 2. Dữ liệu mẫu (Mock Data) để test giao diện
const MOCK_ARTICLES: SavedArticle[] = [
    {
        id: '1',
        title: 'Phân tích chiến thuật: Sơ đồ 3-2-4-1 của Pep Guardiola hoạt động thế nào?',
        thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbb1b1ea00?w=600&auto=format&fit=crop&q=80',
        category: 'Bóng đá',
        readTime: 5,
        savedAt: '11/11/2026',
        isRead: false
    },
    {
        id: '2',
        title: 'Chung kết CKTG LMHT: Keria và nghệ thuật kiểm soát tầm nhìn',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        category: 'Esports',
        readTime: 4,
        savedAt: '10/11/2026',
        isRead: true
    },
    {
        id: '3',
        title: 'Carlos Alcaraz bảo vệ thành công ngôi vương Wimbledon sau loạt tie-break nghẹt thở',
        thumbnail: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
        category: 'Tennis',
        readTime: 3,
        savedAt: '09/11/2026',
        isRead: false
    }
];

export default function SavedArticles() {
    // Các State điều khiển giao diện
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isManageMode, setIsManageMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Logic Lọc & Tìm kiếm dữ liệu
    const filteredArticles = MOCK_ARTICLES.filter(article => {
        const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchFilter = filter === 'all' 
            ? true 
            : filter === 'unread' ? !article.isRead : article.isRead;
        return matchSearch && matchFilter;
    });

    // Xử lý chọn bài viết khi ở chế độ Quản lý
    const toggleSelect = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="saved-page py-4">
            <div className="container">

                {/* Thanh công cụ (Toolbar) */}
                <div className="toolbar-card card shadow-sm mb-4 border-0">
                    <div className="card-body d-flex flex-wrap gap-3 align-items-center justify-content-between">
                        {/* Nhóm Bộ lọc & Tìm kiếm */}
                        <div className="d-flex flex-wrap gap-3 align-items-center flex-grow-1">
                            <div className="search-box position-relative">
                                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                <input 
                                    type="text" 
                                    className="form-control ps-5" 
                                    placeholder="Tìm trong bài đã lưu..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            <select 
                                className="form-select filter-select w-auto"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as any)}
                            >
                                <option value="all">Tất cả bài viết</option>
                                <option value="unread">Chưa đọc</option>
                                <option value="read">Đã đọc xong</option>
                            </select>
                        </div>

                        {/* Nhóm Công cụ hiển thị */}
                        <div className="d-flex gap-2">
                            <button 
                                className={`btn btn-outline-secondary ${isManageMode ? 'active' : ''}`}
                                onClick={() => setIsManageMode(!isManageMode)}
                            >
                                <i className="bi bi-check2-square me-1"></i> Quản lý
                            </button>
                            
                            <div className="btn-group" role="group">
                                <button 
                                    className={`btn btn-outline-secondary ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                    title="Chế độ lưới"
                                >
                                    <i className="bi bi-grid-fill"></i>
                                </button>
                                <button 
                                    className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                    title="Chế độ danh sách"
                                >
                                    <i className="bi bi-list-ul"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Khu vực Xóa hàng loạt (Chỉ hiện khi ở chế độ Quản lý và có chọn bài) */}
                {isManageMode && selectedIds.length > 0 && (
                    <div className="alert alert-warning d-flex justify-content-between align-items-center animate-fade">
                        <span>Đã chọn <strong>{selectedIds.length}</strong> bài viết</span>
                        <button className="btn btn-danger btn-sm">
                            <i className="bi bi-trash me-1"></i> Xóa khỏi danh sách
                        </button>
                    </div>
                )}

                {/* Danh sách bài viết */}
                {filteredArticles.length > 0 ? (
                    <div className={`articles-container ${viewMode}-view`}>
                        {filteredArticles.map(article => (
                            <div className={`article-card card shadow-sm border-0 ${article.isRead ? 'is-read' : ''}`} key={article.id}>
                                
                                {/* Checkbox Quản lý */}
                                {isManageMode && (
                                    <div className="card-checkbox">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input"
                                            checked={selectedIds.includes(article.id)}
                                            onChange={() => toggleSelect(article.id)}
                                        />
                                    </div>
                                )}

                                <div className="card-img-wrapper">
                                    <img src={article.thumbnail} alt={article.title} className="card-img-top" />
                                    <span className="category-badge">{article.category}</span>
                                </div>

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">
                                        <Link to="/match-detail" className="text-decoration-none text-dark">
                                            {article.title}
                                        </Link>
                                    </h5>
                                    
                                    <div className="card-meta text-muted small mt-auto pt-3 d-flex justify-content-between align-items-center">
                                        <span><i className="bi bi-clock me-1"></i> {article.readTime} phút đọc</span>
                                        <span>Lưu ngày: {article.savedAt}</span>
                                    </div>

                                    {/* Nhãn trạng thái */}
                                    {!article.isRead && (
                                        <span className="unread-dot" title="Chưa đọc"></span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Trạng thái trống (Empty State)
                    <div className="empty-state text-center py-5">
                        <i className="bi bi-journal-x text-muted display-1 mb-3"></i>
                        <h4>Không tìm thấy bài viết nào</h4>
                        <p className="text-muted">Bạn chưa lưu bài viết nào hoặc không có bài viết khớp với bộ lọc.</p>
                        <Link to="/" className="btn btn-primary mt-2">Khám phá tin tức mới</Link>
                    </div>
                )}
            </div>
        </div>
    );
}