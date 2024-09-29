import { useEffect } from "react";

function SyncConnect({ onNext }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext(); // Navigate to the next step
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-font text-6xl font-bold">Sync Connect</p>
    </div>
  );
}

export default SyncConnect;
