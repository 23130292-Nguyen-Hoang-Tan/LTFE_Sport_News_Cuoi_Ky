import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import các component dùng chung (Đảm bảo đường dẫn import khớp với cấu trúc thư mục của bạn)
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/homePage/HomePage";
import LiveScores from "./pages/livescores/LiveScores";
import NewsDetailPage from "./pages/newsDetailPage/NewsDetailPage.tsx";

function App() {
    return (
        <BrowserRouter>
            {/* Các thành phần dùng chung đặt ở đây sẽ luôn hiển thị */}
            <Header />
            <Navbar />

            {/* Phần nội dung thay đổi theo từng trang */}
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/live-scores" element={<LiveScores />} />
                    <Route path="/news/:id" element={<NewsDetailPage />} />
                </Routes>
            </div>

            {/* Footer luôn nằm dưới cùng */}
            <Footer />
        </BrowserRouter>
    );
}

export default App;