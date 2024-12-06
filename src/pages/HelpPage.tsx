import React from 'react';
import { Search, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HelpPage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-white">{t('help.title')}</h1>

        <div className="glass-panel space-y-6 p-6">
          <h2 className="text-xl font-semibold text-white">{t('help.notFound.title')}</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <Search className="h-6 w-6 flex-shrink-0 text-blue-400" />
              <div>
                <h3 className="mb-2 font-medium text-white">{t('help.notFound.google')}</h3>
                <p className="text-sm text-gray-300">{t('help.notFound.googleDescription')}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Smartphone className="h-6 w-6 flex-shrink-0 text-blue-400" />
              <div>
                <h3 className="mb-2 font-medium text-white">{t('help.notFound.lens')}</h3>
                <p className="text-sm text-gray-300">{t('help.notFound.lensDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}