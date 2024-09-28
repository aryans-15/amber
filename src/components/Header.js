import { useState, useEffect } from "react";
import { auth } from '../firebase'; 
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'; 
import { handleLogin, handleLogout } from '../utils/authUtils';

function Header() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  const handleUserLogin = async () => {
    await handleLogin(navigate);
  };

  const handleUserLogout = async () => {
    await handleLogout();
    navigate('/');
  };

  return (
    <div className="h-fit w-full flex justify-between p-4 items-center">
      <div className="flex items-center">
        <Link to="/" className="text-font font-bold text-4xl mr-8 hover:text-secondary duration-300">amberVR</Link>

        <div className="flex items-center space-x-4">
          <Link to="/vr" className="flex items-center transition-all duration-300 ease-in-out group hover:text-secondary">
            <i className="bi bi-headset-vr text-4xl"></i>
            <span
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                hoveredIcon === "vr"
                  ? "ml-2 max-w-xs opacity-100"
                  : "max-w-0 opacity-0"
              } text-xl text-font text-secondary whitespace-nowrap`}
              style={{ transitionProperty: "max-width, opacity, margin-left" }}
            >
              Synchronization
            </span>
          </Link>

          <Link to="/settings" className="flex items-center transition-all duration-300 ease-in-out group hover:text-secondary">
            <i className="bi bi-gear text-4xl"></i>
            <span
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                hoveredIcon === "settings"
                  ? "ml-2 max-w-xs opacity-100"
                  : "max-w-0 opacity-0"
              } text-xl text-font text-secondary whitespace-nowrap`}
              style={{ transitionProperty: "max-width, opacity, margin-left" }}
            >
              Settings
            </span>
          </Link>
        </div>
      </div>

      <button
        onClick={user ? handleUserLogout : handleUserLogin}
        className="text-font font-bold hover:bg-hoverc text-xl bg-secondary px-4 py-2 rounded-lg transition duration-300 ease-in-out"
      >
        {user ? "Log Out" : "Log In"}
      </button>
    </div>
  );
}

export default Header;
