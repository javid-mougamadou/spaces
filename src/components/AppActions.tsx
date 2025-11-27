import { useNavigate } from 'react-router-dom';
import { App } from '../types';
import OpenIcon from './icons/OpenIcon';
import IframeIcon from './icons/IframeIcon';
import BackIcon from './icons/BackIcon';

interface AppActionsProps {
  app: App;
  variant?: 'card' | 'detail' | 'iframe';
  onOpen?: () => void;
}

function AppActions({ app, variant = 'detail', onOpen }: AppActionsProps) {
  const navigate = useNavigate();

  const handleOpen = () => {
    if (onOpen) {
      onOpen();
    } else {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenInIframe = () => {
    navigate(`/apps/${app.slug}?view=iframe`);
  };

  if (variant === 'iframe') {
    return (
      <div className="absolute right-4 flex gap-2">
        <button
          onClick={handleOpen}
          className="btn btn-sm btn-ghost"
          title="Ouvrir dans un nouvel onglet"
        >
          <OpenIcon />
        </button>
        <button
          onClick={() => navigate(`/apps/${app.slug}`)}
          className="btn btn-sm btn-ghost"
          title="Retour à la description"
        >
          <BackIcon />
        </button>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        className="btn btn-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Ouvrir
      </button>
    );
  }

  // detail variant
  return (
    <div className="card-actions justify-end gap-2">
      <button onClick={handleOpenInIframe} className="btn btn-secondary btn-lg">
        Ouvrir dans un iframe
        <IframeIcon />
      </button>
      <button onClick={handleOpen} className="btn btn-primary btn-lg">
        Ouvrir l'application
        <OpenIcon />
      </button>
    </div>
  );
}

export default AppActions;

