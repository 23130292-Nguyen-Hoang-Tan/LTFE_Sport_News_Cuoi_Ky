import NewsDetail from '../../components/newsDetail/NewsDetail';
import NewsList from "../../components/newsList/NewsList.tsx"
import "./NewsDetailPage.css";
import Sidebar from "../../components/sidebar/Sidebar.tsx";

export default function NewsDetailPage() {
    return (
        <div className="site-wrapper">
            <main className="main-content site-layout py-4 px-3">
                <div className="row g-4">
                    {/* cột trái */}
                    <div className="col-12 col-lg-9">
                        <NewsDetail />
                        {/*news trending*/}
                        <div className="mt-5">
                            <NewsList
                                title="TRENDING"
                                columns={3}
                                variant="grid"
                                limit={6}
                            />
                        </div>
                        {/*news có thể bạn quan tâm*/}
                        <div className="mt-5">
                            <NewsList
                                title="Có thể bạn quan tâm"
                                columns={3}
                                variant="grid"
                                limit={9}
                            />
                        </div>
                        {/*news mới nhất*/}
                        <div className="mt-5">
                            <NewsList
                                title="Mới nhất"
                                columns={1}
                                variant="horizontal"
                                limit={10}
                            />
                            <button className="btn-load-more w-100 text-uppercase fw-semibold mt-3">
                                XEM THÊM
                            </button>
                        </div>
                    </div>


                    {/* cột phải */}
                    <div className="col-12 col-lg-3">
                        <Sidebar/>
                        {/*news nổi bật*/}
                        <div className="mt-5">
                            <NewsList
                                title="Nổi bật"
                                columns={1}
                                variant="compact"
                                limit={4}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}