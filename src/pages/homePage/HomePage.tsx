import "./HomePage.css";
import FeatureNews from "../../components/featureNews/FeatureNews";
import NewsList from "../../components/newsList/NewsList";

export default function HomePage() {
    return (
        <div className="site-wrapper">
            <main className="main-content site-layout py-3 px-3">
                <div className="news-container">
                    <FeatureNews />
                    <NewsList/>
                </div>
            </main>
        </div>
    );
}