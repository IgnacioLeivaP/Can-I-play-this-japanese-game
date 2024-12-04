import React from 'react';
import { Shield, Sword, Skull } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface DifficultyFilterProps {
  onSelect: (difficulty: string) => void;
  selected: string | null;
}

const difficultyStyles = {
  playable: 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
  caution: 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
  'not-recommended': 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
};

export function DifficultyFilter({ onSelect, selected }: DifficultyFilterProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant={selected === 'playable' ? 'primary' : 'outline'}
        onClick={() => onSelect('playable')}
        className={`flex items-center gap-2 ${selected === 'playable' ? '' : difficultyStyles.playable}`}
      >
        <Shield className="h-5 w-5" />
        {t('difficulty.playable')}
      </Button>
      <Button
        variant={selected === 'caution' ? 'primary' : 'outline'}
        onClick={() => onSelect('caution')}
        className={`flex items-center gap-2 ${selected === 'caution' ? '' : difficultyStyles.caution}`}
      >
        <Sword className="h-5 w-5" />
        {t('difficulty.caution')}
      </Button>
      <Button
        variant={selected === 'not-recommended' ? 'primary' : 'outline'}
        onClick={() => onSelect('not-recommended')}
        className={`flex items-center gap-2 ${selected === 'not-recommended' ? '' : difficultyStyles['not-recommended']}`}
      >
        <Skull className="h-5 w-5" />
        {t('difficulty.not-recommended')}
      </Button>
    </div>
  );
}