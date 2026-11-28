import type { NewsType } from '../data/news';

const SAVED_ARTICLES_KEY = 'saved_articles';
const READ_ARTICLES_KEY = 'read_saved_articles';

export type SavedArticle = NewsType & { savedAt?: string };

function isNewsArticle(value: unknown): value is NewsType {
    if (typeof value !== 'object' || value === null) return false;

    const article = value as Record<string, unknown>;
    return (
        (typeof article.id === 'string' || typeof article.id === 'number') &&
        typeof article.title === 'string' &&
        typeof article.imageUrl === 'string'
    );
}

function isSavedArticle(value: unknown): value is SavedArticle {
    if (!isNewsArticle(value)) return false;

    const savedAt = Object.getOwnPropertyDescriptor(value, 'savedAt')?.value;
    return savedAt === undefined || typeof savedAt === 'string';
}

export function getSavedArticles(): SavedArticle[] {
    const raw = localStorage.getItem(SAVED_ARTICLES_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isSavedArticle)) {
        throw new Error('Dữ liệu bài viết đã lưu không hợp lệ.');
    }

    return parsed;
}

export function toggleSavedArticle(article: NewsType): boolean {
    const savedArticles = getSavedArticles();
    const isSaved = savedArticles.some((saved) => String(saved.id) === String(article.id));
    const updatedArticles = isSaved
        ? savedArticles.filter((saved) => String(saved.id) !== String(article.id))
        : [{ ...article, savedAt: new Date().toISOString() }, ...savedArticles];

    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
    return !isSaved;
}

export function getReadArticleIds(): string[] {
    const raw = localStorage.getItem(READ_ARTICLES_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === 'string')) {
        throw new Error('Dữ liệu trạng thái đọc không hợp lệ.');
    }

    return parsed;
}

export function markArticleAsRead(id: string | number): string[] {
    const readIds = getReadArticleIds();
    const articleId = String(id);
    const updatedIds = readIds.includes(articleId) ? readIds : [...readIds, articleId];
    localStorage.setItem(READ_ARTICLES_KEY, JSON.stringify(updatedIds));
    return updatedIds;
}

export function removeSavedArticles(ids: string[]): SavedArticle[] {
    const idSet = new Set(ids);
    const updatedArticles = getSavedArticles().filter((article) => !idSet.has(String(article.id)));
    const updatedReadIds = getReadArticleIds().filter((id) => !idSet.has(id));

    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(updatedArticles));
    localStorage.setItem(READ_ARTICLES_KEY, JSON.stringify(updatedReadIds));
    return updatedArticles;
}
