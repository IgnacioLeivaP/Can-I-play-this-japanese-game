import React, { useState, useRef } from 'react';
import { Coffee } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export function DonationButton() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(1);
  const [showCustom, setShowCustom] = useState(false);
  const timeoutRef = useRef<number>();

  const handleDonate = () => {
    const donationUrl = `https://www.paypal.com/donate/?business=your-paypal-email&amount=${amount}&currency_code=USD`;
    window.open(donationUrl, '_blank');
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowCustom(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowCustom(false);
    }, 300);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400"
        onClick={() => !showCustom && handleDonate()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Coffee className="h-4 w-4" />
        {t('donation.coffee')} ${amount}
      </Button>

      {showCustom && (
        <div 
          className="absolute bottom-full left-0 mb-2 w-48 rounded-lg bg-white p-3 shadow-lg dark:bg-gray-700"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
            {t('donation.custom')}
          </p>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
            />
            <Button
              size="sm"
              onClick={handleDonate}
              className="flex-1"
            >
              {t('donation.donate')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}