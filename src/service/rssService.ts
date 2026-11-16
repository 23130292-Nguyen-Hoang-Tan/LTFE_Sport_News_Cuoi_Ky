import type { NewsType } from '../data/news';

// link rss thể thao 247
const RSS_THETHAO247 = 'https://thethao247.vn/trang-chu.rss';
// link rss2json
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_THETHAO247)}`;

// kiểu dữ liệu trả về từ rss2json
interface RssItemRaw {
    guid?: string;
    title: string;
    description?: string;
    content?: string;
    thumbnail?: string;
    pubDate?: string;
    author?: string;
    link?: string;
}

// lấy và parse dữ liệu theo newstype
export async function fetchTheThao247Rss(): Promise<NewsType[]> {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.status !== 'ok' || !Array.isArray(data.items)) {
            console.log('Lỗi tải RSS:', data.message);
            return [];
        }

        // duyệt từng bài viết + map vào newType
        const parsedNews: NewsType[] = data.items.map((item: RssItemRaw, index: number) => {
            // tách lấy link ảnh từ thẻ img
            const imgRegex = /<img[^>]+src="([^">]+)"/;
            const match = item.description ? item.description.match(imgRegex) : null;
            const rawImage = item.thumbnail || (match ? match[1] : 'https://via.placeholder.com/400x250');
            //lấy ảnh gốc
            const extractedImage = rawImage.replace(/\/resize_\d+x\d+\//, '/');

            // lấy mô tả
            const cleanText = item.description
                ? item.description.replace(/<[^>]*>?/gm, '').trim()
                : '';

            //lấy id bài viết giống thethao247
            const slug = item.guid
                ? item.guid.replace('https://thethao247.vn/', '').replace('.html', '')
                : String(index + 1);

            return {
                id: slug,
                title: item.title,
                description: cleanText,
                summary: cleanText,
                content: item.content || cleanText,
                imageUrl: extractedImage,
                category: 'Bóng đá',
                createdAt: item.pubDate,
                author: item.author || 'Thể Thao 247',
                viewsCount: (index + 1) * 123 + 450,
                commentsCount: (index % 7) + 2,
            };
        });

        return parsedNews;
    } catch (error) {
        console.error('Lỗi fetch RSS Thể Thao 247:', error);
        return [];
    }
}