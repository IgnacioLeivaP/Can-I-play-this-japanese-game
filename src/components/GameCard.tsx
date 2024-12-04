import React from 'react';
import { Shield, Sword, Skull } from 'lucide-react';
import { Game } from '@/types';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const difficultyIcons = {
  playable: <Shield className="h-5 w-5 text-green-500" />,
  caution: <Sword className="h-5 w-5 text-yellow-500" />,
  'not-recommended': <Skull className="h-5 w-5 text-red-500" />,
};

export function GameCard({ game }: { game: Game }) {
  const { t } = useLanguage();

  return (
    <Link to={`/game/${game.id}`}>
      <div className="game-card group">
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <img
            src={game.coverUrl}
            alt={game.name}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{game.name}</h3>
            {difficultyIcons[game.difficulty]}
          </div>
          <p className="text-sm text-gray-400">{game.reason}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {game.platforms.map((platform) => (
              <span
                key={platform}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}