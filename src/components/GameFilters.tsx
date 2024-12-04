import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/Button';
import { Shield, Sword, Skull } from 'lucide-react';
import { GameDifficulty } from '@/types';
import { cn } from '@/lib/utils';
import { games } from '@/data/games';

interface GameFiltersProps {
  selectedConsole: string | null;
  selectedDifficulty: GameDifficulty | null;
  onConsoleChange: (console: string | null) => void;
  onDifficultyChange: (difficulty: GameDifficulty | null) => void;
}

const difficulties: { value: GameDifficulty; icon: React.ElementType }[] = [
  { value: 'playable', icon: Shield },
  { value: 'caution', icon: Sword },
  { value: 'not-recommended', icon: Skull },
];

const difficultyStyles = {
  playable: 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
  caution: 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
  'not-recommended': 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
};

export function GameFilters({
  selectedConsole,
  selectedDifficulty,
  onConsoleChange,
  onDifficultyChange,
}: GameFiltersProps) {
  const { t } = useLanguage();

  // Get unique consoles from games that actually exist
  const availableConsoles = useMemo(() => {
    const consoleSet = new Set<string>();
    games.forEach(game => {
      game.platforms.forEach(platform => {
        consoleSet.add(platform);
      });
    });
    return Array.from(consoleSet).sort();
  }, []);

  return (
    <div className="mb-6 space-y-4">
      {availableConsoles.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-400">Consoles</h3>
          <div className="flex flex-wrap gap-2">
            {availableConsoles.map((console) => (
              <Button
                key={console}
                variant={selectedConsole === console ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onConsoleChange(selectedConsole === console ? null : console)}
                className="text-sm"
              >
                {console}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-400">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map(({ value, icon: Icon }) => (
            <Button
              key={value}
              variant={selectedDifficulty === value ? 'primary' : 'outline'}
              onClick={() => onDifficultyChange(selectedDifficulty === value ? null : value)}
              className={cn(
                'flex items-center gap-2',
                selectedDifficulty === value ? '' : difficultyStyles[value]
              )}
            >
              <Icon className="h-4 w-4" />
              {t(`difficulty.${value}`)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}