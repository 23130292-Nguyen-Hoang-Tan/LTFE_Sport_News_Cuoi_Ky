import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SavedArticles.css';
import {
    getReadArticleIds,
    getSavedArticles,
    markArticleAsRead,
    removeSavedArticles,
    type SavedArticle,
} from '../../service/savedArticles';

export default function SavedArticles() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isManageMode, setIsManageMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [articles, setArticles] = useState<SavedArticle[]>([]);
    const [readIds, setReadIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const syncSavedArticles = () => {
            try {
                setArticles(getSavedArticles());
                setReadIds(getReadArticleIds());
                setError(null);
            } catch (loadError) {
                setError(loadError instanceof Error ? loadError.message : 'Không thể tải bài viết đã lưu.');
            } finally {
                setIsLoading(false);
            }
        };

        syncSavedArticles();
        window.addEventListener('storage', syncSavedArticles);
        return () => window.removeEventListener('storage', syncSavedArticles);
    }, []);

    const filteredArticles = articles.filter(article => {
        const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
        const isRead = readIds.includes(String(article.id));
        const matchFilter = filter === 'all' 
            ? true 
            : filter === 'unread' ? !isRead : isRead;
        return matchSearch && matchFilter;
    });

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleRemoveSelected = () => {
        try {
            const updatedArticles = removeSavedArticles(selectedIds);
            setArticles(updatedArticles);
            setReadIds(getReadArticleIds());
            setSelectedIds([]);
            setError(null);
        } catch (removeError) {
            setError(removeError instanceof Error ? removeError.message : 'Không thể xóa bài viết đã chọn.');
        }
    };

    const handleOpenArticle = (id: string | number): boolean => {
        try {
            setReadIds(markArticleAsRead(id));
            setError(null);
            return true;
        } catch (readError) {
            setError(readError instanceof Error ? readError.message : 'Không thể cập nhật trạng thái bài viết.');
            return false;
        }
    };

    return (
        <div className="saved-page py-4">
            <div className="container">

                <div className="toolbar-card card shadow-sm mb-4 border-0">
                    <div className="card-body d-flex flex-wrap gap-3 align-items-center justify-content-between">
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
                                onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
                            >
                                <option value="all">Tất cả bài viết</option>
                                <option value="unread">Chưa đọc</option>
                                <option value="read">Đã đọc xong</option>
                            </select>
                        </div>

                        <div className="d-flex gap-2">
                            <button 
                                className={`btn btn-outline-secondary ${isManageMode ? 'active' : ''}`}
                                onClick={() => {
                                    setIsManageMode(!isManageMode);
                                    setSelectedIds([]);
                                }}
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

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                {isManageMode && selectedIds.length > 0 && (
                    <div className="alert alert-warning d-flex justify-content-between align-items-center animate-fade">
                        <span>Đã chọn <strong>{selectedIds.length}</strong> bài viết</span>
                        <button type="button" className="btn btn-danger btn-sm" onClick={handleRemoveSelected}>
                            <i className="bi bi-trash me-1"></i> Xóa khỏi danh sách
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-5" role="status">
                        <div className="spinner-border text-primary" aria-hidden="true"></div>
                        <p className="text-muted mt-2">Đang tải bài viết đã lưu...</p>
                    </div>
                ) : filteredArticles.length > 0 ? (
                    <div className={`articles-container ${viewMode}-view`}>
                        {filteredArticles.map(article => (
                            <div className={`article-card card shadow-sm border-0 ${readIds.includes(String(article.id)) ? 'is-read' : ''}`} key={article.id}>
                                
                                {isManageMode && (
                                    <div className="card-checkbox">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input"
                                            checked={selectedIds.includes(String(article.id))}
                                            onChange={() => toggleSelect(String(article.id))}
                                        />
                                    </div>
                                )}

                                <div className="card-img-wrapper">
                                    <img src={article.imageUrl} alt={article.title} className="card-img-top" />
                                    {article.category && <span className="category-badge">{article.category}</span>}
                                </div>

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">
                                        <Link
                                            to={`/news/${encodeURIComponent(String(article.id))}`}
                                            onClick={(event) => {
                                                if (!handleOpenArticle(article.id)) event.preventDefault();
                                            }}
                                            className="text-decoration-none text-dark"
                                        >
                                            {article.title}
                                        </Link>
                                    </h5>
                                    
                                    <div className="card-meta text-muted small mt-auto pt-3 d-flex justify-content-between align-items-center">
                                        <span>{article.author || 'Thể Thao 247'}</span>
                                        <span>
                                            {article.savedAt
                                                ? `Lưu ngày: ${new Date(article.savedAt).toLocaleDateString('vi-VN')}`
                                                : article.createdAt || ''}
                                        </span>
                                    </div>

                                    {!readIds.includes(String(article.id)) && (
                                        <span className="unread-dot" title="Chưa đọc"></span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state text-center py-5">
                        <i className="bi bi-journal-x text-muted display-1 mb-3"></i>
                        <h4>{articles.length === 0 ? 'Chưa có bài viết nào được lưu' : 'Không tìm thấy bài viết nào'}</h4>
                        <p className="text-muted">
                            {articles.length === 0
                                ? 'Nhấn “Thêm vào mục đọc sau” trong bài viết để lưu và xem lại tại đây.'
                                : 'Không có bài viết nào khớp với tìm kiếm hoặc bộ lọc hiện tại.'}
                        </p>
                        <Link to="/" className="btn btn-primary mt-2">Khám phá tin tức mới</Link>
                    </div>
                )}
            </div>
        </div>
    );
}