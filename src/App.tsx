import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GameDetails } from './pages/GameDetails';
import { RegionLockGuide } from './pages/RegionLockGuide';
import { Footer } from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/region-lock" element={<RegionLockGuide />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}