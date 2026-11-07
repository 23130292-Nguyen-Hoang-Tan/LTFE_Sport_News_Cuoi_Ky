import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Import các component dùng chung
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// Import các trang
import HomePage from "./pages/homePage/HomePage";
import LiveScores from "./pages/livescores/LiveScores";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                {/* Các thành phần dùng chung đặt ở đây sẽ luôn hiển thị */}
                <Header />
                <Navbar />

                {/* Phần nội dung thay đổi theo từng trang */}
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/live-scores" element={<LiveScores />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>

                {/* Footer luôn nằm dưới cùng */}
                <Footer />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
