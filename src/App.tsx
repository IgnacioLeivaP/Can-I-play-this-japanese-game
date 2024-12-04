import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GamesPage } from './pages/GamesPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';
import { GameDetails } from './pages/GameDetails';
import { RegionLockGuide } from './pages/RegionLockGuide';
import { MainLayout } from './components/layout/MainLayout';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/region-lock" element={<RegionLockGuide />} />
            </Routes>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}