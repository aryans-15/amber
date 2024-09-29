import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import vrImage from "../assets/test.jpg";
import { handleLogin } from '../utils/authUtils';

function Home() {
  const navigate = useNavigate();

  const handleUserLogin = async () => {
    await handleLogin(navigate);
  };

  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-8 flex flex-col items-center justify-center">
            <img src={vrImage} alt="VR Visual" className="h-full w-full max-h-[40vh] max-w-[40vw] object-contain"/>
          </div>
          <div className="p-8 rounded-lg flex flex-col justify-center">
            <h2 className="text-6xl font-bold mb-2">AmberVR</h2>
            <h2 className="text-2xl font-bold mb-20">Helping the blind see.</h2>
            <h2 className="text-xl mb-2">100% free to use. Sign up today.</h2>
            <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-hoverc transition duration-300 mb-2" onClick={handleUserLogin}>
                <i class="bi bi-google"></i>&nbsp;&nbsp;Log in with Google
            </button>
            <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-hoverc transition duration-300" onClick={handleUserLogin}> {/* lol, they do the same thing, but it's fine */}
                <i class="bi bi-person-circle"></i>&nbsp;&nbsp;Create an account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
