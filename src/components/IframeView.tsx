import { App } from '../types';
import AppActions from './AppActions';

interface IframeViewProps {
  app: App;
}

function IframeView({ app }: IframeViewProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-base-200 px-4 py-3 flex items-center justify-center shadow-sm sticky top-0 z-30 relative">
        <h1 className="text-xl font-bold text-center">{app.name}</h1>
        <AppActions app={app} variant="iframe" />
      </div>
      <iframe
        src={app.url}
        className="flex-grow w-full border-0"
        title={app.name}
        allow="fullscreen"
        style={{ minHeight: 0, height: 'calc(100vh - 60px)' }}
      />
    </div>
  );
}

export default IframeView;

