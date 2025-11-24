"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoBackgroundProps {
  videoUrl?: string;
  fallbackImage?: string;
}

export default function VideoBackground({
  videoUrl = "/videos/background.mp4",
  fallbackImage = "/images/background-fallback.jpg",
}: VideoBackgroundProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    // Loop video from 0 to 35 seconds
    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime >= 35) {
          playerRef.current.seekTo(0);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-transparent to-transparent z-10" />
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        muted={true}
        loop={false}
        playsinline={true}
        width="100%"
        height="100%"
        className="absolute inset-0 object-cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        config={{
          file: {
            attributes: {
              autoplay: true,
              playsInline: true,
              muted: true,
              loop: false,
              style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            },
          },
        }}
        onReady={() => {
          // Force play on mobile devices
          if (playerRef.current?.getInternalPlayer()) {
            const internalPlayer = playerRef.current.getInternalPlayer() as HTMLVideoElement;
            if (internalPlayer) {
              internalPlayer.play().catch((error) => {
                console.log("Autoplay prevented:", error);
                // Try to play again after user interaction
                setIsPlaying(true);
              });
            }
          }
        }}
        onProgress={(progress) => {
          // Reset to start when reaching 35 seconds
          if (progress.playedSeconds >= 35) {
            playerRef.current?.seekTo(0);
          }
        }}
        onError={() => {
          console.error("Video failed to load");
        }}
      />
      {/* Fallback image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${fallbackImage})`,
          display: isPlaying ? "none" : "block",
        }}
      />
    </div>
  );
}


