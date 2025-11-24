"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

// Sound Wave Component
function SoundWave({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-1 h-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-white rounded-full"
          animate={
            isPlaying
              ? {
                  height: [4, 12, 8, 16, 6, 12, 4],
                  opacity: [0.5, 1, 0.7, 1, 0.6, 1, 0.5],
                }
              : { height: 4, opacity: 0.5 }
          }
          transition={{
            duration: 0.8,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function MusicControl() {
  const {
    currentTrackIndex,
    isPlaying,
    togglePlay,
    nextTrack,
    previousTrack,
    volume,
    setVolume,
    tracks,
  } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoPlayRef = useRef(false);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track if we should auto-play when switching tracks
  useEffect(() => {
    shouldAutoPlayRef.current = isPlaying;
  }, [isPlaying]);

  // Update audio source when track changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack || !isMounted) return;

    const audio = audioRef.current;
    const shouldPlay = shouldAutoPlayRef.current;

    // Set up loading handlers
    const handleCanPlay = () => {
      setIsLoading(false);
      audio.volume = isMuted ? 0 : volume;
      if (shouldPlay) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Successfully started playing
            })
            .catch((error) => {
              console.error("Auto-play failed:", error);
            });
        }
      }
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      audio.volume = isMuted ? 0 : volume;
      // Try to play if we should
      if (shouldPlay && audio.readyState >= 2) {
        audio.play().catch((error) => {
          console.error("Play on loadeddata failed:", error);
        });
      }
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleError = (e: any) => {
      console.error("Audio error:", e, "Track URL:", currentTrack.url);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    // Remove old listeners
    audio.removeEventListener("canplay", handleCanPlay);
    audio.removeEventListener("loadeddata", handleLoadedData);
    audio.removeEventListener("loadstart", handleLoadStart);
    audio.removeEventListener("error", handleError);
    audio.removeEventListener("waiting", handleWaiting);

    // Add new listeners
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("error", handleError);
    audio.addEventListener("waiting", handleWaiting);

    // Pause current track before switching
    audio.pause();

    // Update source
    try {
      audio.src = currentTrack.url;
      audio.volume = isMuted ? 0 : volume;
      audio.load();
    } catch (error) {
      console.error("Failed to load audio:", error);
      setIsLoading(false);
    }

    // Cleanup
    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("waiting", handleWaiting);
    };
  }, [currentTrackIndex, currentTrack?.url, isMounted]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !isMounted) return;

    const audio = audioRef.current;
    
    if (isPlaying) {
      // Wait for audio to be ready
      const playAudio = () => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Play failed:", error);
          });
        }
      };

      if (audio.readyState >= 2) {
        // HAVE_CURRENT_DATA or higher - can play immediately
        playAudio();
      } else {
        // Wait for audio to be ready
        const handleCanPlayOnce = () => {
          playAudio();
        };
        audio.addEventListener("canplay", handleCanPlayOnce, { once: true });
        return () => {
          audio.removeEventListener("canplay", handleCanPlayOnce);
        };
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, isMounted, currentTrackIndex]);

  // Update volume
  useEffect(() => {
    if (audioRef.current && isMounted) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, isMounted]);

  // Auto-play next track when current ends
  useEffect(() => {
    if (!isMounted || !audioRef.current) return;
    
    const audio = audioRef.current;
    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [nextTrack, isMounted, currentTrackIndex]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        preload="auto"
      />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50"
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            <motion.div
              key="minimized"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/30 backdrop-blur-md rounded-lg border border-white/20 px-3 py-2 flex items-center gap-3 shadow-2xl cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              {/* Play/Pause Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-6 h-6 flex items-center justify-center text-white hover:text-brand-red transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3 ml-0.5" />
                )}
              </button>

              {/* Sound Wave */}
              <SoundWave isPlaying={isPlaying} />

              {/* Track Name */}
              {currentTrack && (
                <div className="min-w-0 max-w-[150px] relative">
                  <p className="text-white text-xs font-medium truncate">
                    {currentTrack.title}
                  </p>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              )}

              {/* Minimize/Maximize Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="p-1 text-white hover:text-brand-red transition-colors"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/30 backdrop-blur-md rounded-lg border border-white/20 px-4 py-3 flex items-center gap-4 shadow-2xl"
            >
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-brand-red transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>

              {/* Track Info */}
              {currentTrack && (
                <div className="min-w-0 max-w-[200px] relative">
                  <p className="text-white text-sm font-semibold truncate">
                    {currentTrack.title}
                  </p>
                  <SoundWave isPlaying={isPlaying && !isLoading} />
                  {isLoading && (
                    <div className="absolute top-0 right-0">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={previousTrack}
                  aria-label="Previous track"
                  className="p-2 text-white hover:text-brand-red transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTrack}
                  aria-label="Next track"
                  className="p-2 text-white hover:text-brand-red transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="p-2 text-white hover:text-brand-red transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Minimize Button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 text-white hover:text-brand-red transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

