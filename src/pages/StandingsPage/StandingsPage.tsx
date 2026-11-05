import './StandingsPage.css';

export default function StandingsPage() {
    // Dữ liệu mẫu Bảng xếp hạng từ API
    const standingsData = [
        { rank: 1, name: "Liverpool", logo: "https://via.placeholder.com/30", played: 25, won: 17, drawn: 6, lost: 2, gd: "+32", points: 57 },
        { rank: 2, name: "Manchester City", logo: "https://via.placeholder.com/30", played: 25, won: 16, drawn: 5, lost: 4, gd: "+28", points: 53 },
        { rank: 3, name: "Arsenal", logo: "https://via.placeholder.com/30", played: 25, won: 16, drawn: 4, lost: 5, gd: "+25", points: 52 },
        { rank: 4, name: "Aston Villa", logo: "https://via.placeholder.com/30", played: 25, won: 15, drawn: 4, lost: 6, gd: "+18", points: 49 },
        { rank: 5, name: "Tottenham", logo: "https://via.placeholder.com/30", played: 25, won: 14, drawn: 5, lost: 6, gd: "+15", points: 47 },
        { rank: 6, name: "Manchester United", logo: "https://via.placeholder.com/30", played: 25, won: 13, drawn: 2, lost: 10, gd: "-1", points: 41 },
    ];

    // Dữ liệu mẫu Thông tin đội bóng từ API (Giả sử đang xem chi tiết Man City)
    const teamDetailData = {
        name: "Manchester City",
        logo: "https://via.placeholder.com/100",
        founded: "1880",
        stadium: "Etihad Stadium (Sức chứa: 53,400)",
        manager: "Pep Guardiola",
        captain: "Kyle Walker",
        website: "mancity.com",
        recentForm: ["W", "W", "D", "W", "L"] // W: Thắng, D: Hòa, L: Thua
    };

    return (
        <div className="standings-page-container">
            <div className="standings-header">
                <h2>Bảng xếp hạng Ngoại Hạng Anh (Premier League)</h2>
                <p>Mùa giải 2023/2024 - Vòng 25</p>
            </div>

            <div className="standings-content-grid">
                {/* Cột trái: Bảng xếp hạng */}
                <div className="content-card standings-table-card">
                    <table className="standings-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-left">Câu lạc bộ</th>
                                <th>ST</th>
                                <th>T</th>
                                <th>H</th>
                                <th>B</th>
                                <th>HS</th>
                                <th>Đ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standingsData.map((team) => (
                                <tr key={team.rank} className={team.name === teamDetailData.name ? "highlight-row" : ""}>
                                    <td>{team.rank}</td>
                                    <td className="team-name-cell">
                                        <img src={team.logo} alt={team.name} className="table-team-logo" />
                                        <span>{team.name}</span>
                                    </td>
                                    <td>{team.played}</td>
                                    <td>{team.won}</td>
                                    <td>{team.drawn}</td>
                                    <td>{team.lost}</td>
                                    <td>{team.gd}</td>
                                    <td className="team-points">{team.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cột phải: Thông tin đội bóng chi tiết */}
                <div className="content-card team-info-card">
                    <div className="team-info-header">
                        <img src={teamDetailData.logo} alt={teamDetailData.name} className="detail-team-logo" />
                        <h3>{teamDetailData.name}</h3>
                    </div>
                    
                    <div className="team-info-body">
                        <div className="info-row">
                            <span className="info-label">Năm thành lập:</span>
                            <span className="info-value">{teamDetailData.founded}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Sân nhà:</span>
                            <span className="info-value">{teamDetailData.stadium}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Huấn luyện viên:</span>
                            <span className="info-value">{teamDetailData.manager}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Đội trưởng:</span>
                            <span className="info-value">{teamDetailData.captain}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Trang chủ:</span>
                            <span className="info-value text-primary">{teamDetailData.website}</span>
                        </div>
                    </div>

                    <div className="team-form-section">
                        <h4>Phong độ 5 trận gần nhất</h4>
                        <div className="form-badges">
                            {teamDetailData.recentForm.map((result, index) => (
                                <span key={index} className={`form-badge form-${result}`}>
                                    {result}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}