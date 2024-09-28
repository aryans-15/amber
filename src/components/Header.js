import { useState } from "react";

function Header() {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <div className="h-fit w-full flex justify-between p-4 items-center">
      <div className="flex items-center">
        <p className="text-font text-4xl mr-8">AmberVR</p>

        <div className="flex items-center space-x-4">
          {/* Home Icon */}
          <div
            className="flex items-center transition-all duration-500 ease-in-out group"
            onMouseEnter={() => setHoveredIcon("home")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <i className="bi bi-house text-4xl"></i>
            <span
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                hoveredIcon === "home"
                  ? "ml-2 max-w-xs opacity-100"
                  : "max-w-0 opacity-0"
              } text-xl text-font whitespace-nowrap`}
              style={{ transitionProperty: "max-width, opacity, margin-left" }}
            >
              Home
            </span>
          </div>

          {/* VR Icon */}
          <div
            className="flex items-center transition-all duration-500 ease-in-out group"
            onMouseEnter={() => setHoveredIcon("vr")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <i className="bi bi-headset-vr text-4xl"></i>
            <span
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                hoveredIcon === "vr"
                  ? "ml-2 max-w-xs opacity-100"
                  : "max-w-0 opacity-0"
              } text-xl text-font whitespace-nowrap`}
              style={{ transitionProperty: "max-width, opacity, margin-left" }}
            >
              VR
            </span>
          </div>

          {/* Settings Icon */}
          <div
            className="flex items-center transition-all duration-500 ease-in-out group"
            onMouseEnter={() => setHoveredIcon("settings")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <i className="bi bi-gear text-4xl"></i>
            <span
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                hoveredIcon === "settings"
                  ? "ml-2 max-w-xs opacity-100"
                  : "max-w-0 opacity-0"
              } text-xl text-font whitespace-nowrap`}
              style={{ transitionProperty: "max-width, opacity, margin-left" }}
            >
              Settings
            </span>
          </div>
        </div>
      </div>

      <button className="text-font text-2xl bg-secondary px-4 py-2 rounded-lg">
        Log Out
      </button>
    </div>
  );
}

export default Header;
