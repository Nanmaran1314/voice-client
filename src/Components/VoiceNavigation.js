import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognitionAPI();
recognition.continuous = true;
recognition.lang = 'en-US';

const VoiceNavigation = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    recognition.onresult = (event) => {
      const speechResult = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log('Recognized:', speechResult);

      if (speechResult.includes('go to home')) {
        navigate('/');
      } else if (speechResult.includes('go to about')) {
        navigate('/about');
      }
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition:', event.error);
      setError(event.error);
      if (event.error === 'not-allowed') {
        // Handle permissions issue gracefully here
        setIsRecognizing(false);
      }
    };

    recognition.onend = () => {
      console.log('Recognition ended');
      setIsRecognizing(false);
    };
  }, [navigate]);

  const startRecognition = () => {
    if (!isRecognizing) {
      try {
        recognition.start();
        setIsRecognizing(true);
        setError(null); // Clear any previous errors
      } catch (e) {
        console.error('Failed to start recognition:', e);
        setError('Failed to start recognition.');
      }
    }
  };

  const stopRecognition = () => {
    if (isRecognizing) {
      recognition.stop();
      setIsRecognizing(false);
    }
  };

  return (
    <div>
      <h2>Speak to Navigate</h2>
      <p>Say "Go to Home" or "Go to About"</p>
      {error && <p className="error">Error: {error}</p>}
      <button onClick={startRecognition} disabled={isRecognizing}>Start Voice Navigation</button>
      <button onClick={stopRecognition} disabled={!isRecognizing}>Stop Voice Navigation</button>
    </div>
  );
};

export default VoiceNavigation;
