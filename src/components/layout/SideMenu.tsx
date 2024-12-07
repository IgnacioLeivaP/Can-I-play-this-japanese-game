import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Joystick, Gamepad2, Settings, Lock, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function SideMenu() {
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    { icon: Joystick, label: t('menu.home'), path: '/' },
    { icon: Gamepad2, label: t('menu.games'), path: '/games' },
    { icon: Lock, label: t('regionLock.title'), path: '/region-lock' },
    { icon: HelpCircle, label: t('help.title'), path: '/help' },
    { icon: Settings, label: t('menu.settings'), path: '/settings' },
  ];

  return (
    <div className="glass-panel fixed left-4 top-4 flex h-[calc(100vh-2rem)] w-64 flex-col p-4">
      <div className="mb-6">
        {location.pathname === '/' ? (
          <div className="flex justify-center">
            <img 
              src="/icons/icon-96x96.png" 
              alt="Logo" 
              className="h-12 w-12 rounded-xl"
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img 
              src="/icons/icon-72x72.png" 
              alt="Logo" 
              className="h-10 w-10 rounded-lg"
            />
            <h2 className="text-xl font-bold text-white">{t('app.title')}</h2>
          </div>
        )}
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