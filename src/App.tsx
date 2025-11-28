import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Whiteboard from './pages/Whiteboard';
import Drills from './pages/Drills';
import { Map, BookOpen, Moon, Sun } from 'lucide-react';

// Floating HUD Component
const FloatingControls = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  // Handle Dark Mode Toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const isWhiteboard = location.pathname === '/';

  return (
    <div className="absolute top-4 right-4 z-50 flex flex-col gap-2 items-end">
      
      {/* View Toggle Switch */}
      <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex">
        <button
          onClick={() => navigate('/')}
          className={`p-2 rounded-full transition-all ${
            isWhiteboard 
              ? 'bg-indigo-600 text-white shadow' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Whiteboard"
        >
          <Map size={20} />
        </button>
        <button
          onClick={() => navigate('/drills')}
          className={`p-2 rounded-full transition-all ${
            !isWhiteboard 
              ? 'bg-indigo-600 text-white shadow' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Drills"
        >
          <BookOpen size={20} />
        </button>
      </div>

      {/* Dark Mode Switch */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <FloatingControls />
        <div className="flex-grow relative">
          <Routes>
            <Route path="/" element={<Whiteboard />} />
            <Route path="/drills" element={<Drills />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;