import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SyncConnect() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/vr/verify");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-font text-4xl">Sync Connect</h1>
    </div>
  );
}

export default SyncConnect;
