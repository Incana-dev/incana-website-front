import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-background min-h-screen font-inter text-text-body transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="relative text-center py-8 mb-12">
          <h1 className="text-5xl font-extrabold text-strong mb-2 font-poppins">
            <Link to="/">Incana</Link>
          </h1>
          <p className="text-text-body/90 text-lg">A Developer's Portfolio & Digital Garden</p>
          <nav className="mt-6">
            <ul className="flex justify-center gap-6 text-text-primary">
              <li><Link to="/" className="hover:text-highlight transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-highlight transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-highlight transition-colors">Contact</Link></li>
              <li><Link to="/login" className="hover:text-highlight transition-colors">Admin</Link></li>
            </ul>
          </nav>
          <button
            onClick={toggleTheme}
            className="absolute top-8 right-4 p-2 rounded-full bg-surface hover:bg-highlight/20 text-text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </header>

        <main>{children}</main>

        <footer className="text-center mt-20 py-6 border-t border-surface">
          <p className="text-text-body/70">&copy; {new Date().getFullYear()} Incana. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;