import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Gamepad2, Settings, Lock, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function MobileNavigation() {
  const { t } = useLanguage();

  const menuItems = [
    { icon: Search, label: t('menu.search'), path: '/' },
    { icon: Gamepad2, label: t('menu.games'), path: '/games' },
    { icon: Lock, label: t('regionLock.title'), path: '/region-lock' },
    { icon: HelpCircle, label: t('help.title'), path: '/help' },
    { icon: Settings, label: t('menu.settings'), path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-gray-900/80 backdrop-blur-lg md:hidden">
      <div className="flex justify-around">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-4 py-3 text-xs text-gray-400 transition-colors',
                isActive && 'text-blue-400'
              )
            }
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}