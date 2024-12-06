import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SearchBar } from '@/components/ui/SearchBar';
import { GameCard } from '@/components/GameCard';
import { GameCardDay } from '@/components/GameCardDay';
import { processImage } from '@/services/imageProcessing';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Gamepad, Sparkles, XCircle, ArrowRight } from 'lucide-react';
import { games } from '@/data/games';

export function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
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
    return game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           game.japaneseTitle?.kanji.includes(searchQuery) ||
           game.japaneseTitle?.romaji.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleViewMore = () => {
    navigate(`/games?search=${encodeURIComponent(searchQuery)}`);
  };

  const isSearchActive = searchQuery.length > 0;
  const hasResults = filteredGames.length > 0;

  return (
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
          <div className="mx-auto max-w-4xl">
            <GameCardDay game={gameOfTheDay} />
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
        </div>

        {isSearching ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
            <div className="text-gray-400">
              {t('search.processing')}
            </div>
          </div>
        ) : isSearchActive && !hasResults ? (
          <div className="glass-panel flex flex-col items-center justify-center gap-2 p-8 text-center">
            <XCircle className="h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-semibold text-white">{t('search.noResults')}</h3>
            <p className="text-gray-400">{t('search.tryAgain')}</p>
          </div>
        ) : isSearchActive && hasResults ? (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-4xl">
              <GameCard game={filteredGames[0]} />
            </div>
            {filteredGames.length > 1 && (
              <Button
                onClick={handleViewMore}
                className="group flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                {t('search.viewMoreResults')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}