import './App.css';
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

function App() {
    return (
     <>
         <div className="site-wrapper">
             <Header />
                 <main className="main-content py-3 px-3">

                 </main>
             <Footer />
         </div>
     </>
    );
}

export default App;