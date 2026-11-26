"use client";

import { useEffect, useRef } from "react";

const vsSource = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

const fsSource = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed = 0.2;
  const float gridSmoothWidth = 0.015;
  const float axisWidth = 0.05;
  const float majorLineWidth = 0.025;
  const float minorLineWidth = 0.0125;
  const float majorLineFrequency = 5.0;
  const float minorLineFrequency = 1.0;
  const vec4 gridColor = vec4(0.5);
  const float scale = 5.0;
  const vec4 lineColor = vec4(0.29, 0.87, 0.50, 1.0);
  const float minLineWidth = 0.01;
  const float maxLineWidth = 0.2;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 16;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
  #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

  float drawGridLines(float axis) {
    return drawCrispLine(0.0, axisWidth, axis)
          + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
          + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
  }

  float drawGrid(vec2 space) {
    return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
  }

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec4 fragColor;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    vec4 lines = vec4(0.0);
    vec4 bgColor1 = vec4(0.08, 0.33, 0.18, 1.0);
    vec4 bgColor2 = vec4(0.09, 0.40, 0.20, 1.0);

    for(int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

      line = line + circle;
      lines += line * lineColor * rand;
    }

    fragColor = mix(bgColor1, bgColor2, uv.x);
    fragColor *= verticalFade;
    fragColor.a = 1.0;
    fragColor += lines;

    gl_FragColor = fragColor;
  }
`;

function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initShaderProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Shader program link error:", gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const program = initShaderProgram(gl, vsSource, fsSource);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const vertexPosition = gl.getAttribLocation(program, "aVertexPosition");
    const resolution = gl.getUniformLocation(program, "iResolution");
    const time = gl.getUniformLocation(program, "iTime");

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;
    let animId = 0;
    let running = false;
    const startTime = performance.now();
    // The background is soft, so render fewer pixels (cheaper on phones) and let CSS scale it up.
    const pixelScale = () => (window.innerWidth < 768 ? 0.4 : 0.6);

    const draw = (seconds: number) => {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, seconds);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vertexPosition);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      draw((performance.now() - startTime) / 1000);
      animId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    const resizeCanvas = () => {
      const scale = pixelScale();
      canvas.width = Math.max(1, Math.round((window.innerWidth + 32) * scale));
      canvas.height = Math.max(1, Math.round((window.innerHeight + 32) * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      // Reduced motion (or paused): keep one still frame on screen.
      if (!running) draw(4);
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
      if (reduceMotion) {
        stop();
        draw(4);
      } else {
        start();
      }
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
    };

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);
    canvas.addEventListener("webglcontextlost", onContextLost);

    resizeCanvas();
    start();

    return () => {
      stop();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="-z-10 blur-[3px]"
        style={{
          position: "fixed",
          top: -16,
          left: -16,
          width: "calc(100% + 32px)",
          height: "calc(100% + 32px)",
        }}
      />
      {/* Dark tint over the animation so text on the page stays readable. Raise or lower the opacity to taste. */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-black/40 pointer-events-none" />
    </>
  );
}
