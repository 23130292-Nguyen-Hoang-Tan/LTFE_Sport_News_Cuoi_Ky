import NewsDetail from '../../components/newsDetail/NewsDetail';
import NewsList from "../../components/newsList/NewsList.tsx"
import "./NewsDetailPage.css";
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { NewsType } from "../../data/news.ts";
import { fetchData } from "../../service/rssService.ts";

export default function NewsDetailPage() {
    const [newsList, setNewsList] = useState<NewsType[]>([]);
    //hiển thị toàn bộ danh sách mới nhất
    const [isShowAllLatest, setIsShowAllLatest] = useState<boolean>(false);
    //lấy id bài viết hiện tại
    const { id } = useParams();

    useEffect(() => {
        async function loadNews() {
            const data = await fetchData();
            setNewsList(data);
        }
        loadNews();
    }, []);


    //tìm bài viết hiện tại đang hiển thị
    const currentArticle = newsList.find((item) => String(item.id) === String(id)) || newsList[0];

    //list mới nhất trừ bài đang hiển thị
    const latestNews = newsList.filter((item) => item.id !== currentArticle?.id);

    //list nổi bật
    const featuredNews = [...latestNews].sort(
        (a, b) => (b.viewsCount || 0) - (a.viewsCount || 0)
    );

    //list trendding
    const trendingNews = [...latestNews].sort(
        (a, b) =>
            ((b.viewsCount || 0) + (b.commentsCount || 0) * 5) -
            ((a.viewsCount || 0) + (a.commentsCount || 0) * 5)
    );

    //list có thể bạn quan tâm, lọc các bài cùng danh mục
    const sameCategoryNews = latestNews.filter(
        (item) => currentArticle?.category && item.category === currentArticle.category
    );
    //nếu bài cùng danh mục chưa đủ 9 thì thêm bài khác vào
    const relatedNews =
        sameCategoryNews.length >= 9
            ? sameCategoryNews
            : [
                ...sameCategoryNews,
                ...latestNews.filter((item) => item.category !== currentArticle?.category),
            ];
    return (
        <div className="site-wrapper" key={id}>
            <main className="main-content site-layout py-4 px-3">
                <div className="row g-4">
                    {/* cột trái */}
                    <div className="col-12 col-lg-9">
                        <NewsDetail />
                        {/*news trending*/}
                        <div className="mt-5">
                            <NewsList
                                title="TRENDING"
                                data={trendingNews}
                                columns={3}
                                variant="grid"
                                limit={6}
                            />
                        </div>
                        {/*news có thể bạn quan tâm*/}
                        <div className="mt-5">
                            <NewsList
                                title="Có thể bạn quan tâm"
                                data={relatedNews}
                                columns={3}
                                variant="grid"
                                limit={9}
                            />
                        </div>
                        {/*news mới nhất*/}
                        <div className="mt-5">
                            <NewsList
                                title="Mới nhất"
                                data={latestNews}
                                columns={1}
                                variant="horizontal"
                                limit={isShowAllLatest ? undefined : 10}
                            />
                            {/*chỉ hiện nút xem thêm khi chưa hiển thị hết bài viết*/}
                            {!isShowAllLatest && latestNews.length > 10 && (
                                <button
                                    type="button"
                                    className="btn-load-more w-100 text-uppercase fw-semibold mt-3"
                                    onClick={() => setIsShowAllLatest(true)}
                                >
                                    XEM THÊM
                                </button>
                            )}
                        </div>
                    </div>


                    {/* cột phải */}
                    <div className="col-12 col-lg-3">
                        <Sidebar/>
                        {/*news nổi bật*/}
                        <div className="mt-5">
                            <NewsList
                                title="Nổi bật"
                                data={featuredNews}
                                columns={1}
                                variant="compact"
                                limit={4}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}