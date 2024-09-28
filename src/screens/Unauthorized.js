import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold">401</h1>
      <p className="text-2xl mt-4">Unauthorized</p>
      <Link to="/" className="mt-4 text-secondary">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
