import logo from "../../assets/images/logo3.png";
import logo2 from "../../assets/images/logo2.png";
import "./Footer.css";

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
                                <li><a href="#">Lịch thi đấu bóng đá</a></li>
                                <li><a href="#">Kết quả bóng đá</a></li>
                                <li><a href="#">Nhận định bóng đá</a></li>
                                <li><a href="#">Tỷ số bóng đá</a></li>
                                <li><a href="#">Trực tiếp bóng đá</a></li>
                                <li><a href="#">Chuyển nhượng bóng đá</a></li>
                                <li><a href="#">Video thể thao</a></li>
                            </ul>
                        </div>

                        {/* cột 2 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">GIẢI ĐẤU NỔI BẬT</h6>
                            <ul className="footer-links">
                                <li><a href="#">Ngoại hạng Anh</a></li>
                                <li><a href="#">Cúp C1</a></li>
                                <li><a href="#">La Liga</a></li>
                                <li><a href="#">Serie A</a></li>
                                <li><a href="#">Bundesliga</a></li>
                                <li><a href="#">V League</a></li>
                                <li><a href="#">World Cup</a></li>
                                <li><a href="#">Euro</a></li>
                                <li><a href="#">Asian Cup</a></li>
                                <li><a href="#">Cúp C2</a></li>
                                <li><a href="#">SEA Games</a></li>
                                <li><a href="#">AFF Cup</a></li>
                                <li><a href="#">Bóng đá Việt Nam</a></li>
                            </ul>
                        </div>

                        {/* cột 3 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">BẢNG XẾP HẠNG BÓNG ĐÁ</h6>
                            <ul className="footer-links">
                                <li><a href="#">BXH Ngoại hạng Anh</a></li>
                                <li><a href="#">BXH La Liga</a></li>
                                <li><a href="#">BXH Ý</a></li>
                                <li><a href="#">BXH Cúp C1</a></li>
                                <li><a href="#">BXH Cúp C2</a></li>
                                <li><a href="#">BXH Đức</a></li>
                                <li><a href="#">BXH Pháp</a></li>
                                <li><a href="#">BXH V League</a></li>
                            </ul>
                        </div>

                        {/* cột 4 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">KẾT QUẢ BÓNG ĐÁ</h6>
                            <ul className="footer-links">
                                <li><a href="#">Kết quả Cúp C1</a></li>
                                <li><a href="#">Kết quả Ngoại hạng Anh</a></li>
                                <li><a href="#">Kết quả bóng đá Ý</a></li>
                                <li><a href="#">Kết quả bóng đá Tây Ban Nha</a></li>
                                <li><a href="#">Kết quả bóng đá Đức</a></li>
                                <li><a href="#">Kết quả bóng đá Pháp</a></li>
                                <li><a href="#">Kết quả Cúp C2</a></li>
                            </ul>
                        </div>

                        {/* cột 5 */}
                        <div className="col-lg col-md-4 col-6">
                            <h6 className="footer-title">THỂ THAO TỔNG HỢP</h6>
                            <ul className="footer-links">
                                <li><a href="#">Bóng chuyền</a></li>
                                <li><a href="#">Quần vợt</a></li>
                                <li><a href="#">Esports</a></li>
                                <li><a href="#">Xe cộ</a></li>
                                <li><a href="#">Võ</a></li>
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
                                <li><a href="#"><i className="bi bi-youtube text-danger"></i> Youtube</a></li>
                                <li><a href="#"><i className="bi bi-facebook text-primary"></i> Facebook</a></li>
                                <li><a href="#"><i className="bi bi-twitter-x text-dark"></i> Twitter</a></li>
                                <li><a href="#"><i className="bi bi-rss-fill text-warning"></i> RSS</a></li>
                                <li><a href="#"><i className="bi bi-tiktok text-dark"></i> Tiktok</a></li>
                            </ul>
                        </div>

                        {/* liên hệ + điều khoản */}
                        <div className="col-lg-4 col-md-6">
                            <div className="policy-info">
                                <p><a href="#" className="text-decoration-none">Thỏa thuận chia sẻ nội dung</a></p>
                                <p><a href="#" className="text-decoration-none">Chính sách bảo mật</a></p>
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