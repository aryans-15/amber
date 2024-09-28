import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SyncConnect() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/vr/verify"); // Ensure the path is correct
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-font text-4xl">Sync Connect</h1>
      {/* Add additional content or logic here */}
    </div>
  );
}

export default SyncConnect;
