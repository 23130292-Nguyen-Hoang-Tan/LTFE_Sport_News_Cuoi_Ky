import Header from "../../components/header/Header.tsx";
import Footer from "../../components/footer/Footer.tsx";
import Navbar from "../../components/navbar/Navbar.tsx";
import FeatureNews from "../../components/featureNews/FeatureNews.tsx";
import ListNews from "../../components/newsList/NewsList.tsx";

import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="site-wrapper">
            <Header />
            <Navbar />
            <main className="main-content site-layout py-3 px-3">
                <div className="news-container">
                    <FeatureNews/>
                    <ListNews />
                </div>
            </main>
            <Footer />
        </div>
    );
}