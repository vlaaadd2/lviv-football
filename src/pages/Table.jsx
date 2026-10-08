import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { LeagueTable } from '../components/LeagueTable';

export const Table = () => {
  const [leagueData, setLeagueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCalculateTable = async () => {
      try {
        
        const [teamsSnapshot, matchesSnapshot] = await Promise.all([
          getDocs(collection(db, "teams")),
          getDocs(collection(db, "matches"))
        ]);

        
        const stats = {};
        teamsSnapshot.forEach(doc => {
          stats[doc.id] = {
            id: doc.id,
            name: doc.data().name,
            games: 0, wins: 0, draws: 0, losses: 0,
            goalsFor: 0, goalsAgainst: 0, points: 0
          };
        });

        
        matchesSnapshot.forEach(doc => {
          const match = doc.data();
          
          
          if (match.status === 'Завершено') {
            const home = stats[match.homeTeamId];
            const away = stats[match.awayTeamId];

            if (home && away) {
              
              home.games += 1;
              away.games += 1;
              
              
              home.goalsFor += match.homeGoals;
              home.goalsAgainst += match.awayGoals;
              away.goalsFor += match.awayGoals;
              away.goalsAgainst += match.homeGoals;

              
              if (match.homeGoals > match.awayGoals) {
                home.wins += 1;
                home.points += 3;
                away.losses += 1;
              } else if (match.homeGoals < match.awayGoals) {
                away.wins += 1;
                away.points += 3;
                home.losses += 1;
              } else {
                home.draws += 1;
                away.draws += 1;
                home.points += 1;
                away.points += 1;
              }
            }
          }
        });

        
        const sortedTable = Object.values(stats).sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
        });

        setLeagueData(sortedTable);
      } catch (error) {
        console.error("Помилка алгоритму розрахунку:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCalculateTable();
  }, []);

  if (loading) return <div className="text-center mt-10 text-xl font-bold">Розрахунок турнірної таблиці...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Турнірна таблиця (3-тя ліга)</h2>
      <LeagueTable data={leagueData} />
    </div>
  );
};