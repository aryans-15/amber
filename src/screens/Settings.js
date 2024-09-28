import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Settings() {
  const [activeTab, setActiveTab] = useState("camera");
  const [volume, setVolume] = useState(50);

  const renderContent = () => {
    switch (activeTab) {
      case "camera":
        return (
          <div className="h-full w-full flex flex-col p-2">
            <div className="flex space-x-4 items-center justify-around mb-auto">
              <p className="text-disabled text-2xl whitespace-nowrap">
                Render Distance:
              </p>
              <select className="bg-disabled text-font text-xl border-4 border-font rounded-lg block w-full py-2 px-3">
                <option value="low">Low (1m)</option>
                <option value="medium">Medium (5m)</option>
                <option value="high">High (10m)</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4 mt-auto">
              <button className="bg-accent hover:bg-hovera px-4 py-2 rounded-lg text-xl duration-300">
                Cancel
              </button>
              <button className="bg-accent hover:bg-hovera px-4 py-2 rounded-lg text-xl duration-300">
                Save
              </button>
            </div>
          </div>
        );
      case "output":
        return (
          <div className="h-full w-full flex flex-col p-2 text-disabled">
            <div className="flex flex-col space-y-2">
              <label className="text-2xl" htmlFor="volume">
                Volume: {volume}%
              </label>
              <input
                id="volume"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full h-4 bg-disabled text-font rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex space-x-4 items-center justify-between mt-8">
              <p className="text-disabled text-2xl">Voice: </p>
              <select className="bg-disabled text-font border-4 border-font text-xl rounded-lg block w-full py-2 px-3">
                <option value="voice1">voice1</option>
                <option value="voice2">voice2</option>
                <option value="voice3">voice3</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 mt-auto">
              <button className="bg-accent hover:bg-hovera px-4 py-2 rounded-lg text-xl text-font duration-300">
                Cancel
              </button>
              <button className="bg-accent hover:bg-hovera px-4 py-2 rounded-lg text-xl text-font duration-300">
                Save
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full w-full flex flex-col p-2">
            <div className="flex space-x-4 items-center justify-around mb-auto">
              <p className="text-disabled text-2xl whitespace-nowrap">
                Detection Level:
              </p>

              <select className="bg-disabled text-font border-4 border-font text-xl rounded-lg block w-full py-2 px-3">
                <option value="low">Low (walls)</option>
                <option value="medium">Medium (walls, chairs, polls)</option>
                <option value="high">
                  High (walls, chairs, polls, people)
                </option>
              </select>
            </div>
            <div className="flex justify-end space-x-4 mt-auto">
              <button className="bg-accent hover:bg-hovera px-4 py-2 rounded-lg text-xl text-font duration-300">
                Cancel
              </button>
              <button className="bg-accent hover:bg-hovera px-4 py-2 rounded-lg text-xl text-font duration-300">
                Save
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex flex-grow items-center justify-center">
        <div className="flex w-3/4 max-w-4xl h-[50%] border-4 border-font shadow-lg shadow-font rounded-lg">
          <div className="w-1/3 p-4 rounded-l-lg border-r-4 border-font text-disabled">
            <ul className="space-y-4 text-2xl">
              <li
                className={`cursor-pointer ${
                  activeTab === "camera"
                    ? "font-bold border-b-2 border-font"
                    : ""
                }`}
                onClick={() => setActiveTab("camera")}
              >
                Camera Settings
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "output"
                    ? "font-bold border-b-2 border-font"
                    : ""
                }`}
                onClick={() => setActiveTab("output")}
              >
                Output Settings
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "detection"
                    ? "font-bold border-b-2 border-font"
                    : ""
                }`}
                onClick={() => setActiveTab("detection")}
              >
                Detection Settings
              </li>
            </ul>
          </div>

          <div className="flex-grow p-4">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Settings;
