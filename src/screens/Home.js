import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/unauthorized");
      } else {
        setUserName(user.displayName.split(" ")[0] || "Guest");

        const userDocRef = doc(db, "users", user.email);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const defaultSettings = {
            language: "en-US",
            speed: "normal",
            voice: "adam",
          };
          await setDoc(userDocRef, defaultSettings);
          console.log("Default settings initialized for the user.");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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
                <Link to="/sync">🥽 Talking with Amber</Link>
              </li>
              <li className="transition duration-300 hover:text-hoverc">
                <Link to="/settings">⚙️ Customizing your user settings</Link>
              </li>
              <li className="transition duration-300 hover:text-hoverc">
                <Link to="/about">💡 Learning about us and our goal</Link>
              </li>
            </ul>
            <p className="text-xl">
              Have questions? Check our{" "}
              <Link
                to="/help"
                className="text-secondary transition duration-300 hover:text-hoverc"
              >
                FAQ
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
