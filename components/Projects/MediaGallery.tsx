"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { MediaItem } from "@/types";

interface MediaGalleryProps {
  media: MediaItem[];
  thumbnail: string;
}

export default function MediaGallery({ media, thumbnail }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Combine thumbnail with media array
  const allMedia: MediaItem[] = [
    { type: "image", url: thumbnail },
    ...media,
  ];

  const openGallery = (index: number) => {
    setSelectedIndex(index);
    setCurrentMediaIndex(index);
  };

  const closeGallery = () => {
    setSelectedIndex(null);
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
  };

  const previousMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {allMedia.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openGallery(index)}
          >
            {item.type === "video" ? (
              <>
                <Image
                  src={item.thumbnail || thumbnail}
                  alt={`Media ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </>
            ) : (
              <Image
                src={item.url}
                alt={`Media ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={previousMedia}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-brand-gray/90 backdrop-blur-md border border-brand-light/20 rounded-full flex items-center justify-center text-white hover:bg-brand-red transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-brand-gray/90 backdrop-blur-md border border-brand-light/20 rounded-full flex items-center justify-center text-white hover:bg-brand-red transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Media Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMediaIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full aspect-video rounded-lg overflow-hidden bg-brand-dark"
                >
                  {allMedia[currentMediaIndex].type === "video" ? (
                    <ReactPlayer
                      url={allMedia[currentMediaIndex].url}
                      playing={true}
                      muted={false}
                      controls
                      width="100%"
                      height="100%"
                      className="absolute inset-0"
                    />
                  ) : (
                    <Image
                      src={allMedia[currentMediaIndex].url}
                      alt={`Media ${currentMediaIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Media Counter */}
              {allMedia.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-gray/90 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm">
                  {currentMediaIndex + 1} / {allMedia.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

