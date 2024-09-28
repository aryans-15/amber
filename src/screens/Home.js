// src/Home.js
import { useEffect, useState } from 'react';
import { auth } from '../firebase'; 
import { useNavigate, Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [userName, setUserName] = useState('');
  const [cache, setCache] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/unauthorized');
      } else {
        setUserName(user.displayName.split(' ')[0] || 'Guest');
        //fetchImageDescriptions(user.uid); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // imageurls rn are for
  const fetchImageDescriptions = async (userId) => {
    const imageUrls = [
      'https://ambervr.vercel.app/static/media/vr.07afbc1ea5b99316b28c.png',
      'https://assets.leetcode.com/users/aryans-15/avatar_1726764035.png',
    ];

    try {
      await describeImage(imageUrls[0], userId);
      await describeImage(imageUrls[1], userId);
      await retrieveCache(userId);
      await retrieveCache(userId);
    } catch (error) {
      console.error('Error fetching image descriptions:', error);
    }
  };

  const describeImage = async (imageUrl, userId) => {
    try {
      const response = await fetch('https://amber-vr-api.onrender.com/describe', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url: imageUrl, user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Image Description:', data.description);
    } catch (error) {
      console.error('Error fetching image description from the API:', error);
    }
  };

  const retrieveCache = async (userId) => {
    try {
      const response = await fetch(`https://amber-vr-api.onrender.com/query-latest?user_id=${userId}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCache(data.latest_outputs);
      console.log('Retrieved Cache:', data.latest_outputs);
    } catch (error) {
      console.error('Error retrieving cache from the API:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-8 rounded-lg flex flex-col justify-center">
            <h1 className="text-5xl font-bold">Welcome, {userName}!</h1>
            <h2 className="text-2xl font-bold mt-2">Get started by:</h2>
            <ul className="mt-4 text-xl list-disc list-inside mb-6 text-secondary">
              <li className="transition duration-300 hover:text-hoverc"><Link to="/vr">🥽 Syncing your VR headset</Link></li>
              <li className="transition duration-300 hover:text-hoverc"><Link to="/settings">⚙️ Customizing your user settings</Link></li>
              <li className="transition duration-300 hover:text-hoverc"><Link to="/about">💡 Learning about us and our goal</Link></li>
            </ul>
            <p className="text-xl">
              Confused? Get some{' '}
              <Link to="/help" className="text-secondary transition duration-300 hover:text-hoverc">help</Link>!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
