import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import các component dùng chung (Đảm bảo đường dẫn import khớp với cấu trúc thư mục của bạn)
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/homePage/HomePage";
import LiveScores from "./pages/LiveScores/LiveScores";
import MatchDetail from "./pages/MatchDetail/MatchDetail";
import StandingsPage from './pages/StandingsPage/StandingsPage';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                {/* Các thành phần dùng chung đặt ở đây sẽ luôn hiển thị */}
                <Header />
                <Navbar />

                {/* Phần nội dung thay đổi theo từng trang */}
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/live-scores" element={<LiveScores />} />
                        <Route path="/match-detail" element={<MatchDetail />} />
                        <Route path="/standings" element={<StandingsPage />} />
                    </Routes>
                </div>

                {/* Footer luôn nằm dưới cùng */}
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
