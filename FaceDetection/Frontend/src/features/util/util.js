
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;

// Initialize face detector and emotion classifier
export async function init() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  const landmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    runningMode: "VIDEO",
    numFaces: 1,
  });

  try {
    const classifier = await pipeline(
      "image-classification",
      "Xenova/facial_emotions_image_detection"
    );

    return { landmarker, classifier };
  } catch (error) {
    landmarker.close();
    throw error;
  }
}

// Detect face and predict expression
export function detect({
  landmarkerRef,
  videoRef,
  setExpression,
  setConfidence,
}) {
  const { landmarker, classifier } = landmarkerRef.current;
  const video = videoRef.current;

  const canvas = document.createElement("canvas");
  canvas.width = 224;
  canvas.height = 224;

  const context = canvas.getContext("2d");

  let busy = false;
  let lastInference = 0;
  let lastVideoTime = -1;

  async function predict() {
    // Stop the loop when the camera is stopped
    if (!video.srcObject) return;

    const now = performance.now();

    if (
      video.readyState >= 2 &&
      video.videoWidth > 0 &&
      video.currentTime !== lastVideoTime &&
      now - lastInference >= 1200 &&
      !busy
    ) {
      busy = true;
      lastInference = now;
      lastVideoTime = video.currentTime;

      try {
        const result = landmarker.detectForVideo(video, now);

        if (!result.faceLandmarks?.length) {
          setExpression("No face detected");
          setConfidence(0);
        } else {
          const points = result.faceLandmarks[0];

          const xs = points.map((p) => p.x * video.videoWidth);
          const ys = points.map((p) => p.y * video.videoHeight);

          const minX = Math.max(0, Math.min(...xs));
          const minY = Math.max(0, Math.min(...ys));
          const maxX = Math.min(video.videoWidth, Math.max(...xs));
          const maxY = Math.min(video.videoHeight, Math.max(...ys));

          const padX = (maxX - minX) * 0.15;
          const padY = (maxY - minY) * 0.15;

          const left = Math.max(0, minX - padX);
          const top = Math.max(0, minY - padY);
          const right = Math.min(video.videoWidth, maxX + padX);
          const bottom = Math.min(video.videoHeight, maxY + padY);

          const width = right - left;
          const height = bottom - top;

          if (width > 0 && height > 0) {
            context.clearRect(0, 0, 224, 224);

            context.drawImage(
              video,
              left,
              top,
              width,
              height,
              0,
              0,
              224,
              224
            );

            const predictions = await classifier(canvas);

            // Do not update UI if camera stopped during prediction
            if (!video.srcObject) return;

            const best = predictions?.[0];

            if (best) {
              const label = best.label.toLowerCase();
              let emotion = best.label;

              if (label.includes("happy")) emotion = "Happy 😊";
              else if (label.includes("sad")) emotion = "Sad 😢";
              else if (label.includes("neutral")) emotion = "Neutral 😐";

              setExpression(emotion);
              setConfidence(Math.round(best.score * 100));
            }
          }
        }
      } catch (error) {
        console.error("Detection error:", error);

        if (video.srcObject) {
          setExpression("Prediction failed");
          setConfidence(0);
        }
      } finally {
        busy = false;
      }
    }

    if (video.srcObject) {
      requestAnimationFrame(predict);
    }
  }

  predict();
}
