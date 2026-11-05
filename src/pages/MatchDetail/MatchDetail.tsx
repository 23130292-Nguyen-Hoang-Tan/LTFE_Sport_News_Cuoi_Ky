import './MatchDetail.css';

export default function MatchDetail() {
    // Dữ liệu mẫu (Mock data) tĩnh mô phỏng thông tin trận đấu
    const matchData = {
        tournament: "Ngoại Hạng Anh (Premier League) - Vòng 25",
        status: "Đang diễn ra",
        minute: "78'",
        homeTeam: {
            name: "Manchester United",
            logo: "https://via.placeholder.com/60",
            score: 2,
            scorers: ["Bruno Fernandes 24'", "Rashford 55'"]
        },
        awayTeam: {
            name: "Arsenal",
            logo: "https://via.placeholder.com/60",
            score: 1,
            scorers: ["Saka 12'"]
        },
        stats: [
            { label: "Tỷ lệ kiểm soát bóng", home: "52%", away: "48%" },
            { label: "Sút dứt điểm", home: "14", away: "11" },
            { label: "Sút trúng đích", home: "6", away: "4" },
            { label: "Phạm lỗi", home: "9", away: "12" },
            { label: "Thẻ vàng", home: "2", away: "3" },
        ],
        events: [
            { time: "12'", type: "goal", team: "away", text: "⚽ Vào! Bukayo Saka mở tỷ số cho Arsenal." },
            { time: "24'", type: "goal", team: "home", text: "⚽ Vào! Bruno Fernandes gỡ hòa 1-1 cho Man Utd." },
            { time: "55'", type: "goal", team: "home", text: "⚽ Vào! Marcus Rashford nâng tỷ số lên 2-1." },
            { time: "68'", type: "card", team: "away", text: "🟨 Thẻ vàng cho Declan Rice (Arsenal)." }
        ]
    };

    return (
        <div className="match-detail-container">
            {/* Header thông tin giải đấu */}
            <div className="match-tournament-header">
                <span className="tournament-name">{matchData.tournament}</span>
                <span className="match-status live">
                    <span className="live-dot"></span> {matchData.status} ({matchData.minute})
                </span>
            </div>

            {/* Bảng tỷ số chính dạng đối xứng: Người ghi bàn | Đội nhà | Tỉ số | Đội khách | Người ghi bàn */}
            <div className="match-scoreboard-symmetric">
                {/* 1. Người ghi bàn đội nhà (Cột trái) */}
                <div className="scorers-side home-scorers">
                    {matchData.homeTeam.scorers.map((s, idx) => (
                        <span key={idx} className="scorer-item">⚽ {s}</span>
                    ))}
                </div>

                {/* 2. Đội nhà (Logo + Tên) */}
                <div className="team-side home-team">
                    <img src={matchData.homeTeam.logo} alt={matchData.homeTeam.name} className="team-logo" />
                    <h2>{matchData.homeTeam.name}</h2>
                </div>

                {/* 3. Khung tỉ số ở giữa */}
                <div className="score-box-center">
                    <span className="score-number">{matchData.homeTeam.score}</span>
                    <span className="score-divider">-</span>
                    <span className="score-number">{matchData.awayTeam.score}</span>
                </div>

                {/* 4. Đội khách (Logo + Tên) */}
                <div className="team-side away-team">
                    <img src={matchData.awayTeam.logo} alt={matchData.awayTeam.name} className="team-logo" />
                    <h2>{matchData.awayTeam.name}</h2>
                </div>

                {/* 5. Người ghi bàn đội khách (Cột phải) */}
                <div className="scorers-side away-scorers">
                    {matchData.awayTeam.scorers.map((s, idx) => (
                        <span key={idx} className="scorer-item">{s} ⚽</span>
                    ))}
                </div>
            </div>

            {/* Khu vực thông tin chi tiết (Thống kê & Diễn biến) */}
            <div className="match-content-grid">
                {/* Cột diễn biến trận đấu (Timeline) */}
                <div className="match-card">
                    <h3><i className="bi bi-clock-history me-2"></i>Diễn biến chính</h3>
                    <div className="timeline-list">
                        {matchData.events.map((ev, index) => (
                            <div key={index} className={`timeline-item ${ev.team}`}>
                                <span className="time-badge">{ev.time}</span>
                                <span className="event-text">{ev.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cột thống kê trận đấu */}
                <div className="match-card">
                    <h3><i className="bi bi-bar-chart-fill me-2"></i>Thống kê trận đấu</h3>
                    <div className="stats-list">
                        {matchData.stats.map((st, index) => (
                            <div key={index} className="stat-row">
                                <span className="stat-val home-val">{st.home}</span>
                                <span className="stat-label">{st.label}</span>
                                <span className="stat-val away-val">{st.away}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}