import { useState } from "react";
import "./VoiceRecorder.css";

function VoiceRecorder({ onTextCaptured }) {
  const [listening, setListening] =
    useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition not supported in this browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript;

      if (onTextCaptured) {
        onTextCaptured(text);
      }

      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="voice-recorder">

      <button
        className="voice-btn"
        onClick={startListening}
      >
        🎤
      </button>

      <p>
        {listening
          ? "Listening..."
          : "Click microphone"}
      </p>

    </div>
  );
}

export default VoiceRecorder;