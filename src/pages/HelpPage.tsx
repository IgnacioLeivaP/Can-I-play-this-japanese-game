import React from 'react';
import { Search, Smartphone, AppWindow, Download, Shield, Sword, Skull, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HelpPage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-white">{t('help.title')}</h1>

        <div className="glass-panel space-y-6 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white">{t('help.difficulty.title')}</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <Shield className="h-6 w-6 flex-shrink-0 text-green-400" />
              <div>
                <h3 className="mb-2 font-medium text-white">{t('difficulty.playable')}</h3>
                <p className="text-sm text-gray-300">{t('help.difficulty.playable')}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Sword className="h-6 w-6 flex-shrink-0 text-yellow-400" />
              <div>
                <h3 className="mb-2 font-medium text-white">{t('difficulty.caution')}</h3>
                <p className="text-sm text-gray-300">{t('help.difficulty.caution')}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Skull className="h-6 w-6 flex-shrink-0 text-red-400" />
              <div>
                <h3 className="mb-2 font-medium text-white">{t('difficulty.not-recommended')}</h3>
                <p className="text-sm text-gray-300">{t('help.difficulty.notRecommended')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel space-y-6 p-6 mb-6">
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

        <div className="glass-panel space-y-6 p-6 mb-6">
          <div className="flex items-center gap-3">
            <Download className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">{t('help.pwa.title')}</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-medium text-white">{t('help.pwa.android')}</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>{t('help.pwa.androidStep1')}</li>
                <li>{t('help.pwa.androidStep2')}</li>
                <li>{t('help.pwa.androidStep3')}</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-medium text-white">{t('help.pwa.ios')}</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>{t('help.pwa.iosStep1')}</li>
                <li>{t('help.pwa.iosStep2')}</li>
                <li>{t('help.pwa.iosStep3')}</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-700">
              <p className="text-sm text-gray-300 italic">{t('help.pwa.benefits')}</p>
            </div>
          </div>
        </div>

        <div className="glass-panel space-y-6 p-6">
          <div className="flex items-center gap-3">
            <Info className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">{t('help.logo.title')}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <span className="text-2xl font-bold text-blue-400">可</span>
              </div>
              <div>
                <p className="text-sm text-gray-300">{t('help.logo.description')}</p>
                <p className="mt-2 text-sm italic text-gray-400">{t('help.logo.irony')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}