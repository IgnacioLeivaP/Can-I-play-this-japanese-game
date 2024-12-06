// components/ui/SearchBar.tsx
import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onImageSearch: (file: File) => void;
}

export function SearchBar({ onSearch, onImageSearch }: SearchBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSearch(file);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-lg bg-gray-800 px-4 py-2 pr-12 text-white"
        placeholder="Buscar juego..."
      />
      <label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
        <Camera className="h-6 w-6 text-gray-400" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment" // Esto es clave para móviles
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}