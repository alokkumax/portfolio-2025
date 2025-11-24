"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import VideoBackground from "@/components/Hero/VideoBackground";
import MusicControl from "@/components/Hero/MusicControl";
import HorizontalCarousel from "@/components/Projects/HorizontalCarousel";
import PromoCarousel from "@/components/Carousel/PromoCarousel";
import { featuredProjects } from "@/lib/projects";

const promoItems = [
  {
    id: "1",
    title: "Zensu Ecommerce",
    subtitle: "Full Stack",
    image: "/images/zensu-ecommerce.jpg",
    href: "/projects/zensu-ecommerce",
    badge: "NEW",
  },
  {
    id: "2",
    title: "Danger Ahead",
    subtitle: "Web Development",
    image: "/images/danger-ahead-thumbnail.png",
    href: "/projects/danger-ahead",
  },
  {
    id: "3",
    title: "ADIP Scheme System",
    subtitle: "Government Project",
    image: "/images/adip-scheme-thumbnail.png",
    href: "/projects/adip-scheme-system",
  },
];

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Full Screen Video Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <VideoBackground />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center gap-2 text-white"
        >
          <span className="text-sm uppercase tracking-wider">Scroll for more</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Music Control */}
        <MusicControl />
      </section>

      {/* White Background Content Section */}
      <section
        className={`relative z-10 transition-all duration-1000 ${
          hasScrolled ? "bg-white" : "bg-transparent"
        } min-h-screen`}
      >
          {/* Promotional Carousel */}
          <div className={`py-20 transition-colors duration-1000 ${
            hasScrolled ? "bg-white text-gray-900" : "bg-transparent text-white"
          }`}>
            <PromoCarousel items={promoItems} />
          </div>

          {/* Featured Projects Carousel */}
          <div className={`py-20 transition-colors duration-1000 ${
            hasScrolled ? "bg-white text-gray-900" : "bg-transparent text-white"
          }`}>
            <HorizontalCarousel
              projects={featuredProjects}
              title="Featured Projects"
            />
          </div>
      </section>
    </div>
  );
}


