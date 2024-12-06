import React from 'react';
import { Shield, Sword, Skull } from 'lucide-react';
import { Game } from '@/types';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const difficultyIcons = {
  playable: <Shield className="h-8 w-8 text-green-500" />,
  caution: <Sword className="h-8 w-8 text-yellow-500" />,
  'not-recommended': <Skull className="h-8 w-8 text-red-500" />,
};

export function GameCardDay({ game }: { game: Game }) {
  const { t } = useLanguage();

  return (
    <Link to={`/game/${game.id}`} className="block max-w-3xl mx-auto">
      <div className="glass-panel p-4 relative">
        <div className="flex gap-6">
          <div style={{ width: '30%', height: '100px' }} className="flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={game.coverUrl}
              alt={game.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          
          <div className="w-[70%] flex flex-col">
            <h3 className="text-xl font-bold text-white">{game.name}</h3>
            {game.japaneseTitle && (
              <div className="mt-1 text-gray-400">
                <div>{game.japaneseTitle.kanji}</div>
                <div>{game.japaneseTitle.romaji}</div>
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {game.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm text-white"
                >
                  {platform}
                </span>
              ))}
            </div>
            <p className="mt-2 text-gray-300 line-clamp-3">{game.description}</p>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2">
          {difficultyIcons[game.difficulty]}
        </div>
      </div>
    </Link>
  );
} 