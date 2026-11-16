import { useState, useEffect } from 'react';
import './LiveScores.css';

// Định nghĩa chung kiểu dữ liệu cho gọn
interface Match {
  id: number;
  leagueName: string;
  leagueLogo: string;
  status: string;
  time: string;
  stadium: string;
  htScore?: string;
  homeTeam: {
    name: string;
    logo: string;
    score: number;
    yellowCards: number;
    redCards: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score: number;
    yellowCards: number;
    redCards: number;
  };
  events: Array<{
    id: number;
    type: 'Goal' | 'YellowCard' | 'RedCard';
    player: string;
    time: string;
    isHome: boolean;
  }>;
}

export default function LiveScores() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveScores = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'c27b9be1da61631964ca91448f39dbb8',
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }
        });

        const data = await response.json();

        if (data.errors && Object.keys(data.errors).length > 0) {
          throw new Error('Hết lượt gọi API hoặc lỗi hệ thống.');
        }

        // Chuyển đổi dữ liệu từ API sang cấu trúc dễ render cho React
        const list = data.response.map((item: any) => {
          const homeId = item.teams.home.id;

          // Xử lý danh sách sự kiện bàn thắng / thẻ phạt
          const events = (item.events || []).map((ev: any, idx: number) => {
            let type: 'Goal' | 'YellowCard' | 'RedCard' = 'Goal';
            if (ev.type === 'Card') {
              type = ev.detail.includes('Yellow') ? 'YellowCard' : 'RedCard';
            }
            return {
              id: idx,
              type: ev.type === 'Goal' ? 'Goal' : type,
              player: ev.player.name || 'Cầu thủ',
              time: `${ev.time.elapsed}'`,
              isHome: ev.team.id === homeId
            };
          });

          return {
            id: item.fixture.id,
            leagueName: `${item.league.country} - ${item.league.name}`,
            leagueLogo: item.league.logo,
            status: item.fixture.status.short,
            time: `${item.fixture.status.elapsed || 0}'`,
            stadium: item.fixture.venue.name || 'Sân vận động',
            htScore: item.score.halftime.home !== null ? `${item.score.halftime.home} - ${item.score.halftime.away}` : undefined,
            homeTeam: {
              name: item.teams.home.name,
              logo: item.teams.home.logo,
              score: item.goals.home ?? 0,
              yellowCards: events.filter((e: { isHome: boolean; type: 'Goal' | 'YellowCard' | 'RedCard' }) => e.isHome && e.type === 'YellowCard').length,
              redCards: events.filter((e: { isHome: boolean; type: 'Goal' | 'YellowCard' | 'RedCard' }) => e.isHome && e.type === 'RedCard').length
            },
            awayTeam: {
              name: item.teams.away.name,
              logo: item.teams.away.logo,
              score: item.goals.away ?? 0,
              yellowCards: events.filter((e: { isHome: boolean; type: 'Goal' | 'YellowCard' | 'RedCard' }) => !e.isHome && e.type === 'YellowCard').length,
              redCards: events.filter((e: { isHome: boolean; type: 'Goal' | 'YellowCard' | 'RedCard' }) => !e.isHome && e.type === 'RedCard').length
            },
            events
          };
        });

        setMatches(list);
      } catch (err) {
        setError('Không thể tải dữ liệu tỉ số trực tiếp từ máy chủ.');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveScores();
    
    // Tự động cập nhật mỗi 60 giây
    const timer = setInterval(fetchLiveScores, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="live-scores-container">
      <h2>Tỉ số trực tiếp</h2>
      
      {/* Chú thích */}
      <div className="legend-container">
        <div className="legend-item"><span className="blinking-dot"></span> Đang diễn ra</div>
        <div className="legend-item"><span className="event-icon icon-goal"></span> Bàn thắng</div>
        <div className="legend-item"><span className="event-icon icon-yellow-card"></span> Thẻ vàng</div>
        <div className="legend-item"><span className="event-icon icon-red-card"></span> Thẻ đỏ</div>
      </div>

      {loading && <div className="text-center py-4 text-muted">Đang tải dữ liệu...</div>}
      {error && <div className="alert alert-warning text-center">{error}</div>}

      {!loading && !error && matches.length === 0 && (
        <div className="text-center py-4 text-muted">Hiện không có trận đấu nào đang diễn ra.</div>
      )}

      <div className="matches-list">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            {/* Header trận đấu */}
            <div className="match-header">
              <div className="league-info d-flex align-items-center gap-2">
                <img src={match.leagueLogo} alt="" width="20" height="20" style={{ objectFit: 'contain' }} />
                <span className="league-name">{match.leagueName}</span>
              </div>
              <span className="match-stadium">{match.stadium}</span>
              <span className={`match-time ${['1H', '2H', 'LIVE'].includes(match.status) ? 'is-live' : ''}`}>
                {['1H', '2H', 'LIVE'].includes(match.status) ? (
                  <> <span className="blinking-dot"></span> {match.time} </>
                ) : (
                  match.status
                )}
              </span>
            </div>
            
            {/* Thân trận đấu: Tên đội, Tỉ số, Logo */}
            <div className="match-body">
              <div className="team home">
                <span className="team-name">{match.homeTeam.name}</span>
                <div className="card-counters">
                  {match.homeTeam.yellowCards > 0 && <span className="badge text-dark me-1">{match.homeTeam.yellowCards}🟨</span>}
                  {match.homeTeam.redCards > 0 && <span className="badge me-1">{match.homeTeam.redCards}🟥</span>}
                </div>
                <img src={match.homeTeam.logo} alt="" />
              </div>
              
              <div className="score-section">
                <div className="score-board">
                  <span className="score">{match.homeTeam.score}</span>
                  <span className="divider">-</span>
                  <span className="score">{match.awayTeam.score}</span>
                </div>
                {match.htScore && <div className="ht-score">HT: {match.htScore}</div>}
              </div>

              <div className="team away">
                <img src={match.awayTeam.logo} alt="" />
                <div className="card-counters">
                  {match.awayTeam.yellowCards > 0 && <span className="badge text-dark ms-1">{match.awayTeam.yellowCards}🟨</span>}
                  {match.awayTeam.redCards > 0 && <span className="badge ms-1">{match.awayTeam.redCards}🟥</span>}
                </div>
                <span className="team-name">{match.awayTeam.name}</span>
              </div>
            </div>

            {/* Bảng sự kiện trong trận */}
            {match.events.length > 0 && (
              <div className="match-events-columns">
                {/* Sự kiện đội nhà */}
                <div className="events-column home-column">
                  {match.events.filter(e => e.isHome).map(event => (
                    <div key={event.id} className="event-item">
                      <span className="event-time">{event.time}</span>
                      <span className={`event-icon ${event.type === 'Goal' ? 'icon-goal' : event.type === 'YellowCard' ? 'icon-yellow-card' : 'icon-red-card'}`}></span>
                      <span className="event-player">{event.player}</span>
                    </div>
                  ))}
                </div>

                {/* Sự kiện đội khách */}
                <div className="events-column away-column">
                  {match.events.filter(e => !e.isHome).map(event => (
                    <div key={event.id} className="event-item">
                      <span className="event-player">{event.player}</span>
                      <span className={`event-icon ${event.type === 'Goal' ? 'icon-goal' : event.type === 'YellowCard' ? 'icon-yellow-card' : 'icon-red-card'}`}></span>
                      <span className="event-time">{event.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}