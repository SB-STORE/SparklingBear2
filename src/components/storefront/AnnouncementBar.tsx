import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ANNOUNCEMENTS = [
  '\u{1F3CD}\uFE0F FREE SHIPPING ON ORDERS ABOVE \u20B9999',
  '\u{1F525} ANNIVERSARY SALE - UP TO 40% OFF',
  '\u26A1 NEW ARRIVALS EVERY WEEK',
];

const STORAGE_KEY = 'sb-announcement-dismissed';

export function AnnouncementBar() {
  // Read sessionStorage synchronously to avoid flash on reload
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  if (dismissed) return null;

  const marqueeContent = ANNOUNCEMENTS.map((a) => a + '   \u2022   ').join('');

  return (
    <div
      className={cn(
        'relative h-9 bg-primary text-primary-foreground flex items-center overflow-hidden z-50'
      )}
    >
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold px-4">
          {marqueeContent}
        </span>
        <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold px-4">
          {marqueeContent}
        </span>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
