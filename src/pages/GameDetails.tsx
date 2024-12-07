import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Sword, Skull } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { Game, GameDifficulty } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { VotingSection } from '@/components/VotingSection';
import { DifficultyBanner } from '@/components/DifficultyBanner';
import { games } from '@/data/games';
import { cn } from '@/lib/utils';

export function GameDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [gamesData, setGamesData] = useState(games);
  const [isMobile, setIsMobile] = useState(false);
  const game = gamesData.find((g) => g.id === id);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/games');
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: handleGoBack,
    trackMouse: false,
    preventScrollOnSwipe: true,
    delta: 50,
    swipeDuration: 500,
    enabled: isMobile
  });

  if (!game) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-300">{t('game.notFound')}</p>
      </div>
    );
  }

  const handleVote = (difficulty: GameDifficulty) => {
    setGamesData(prevGames => {
      return prevGames.map(g => {
        if (g.id === game.id) {
          const updatedVotes = {
            ...g.votes,
            [difficulty]: g.votes[difficulty] + 1,
          };

          const maxVotes = Math.max(...Object.values(updatedVotes));
          const maxDifficulty = Object.entries(updatedVotes).find(
            ([, votes]) => votes === maxVotes
          )?.[0] as GameDifficulty;

          return {
            ...g,
            votes: updatedVotes,
            difficulty: maxVotes >= 50 ? maxDifficulty : g.difficulty,
            originalDifficulty: maxVotes >= 50 && g.difficulty !== maxDifficulty ? 
              (g.originalDifficulty || g.difficulty) : g.originalDifficulty,
          };
        }
        return g;
      });
    });
  };

  const getDifficultyIcon = (difficulty: GameDifficulty) => {
    switch (difficulty) {
      case 'playable':
        return <Shield className="h-6 w-6 text-green-400" />;
      case 'caution':
        return <Sword className="h-6 w-6 text-yellow-400" />;
      case 'not-recommended':
        return <Skull className="h-6 w-6 text-red-400" />;
    }
  };

  const getDifficultyStyle = (difficulty: GameDifficulty) => {
    switch (difficulty) {
      case 'playable':
        return 'bg-green-500/10 dark:bg-green-500/20';
      case 'caution':
        return 'bg-yellow-500/10 dark:bg-yellow-500/20';
      case 'not-recommended':
        return 'bg-red-500/10 dark:bg-red-500/20';
    }
  };

  return (
    <div {...(isMobile ? swipeHandlers : {})} className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Button 
          variant="outline" 
          className="mb-6 flex items-center gap-2"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('game.back')}
        </Button>
        
        <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-colors dark:bg-gray-800">
          <DifficultyBanner difficulty={game.difficulty} />
          <img
            src={game.coverUrl}
            alt={game.name}
            className="h-64 w-full object-cover"
          />
          <div className="p-6">
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold">{game.name}</h1>
              {game.japaneseTitle && (
                <p className="mb-2 text-lg text-gray-600 dark:text-gray-300">
                  {t('game.knownAs')}: {game.japaneseTitle.kanji} ({game.japaneseTitle.romaji})
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300">
                {game.platforms.join(' • ')}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('game.genre')}</p>
                <p className="font-medium">{game.genre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('game.japanExclusive')}</p>
                <p className="font-medium">{game.japanExclusive ? t('game.yes') : t('game.no')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('game.releaseDate')}</p>
                <p className="font-medium">{new Date(game.releaseDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('game.developer')}</p>
                <p className="font-medium">{game.developer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('game.publisher')}</p>
                <p className="font-medium">{game.publisher}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">{t('game.description')}</h2>
              <p className="text-gray-700 dark:text-gray-300">{game.description}</p>
            </div>

            <div className={cn(
              "mb-6 rounded-lg p-4 relative",
              getDifficultyStyle(game.difficulty)
            )}>
              <div className="flex justify-between items-start">
                <h2 className="mb-2 text-xl font-semibold">{t('game.playabilityReason')}</h2>
                {getDifficultyIcon(game.difficulty)}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{game.reason}</p>
            </div>

            <VotingSection game={game} onVote={handleVote} />
          </div>
        </div>

        <Button 
          variant="ghost" 
          className="mt-6 flex w-full items-center justify-center gap-2 text-gray-400 hover:text-gray-300"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('game.back')}
        </Button>
      </div>
    </div>
  );
}
