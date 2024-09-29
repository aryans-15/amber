import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { formatTimestamp } from "../utils/timeUtils";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Log() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      console.log('hello world');
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        try {
          const latestOutputs = await retrieveCache(userId);
          console.log('Latest Outputs:', latestOutputs); 
          setLogs(latestOutputs);
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        retrieveCache(userId).then(latestOutputs => {
          setLogs(latestOutputs);
        });
      }
    }, 2500);

    return () => clearInterval(interval); 
  }, []);

  const retrieveCache = async (userId) => {
    try {
      const response = await fetch(`https://amber-vr-api.onrender.com/query?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Retrieved Cache:', data.latest_outputs);

      const sortedLogs = data.latest_outputs;
      return Array.isArray(sortedLogs) ? sortedLogs : [sortedLogs];
    } catch (error) {
      console.error('Error retrieving cache from the API:', error);
      return [];
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-auto">
      <p className="text-font text-6xl mb-6 font-bold">Vision Log</p>
      <div className="flex flex-col space-y-4 mt-4 max-h-80 overflow-y-scroll px-4 my-6 mb-8">
        {logs.map(([log, timestamp], index) => (
          <div key={index} className="flex items-start px-4 py-2 bg-secondary rounded-lg shadow-md">
            <i className="bi bi-info-circle text-2xl mr-3"></i>
            <div className="flex flex-col">
              <span className="text-xl">{log} <span className="text-xl text-primary font-bold mt-4">({formatTimestamp(timestamp)})</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Log;
