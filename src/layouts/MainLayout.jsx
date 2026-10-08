import { Outlet, NavLink, Link } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Шапка з синім градієнтом */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Логотип ЛАФ як кнопка на головну */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 transform group-hover:scale-105">
              <img 
                src="/laf-logo.png" 
                alt="ЛАФ" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-extrabold text-lg tracking-wide leading-tight group-hover:text-blue-100 transition-colors">ЛАФ</span>
              <span className="text-xs text-blue-200 font-medium tracking-wider uppercase">Аматорський футбол</span>
            </div>
          </Link>

          {/* Навігація з випадаючим списком */}
          <nav className="flex items-center gap-1 sm:gap-3">
            <NavLink 
              to="/" 
              className={({isActive}) => `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive ? 'bg-white/20 text-white shadow-inner' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}
            >
              Головна
            </NavLink>

            {/* Випадаюче меню Турніри */}
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-blue-100 hover:bg-white/10 hover:text-white">
                Турніри
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Вміст випадаючого меню (анімована картка) */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-800 shadow-xl border border-gray-100 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top scale-95 group-hover:scale-100">
                <div className="py-1">
                  <Link to="/league/premier" className="block px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">Прем'єр-ліга</Link>
                  <Link to="/league/first" className="block px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">Перша ліга</Link>
                  <Link to="/league/second" className="block px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">Друга ліга</Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link to="/league/third-1" className="block px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">Третя ліга (Група 1)</Link>
                  <Link to="/league/third-2" className="block px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">Третя ліга (Група 2)</Link>
                  <Link to="/league/third-3" className="block px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">Третя ліга (Група 3)</Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link to="/league/fourth-1" className="block px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">Четверта ліга (Група 1)</Link>
                  <Link to="/league/fourth-2" className="block px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">Четверта ліга (Група 2)</Link>
                </div>
              </div>
            </div>

            <NavLink 
              to="/search" 
              className={({isActive}) => `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive ? 'bg-white/20 text-white shadow-inner' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}
            >
              Пошук
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Основний контент */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Футер */}
      <footer className="bg-blue-900 text-blue-200 text-center py-6 text-sm border-t-4 border-blue-600 mt-auto shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <p className="font-semibold text-white tracking-wide">© 2026 Львівська Асоціація Футболу</p>
          <p>Офіційний портал аматорських змагань</p>
        </div>
      </footer>
    </div>
  );
};