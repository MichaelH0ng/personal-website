"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoPlay, IoPause, IoPlaySkipBack, IoPlaySkipForward, IoShuffle, IoRepeat } from "react-icons/io5";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

function Slider({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div
      className="relative w-full h-1 bg-white/15 rounded-full cursor-pointer"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-green-400 rounded-full"
        style={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}

function TransportButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick?: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "flex items-center justify-center h-8 w-8 rounded-full text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500",
        active && "bg-green-500/20 text-green-400"
      )}
    >
      {children}
    </motion.button>
  );
}

export default function AudioPlayer({ src, title }: { src: string; title?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    setProgress(isFinite(pct) ? pct : 0);
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const time = (value / 100) * audio.duration;
    if (isFinite(time)) {
      audio.currentTime = time;
      setProgress(value);
    }
  };

  return (
    <div className="rounded-xl bg-black/40 border border-white/10 p-3">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      {title && <p className="text-white font-semibold text-sm text-center mb-2 truncate">{title}</p>}

      <div className="flex flex-col gap-1">
        <Slider value={progress} onChange={handleSeek} />
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
          <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 mt-2">
        <TransportButton label="Shuffle" active={shuffle} onClick={() => setShuffle((s) => !s)}>
          <IoShuffle className="w-4 h-4" />
        </TransportButton>
        <TransportButton label="Previous">
          <IoPlaySkipBack className="w-4 h-4" />
        </TransportButton>
        <TransportButton label={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
          {isPlaying ? <IoPause className="w-5 h-5" /> : <IoPlay className="w-5 h-5" />}
        </TransportButton>
        <TransportButton label="Next">
          <IoPlaySkipForward className="w-4 h-4" />
        </TransportButton>
        <TransportButton label="Repeat" active={repeat} onClick={() => setRepeat((r) => !r)}>
          <IoRepeat className="w-4 h-4" />
        </TransportButton>
      </div>
    </div>
  );
}
