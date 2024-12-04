import React from 'react';
import { Monitor, Smartphone, Gamepad } from 'lucide-react';
import { consoles } from '@/data/consoles';
import { Console, ConsoleType, RegionLockStatus } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const typeIcons: Record<ConsoleType, React.ReactNode> = {
  home: <Monitor className="h-5 w-5" />,
  portable: <Smartphone className="h-5 w-5" />,
  hybrid: <Gamepad className="h-5 w-5" />
};

export function RegionLockGuide() {
  const { t } = useLanguage();

  const consolesByManufacturer = consoles.reduce((acc, console) => {
    if (!acc[console.manufacturer]) {
      acc[console.manufacturer] = [];
    }
    acc[console.manufacturer].push(console);
    return acc;
  }, {} as Record<string, Console[]>);

  const getStatusColor = (status: RegionLockStatus) => {
    switch (status) {
      case 'yes':
        return 'text-red-500 dark:text-red-400';
      case 'with-mod':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'easy-mod':
        return 'text-blue-500 dark:text-blue-400';
      case 'no':
        return 'text-green-500 dark:text-green-400';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">{t('regionLock.title')}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t('regionLock.description')}</p>
        </div>

        <div className="space-y-8">
          {Object.entries(consolesByManufacturer).map(([manufacturer, consoles]) => (
            <div key={manufacturer} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold">{manufacturer}</h2>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {consoles.map((console) => (
                  <div key={console.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {typeIcons[console.type]}
                        <div>
                          <h3 className="font-medium">{console.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('regionLock.releaseYear')}: {console.releaseYear}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${getStatusColor(console.regionLock.japanese)}`}>
                          {t(`regionLock.status.${console.regionLock.japanese}`)}
                        </p>
                      </div>
                    </div>
                    {console.notes && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {console.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}