import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Header from "../components/Header";
import Footer from "../components/Footer";
import SyncStart from "../components/SyncStart";
import SyncConnect from "../components/SyncConnect";
import SyncVerify from "../components/SyncVerify";

// Export SyncStart as the default export
const Sync = () => {
  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<SyncStart />} /> {/* Default path */}
          <Route path="/connect" element={<SyncConnect />} />
          <Route path="/verify" element={<SyncVerify />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

// Set Sync as the default export
export default SyncStart; // Now exporting SyncStart as default
