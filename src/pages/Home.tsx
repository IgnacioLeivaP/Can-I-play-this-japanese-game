import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/ui/SearchBar';
import { DifficultyFilter } from '@/components/DifficultyFilter';
import { GameCard } from '@/components/GameCard';
import { processImage } from '@/services/imageProcessing';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Gamepad, Sparkles, XCircle } from 'lucide-react';
import { games } from '@/data/games';

export function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameOfTheDay = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
  }, []);

  const handleImageSearch = async (file: File) => {
    setIsSearching(true);
    setError(null);
    try {
      const extractedText = await processImage(file);
      
      if (!extractedText) {
        setError(t('search.error.noText'));
        return;
      }
      
      setSearchQuery(extractedText);
      
    } catch (error) {
      setError(t('search.error.generic'));
      console.error('Error processing image:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.japaneseTitle?.kanji.includes(searchQuery) ||
                         game.japaneseTitle?.romaji.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || game.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const isSearchActive = searchQuery || selectedDifficulty;
  const hasNoResults = isSearchActive && filteredGames.length === 0;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420')] bg-cover bg-center bg-no-repeat opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-background/50 to-background" />
      
      <div className="relative px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-5xl font-bold text-transparent">
              {t('app.title')}
            </h1>
            <p className="mb-8 text-xl text-gray-400">
              {t('app.subtitle')}
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/region-lock')}
              className="mx-auto flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 px-12 text-white hover:from-blue-600 hover:to-violet-600"
            >
              <Gamepad className="h-5 w-5" />
              {t('regionLock.checkGuide')}
            </Button>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">{t('home.gameOfTheDay')}</h2>
              <Sparkles className="h-6 w-6 text-blue-400" />
            </div>
            <div className="mx-auto max-w-md">
              <GameCard game={gameOfTheDay} />
            </div>
          </div>
          
          <div className="mb-8 flex flex-col items-center gap-6">
            <SearchBar 
              onSearch={setSearchQuery} 
              onImageSearch={handleImageSearch}
            />
            {error && (
              <div className="glass-panel p-4 text-sm text-red-400">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  {error}
                </div>
              </div>
            )}
            <DifficultyFilter
              onSelect={setSelectedDifficulty}
              selected={selectedDifficulty}
            />
          </div>

          {isSearching ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
              <div className="text-gray-400">
                {t('search.processing')}
              </div>
            </div>
          ) : hasNoResults ? (
            <div className="glass-panel flex flex-col items-center justify-center gap-2 p-8 text-center">
              <XCircle className="h-12 w-12 text-gray-400" />
              <h3 className="text-lg font-semibold text-white">{t('search.noResults')}</h3>
              <p className="text-gray-400">{t('search.tryAgain')}</p>
            </div>
          ) : isSearchActive ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}