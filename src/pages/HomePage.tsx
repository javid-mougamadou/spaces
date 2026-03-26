import { useState, useEffect } from 'react';
import appsData from '../apps.json';
import { App, AppsConfig } from '../types';
import AppCard from '../components/AppCard';

function HomePage() {
  const [apps, setApps] = useState<App[]>([]);
  const [filter, setFilter] = useState<'apps' | 'repos'>('apps');

  useEffect(() => {
    const config = appsData as AppsConfig;
    const savedFilter = localStorage.getItem('home_filter') as 'apps' | 'repos' | null;

    setApps(config.items);
    setFilter(savedFilter ?? config.default_filter);
  }, []);

  const filteredApps = apps.filter((item) => (filter === 'apps' ? item.kind === 'app' : item.kind === 'repo'));

  useEffect(() => {
    localStorage.setItem('home_filter', filter);
  }, [filter]);

  return (
    <article className="container mx-auto px-4 py-12" itemScope itemType="https://schema.org/CollectionPage">
      <div className="mb-8 flex justify-center">
        <div className="join">
          <button
            type="button"
            onClick={() => setFilter('apps')}
            className={`join-item btn ${filter === 'apps' ? 'btn-primary' : 'btn-outline'}`}
            aria-pressed={filter === 'apps'}
          >
            Apps
          </button>
          <button
            type="button"
            onClick={() => setFilter('repos')}
            className={`join-item btn ${filter === 'repos' ? 'btn-primary' : 'btn-outline'}`}
            aria-pressed={filter === 'repos'}
          >
            Repos
          </button>
        </div>
      </div>
      <section aria-label={filter === 'apps' ? 'Liste des applications' : 'Liste des repos'} itemScope itemType="https://schema.org/ItemList">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, index) => (
            <div key={app.uuid} itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <meta itemProp="position" content={String(index + 1)} />
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

export default HomePage;

