import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, Gamepad2, Settings, Lock, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function SideMenu() {
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    { icon: Search, label: t('menu.search'), path: '/' },
    { icon: Gamepad2, label: t('menu.games'), path: '/games' },
    { icon: Lock, label: t('regionLock.title'), path: '/region-lock' },
    { icon: HelpCircle, label: t('help.title'), path: '/help' },
    { icon: Settings, label: t('menu.settings'), path: '/settings' },
  ];

  return (
    <div className="glass-panel fixed left-4 top-4 flex h-[calc(100vh-2rem)] w-64 flex-col gap-2 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          {location.pathname === '/' ? t('app.menu') : t('app.title')}
        </h2>
      </div>
      <nav className="flex flex-col gap-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-colors',
                'hover:bg-white/10',
                isActive && 'bg-white/10 text-white'
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}