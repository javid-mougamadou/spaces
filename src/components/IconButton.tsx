import { ReactNode } from 'react';

interface IconButtonProps {
  onClick: () => void;
  icon: ReactNode;
  title?: string;
  className?: string;
}

function IconButton({ onClick, icon, title, className = 'btn btn-sm btn-ghost' }: IconButtonProps) {
  return (
    <button onClick={onClick} className={className} title={title}>
      {icon}
    </button>
  );
}

export default IconButton;

