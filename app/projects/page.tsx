"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import FilterSidebar from "@/components/Projects/FilterSidebar";
import ProjectGrid from "@/components/Projects/ProjectGrid";
import ProjectList from "@/components/Projects/ProjectList";
import { useAppStore } from "@/lib/store";
import { allProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const router = useRouter();
  const { selectedCategory, searchQuery, viewMode } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort by date (newest first) as default
    filtered = [...filtered].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleProjectClick = (slug: string) => {
    setIsLoading(true);
    router.push(`/projects/${slug}`);
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 uppercase">
            All Projects
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our collection of creative projects and digital experiences
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-white text-xl">Loading...</div>
              </div>
            ) : filteredProjects.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {viewMode === "grid" ? (
                  <ProjectGrid projects={filteredProjects} />
                ) : (
                  <ProjectList projects={filteredProjects} />
                )}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl mb-4">
                  No projects found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    useAppStore.getState().setSelectedCategory("all");
                    useAppStore.getState().setSearchQuery("");
                  }}
                  className="text-brand-red hover:text-red-600 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}


