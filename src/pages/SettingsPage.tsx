import React from 'react';
import { Mail, Coffee, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';

export function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleFeedback = () => {
    window.location.href = 'mailto:ignacio.leiva06@gmail.com';
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="mb-8 text-3xl font-bold text-white">{t('settings.title')}</h1>
        
        <div className="glass-panel space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-white">{t('settings.language')}</h2>
              <p className="text-sm text-gray-400">{t('settings.languageDescription')}</p>
            </div>
            <Button variant="outline" onClick={handleLanguageToggle}>
              {t('language.switch')}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-white">{t('settings.support')}</h2>
              <p className="text-sm text-gray-400">{t('settings.supportDescription')}</p>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open('https://buymeacoffee.com/nispero', '_blank')}
            >
              <Coffee className="h-4 w-4" />
              {t('donation.coffee')}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-white">{t('settings.feedback')}</h2>
              <p className="text-sm text-gray-400">{t('settings.feedbackDescription')}</p>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleFeedback}
            >
              <Mail className="h-4 w-4" />
              {t('settings.sendFeedback')}
            </Button>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex gap-4">
            <Info className="h-6 w-6 flex-shrink-0 text-blue-400" />
            <p className="text-sm text-gray-300">
              {t('settings.developmentMessage')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}