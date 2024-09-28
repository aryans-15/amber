import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

function SyncStart() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/vr/connect");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="w-[30%] h-fit border-4 border-secondary flex flex-col p-8 items-center">
        <p className="text-font text-6xl font-bold">Sync VR</p>
        <i className="bi bi-headset-vr text-[10vw]"></i>
        <button
          className="bg-accent text-font p-4 text-4xl rounded-lg w-[80%] hover:bg-hovera duration-300"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
      <div className="flex space-x-4 mt-4">
        <div className="w-4 h-4 rounded-full bg-accent"></div>
        <div className="w-4 h-4 rounded-full border-2 border-accent"></div>
        <div className="w-4 h-4 rounded-full border-2 border-accent"></div>
      </div>
    </div>
  );
}

export default SyncStart;
