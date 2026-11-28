import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './MatchDetail.css';

interface MatchEvent {
    time: string;
    type: 'goal' | 'card';
    team: 'home' | 'away';
    text: string;
}

interface MatchStat {
    label: string;
    home: string;
    away: string;
}

interface MatchData {
    tournament: string;
    status: string;
    minute: string;
    homeTeam: { name: string; logo: string; score: number; scorers: string[] };
    awayTeam: { name: string; logo: string; score: number; scorers: string[] };
    stats: MatchStat[];
    events: MatchEvent[];
}

interface ApiEvent {
    type: string;
    detail?: string;
    team: { id: number };
    player: { name: string | null };
    time: { elapsed: number };
}

interface ApiStat {
    type: string;
    value: string | number | null;
}

interface ApiMatchResponse {
    response?: Array<{
        fixture: { status: { long: string | null; elapsed: number | null } };
        league: { country: string | null; name: string; round: string | null };
        teams: { home: { id: number; name: string; logo: string }; away: { id: number; name: string; logo: string } };
        goals: { home: number | null; away: number | null };
        events?: ApiEvent[];
        statistics?: Array<{ statistics: ApiStat[] }>;
    }>;
}

export default function MatchDetail() {
    const { id } = useParams();
    
    const [matchData, setMatchData] = useState<MatchData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Tách hàm gọi API riêng để có thể tái sử dụng khi người dùng bấm nút "Làm mới"
    const fetchMatchDetail = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            let matchId: string | number = id ?? '';

            // LOGIC XỬ LÝ KHI BẤM TRỰC TIẾP "CHI TIẾT TRẬN ĐẤU" (Không có ID trên URL)
            if (!matchId) {
                const liveRes = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c27b9be1da61631964ca91448f39dbb8',
                        'x-rapidapi-host': 'v3.football.api-sports.io'
                    }
                });
                const liveData = await liveRes.json() as {
                    response?: Array<{ fixture: { id: number } }>;
                };
                
                if (liveData.response && liveData.response.length > 0) {
                    matchId = liveData.response[0].fixture.id;
                } else {
                    matchId = "718306"; 
                }
            }
            
            // Gọi API lấy chi tiết trận đấu theo matchId đã xác định
            const response = await fetch(`https://v3.football.api-sports.io/fixtures?id=${matchId}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'c27b9be1da61631964ca91448f39dbb8',
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                }
            });

            const data = await response.json() as ApiMatchResponse;

            if (!data.response || data.response.length === 0) {
                throw new Error('Không tìm thấy thông tin trận đấu.');
            }

            const item = data.response[0];
            const homeId = item.teams.home.id;

            // Hàm gom nhóm người ghi bàn (Ví dụ: A. Tamm ⚽ x12)
            const processScorers = (eventsList: ApiEvent[], teamId: number) => {
                const goalMap: { [playerName: string]: number } = {};

                eventsList.forEach((ev) => {
                    if (ev.type === 'Goal' && ev.team.id === teamId) {
                        const name = ev.player.name || 'Cầu thủ';
                        goalMap[name] = (goalMap[name] || 0) + 1;
                    }
                });

                return Object.keys(goalMap).map(name => {
                    const count = goalMap[name];
                    return count > 1 ? `${name} ⚽ x${count}` : `${name} ⚽`;
                });
            };

            const homeScorers = processScorers(item.events || [], homeId);
            const awayScorers = processScorers(item.events || [], item.teams.away.id);

            // Lọc danh sách diễn biến trận đấu (Timeline)
            const events = (item.events || []).map((ev): MatchEvent => {
                const isHome = ev.team.id === homeId;
                let text: string;
                if (ev.type === 'Goal') {
                    text = `Vào! ${ev.player.name} ghi bàn (${ev.time.elapsed}')`;
                } else if (ev.type === 'Card') {
                    text = `${ev.detail || 'Thẻ phạt'} cho ${ev.player.name} (${ev.time.elapsed}')`;
                } else {
                    text = `${ev.type} - ${ev.player.name} (${ev.time.elapsed}')`;
                }

                return {
                    time: `${ev.time.elapsed}'`,
                    type: ev.type === 'Goal' ? 'goal' : 'card',
                    team: isHome ? 'home' : 'away',
                    text: text
                };
            });

            // Chuyển đổi số liệu thống kê (Stats) linh hoạt hơn với từ khóa (Keywords)
            let possessionHome = "50%", possessionAway = "50%";
            let shotsHome = "0", shotsAway = "0";
            let shotsOnTargetHome = "0", shotsOnTargetAway = "0";
            let foulsHome = "0", foulsAway = "0";
            let yellowHome = "0", yellowAway = "0";

            if (item.statistics && item.statistics.length === 2) {
                const parseStat = (statList: ApiStat[], keywords: string[]) => {
                    const found = statList.find((s) => keywords.some(kw => s.type.toLowerCase().includes(kw.toLowerCase())));
                    return found && found.value !== null ? String(found.value) : "0";
                };

                possessionHome = parseStat(item.statistics[0].statistics, ["Possession", "Ball"]);
                possessionAway = parseStat(item.statistics[1].statistics, ["Possession", "Ball"]);

                shotsHome = parseStat(item.statistics[0].statistics, ["Total Shots", "Shots Total"]);
                shotsAway = parseStat(item.statistics[1].statistics, ["Total Shots", "Shots Total"]);

                shotsOnTargetHome = parseStat(item.statistics[0].statistics, ["Shots on Goal", "On Target"]);
                shotsOnTargetAway = parseStat(item.statistics[1].statistics, ["Shots on Goal", "On Target"]);

                foulsHome = parseStat(item.statistics[0].statistics, ["Fouls"]);
                foulsAway = parseStat(item.statistics[1].statistics, ["Fouls"]);

                yellowHome = parseStat(item.statistics[0].statistics, ["Yellow Cards"]);
                yellowAway = parseStat(item.statistics[1].statistics, ["Yellow Cards"]);
            }

            // Tự động đếm số thẻ vàng từ mảng sự kiện (Events) để điền bù nếu thống kê chính thức trống
            const calculatedYellowHome = events.filter((e) => e.team === 'home' && e.type === 'card' && e.text.includes('Yellow')).length;
            const calculatedYellowAway = events.filter((e) => e.team === 'away' && e.type === 'card' && e.text.includes('Yellow')).length;

            if (yellowHome === "0" && calculatedYellowHome > 0) yellowHome = String(calculatedYellowHome);
            if (yellowAway === "0" && calculatedYellowAway > 0) yellowAway = String(calculatedYellowAway);

            setMatchData({
                tournament: `${item.league.country || ''} - ${item.league.name} (Vòng ${item.league.round || 'N/A'})`,
                status: item.fixture.status.long || 'Đang diễn ra',
                minute: `${item.fixture.status.elapsed || 0}'`,
                homeTeam: {
                    name: item.teams.home.name,
                    logo: item.teams.home.logo,
                    score: item.goals.home ?? 0,
                    scorers: homeScorers
                },
                awayTeam: {
                    name: item.teams.away.name,
                    logo: item.teams.away.logo,
                    score: item.goals.away ?? 0,
                    scorers: awayScorers
                },
                stats: [
                    { label: "Tỷ lệ kiểm soát bóng", home: possessionHome, away: possessionAway },
                    { label: "Sút dứt điểm", home: shotsHome, away: shotsAway },
                    { label: "Sút trúng đích", home: shotsOnTargetHome, away: shotsOnTargetAway },
                    { label: "Phạm lỗi", home: foulsHome, away: foulsAway },
                    { label: "Thẻ vàng", home: yellowHome, away: yellowAway },
                ],
                events: events
            });

        } catch (err) {
            console.error(err);
            setError('Không thể tải chi tiết trận đấu từ máy chủ API.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    // Chỉ gọi API một lần duy nhất khi load trang hoặc khi ID thay đổi
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMatchDetail();
    }, [id, fetchMatchDetail]);

    if (loading && !matchData) return <div className="text-center py-5">Đang tải chi tiết trận đấu...</div>;
    if (error) return <div className="alert alert-danger text-center m-4">{error}</div>;
    if (!matchData) return null;

    return (
        <div className="match-detail-container">
            {/* Header thông tin giải đấu tích hợp nút làm mới thủ công */}
            <div className="match-tournament-header d-flex justify-content-between align-items-center">
                <div>
                    <span className="tournament-name">{matchData.tournament}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <span className="match-status live m-0">
                        <span className="live-dot"></span> {matchData.status} ({matchData.minute})
                    </span>
                    <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={fetchMatchDetail} disabled={loading} title="Cập nhật số liệu mới nhất">
                        <i className="bi bi-arrow-clockwise"></i> {loading ? 'Đang tải...' : 'Làm mới'}
                    </button>
                </div>
            </div>

            {/* Bảng tỷ số chính dạng đối xứng */}
            <div className="match-scoreboard-symmetric">
                <div className="scorers-side home-scorers">
                    {matchData.homeTeam.scorers.length > 0 ? (
                        matchData.homeTeam.scorers.map((s: string, idx: number) => (
                            <div key={idx} className="scorer-item">{s}</div>
                        ))
                    ) : (
                        <span className="text-muted small">Chưa có bàn thắng</span>
                    )}
                </div>

                <div className="team-side home-team">
                    <img src={matchData.homeTeam.logo} alt={matchData.homeTeam.name} className="team-logo" />
                    <h2>{matchData.homeTeam.name}</h2>
                </div>

                <div className="score-box-center">
                    <span className="score-number">{matchData.homeTeam.score}</span>
                    <span className="score-divider">-</span>
                    <span className="score-number">{matchData.awayTeam.score}</span>
                </div>

                <div className="team-side away-team">
                    <img src={matchData.awayTeam.logo} alt={matchData.awayTeam.name} className="team-logo" />
                    <h2>{matchData.awayTeam.name}</h2>
                </div>

                <div className="scorers-side away-scorers">
                    {matchData.awayTeam.scorers.length > 0 ? (
                        matchData.awayTeam.scorers.map((s: string, idx: number) => (
                            <div key={idx} className="scorer-item">{s}</div>
                        ))
                    ) : (
                        <span className="text-muted small">Chưa có bàn thắng</span>
                    )}
                </div>
            </div>

            {/* Khu vực thông tin chi tiết (Thống kê & Diễn biến) */}
            <div className="match-content-grid">
                {/* Cột diễn biến trận đấu (Timeline) */}
                <div className="match-card">
                    <h3><i className="bi bi-clock-history me-2"></i>Diễn biến chính</h3>
                    <div className="timeline-list">
                        {matchData.events.length > 0 ? (
                            matchData.events.map((ev, index) => (
                                <div key={index} className={`timeline-item ${ev.team}`}>
                                    <span className="time-badge">{ev.time}</span>
                                    <span className="event-text">{ev.text}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted text-center py-3">Chưa có sự kiện nào trong trận đấu.</p>
                        )}
                    </div>
                </div>

                {/* Cột thống kê trận đấu */}
                <div className="match-card">
                    <h3><i className="bi bi-bar-chart-fill me-2"></i>Thống kê trận đấu</h3>
                    <div className="stats-list">
                        {matchData.stats.length > 0 ? (
                            matchData.stats.map((st, index) => (
                                <div key={index} className="stat-row">
                                    <span className="stat-val home-val">{st.home}</span>
                                    <span className="stat-label">{st.label}</span>
                                    <span className="stat-val away-val">{st.away}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted text-center py-3 m-0">Trận đấu này không có số liệu thống kê chi tiết.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}