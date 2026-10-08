import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* Головний банер */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
        <div className="p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-br from-white to-blue-50">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
              Ласкаво просимо до сезону 2026!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Слідкуйте за результатами, турнірними таблицями та статистикою команд Прем'єр-ліги, Першої, Другої, Третьої та Четвертої ліг Львівщини у реальному часі.
            </p>
          </div>
          <Link to="/search" className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1">
            Знайти команду
          </Link>
        </div>
      </div>

      {/* Блок новин */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">📰</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Останні новини</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">


          {/* Картка новин */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Анонс</span>
              <span className="text-sm text-gray-400 font-medium">06 Жовтня 2026</span>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors">Старт нового сезону!</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              Вже цими вихідними розпочинається новий сезон аматорського чемпіонату Львівщини. Усі команди готові до запеглої боротьби за трофеї. Бажаємо успіху!
            </p>
            <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Читати далі <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};