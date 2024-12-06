import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { GameCard } from '@/components/GameCard';
import { GameFilters } from '@/components/GameFilters';
import { games } from '@/data/games';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { GameDifficulty } from '@/types';

const ITEMS_PER_PAGE = 20;

export function GamesPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConsole, setSelectedConsole] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty | null>(null);

  const filteredGames = games.filter((game) => {
    const matchesSearch = 
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.japaneseTitle?.kanji.includes(searchQuery) ||
      game.japaneseTitle?.romaji.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesConsole = !selectedConsole || game.platforms.includes(selectedConsole);
    const matchesDifficulty = !selectedDifficulty || game.difficulty === selectedDifficulty;

    return matchesSearch && matchesConsole && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleConsoleChange = (console: string | null) => {
    setSelectedConsole(console);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (difficulty: GameDifficulty | null) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1);
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-white">{t('games.title')}</h1>
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder={t('games.searchPlaceholder')}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 backdrop-blur-sm transition-colors focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              value={searchQuery}
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <GameFilters
          selectedConsole={selectedConsole}
          selectedDifficulty={selectedDifficulty}
          onConsoleChange={handleConsoleChange}
          onDifficultyChange={handleDifficultyChange}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {t('pagination.previous')}
            </Button>
            <span className="flex items-center px-4 text-white">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {t('pagination.next')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}