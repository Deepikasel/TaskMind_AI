import "./VoiceInput.css";

function VoiceInput({
  transcript,
  listening,
  startListening,
  stopListening,
}) {
  return (
    <div className="voice-box">

      <div className="voice-buttons">

        <button
          type="button"
          className="voice-start"
          onClick={startListening}
        >
          🎤 Start Recording
        </button>

        <button
          type="button"
          className="voice-stop"
          onClick={stopListening}
        >
          🛑 Stop Recording
        </button>

      </div>

      <div className="voice-transcript">

        <h4>Live Transcript</h4>

        <p>
          {transcript || "Start speaking..."}
        </p>

      </div>

      <div className="voice-status">

        {listening
          ? "🟢 Listening..."
          : "🔴 Not Listening"}

      </div>

    </div>
  );
}

export default VoiceInput;