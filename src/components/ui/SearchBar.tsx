import React from 'react';
import { Search } from 'lucide-react';
import { ImageSearchButton } from './ImageSearchButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onImageSearch: (file: File) => void;
}

export function SearchBar({ onSearch, onImageSearch }: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex w-full max-w-2xl gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={t('search.placeholder')}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 backdrop-blur-sm transition-colors focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
      <ImageSearchButton onImageSelect={onImageSearch} />
    </div>
  );
}