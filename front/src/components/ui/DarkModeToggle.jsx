import { useState, useEffect } from 'react';
import { Sun, Moon } from '@phosphor-icons/react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10"
      aria-label="Dark mode"
    >
      {darkMode ? (
        <Sun size={18} weight="bold" className="text-yellow-500" />
      ) : (
        <Moon size={18} weight="bold" className="text-gray-700 dark:text-gray-400" />
      )}
    </button>
  );
}
