import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Sync from "./screens/Sync";
import Settings from "./screens/Settings";
import About from "./screens/About";
import FAQ from "./screens/FAQ";
import Unauthorized from "./screens/errors/Unauthorized";
import NotFound from "./screens/errors/NotFound";

function App() {
  return (
    <Router>
      <div className="h-screen flex bg-primary text-font">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sync" element={<Sync />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
