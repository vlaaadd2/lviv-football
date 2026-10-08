import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';


const resolveLogo = (value) => {
  if (!value || typeof value !== 'string') return '';
  const raw = value.trim();

  
  if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('data:')) return raw;

  const fileName = raw.replace(/\\/g, '/').split('/').pop();
  if (!fileName) return '';

  return `/logos/${encodeURIComponent(fileName)}`;
};

const TeamLogo = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-500">
        {alt ? alt.charAt(0).toUpperCase() : '?'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-8 h-8 object-contain flex-shrink-0"
      onError={() => setFailed(true)}
    />
  );
};

export const League = () => {
  const { leagueId } = useParams();
  const [activeTab, setActiveTab] = useState('standings');
  const [standings, setStandings] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const leagueNames = {
    'premier': "Прем'єр-ліга",
    'first': "Перша ліга",
    'second': "Друга ліга",
    'third-1': "Третя ліга (Група 1)",
    'third-2': "Третя ліга (Група 2)",
    'third-3': "Третя ліга (Група 3)",
    'fourth-1': "Четверта ліга (Група 1)",
    'fourth-2': "Четверта ліга (Група 2)"
  };

  useEffect(() => {
    const fetchLeagueData = async () => {
      setLoading(true);
      try {
        const qTeams = query(collection(db, 'teams'), where('leagueId', '==', leagueId));
        const teamsSnapshot = await getDocs(qTeams);
        const teamsData = {};

        teamsSnapshot.forEach(doc => {
          const data = doc.data();
          teamsData[doc.id] = {
            id: doc.id,
            name: data.name,
            logoUrl: resolveLogo(data.logoUrl || data.logo || data.imageUrl || ''),
            played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0
          };
        });

        const qMatches = query(collection(db, 'matches'), where('leagueId', '==', leagueId));
        const matchesSnapshot = await getDocs(qMatches);
        const matchesData = [];

        matchesSnapshot.forEach(doc => {
          const match = { id: doc.id, ...doc.data() };
          matchesData.push(match);

          if (match.status === 'Завершено') {
            const homeTeam = teamsData[match.homeTeamId];
            const awayTeam = teamsData[match.awayTeamId];

            if (homeTeam && awayTeam) {
              homeTeam.played += 1;
              awayTeam.played += 1;
              homeTeam.gf += match.homeGoals;
              homeTeam.ga += match.awayGoals;
              awayTeam.gf += match.awayGoals;
              awayTeam.ga += match.homeGoals;

              if (match.homeGoals > match.awayGoals) {
                homeTeam.won += 1; homeTeam.points += 3;
                awayTeam.lost += 1;
              } else if (match.homeGoals < match.awayGoals) {
                awayTeam.won += 1; awayTeam.points += 3;
                homeTeam.lost += 1;
              } else {
                homeTeam.drawn += 1; homeTeam.points += 1;
                awayTeam.drawn += 1; awayTeam.points += 1;
              }
            }
          }
        });

        const sortedStandings = Object.values(teamsData).sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          const diffA = a.gf - a.ga;
          const diffB = b.gf - b.ga;
          if (diffB !== diffA) return diffB - diffA;
          return b.gf - a.gf;
        });

        matchesData.sort((a, b) => a.round - b.round);

        setStandings(sortedStandings);
        setMatches(matchesData);
      } catch (error) {
        console.error("Помилка завантаження даних ліги:", error);
      } finally {
        setLoading(false);
      }
    };

    if (leagueId) {
      fetchLeagueData();
    }
  }, [leagueId]);

  const getTeam = (teamId) => {
    return standings.find(t => t.id === teamId) || { name: 'Невідома команда', logoUrl: '' };
  };

  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.round]) acc[match.round] = [];
    acc[match.round].push(match);
    return acc;
  }, {});

  const sortedRounds = Object.keys(groupedMatches).sort((a, b) => Number(a) - Number(b));

  if (loading) {
    return <div className="text-center py-20 text-xl font-bold text-blue-900">Завантаження даних...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 border-b-2 border-blue-600 pb-2">
        {leagueNames[leagueId] || "Турнір"}
      </h2>

      <div className="flex bg-white rounded-xl shadow-sm p-1 mb-6 border border-blue-50 w-fit mx-auto sm:mx-0">
        <button
          onClick={() => setActiveTab('standings')}
          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'standings' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
        >
          Турнірна таблиця
        </button>
        <button
          onClick={() => setActiveTab('matches')}
          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'matches' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
        >
          Календар матчів
        </button>
      </div>

      {activeTab === 'standings' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-blue-900 text-white text-sm tracking-wide">
                <th className="p-4 font-semibold text-center w-12">#</th>
                <th className="p-4 font-semibold">Команда</th>
                <th className="p-4 font-semibold text-center">І</th>
                <th className="p-4 font-semibold text-center">В</th>
                <th className="p-4 font-semibold text-center">Н</th>
                <th className="p-4 font-semibold text-center">П</th>
                <th className="p-4 font-semibold text-center">М'ячі</th>
                <th className="p-4 font-semibold text-center text-blue-200">О</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {standings.map((team, index) => (
                <tr key={team.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                  <td className="p-4 text-center font-bold text-gray-500">{index + 1}</td>
                  <td className="p-4 font-bold text-blue-900">
                    <div className="flex items-center gap-3">
                      <TeamLogo src={team.logoUrl} alt={team.name} />
                      {team.name}
                    </div>
                  </td>
                  <td className="p-4 text-center font-medium">{team.played}</td>
                  <td className="p-4 text-center text-green-600 font-semibold">{team.won}</td>
                  <td className="p-4 text-center text-gray-500 font-semibold">{team.drawn}</td>
                  <td className="p-4 text-center text-red-500 font-semibold">{team.lost}</td>
                  <td className="p-4 text-center font-medium">{team.gf}-{team.ga}</td>
                  <td className="p-4 text-center font-black text-blue-700 text-lg">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'matches' && (
        <div>
          {sortedRounds.length === 0 ? (
            <p className="text-gray-500">Матчів ще не заплановано.</p>
          ) : (
            sortedRounds.map((round) => (
              <div key={`round-${round}`} className="mb-10">
                <h3 className="text-xl font-bold text-blue-900 mb-4 border-b border-gray-200 pb-2">
                  Тур {round}
                </h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {groupedMatches[round].map((match) => {
                    const homeTeam = getTeam(match.homeTeamId);
                    const awayTeam = getTeam(match.awayTeamId);

                    return (
                      <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow overflow-hidden">
                        <div className="text-[11px] text-gray-400 font-bold mb-3 text-center uppercase tracking-widest">
                          {match.date}
                        </div>
                        <div className="flex items-center justify-between w-full gap-2">

                          <div className="flex items-center justify-end flex-1 basis-0 min-w-0 gap-2 text-right">
                            <span className="min-w-0 text-sm font-bold text-blue-900 leading-tight break-words">
                              {homeTeam.name}
                            </span>
                            <TeamLogo src={homeTeam.logoUrl} alt={homeTeam.name} />
                          </div>

                          <div className="shrink-0 px-3 py-1 bg-blue-50 text-blue-900 rounded font-black text-lg min-w-[65px] text-center border border-blue-100 shadow-inner">
                            {match.status === 'Завершено' ? `${match.homeGoals} : ${match.awayGoals}` : '- : -'}
                          </div>

                          <div className="flex items-center justify-start flex-1 basis-0 min-w-0 gap-2 text-left">
                            <TeamLogo src={awayTeam.logoUrl} alt={awayTeam.name} />
                            <span className="min-w-0 text-sm font-bold text-blue-900 leading-tight break-words">
                              {awayTeam.name}
                            </span>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};