import { useState, useEffect } from 'react';
import './StandingsPage.css';

interface StandingTeam {
    rank: number;
    id: number;
    name: string;
    logo: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    gd: string;
    points: number;
    form: string[];
    description: string;
    goalsFor: number;
    goalsAgainst: number;
    recordSummary: string;
    homeRecord: string;
    awayRecord: string;
}

interface SquadPlayer {
    id: number;
    name: string;
    photo?: string;
    position?: string;
    number?: number;
}

export default function StandingsPage() {
    const [standings, setStandings] = useState<StandingTeam[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<number>(42); // Mặc định chọn Arsenal (ID: 42)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State phục vụ Modal danh sách cầu thủ
    const [showSquadModal, setShowSquadModal] = useState(false);
    const [squad, setSquad] = useState<SquadPlayer[]>([]);
    const [loadingSquad, setLoadingSquad] = useState(false);
    const [squadError, setSquadError] = useState<string | null>(null);

    // 1. Gọi API lấy Bảng xếp hạng Ngoại hạng Anh khi mở trang
    useEffect(() => {
        const fetchStandings = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('https://v3.football.api-sports.io/standings?league=39&season=2024', {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c27b9be1da61631964ca91448f39dbb8',
                        'x-rapidapi-host': 'v3.football.api-sports.io'
                    }
                });

                const data = await response.json() as {
                    response?: Array<{
                        league: {
                            standings: Array<Array<{
                                rank: number;
                                team: { id: number; name: string; logo: string };
                                all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } };
                                home: { win: number; draw: number; lose: number };
                                away: { win: number; draw: number; lose: number };
                                goals: { for: number; against: number };
                                goalsDiff: number;
                                points: number;
                                form: string | null;
                                description?: string;
                            }>>;
                        };
                    }>;
                };

                if (data.response && data.response.length > 0) {
                    const rawTable = data.response[0].league.standings[0];

                    const formattedTable: StandingTeam[] = rawTable.map((item) => {
                        // Đường dẫn chuẩn của API-Football: item.goals và item.home / item.away
                        const gf = item.goals?.for ?? item.all?.goals?.for ?? 0;
                        const ga = item.goals?.against ?? item.all?.goals?.against ?? 0;

                        const homeWin = item.home?.win ?? 0;
                        const homeDraw = item.home?.draw ?? 0;
                        const homeLose = item.home?.lose ?? 0;

                        const awayWin = item.away?.win ?? 0;
                        const awayDraw = item.away?.draw ?? 0;
                        const awayLose = item.away?.lose ?? 0;

                        return {
                            rank: item.rank,
                            id: item.team.id,
                            name: item.team.name,
                            logo: item.team.logo,
                            played: item.all.played,
                            won: item.all.win,
                            drawn: item.all.draw,
                            lost: item.all.lose,
                            gd: item.goalsDiff > 0 ? `+${item.goalsDiff}` : `${item.goalsDiff ?? 0}`,
                            points: item.points,
                            form: item.form ? item.form.split('').slice(-5) : [],
                            description: item.description || 'Ngoại hạng Anh',
                            goalsFor: gf,
                            goalsAgainst: ga,
                            recordSummary: `${item.all.win}W - ${item.all.draw}D - ${item.all.lose}L`,
                            homeRecord: `${homeWin}W - ${homeDraw}D - ${homeLose}L`,
                            awayRecord: `${awayWin}W - ${awayDraw}D - ${awayLose}L`
                        };
                    });

                    setStandings(formattedTable);
                }
            } catch (err) {
                console.error(err);
                setError('Không thể tải dữ liệu bảng xếp hạng.');
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, []);

    // Khi đổi đội bóng, đóng modal cũ và xóa danh sách cầu thủ cũ
    const handleSelectTeam = (teamId: number) => {
        setSelectedTeamId(teamId);
        setShowSquadModal(false);
        setSquad([]);
        setSquadError(null);
    };

    // 2. Mở Modal và chỉ gọi API lấy cầu thủ khi người dùng bấm nút
    const handleOpenSquadModal = async (teamId: number) => {
        setShowSquadModal(true);
        setLoadingSquad(true);
        setSquadError(null);

        try {
            const response = await fetch(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'c27b9be1da61631964ca91448f39dbb8',
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                }
            });

            const data = await response.json() as {
                errors?: Record<string, string>;
                response?: Array<{ players?: SquadPlayer[] }>;
            };
            if (data.errors && Object.keys(data.errors).length > 0) {
                throw new Error('Lỗi hoặc hết lượt gọi API.');
            }

            const players = data.response?.[0]?.players || [];
            setSquad(players);
        } catch (err) {
            console.error(err);
            setSquadError('Không thể tải danh sách cầu thủ lúc này.');
        } finally {
            setLoadingSquad(false);
        }
    };

    const selectedTeam = standings.find(t => t.id === selectedTeamId) || standings[0];

    if (loading) return <div className="text-center py-5">Đang tải bảng xếp hạng Ngoại Hạng Anh...</div>;
    if (error) return <div className="alert alert-danger text-center m-4">{error}</div>;

    return (
        <div className="standings-page-container">
            <div className="standings-header">
                <h2>Bảng xếp hạng Ngoại Hạng Anh (Premier League)</h2>
                <p>Mùa giải 2024/2025</p>
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
                            {standings.map((team) => (
                                <tr
                                    key={team.id}
                                    className={team.id === selectedTeamId ? "highlight-row cursor-pointer" : "cursor-pointer"}
                                    onClick={() => handleSelectTeam(team.id)}
                                    title="Nhấn để xem thông tin đội bóng"
                                >
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

                {/* Cột phải: Thông tin đội bóng */}
                <div className="content-card team-info-card">
                    {selectedTeam ? (
                        <>
                            <div className="team-info-header">
                                <img src={selectedTeam.logo} alt={selectedTeam.name} className="detail-team-logo" />
                                <h3>{selectedTeam.name}</h3>
                            </div>

                            <div className="team-info-body">
                                <div className="info-row">
                                    <span className="info-label">Số trận / Kết quả:</span>
                                    <span className="info-value">{selectedTeam.played} trận ({selectedTeam.recordSummary})</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Bàn thắng / Bàn thua:</span>
                                    <span className="info-value">{selectedTeam.goalsFor} / {selectedTeam.goalsAgainst}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Hiệu suất (GD):</span>
                                    <span className="info-value">{selectedTeam.gd}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Sân nhà:</span>
                                    <span className="info-value">{selectedTeam.homeRecord}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Sân khách:</span>
                                    <span className="info-value">{selectedTeam.awayRecord}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Tổng điểm:</span>
                                    <span className="info-value text-primary fw-bold">{selectedTeam.points} điểm</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Nhóm / Trạng thái:</span>
                                    <span className="info-value">{selectedTeam.description}</span>
                                </div>
                            </div>

                            <div className="team-form-section">
                                <h4>Phong độ 5 trận gần nhất</h4>
                                <div className="form-badges">
                                    {selectedTeam.form.length > 0 ? (
                                        selectedTeam.form.map((result: string, index: number) => (
                                            <span key={index} className={`form-badge form-${result}`}>
                                                {result}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-muted small">Không có dữ liệu phong độ</span>
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary w-100 mt-4"
                                onClick={() => handleOpenSquadModal(selectedTeam.id)}
                            >
                                Xem danh sách cầu thủ
                            </button>
                        </>
                    ) : (
                        <div className="text-center py-5 text-muted">Vui lòng chọn một đội bóng từ bảng xếp hạng.</div>
                    )}
                </div>
            </div>

            {/* Modal hiển thị danh sách cầu thủ */}
            {showSquadModal && selectedTeam && (
                <div className="squad-modal-backdrop" onClick={() => setShowSquadModal(false)}>
                    <div className="squad-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="squad-modal-header">
                            <div className="d-flex align-items-center gap-2">
                                <img src={selectedTeam.logo} alt={selectedTeam.name} width="28" height="28" style={{ objectFit: 'contain' }} />
                                <h4 className="m-0">Danh sách cầu thủ - {selectedTeam.name}</h4>
                            </div>
                            <button
                                type="button"
                                className="squad-modal-close"
                                onClick={() => setShowSquadModal(false)}
                                aria-label="Đóng"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="squad-modal-body">
                            {loadingSquad && <p className="text-center text-muted py-4 m-0">Đang tải danh sách cầu thủ...</p>}
                            {squadError && <div className="alert alert-warning py-2 small m-0">{squadError}</div>}

                            {!loadingSquad && !squadError && squad.length === 0 && (
                                <p className="text-center text-muted py-4 m-0">Không có dữ liệu cầu thủ cho đội bóng này.</p>
                            )}

                            {!loadingSquad && squad.length > 0 && (
                                <div className="squad-player-list">
                                    {squad.map((player) => (
                                        <div key={player.id} className="squad-player-row">
                                            <div className="squad-player-info">
                                                {player.photo && (
                                                    <img src={player.photo} alt={player.name} className="squad-player-avatar" />
                                                )}
                                                <span className="squad-player-name">{player.name}</span>
                                            </div>
                                            <span className="squad-player-meta">
                                                {player.position || 'N/A'} {player.number ? `#${player.number}` : ''}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}