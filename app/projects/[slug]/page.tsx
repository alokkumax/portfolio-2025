"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import HorizontalCarousel from "@/components/Projects/HorizontalCarousel";
import MediaGallery from "@/components/Projects/MediaGallery";
import { formatDate } from "@/lib/utils";
import { allProjects } from "@/lib/projects";
import { MediaItem } from "@/types";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dynamicMedia, setDynamicMedia] = useState<MediaItem[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(true);

  const project = allProjects.find((p) => p.slug === slug);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const previousProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const relatedProjects = allProjects
    .filter((p) => {
      // Exclude current project
      if (p.slug === project?.slug) return false;
      
      // Show projects from same category
      if (p.category === project?.category) return true;
      
      // Show related ADIP projects (if viewing ADIP UI/UX, show ADIP web dev and vice versa)
      if (project?.slug.includes("adip") && p.slug.includes("adip")) return true;
      
      return false;
    })
    .slice(0, 4);

  // Load media dynamically from API
  useEffect(() => {
    if (!project) return;

    const loadMedia = async () => {
      try {
        const response = await fetch(`/api/projects/${slug}/media`);
        const data = await response.json();
        if (data.media && data.media.length > 0) {
          setDynamicMedia(data.media);
        } else {
          // Fallback to static media or thumbnail
          const fallbackMedia = project.media || 
            (project.images 
              ? project.images.map(img => ({ type: "image" as const, url: img }))
              : [{ type: "image" as const, url: project.image }]);
          setDynamicMedia(fallbackMedia);
        }
      } catch (error) {
        console.error("Error loading media:", error);
        // Fallback to static media
        const fallbackMedia = project.media || 
          (project.images 
            ? project.images.map(img => ({ type: "image" as const, url: img }))
            : [{ type: "image" as const, url: project.image }]);
        setDynamicMedia(fallbackMedia);
      } finally {
        setIsLoadingMedia(false);
      }
    };

    loadMedia();
  }, [slug, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push("/projects")}
            className="text-brand-red hover:text-red-600"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Use dynamic media if available, otherwise fallback
  const media = dynamicMedia.length > 0 ? dynamicMedia : 
    (project.media || 
      (project.images 
        ? project.images.map(img => ({ type: "image" as const, url: img }))
        : [{ type: "image" as const, url: project.image }]));

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/projects")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </motion.button>
      </div>

      {/* Hero Image/Video */}
      <div className="relative w-full h-[60vh] mb-12">
        {media[0]?.type === "video" ? (
          <video
            src={media[0].url}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-400 uppercase">
              {project.category.replace("-", " ")}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400">
              {formatDate(project.date)}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {project.title}
          </h1>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-red hover:text-red-600 transition-colors"
            >
              <span>View Live Project</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert max-w-none mb-12"
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-brand-gray border border-brand-light/20 rounded-lg text-gray-300 text-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Media Gallery */}
        {media.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 uppercase">
              Media Gallery
            </h2>
            <MediaGallery media={media} thumbnail={project.image} />
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-brand-light/20">
          {previousProject ? (
            <button
              onClick={() => router.push(`/projects/${previousProject.slug}`)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs uppercase">Previous</div>
                <div className="font-semibold">{previousProject.title}</div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextProject && (
            <button
              onClick={() => router.push(`/projects/${nextProject.slug}`)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="text-right">
                <div className="text-xs uppercase">Next</div>
                <div className="font-semibold">{nextProject.title}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8 uppercase">
              Related Projects
            </h2>
            <HorizontalCarousel projects={relatedProjects} />
          </div>
        )}
      </div>
    </div>
  );
}


