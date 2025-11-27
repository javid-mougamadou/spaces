import { useServiceWorker } from '../hooks/useServiceWorker';

function UpdateNotification() {
  const { needRefresh, updateAvailable, updateServiceWorker } = useServiceWorker();

  if (!needRefresh && !updateAvailable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="alert alert-info shadow-lg max-w-md">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Mise à jour disponible</h3>
            <div className="text-xs">Une nouvelle version de l'application est disponible.</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={updateServiceWorker}
            className="btn btn-sm btn-primary"
          >
            Actualiser
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateNotification;

