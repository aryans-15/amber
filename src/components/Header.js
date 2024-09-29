import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin, handleLogout } from "../utils/authUtils";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUserLogin = async () => {
    await handleLogin(navigate);
  };

  const handleUserLogout = async () => {
    await handleLogout(navigate);
  };

  const handleSyncClick = () => {
    if (user) {
      navigate("/sync");
    } else {
      navigate("/unauthorized");
    }
  };

  const handleSettingsClick = () => {
    if (user) {
      navigate("/settings");
    } else {
      navigate("/unauthorized");
    }
  };

  return (
    <div className="h-fit w-full flex justify-between p-4 items-center">
      <div className="flex items-center">
        <Link
          to={user ? "/home" : "/"}
          className="text-font font-bold text-4xl mr-8 hover:text-secondary duration-300"
        >
          amberVR
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSyncClick}
            className="flex items-center transition-all duration-300 ease-in-out group hover:text-secondary"
          >
            <i className="bi bi-headset-vr text-4xl"></i>
          </button>

          <button
            onClick={handleSettingsClick}
            className="flex items-center transition-all duration-300 ease-in-out group hover:text-secondary"
          >
            <i className="bi bi-gear text-4xl"></i>
          </button>
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
