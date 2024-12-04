import React from 'react';
import { Shield, Sword, Skull } from 'lucide-react';
import { Game, GameDifficulty } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/Button';

interface VotingSectionProps {
  game: Game;
  onVote: (difficulty: GameDifficulty) => void;
}

const VOTES_THRESHOLD = 50;

const difficultyIcons = {
  playable: Shield,
  caution: Sword,
  'not-recommended': Skull,
};

const difficultyColors = {
  playable: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  caution: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
  'not-recommended': 'text-red-500 bg-red-50 dark:bg-red-900/20',
};

export function VotingSection({ game, onVote }: VotingSectionProps) {
  const { t } = useLanguage();
  const totalVotes = Object.values(game.votes).reduce((a, b) => a + b, 0);

  const formatDifficultyText = (difficulty: GameDifficulty) => {
    return t(`difficulty.${difficulty}`);
  };

  return (
    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
      {game.originalDifficulty && (
        <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
          {t('game.difficultyChanged', {
            from: formatDifficultyText(game.originalDifficulty),
            to: formatDifficultyText(game.difficulty),
          })}
        </div>
      )}

      <h2 className="mb-4 text-xl font-semibold">{t('voting.title')}</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">{t('voting.description')}</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(Object.keys(difficultyIcons) as GameDifficulty[]).map((difficulty) => {
          const Icon = difficultyIcons[difficulty];
          const votes = game.votes[difficulty];
          const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

          return (
            <div
              key={difficulty}
              className={`relative rounded-lg p-4 ${difficultyColors[difficulty]}`}
            >
              <div className="mb-2 flex items-center justify-between">
                <Icon className="h-6 w-6" />
                <span className="text-2xl font-bold">{votes}</span>
              </div>
              <p className="mb-1 font-medium">{formatDifficultyText(difficulty)}</p>
              <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                <div
                  className="h-full bg-current transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mb-3 text-sm">
                {percentage}% ({votes} {t('voting.votes')})
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onVote(difficulty)}
              >
                {t('voting.voteFor')} {formatDifficultyText(difficulty)}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}