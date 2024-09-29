import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Settings() {
  const [language, setLanguage] = useState("english");
  const [speed, setSpeed] = useState("normal");
  const [voice, setVoice] = useState("adam");
  const [userEmail, setUserEmail] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);

        const userDocRef = doc(db, "users", user.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.language) {
            setLanguage(userData.language);
          }
          if (userData.speed) {
            setSpeed(userData.speed);
          }
          if (userData.voice) {
            setVoice(userData.voice);
          }
        } else {
          console.log("No user settings found. Using default settings.");
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSave = async () => {
    if (!userEmail) {
      console.log("User not authenticated");
      return;
    }

    const userDocRef = doc(db, "users", userEmail);

    try {
      const updatedData = { language, speed, voice };
      await setDoc(userDocRef, updatedData, { merge: true });
      console.log("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      console.log("Failed to update settings");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="h-full w-full flex flex-grow items-center justify-center">
        <div className="flex flex-col p-8 text-disabled w-[40%] h-[50%] border-4 border-font shadow-lg shadow-font rounded-lg">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4 items-center justify-between">
              <p className="text-disabled text-2xl">Language: </p>
              <select
                className="bg-disabled text-font border-4 border-font text-xl rounded-lg block w-[80%] py-2 px-3"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="chinese">Chinese</option>
                <option value="french">French</option>
                <option value="korean">Korean</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>
            <div className="flex space-x-4 items-center justify-between">
              <p className="text-disabled text-2xl">Speed: </p>
              <select
                className="bg-disabled text-font border-4 border-font text-xl rounded-lg block w-[80%] py-2 px-3"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
            <div className="flex space-x-4 items-center justify-between">
              <p className="text-disabled text-2xl">Voice: </p>
              <select
                className="bg-disabled text-font border-4 border-font text-xl rounded-lg block w-[80%] py-2 px-3"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
              >
                <option value="adam">Adam</option>
                <option value="alice">Alice</option>
                <option value="chris">Chris</option>
                <option value="daniel">Daniel</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-auto">
            <button className="bg-accent hover:bg-hovera px-4 py-2 rounded-lg text-xl text-font duration-300">
              Cancel
            </button>
            <button
              className="bg-accent hover:bg-hovera px-4 py-2 rounded-lg text-xl text-font duration-300"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Settings;
