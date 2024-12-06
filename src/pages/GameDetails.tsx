import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Game, GameDifficulty } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { VotingSection } from '@/components/VotingSection';
import { DifficultyBanner } from '@/components/DifficultyBanner';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { games } from '@/data/games';

export function GameDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [gamesData, setGamesData] = useState(games);
  const game = gamesData.find((g) => g.id === id);

  // Initialize swipe navigation
  useSwipeNavigation();

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

  const BackButton = () => (
    <Link to="/">
      <Button variant="outline" className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        {t('game.back')}
      </Button>
    </Link>
  );

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <BackButton />
        </div>
        
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

            <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <h2 className="mb-2 text-xl font-semibold">{t('game.playabilityReason')}</h2>
              <p className="text-gray-700 dark:text-gray-300">{game.reason}</p>
            </div>

            <VotingSection game={game} onVote={handleVote} />

            <div className="mt-8">
              
            </div>
          </div> 
        </div>
      </div>
     <div class="py-6"><BackButton /></div> 
    </div>
  );
}