import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageSearchButtonProps {
  onImageSelect: (file: File) => void;
}

export function ImageSearchButton({ onImageSelect }: ImageSearchButtonProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="secondary"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleClick}
      >
        <Camera className="h-5 w-5" />
        <span className="hidden sm:inline">{t('search.image')}</span>
      </Button>
    </>
  );
}