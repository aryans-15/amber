import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SyncStart from "../components/SyncStart";
import SyncConnect from "../components/SyncConnect";
import SyncVerify from "../components/SyncVerify";

function Sync() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-primary text-font">
        <Header />
        <Routes>
          <Route path="/" element={<SyncStart />} />
          <Route path="/connect" element={<SyncConnect />} />
          <Route path="/verify" element={<SyncVerify />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default Sync;
