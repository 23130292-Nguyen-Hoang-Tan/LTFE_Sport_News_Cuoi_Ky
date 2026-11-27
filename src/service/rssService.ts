import type { NewsType } from '../data/news';

//phân loại danh mục dựa trên url và tiêu đề
function detectCategory(guid: string, title: string): string {
    const text = `${guid} ${title}`.toLowerCase();

    if (text.includes('bong-ro') || text.includes('bóng rổ') || text.includes('nba') || text.includes('vba')) {
        return 'Bóng rổ';
    }
    if (text.includes('quan-vot') || text.includes('quần vợt') || text.includes('tennis') || text.includes('djokovic') || text.includes('alcaraz') || text.includes('sinner')) {
        return 'Quần vợt (Tennis)';
    }
    if (text.includes('cau-long') || text.includes('cầu lông') || text.includes('thùy linh') || text.includes('tiến minh')) {
        return 'Cầu lông';
    }
    if (text.includes('dua-xe') || text.includes('đua xe') || text.includes('f1') || text.includes('motogp')) {
        return 'Đua xe (F1 / MotoGP)';
    }
    if (text.includes('vo-thuat') || text.includes('võ thuật') || text.includes('boxing') || text.includes('ufc') || text.includes('mma')) {
        return 'Võ thuật (Boxing / UFC)';
    }
    if (text.includes('boi-loi') || text.includes('bơi lội') || text.includes('huy hoàng') || text.includes('ánh viên')) {
        return 'Bơi lội';
    }

    return 'Bóng đá';
}

// duyệt từng bài viết và parse dữ liệu theo newstype
export async function fetchData(): Promise<NewsType[]> {
    try {
        const res = await fetch('/tt247/trang-chu.rss');
        const xmlText = await res.text();

        const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item'));

        if (items.length === 0) {
            console.log('Lỗi tải rss');
            return [];
        }

        // duyệt từng bài viết + map vào newType
        const parsedNews: NewsType[] = items.map((item: Element, index: number) => {
           //đọc dữ liệu từ các thẻ con bên trong <item>
            const title = item.querySelector('title')?.textContent?.trim() || '';
            const rawDescription = item.querySelector('description')?.textContent || '';
            const guid = item.querySelector('guid')?.textContent?.trim() || '';
            const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
            const author = item.querySelector('creator')?.textContent?.trim() || 'Thể Thao 247';
            // tách lấy link ảnh từ thẻ img
            const imgRegex = /<img[^>]+src="([^">]+)"/;
            const match = rawDescription ? rawDescription.match(imgRegex) : null;
            const rawImage = match ? match[1] : 'https://via.placeholder.com/400x250';
            //lấy ảnh gốc
            const extractedImage = rawImage.replace(/\/resize_\d+x\d+\//, '/');

            // lấy mô tả
            const cleanText = rawDescription
                ? rawDescription.replace(/<[^>]*>?/gm, '').trim()
                : '';

            //lấy id bài viết giống thethao247
            const slug = guid
                ? guid.replace('https://thethao247.vn/', '').replace('.html', '')
                : String(index + 1);

            return {
                id: slug,
                title: title,
                description: cleanText,
                summary: cleanText,
                content: cleanText,
                imageUrl: extractedImage,
                category: detectCategory(guid, title),
                createdAt: pubDate,
                author: author || 'Thể Thao 247',
                viewsCount: (index + 1) * 123 + 450,
                commentsCount: (index % 7) + 2,
            };
        });

        return parsedNews;
    } catch (error) {
        console.error('Lỗi fetch rss', error);
        return [];
    }
}