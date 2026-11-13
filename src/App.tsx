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
import SavedArticles from './pages/SavedArticles/SavedArticles';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import { AuthProvider } from './context/AuthContext';
import NewsDetailPage from "./pages/newsDetailPage/NewsDetailPage";

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
                        <Route path="/saved-articles" element={<SavedArticles />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/news/:id" element={<NewsDetailPage />} />
                    </Routes>
                </div>

                {/* Footer luôn nằm dưới cùng */}
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
