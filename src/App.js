import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./screens/Home";
import Sync from "./screens/Sync";
import Settings from "./screens/Settings";

function App() {
  return (
    <Router>
      <div className="h-screen flex bg-primary text-font">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vr" element={<Sync />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
