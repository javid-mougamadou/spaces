import { useNavigate } from 'react-router-dom';
import { App } from '../types';
import AppActions from './AppActions';
import DropdownMenu from './DropdownMenu';
import MenuIcon from './icons/MenuIcon';

interface AppCardProps {
  app: App;
}

function AppCard({ app }: AppCardProps) {
  const navigate = useNavigate();

  const dropdownItems = [
    {
      label: 'Afficher la description',
      onClick: () => navigate(`/apps/${app.slug}`),
    },
    {
      label: 'Ouvrir dans un iframe',
      onClick: () => navigate(`/apps/${app.slug}?view=iframe`),
    },
  ];

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden group relative h-full">
      <figure className="relative h-48 overflow-hidden">
        <img
          src={app.background_image}
          alt={app.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-2">
          <AppActions app={app} variant="card" />
        </div>
        <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
          <DropdownMenu
            trigger={
              <button
                className="btn btn-circle btn-sm bg-base-100/90 backdrop-blur-sm border-2 border-base-300 hover:bg-base-100 hover:border-primary shadow-lg opacity-100 transition-all duration-300"
                aria-label="Menu"
              >
                <MenuIcon />
              </button>
            }
            items={dropdownItems}
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{app.name}</h2>
        <p className="text-sm opacity-70">{app.description}</p>
      </div>
    </div>
  );
}

export default AppCard;


