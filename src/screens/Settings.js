import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Settings() {
  const [language, setLanguage] = useState("English");
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
        } else {
          console.log("No user settings found. Using default language.");
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
      const updatedData = { language };
      await setDoc(userDocRef, updatedData, { merge: true });
      console.log("Language setting updated successfully!");
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
          <div className="flex space-x-4 items-center justify-between">
            <p className="text-disabled text-2xl">Language: </p>
            <select
              className="bg-disabled text-font border-4 border-font text-xl rounded-lg block w-full py-2 px-3"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
              <option value="Korean">Korean</option>
              <option value="Japanese">Japanese</option>
            </select>
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
