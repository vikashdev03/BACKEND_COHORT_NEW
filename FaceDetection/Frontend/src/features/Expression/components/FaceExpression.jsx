
import { useEffect, useRef, useState } from "react";
import { init, detect } from "../../util/util.js";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [status, setStatus] = useState("Ready to start");
  const [expression, setExpression] = useState("Not detected");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      landmarkerRef.current?.landmarker?.close();
    };
  }, []);

  async function startDetection() {
    if (loading || running) return;

    setLoading(true);
    setStatus("Requesting camera permission...");
    setExpression("Not detected");
    setConfidence(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 480 },
          height: { ideal: 360 },
        },
        audio: false,
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      setStatus("Loading face and emotion models...");

      landmarkerRef.current = await init();

      setStatus("Camera active — detecting expressions");
      setRunning(true);

      detect({
        landmarkerRef,
        videoRef,
        setExpression,
        setConfidence,
      });
    } catch (error) {
      console.error("Startup error:", error);

      setStatus(
        error.name === "NotAllowedError"
          ? "Please allow camera access"
          : `Error: ${error.message || "Could not load models"}`
      );

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      landmarkerRef.current?.landmarker?.close();
      landmarkerRef.current = null;

      setRunning(false);
    } finally {
      setLoading(false);
    }
  }

  function stopDetection() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    landmarkerRef.current?.landmarker?.close();
    landmarkerRef.current = null;

    setRunning(false);
    setStatus("Detection stopped");
    setExpression("Not detected");
    setConfidence(0);
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.heading}>Face Expression Detector</h1>

        <p style={styles.status}>{status}</p>

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={styles.video}
        />

        <div style={styles.result}>
          <p style={styles.resultLabel}>Predicted expression</p>

          <h2 style={styles.emotion}>{expression}</h2>

          <p style={styles.confidence}>
            Model confidence: {confidence}%
          </p>
        </div>

        <button
          onClick={running ? stopDetection : startDetection}
          disabled={loading}
          style={{
            ...styles.button,
            background: running ? "#dc2626" : "#7c3aed",
            opacity: loading ? 0.65 : 1,
          }}
        >
          {loading
            ? "Loading..."
            : running
              ? "Stop Detection"
              : "Start Detection"}
        </button>

        <p style={styles.note}>
          Predictions are estimates of facial appearance, not proof of a
          person's actual feelings.
        </p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    background: "#f3f0ff",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "650px",
    boxSizing: "border-box",
    padding: "28px 24px",
    borderRadius: "16px",
    background: "#fff",
    textAlign: "center",
    boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
  },
  heading: {
    margin: "14px 0 20px",
    fontSize: "30px",
    color: "#111",
  },
  status: {
    minHeight: "24px",
    margin: "0 0 18px",
    color: "#7c3aed",
    fontSize: "15px",
    overflowWrap: "anywhere",
  },
  video: {
    display: "block",
    width: "100%",
    aspectRatio: "4 / 3",
    borderRadius: "12px",
    background: "#222",
    objectFit: "cover",
    transform: "scaleX(-1)",
  },
  result: {
    margin: "20px 0",
    padding: "16px 12px",
    borderRadius: "12px",
    background: "#f7f4ff",
  },
  resultLabel: {
    margin: "12px 0",
    fontSize: "15px",
  },
  emotion: {
    margin: "18px 0",
    fontSize: "24px",
    color: "#111",
  },
  confidence: {
    margin: "14px 0 12px",
    fontSize: "15px",
  },
  button: {
    border: 0,
    borderRadius: "8px",
    padding: "12px 22px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
  note: {
    margin: "22px 0 8px",
    color: "#666",
    fontSize: "12px",
    lineHeight: 1.5,
  },
};
