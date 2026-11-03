import Header from "../../components/header/Header.tsx";
import Footer from "../../components/footer/Footer.tsx";
import Navbar from "../../components/navbar/Navbar.tsx";
import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="site-wrapper">
            <Header />
            <Navbar />
            <main className="main-content site-layout py-3 px-3">

            </main>
            <Footer />
        </div>
    );
}