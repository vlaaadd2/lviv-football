export const MatchCard = ({ date, homeTeam, awayTeam, homeLogo, awayLogo, score, status }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-600 flex flex-col md:flex-row justify-between items-center">
      <div className="text-gray-500 text-sm mb-2 md:mb-0 w-32 text-center md:text-left">
        {date}
      </div>
      
      <div className="flex items-center justify-center flex-1 space-x-4">
        <div className="flex items-center space-x-3 justify-end w-2/5">
          <span className="font-semibold text-lg text-right hidden sm:block">{homeTeam}</span>
          <img src={homeLogo} alt={homeTeam} className="w-10 h-10 object-contain rounded-full bg-gray-50 p-1" />
        </div>
        
        <div className="bg-gray-100 px-4 py-2 rounded-md font-bold text-xl text-center min-w-[80px]">
          {score ? score : '- : -'}
        </div>
        
        <div className="flex items-center space-x-3 justify-start w-2/5">
          <img src={awayLogo} alt={awayTeam} className="w-10 h-10 object-contain rounded-full bg-gray-50 p-1" />
          <span className="font-semibold text-lg text-left hidden sm:block">{awayTeam}</span>
        </div>
      </div>

      <div className={`text-sm font-medium mt-2 md:mt-0 w-24 text-center md:text-right ${status === 'Завершено' ? 'text-green-600' : 'text-orange-500'}`}>
        {status}
      </div>
    </div>
  );
};