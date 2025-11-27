import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <div className="bg-base-200 sticky top-0 z-50 shadow-md">
      <div className="flex justify-end pt-3 pr-4">
        <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
      
      <div className="hero py-3">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <Link to="/">
              <h1 className="mb-5 text-5xl font-bold hover:opacity-80 transition-opacity cursor-pointer">
                Javid Spaces
              </h1>
            </Link>
            <p className="mb-5 text-lg opacity-70">
              Applications développées pour vous faciliter la vie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

