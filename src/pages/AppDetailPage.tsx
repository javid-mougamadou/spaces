import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import appsData from '../apps.json';
import { App } from '../types';
import IframeView from '../components/IframeView';
import AppDescriptionView from '../components/AppDescriptionView';
import NotFoundView from '../components/NotFoundView';

function AppDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [app, setApp] = useState<App | null>(null);
  const viewMode = searchParams.get('view');

  useEffect(() => {
    const apps = appsData as App[];
    const foundApp = apps.find((a) => a.slug === slug);
    if (foundApp) {
      setApp(foundApp);
    }
  }, [slug]);

  if (!app) {
    return <NotFoundView />;
  }

  if (viewMode === 'iframe') {
    return <IframeView app={app} />;
  }

  return <AppDescriptionView app={app} />;
}

export default AppDetailPage;

