import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Camera, X } from 'lucide-react';
import { ImageSearchButton } from './ImageSearchButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onImageSearch: (file: File) => void;
}

export function SearchBar({ onSearch, onImageSearch }: SearchBarProps) {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar con searchParams al montar
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setInputValue(searchQuery);
      onSearch(searchQuery);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleImageSelect = async (file: File) => {
    try {
      setIsProcessing(true);
      // Crear URL para vista previa
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      
      // Procesar la imagen
      await onImageSearch(file);
      
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={t('search.placeholder')}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 backdrop-blur-sm transition-colors focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          onChange={handleInputChange}
          value={inputValue}
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>

      {previewImage ? (
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
            </div>
          )}
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            size="lg"
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border-white/20 bg-white/5 py-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 md:hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <Camera className="h-8 w-8 text-blue-400 transition-transform group-hover:scale-110" />
            <span className="text-lg font-medium text-white">{t('search.image')}</span>
          </Button>
          
          <div className="hidden md:flex md:justify-center md:w-full">
            <ImageSearchButton onImageSelect={handleImageSelect} />
          </div>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        capture="environment"
      />
    </div>
  );
}