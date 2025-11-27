import { useState, useEffect } from 'react';

function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-warning text-warning-content py-2 px-4 text-center text-sm">
      <div className="flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.036a5.25 5.25 0 017.424 0M5.106 11.856c-1.552-1.552-4.068-1.552-5.62 0m0 0L3 15.5m-2.514-3.644L5.106 8.15m0 0c1.552-1.552 4.068-1.552 5.62 0m0 0L12 13.5m-1.274-5.35L15.106 8.15m0 0c1.552-1.552 4.068-1.552 5.62 0m0 0L21 15.5M8.288 8.15L12 11.85m0 0l3.712-3.7"
          />
        </svg>
        <span>Mode hors ligne - Certaines fonctionnalités peuvent être limitées</span>
      </div>
    </div>
  );
}

export default OfflineIndicator;

