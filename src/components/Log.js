import React, { useEffect, useRef, useState } from 'react';
import { ElevenLabsClient } from "elevenlabs";
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function Log() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [logs, setLogs] = useState([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const dataArrayRef = useRef(null);
  const visualizerCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const recognitionRef = useRef(null);
  const elevenLabsClient = new ElevenLabsClient({ apiKey: process.env.REACT_APP_ELEVENLABS_API_KEY });
  const audioRef = useRef(null);
  const [transcript, setTranscript] = useState(''); 
  const navigate = useNavigate();

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

  const handleKeyDown = (event) => {
    if (event.shiftKey && event.key.toLowerCase() === 'v') {
      if (!isRecording) {
        startRecording();
      }
    }
  };

  const handleKeyUp = (event) => {
    if (event.key.toLowerCase() === 'v' || event.key === 'Shift') {
      if (isRecording) {
        stopRecording();
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    console.log('Recording started');
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;
        const microphone = audioContext.createMediaStreamSource(stream);
        microphoneRef.current = microphone;

        const analyser = audioContext.createAnalyser();
        analyserRef.current = analyser;
        analyser.fftSize = 1024;
        analyser.minDecibels = -90; 
        analyser.maxDecibels = -10;
        analyser.smoothingTimeConstant = 0.85;  

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;

        microphone.connect(analyser);
        visualize();
      })
      .catch((err) => console.error('Error accessing microphone:', err));

    startSpeechRecognition();
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped');

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (microphoneRef.current) {
      microphoneRef.current.mediaStream.getTracks().forEach(track => track.stop());
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const startSpeechRecognition = async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
        const email = user.email;
        const db = getFirestore();
        const userDocRef = doc(db, "users", email);
        
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userLanguage = userData.language;
            recognition.lang = userLanguage;
        } else {
            console.error("No user document found");
            recognition.lang = 'en-US';
        }
    } else {
        console.error("No user is signed in");
        recognition.lang = 'en-US';
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Speech to Text:', transcript);
      setTranscript(transcript);
      captureFrame(transcript);
      const timestamp = new Date().toISOString();
      setLogs((prevLogs) => [...prevLogs, [transcript, `${timestamp} · Human`]]);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended.');
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const visualize = () => {
    const canvas = visualizerCanvasRef.current;
    const canvasContext = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const bufferLength = analyser.frequencyBinCount;

    const draw = () => {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

      analyser.getByteTimeDomainData(dataArray);

      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = 'rgb(0, 255, 0)';
      canvasContext.beginPath();

      const sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * HEIGHT / 2;

        if (i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasContext.lineTo(canvas.width, canvas.height / 2);
      canvasContext.stroke();

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const captureFrame = async (prompt) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageBase64 = canvas.toDataURL('image/png').split(',')[1];
    console.log("PROMPT:" + prompt);
    const userId = "guest"; 
    try {
      const response = await axios.post('https://amber-vr-api.onrender.com/describe', {
        user_id: userId,
        image_base64: imageBase64,
        prompt: prompt
      });
      
      const newDescription = response.data.description;
      setDescription(newDescription);
      const timestamp = new Date().toISOString();
      setLogs((prevLogs) => [...prevLogs, [newDescription, `${timestamp} · AI Agent`]]); 
      playDescription(newDescription);
    } catch (error) {
      console.error('Error sending image to API:', error);
    }
  };

  const playDescription = async (text) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.elevenlabs.io/v1/text-to-speech/pMsXgVXv3BLzUgSXRplE',
        headers: {
          'xi-api-key': process.env.REACT_APP_ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer', 
        data: {
          text: text,
          voice_settings: {
            stability: 0.1,
            similarity_boost: 0.3,
            style: 0.2
          }
        }
      });
  
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
  
    } catch (error) {
      console.error('Error playing text-to-speech audio:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/unauthorized");
      } else {
        streamCamVideo();
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording]);

  const formatTimestamp = (timestamp) => {
    let secondPart = timestamp.split(' · ')[1];
    let firstPart = timestamp.split(' · ')[0];
    const date = new Date(firstPart);
    return date.toLocaleTimeString() + ' · ' + secondPart; 
  };

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-auto px-4">
      <p className="text-font text-6xl mb-12 font-bold">Vision Log</p>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center justify-center  overflow-hidden mr-4"> 
          <video autoPlay={true} ref={videoRef} className="rounded-lg shadow-lg max-h-full w-full object-cover"></video> 
          <canvas ref={canvasRef} style={{ display: 'none' }} width={1280} height={720}></canvas>
        </div>
        <div className="rounded-lg flex flex-col justify-center overflow-y-auto ml-4 border-4 border-secondary px-4"> 
          {logs.map(([text, timestamp], index) => (
            <div key={index} className="text-xl my-2 flex flex-col">
              <p className="text-xl">{text}</p>
              <p className="text-sm text-gray-500">{formatTimestamp(timestamp)}</p>
            </div>
          ))}
        </div>
      </div>
      <canvas ref={visualizerCanvasRef} width={640} height={256} className="mb-8"></canvas>
    </div>
  );
}

export default Log;
