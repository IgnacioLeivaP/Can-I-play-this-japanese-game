import React from 'react';
import { Shield, Sword, Skull } from 'lucide-react';
import { GameDifficulty } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const difficultyConfig = {
  playable: {
    icon: Shield,
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    borderColor: 'border-green-500/30'
  },
  caution: {
    icon: Sword,
    bgColor: 'bg-yellow-500/20',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30'
  },
  'not-recommended': {
    icon: Skull,
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/30'
  }
};

interface DifficultyBannerProps {
  difficulty: GameDifficulty;
}

export function DifficultyBanner({ difficulty }: DifficultyBannerProps) {
  const { t } = useLanguage();
  const config = difficultyConfig[difficulty];
  const Icon = config.icon;

  return (
    <div className={cn(
      'border-b px-6 py-3',
      config.bgColor,
      config.borderColor
    )}>
      <div className="flex items-center justify-center gap-3">
        <Icon className={cn('h-6 w-6', config.textColor)} />
        <span className={cn('font-medium', config.textColor)}>
          {t(`difficulty.${difficulty}`)}
        </span>
      </div>
    </div>
  );
}