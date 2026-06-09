"use client";

import { useEffect } from "react";
import { renderCanvas, stopCanvas } from "@/utils/canvasAnimation";

export default function CanvasAnimation() {
  useEffect(() => {
    renderCanvas();
    return () => stopCanvas();
  }, []);

  return (
    <canvas
      id="ribbon-canvas"
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
