import "./HomePage.css";
import FeatureNews from "../../components/featureNews/FeatureNews";
import NewsList from "../../components/newsList/NewsList";
import type { NewsType } from "../../data/news.ts";
import { useState, useEffect } from "react";
import { fetchData } from "../../service/rssService.ts";

export default function HomePage() {
    //lưu danh sách news lấy ra từ rss
    const [newsList, setNewsList] = useState<NewsType[]>([]);

    useEffect(() => {
        async function loadNews() {
            const data = await fetchData();
            setNewsList(data);
        }
        loadNews();
    }, []);

    return (
        <div className="site-wrapper">
            <main className="main-content site-layout py-3 px-3">
                <div className="news-container">
                    {/*truyền bài đầu tiên làm tin nổi bật*/}
                    <FeatureNews news={newsList[0]} />
                    <NewsList data={newsList.slice(1)}/>
                </div>
            </main>
        </div>
    );
}