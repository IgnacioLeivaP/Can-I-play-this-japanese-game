import React from 'react';
import { Search, Smartphone, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HelpPage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="mb-8 text-3xl font-bold text-white">{t('help.title')}</h1>

        {/* Panel de búsqueda */}
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

        {/* Panel de instalación */}
        <div className="glass-panel space-y-6 p-6">
          <div className="flex items-center gap-3">
            <Download className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">{t('help.install.title')}</h2>
          </div>
          
          <div className="space-y-6">
            {/* Android */}
            <div className="space-y-2">
              <h3 className="font-medium text-white">{t('help.install.android')}</h3>
              <ol className="list-decimal pl-5 text-sm text-gray-300 space-y-1">
                <li>{t('help.install.android.steps.1')}</li>
                <li>{t('help.install.android.steps.2')}</li>
                <li>{t('help.install.android.steps.3')}</li>
              </ol>
            </div>

            {/* iOS */}
            <div className="space-y-2">
              <h3 className="font-medium text-white">{t('help.install.ios')}</h3>
              <ol className="list-decimal pl-5 text-sm text-gray-300 space-y-1">
                <li>{t('help.install.ios.steps.1')}</li>
                <li>{t('help.install.ios.steps.2')}</li>
                <li>{t('help.install.ios.steps.3')}</li>
              </ol>
            </div>

            {/* Beneficios */}
            <p className="text-sm text-gray-300 italic border-t border-gray-700 pt-4">
              {t('help.install.benefits')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}