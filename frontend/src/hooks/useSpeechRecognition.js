import { useState, useRef } from "react";

function useSpeechRecognition() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let text = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        text += event.results[i][0].transcript + " ";
      }

      setTranscript(text.trim());
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();

    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    setTranscript,
  };
}

export default useSpeechRecognition;