import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Log() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [description, setDescription] = useState('');
  const [logs, setLogs] = useState([]); // State for logs

  const streamCamVideo = () => {
    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        const video = videoRef.current;
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          video.play();
        };
      })
      .catch((err) => {
        console.log(err.name + ': ' + err.message);
      });
  };

  const captureFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageBase64 = canvas.toDataURL('image/png').split(',')[1];

    const userId = "example_user_id"; // Replace with actual user ID as needed
    try {
      const response = await axios.post('https://amber-vr-api.onrender.com/describe', {
        user_id: userId,
        image_base64: imageBase64
      });
      
      const newDescription = response.data.description;
      setDescription(newDescription);

      // Add the new description to the logs
      const timestamp = new Date().toISOString();
      setLogs((prevLogs) => [...prevLogs, [newDescription, timestamp]]);
      
    } catch (error) {
      console.error('Error sending image to API:', error);
    }
  };

  useEffect(() => {
    streamCamVideo();
    
    const intervalId = setInterval(() => {
      captureFrame();
    }, 4000); 

    return () => clearInterval(intervalId);
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); // Format as needed
  };

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-auto">
      <p className="text-font text-6xl mb-6 font-bold">Vision Log</p>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center justify-center max-h-[40vh] overflow-hidden mr-4"> 
          <video autoPlay={true} ref={videoRef} className="rounded-lg shadow-lg max-h-full w-full object-cover"></video> 
          <canvas ref={canvasRef} style={{ display: 'none' }} width={1280} height={720}></canvas>
        </div>
        <div className="rounded-lg flex flex-col justify-center max-h-[40vh] max-w-[60vh] overflow-y-auto ml-4"> 
          {logs.map(([log, timestamp], index) => (
            <div key={index} className="flex items-start px-2 py-2 bg-secondary rounded-lg shadow-md mb-2"> 
              <i className="bi bi-info-circle text-2xl mr-2"></i>
              <div className="flex flex-col">
                <span className="text-xl">
                  {log} <span className="text-xl text-primary font-bold mt-1">({formatTimestamp(timestamp)})</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Log;
