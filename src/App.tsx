import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AppDetailPage from './pages/AppDetailPage';
import { useServiceWorker } from './hooks/useServiceWorker';
import { usePageTracking } from './hooks/useAnalytics';

/**
 * Component to track page views when route changes
 */
function PageTracker() {
  const location = useLocation();
  usePageTracking(location.pathname + location.search, document.title);
  return null;
}

function AppComponent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useServiceWorker();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
      <PageTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apps/:slug" element={<AppDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default AppComponent;

