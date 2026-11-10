import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import NewsDetail from '../../components/newsDetail/NewsDetail';

export default function NewsDetailPage() {
    return (
        <div className="site-wrapper">
            <Header />
            <Navbar />

            <main className="main-content site-layout py-4 px-3">
                <div className="row g-4">
                    {/* cột trái */}
                    <div className="col-12 col-lg-8">
                        <NewsDetail />
                    </div>

                    {/* cột phải */}
                    <div className="col-12 col-lg-4">

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}