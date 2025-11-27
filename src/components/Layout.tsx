import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import UpdateNotification from './UpdateNotification';
import OfflineIndicator from './OfflineIndicator';

interface LayoutProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

function Layout({ children, theme, toggleTheme }: LayoutProps) {
  const location = useLocation();
  const isIframeMode = location.search.includes('view=iframe');

  return (
    <>
      <SEOHead />
      <OfflineIndicator />
      <div className="min-h-screen flex flex-col">
        {!isIframeMode && <Header theme={theme} onToggleTheme={toggleTheme} />}

        <main className="flex-grow">
          {children}
        </main>

        {!isIframeMode && <Footer />}
      </div>
      {!isIframeMode && <UpdateNotification />}
    </>
  );
}

export default Layout;
