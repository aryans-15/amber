// src/Home.js
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/unauthorized");
      } else {
        setUserName(user.displayName.split(" ")[0] || "Guest");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  {
    /*const fetchImageDescription = async () => {
    const imageUrl = 'https://ambervr.vercel.app/static/media/vr.07afbc1ea5b99316b28c.png';
    try {
      const response = await fetch('https://amber-vr-api.onrender.com/describe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      console.log('Image Description:', data.description);
    } catch (error) {
      console.error('Error fetching image description from the API:', error);
    }
  };

  useEffect(() => {
    fetchImageDescription();
  }, []); */
  }

  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-8 rounded-lg flex flex-col justify-center">
            <h1 className="text-5xl font-bold">Welcome, {userName}!</h1>
            <h2 className="text-2xl font-bold mt-2">Get started by:</h2>
            <ul className="mt-4 text-xl list-disc list-inside mb-6 text-secondary">
              <li className="transition duration-300 hover:text-hoverc">
                <Link to="/vr">🥽 Syncing your VR headset</Link>
              </li>
              <li className="transition duration-300 hover:text-hoverc">
                <Link to="/settings">⚙️ Customizing your user settings</Link>
              </li>
              <li className="transition duration-300 hover:text-hoverc">
                <Link to="/about">💡 Learning about us and our goal</Link>
              </li>
            </ul>
            <p className="text-xl">
              Confused? Get some{" "}
              <Link
                to="/help"
                className="text-secondary transition duration-300 hover:text-hoverc"
              >
                help
              </Link>
              !
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
