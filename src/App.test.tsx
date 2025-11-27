import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock useServiceWorker hook
vi.mock('./hooks/useServiceWorker', () => ({
  useServiceWorker: vi.fn(() => ({
    registration: null,
    updateAvailable: false,
    offlineReady: false,
    needRefresh: false,
    updateServiceWorker: vi.fn(),
    checkForUpdate: vi.fn(),
  })),
}));

describe('App', () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders the hero section with title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // Use getAllByText since "Javid Spaces" appears in both Header and HomePage
    const titles = screen.getAllByText('Javid Spaces');
    expect(titles.length).toBeGreaterThan(0);
    expect(titles[0]).toBeInTheDocument();
  });

  it('renders the hero description', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Applications développées pour vous faciliter la vie/i)).toBeInTheDocument();
  });
});


