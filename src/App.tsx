import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import NewsDetailPage from "./pages/newsDetailPage/NewsDetailPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;