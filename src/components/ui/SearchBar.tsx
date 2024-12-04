import React from 'react';
import { Search, Camera } from 'lucide-react';
import { ImageSearchButton } from './ImageSearchButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onImageSearch: (file: File) => void;
}

export function SearchBar({ onSearch, onImageSearch }: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={t('search.placeholder')}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 backdrop-blur-sm transition-colors focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
      
      <Button
        variant="outline"
        size="lg"
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border-white/20 bg-white/5 py-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 md:hidden"
        onClick={() => document.getElementById('image-search-input')?.click()}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
        <Camera className="h-8 w-8 text-blue-400 transition-transform group-hover:scale-110" />
        <span className="text-lg font-medium text-white">{t('search.image')}</span>
      </Button>
      
      <div className="hidden md:block">
        <ImageSearchButton onImageSelect={onImageSearch} />
      </div>
    </div>
  );
}