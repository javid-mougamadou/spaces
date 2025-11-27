import { App } from '../types';
import BackButton from './BackButton';
import AppActions from './AppActions';

interface AppDescriptionViewProps {
  app: App;
}

function AppDescriptionView({ app }: AppDescriptionViewProps) {
  return (
    <article className="container mx-auto px-4 py-12" itemScope itemType="https://schema.org/WebApplication">
      <div className="max-w-4xl mx-auto">
        <BackButton />

        <div className="card bg-base-100 shadow-xl overflow-hidden mb-8">
          <figure className="relative h-96 overflow-hidden">
            <img
              src={app.background_image}
              alt={app.name}
              className="w-full h-full object-cover"
              itemProp="image"
            />
          </figure>
          <div className="card-body p-8">
            <h1 className="card-title text-4xl mb-4" itemProp="name">{app.name}</h1>
            <p className="text-lg opacity-70 mb-6" itemProp="description">{app.description}</p>
            
            <div className="mb-6 text-sm opacity-60">
              <p>
                <strong>URL de l'application :</strong>{' '}
                <a 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="link link-secondary break-all"
                  itemProp="url"
                >
                  {app.url}
                </a>
              </p>
            </div>
            
            <div itemScope itemType="https://schema.org/Person" itemProp="author" className="hidden">
              <meta itemProp="name" content="Javid Mougamadou" />
              <link itemProp="url" href="https://javid-mougamadou.pro/" />
            </div>
            
            <AppActions app={app} variant="detail" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default AppDescriptionView;

