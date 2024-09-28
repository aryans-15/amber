import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <Link to="/" className="mt-4 text-secondary transition duration-300 hover:text-hoverc">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
