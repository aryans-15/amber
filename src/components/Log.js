import React, { useEffect } from "react";
import { auth } from "../firebase";
import { formatTimestamp } from "../utils/timeUtils";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Log() {

  const streamCamVideo = () => {
    const constraints = { audio: true, video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        const video = document.querySelector("video");
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      }); // Always check for errors at the end.
  }

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-auto">
      <p className="text-font text-6xl mb-6 font-bold">Vision Log</p>

      {/* Video stream */}
      <div className="flex flex-col space-y-4 mt-4 max-h-80 overflow-y-scroll px-4 my-6 mb-8">
        <video autoPlay={true} id="videoElement" className="rounded-lg shadow-lg"></video>
      </div>
    </div>
  );
}

export default Log;
