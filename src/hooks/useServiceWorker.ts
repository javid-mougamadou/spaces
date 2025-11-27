import { useEffect, useState, useCallback } from 'react';

interface ServiceWorkerState {
  registration: ServiceWorkerRegistration | null;
  updateAvailable: boolean;
  offlineReady: boolean;
  needRefresh: boolean;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    registration: null,
    updateAvailable: false,
    offlineReady: false,
    needRefresh: false,
  });

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      let registration: ServiceWorkerRegistration | null = null;

      const registerServiceWorker = async () => {
        try {
          registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/',
          });

          console.log('[PWA] Service Worker registered:', registration);

          await registration.update();

          registration.addEventListener('updatefound', () => {
            const newWorker = registration!.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setState((prev) => ({
                    ...prev,
                    updateAvailable: true,
                    needRefresh: true,
                  }));
                } else if (newWorker.state === 'activated') {
                  setState((prev) => ({
                    ...prev,
                    offlineReady: true,
                  }));
                }
              });
            }
          });

          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
          });

          setState((prev) => ({
            ...prev,
            registration,
            offlineReady: true,
          }));
        } catch (error) {
          console.error('[PWA] Service Worker registration failed:', error);
        }
      };

      registerServiceWorker();

      const updateInterval = setInterval(() => {
        if (registration) {
          registration.update();
        }
      }, 5 * 60 * 1000);

      const handleFocus = () => {
        if (registration) {
          registration.update();
        }
      };
      window.addEventListener('focus', handleFocus);

      return () => {
        clearInterval(updateInterval);
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, []);

  const updateServiceWorker = useCallback(() => {
    if (state.registration && state.registration.waiting) {
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      setState((prev) => ({
        ...prev,
        needRefresh: false,
        updateAvailable: false,
      }));
    }
  }, [state.registration]);

  const checkForUpdate = useCallback(() => {
    if (state.registration) {
      state.registration.update();
    }
  }, [state.registration]);

  return {
    ...state,
    updateServiceWorker,
    checkForUpdate,
  };
}

