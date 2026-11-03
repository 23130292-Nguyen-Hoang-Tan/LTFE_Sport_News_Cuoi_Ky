import logo from "../../assets/images/logo3.png";
import logo2 from "../../assets/images/logo2.png";
import "./Footer.css";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="main-footer">
            {/* thanh banner xanh */}
            <div className="footer-banner-top py-2">
                <div className="footer-content d-flex align-items-center">
                    <img src={logo} alt="Thể thao 247" className="footer-logo-top" />
                </div>
            </div>

            {/* danh mục link */}
            <div className="footer-top py-4">
                <div className="footer-content">
                    <div className="row g-4">
                        {/* cột 1 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">TIỆN ÍCH BÓNG ĐÁ</h6>
                            <ul className="footer-links">
                                <li><Link to="#">Lịch thi đấu bóng đá</Link></li>
                                <li><Link to="#">Kết quả bóng đá</Link></li>
                                <li><Link to="#">Nhận định bóng đá</Link></li>
                                <li><Link to="#">Tỷ số bóng đá</Link></li>
                                <li><Link to="#">Trực tiếp bóng đá</Link></li>
                                <li><Link to="#">Chuyển nhượng bóng đá</Link></li>
                                <li><Link to="#">Video thể thao</Link></li>
                            </ul>
                        </div>

                        {/* cột 2 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">GIẢI ĐẤU NỔI BẬT</h6>
                            <ul className="footer-links">
                                <li><Link to="#">Ngoại hạng Anh</Link></li>
                                <li><Link to="#">Cúp C1</Link></li>
                                <li><Link to="#">La Liga</Link></li>
                                <li><Link to="#">Serie A</Link></li>
                                <li><Link to="#">Bundesliga</Link></li>
                                <li><Link to="#">V League</Link></li>
                                <li><Link to="#">World Cup</Link></li>
                                <li><Link to="#">Euro</Link></li>
                                <li><Link to="#">Asian Cup</Link></li>
                                <li><Link to="#">Cúp C2</Link></li>
                                <li><Link to="#">SEA Games</Link></li>
                                <li><Link to="#">AFF Cup</Link></li>
                                <li><Link to="#">Bóng đá Việt Nam</Link></li>
                            </ul>
                        </div>

                        {/* cột 3 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">BẢNG XẾP HẠNG BÓNG ĐÁ</h6>
                            <ul className="footer-links">
                                <li><Link to="#">BXH Ngoại hạng Anh</Link></li>
                                <li><Link to="#">BXH La Liga</Link></li>
                                <li><Link to="#">BXH Ý</Link></li>
                                <li><Link to="#">BXH Cúp C1</Link></li>
                                <li><Link to="#">BXH Cúp C2</Link></li>
                                <li><Link to="#">BXH Đức</Link></li>
                                <li><Link to="#">BXH Pháp</Link></li>
                                <li><Link to="#">BXH V League</Link></li>
                            </ul>
                        </div>

                        {/* cột 4 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">KẾT QUẢ BÓNG ĐÁ</h6>
                            <ul className="footer-links">
                                <li><Link to="#">Kết quả Cúp C1</Link></li>
                                <li><Link to="#">Kết quả Ngoại hạng Anh</Link></li>
                                <li><Link to="#">Kết quả bóng đá Ý</Link></li>
                                <li><Link to="#">Kết quả bóng đá Tây Ban Nha</Link></li>
                                <li><Link to="#">Kết quả bóng đá Đức</Link></li>
                                <li><Link to="#">Kết quả bóng đá Pháp</Link></li>
                                <li><Link to="#">Kết quả Cúp C2</Link></li>
                            </ul>
                        </div>

                        {/* cột 5 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">THỂ THAO TỔNG HỢP</h6>
                            <ul className="footer-links">
                                <li><Link to="#">Bóng chuyền</Link></li>
                                <li><Link to="#">Quần vợt</Link></li>
                                <li><Link to="#">Esports</Link></li>
                                <li><Link to="#">Xe cộ</Link></li>
                                <li><Link to="#">Võ</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* đường kẻ màu đỏ */}
            <div className="red-divider"></div>

            {/* bản quyền */}
            <div className="footer-bottom py-4">
                <div className="footer-content">
                    <div className="row g-4">
                        {/* công ty */}
                        <div className="col-lg-5 col-md-12">
                            <img src={logo2} alt="Thể thao 247" className="footer-logo-bot mb-3" />
                            <div className="company-info">
                                <p><strong>Công ty TNHH MTV GenPress</strong></p>
                                <p><strong>Giấy phép thiết lập Mạng xã hội số 365/GP-BTTTT, Ký ngày 4/12/2024</strong></p>
                                <p><strong>Địa chỉ Hà Nội:</strong> Tầng 04, Tòa nhà Star, Lô D32 KĐT Cầu Giấy, Đường Dương Đình Nghệ, Yên Hòa, Cầu Giấy, Hà Nội.</p>
                                <p><strong>Mã số thuế:</strong> 0110067529</p>
                                <p><strong>Điện thoại:</strong> 0847100247</p>
                                <p><strong>Người chịu trách nhiệm:</strong> Trần Xuân Hùng</p>
                                <p><strong>Email:</strong> contact@thethao247.vn</p>
                            </div>
                        </div>

                        {/* mạng xã hội */}
                        <div className="col-lg-3 col-md-6">
                            <h6 className="social-header">SOCIAL</h6>
                            <ul className="social-links">
                                <li><Link to="#"><i className="bi bi-youtube text-danger"></i> Youtube</Link></li>
                                <li><Link to="#"><i className="bi bi-facebook text-primary"></i> Facebook</Link></li>
                                <li><Link to="#"><i className="bi bi-twitter-x text-dark"></i> Twitter</Link></li>
                                <li><Link to="#"><i className="bi bi-rss-fill text-warning"></i> RSS</Link></li>
                                <li><Link to="#"><i className="bi bi-tiktok text-dark"></i> Tiktok</Link></li>
                            </ul>
                        </div>

                        {/* liên hệ + điều khoản */}
                        <div className="col-lg-4 col-md-6">
                            <div className="policy-info">
                                <p><Link to="#" className="text-decoration-none">Thỏa thuận chia sẻ nội dung</Link></p>
                                <p><Link to="#" className="text-decoration-none">Chính sách bảo mật</Link></p>
                                <p><strong>Báo giá quảng cáo:</strong> <a href="#" className="text-primary text-decoration-none">Tại đây</a></p>
                                <p><strong>Liên hệ quảng cáo, truyền thông, hợp tác kinh doanh:</strong> 0985 233 950</p>
                                <p><strong>VPGD:</strong> Tầng 4, số 248 Lương Thế Vinh, Trung Văn, Nam Truyền, Nam Từ Liêm, Hà Nội.</p>
                                <p className="mt-3 text-muted">© LANGTUCCAU 2024 . All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;