import { useNavigate } from 'react-router-dom';

interface NotFoundViewProps {
  message?: string;
  buttonLabel?: string;
}

function NotFoundView({ message = "Application non trouvée", buttonLabel = "Retour à l'accueil" }: NotFoundViewProps) {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">{message}</h2>
      <button onClick={() => navigate('/')} className="btn btn-primary">
        {buttonLabel}
      </button>
    </div>
  );
}

export default NotFoundView;

