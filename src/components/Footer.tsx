import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/Button';
import { DonationButton } from './DonationButton';

export function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <footer className="mt-auto bg-gray-800 py-6 shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} Japanese Games Helper
            </p>
            <DonationButton />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
          >
            {t('language.switch')}
          </Button>
        </div>
      </div>
    </footer>
  );
}