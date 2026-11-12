import "./HomePage.css";
import FeatureNews from "../../components/featureNews/FeatureNews.tsx";
import ListNews from "../../components/newsList/NewsList.tsx";


export default function HomePage() {
    return (
        <div className="site-wrapper">
            <main className="main-content site-layout py-3 px-3">
                <FeatureNews/>
                <ListNews />
            </main>
        </div>
    );
}