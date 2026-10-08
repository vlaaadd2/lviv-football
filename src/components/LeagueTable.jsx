export const LeagueTable = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="px-4 py-3 text-center w-12">#</th>
            <th className="px-4 py-3 text-left">Команда</th>
            <th className="px-4 py-3 text-center w-12">І</th>
            <th className="px-4 py-3 text-center w-12">В</th>
            <th className="px-4 py-3 text-center w-12">Н</th>
            <th className="px-4 py-3 text-center w-12">П</th>
            <th className="px-4 py-3 text-center w-24">РМ</th>
            <th className="px-4 py-3 text-center w-12 font-bold">О</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-center font-medium text-gray-500">{index + 1}</td>
              <td className="px-4 py-3 font-bold text-gray-800 flex items-center space-x-3">
                <img 
                  src={row.logo} 
                  alt={row.name} 
                  className="w-8 h-8 object-contain rounded-full bg-gray-100 p-0.5"
                  onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/53/53283.png' }} 
                />
                <span>{row.name}</span>
              </td>
              <td className="px-4 py-3 text-center">{row.games}</td>
              <td className="px-4 py-3 text-center">{row.wins}</td>
              <td className="px-4 py-3 text-center">{row.draws}</td>
              <td className="px-4 py-3 text-center">{row.losses}</td>
              <td className="px-4 py-3 text-center text-gray-500">{row.goalsFor}-{row.goalsAgainst}</td>
              <td className="px-4 py-3 text-center font-bold text-green-700 text-lg">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};