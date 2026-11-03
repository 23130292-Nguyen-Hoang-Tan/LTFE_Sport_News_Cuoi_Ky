import React, { useState } from 'react';
import './LiveScores.css';

interface MatchEvent {
  id: number;
  type: 'Goal' | 'RedCard';
  player: string;
  time: string;
  isHome: boolean;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  score: number;
  redCards: number;
}

interface Match {
  id: number;
  league: string;
  status: string; 
  time: string;   
  stadium: string;
  htScore?: string;
  homeTeam: Team;
  awayTeam: Team;
  events: MatchEvent[];
}

const LiveScores: React.FC = () => {
  const [matches] = useState<Match[]>([
    {
      id: 1,
      league: "Ngoại Hạng Anh",
      status: "LIVE",
      time: "67'",
      stadium: "Emirates Stadium",
      htScore: "1 - 0",
      homeTeam: { id: 101, name: "Arsenal", logo: "https://via.placeholder.com/30", score: 2, redCards: 0 },
      awayTeam: { id: 102, name: "Chelsea", logo: "https://via.placeholder.com/30", score: 1, redCards: 1 },
      events: [
        { id: 1, type: 'Goal', player: 'B. Saka', time: "14'", isHome: true },
        { id: 2, type: 'RedCard', player: 'M. Caicedo', time: "42'", isHome: false },
        { id: 3, type: 'Goal', player: 'C. Palmer', time: "55'", isHome: false },
        { id: 4, type: 'Goal', player: 'M. Ødegaard', time: "65'", isHome: true },
      ]
    },
    {
      id: 2,
      league: "La Liga",
      status: "HT",
      time: "HT",
      stadium: "Santiago Bernabéu",
      homeTeam: { id: 201, name: "Real Madrid", logo: "https://via.placeholder.com/30", score: 0, redCards: 0 },
      awayTeam: { id: 202, name: "Barcelona", logo: "https://via.placeholder.com/30", score: 0, redCards: 0 },
      events: []
    }
  ]);

  return (
    <div className="live-scores-container">
      <h2>Tỉ số trực tiếp</h2>
      
      {/* Thêm phần chú thích ký hiệu */}
      <div className="legend-container">
        <div className="legend-item">
          <span className="blinking-dot"></span> Đang diễn ra
        </div>
        <div className="legend-item">
          <span className="event-icon icon-goal"></span> Bàn thắng
        </div>
        <div className="legend-item">
          <span className="event-icon icon-red-card"></span> Thẻ đỏ
        </div>
      </div>

      <div className="matches-list">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <span className="league-name">{match.league}</span>
              <span className="match-stadium">{match.stadium}</span>
              <span className={`match-time ${match.status === 'LIVE' ? 'is-live' : ''}`}>
                {match.status === 'LIVE' ? (
                  <> <span className="blinking-dot"></span> {match.time} </>
                ) : (
                  match.time
                )}
              </span>
            </div>
            
            <div className="match-body">
              <div className="team home">
                <span className="team-name">{match.homeTeam.name}</span>
                {match.homeTeam.redCards > 0 && <span className="red-card-icon"></span>}
                <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
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
                <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
                {match.awayTeam.redCards > 0 && <span className="red-card-icon"></span>}
                <span className="team-name">{match.awayTeam.name}</span>
              </div>
            </div>

           {match.events.length > 0 && (
              <div className="match-events-columns">
                {/* Cột trái: Sự kiện của đội nhà */}
                <div className="events-column home-column">
                  {match.events.filter(e => e.isHome).map(event => (
                    <div key={event.id} className="event-item">
                      <span className="event-time">{event.time}</span>
                      <span className={`event-icon ${event.type === 'Goal' ? 'icon-goal' : 'icon-red-card'}`}></span>
                      <span className="event-player">{event.player}</span>
                    </div>
                  ))}
                </div>

                {/* Cột phải: Sự kiện của đội khách */}
                <div className="events-column away-column">
                  {match.events.filter(e => !e.isHome).map(event => (
                    <div key={event.id} className="event-item">
                      <span className="event-player">{event.player}</span>
                      <span className={`event-icon ${event.type === 'Goal' ? 'icon-goal' : 'icon-red-card'}`}></span>
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
};

export default LiveScores;