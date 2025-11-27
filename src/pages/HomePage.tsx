import { useState, useEffect } from 'react';
import appsData from '../apps.json';
import { App } from '../types';
import AppCard from '../components/AppCard';

function HomePage() {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    setApps(appsData as App[]);
  }, []);

  return (
    <article className="container mx-auto px-4 py-12" itemScope itemType="https://schema.org/CollectionPage">
      <section aria-label="Liste des applications" itemScope itemType="https://schema.org/ItemList">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
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

