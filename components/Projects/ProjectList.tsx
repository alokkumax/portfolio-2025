"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <Link href={`/projects/${project.slug}`}>
            <div className="bg-brand-gray border border-brand-light/20 rounded-lg overflow-hidden hover:border-brand-red/50 transition-colors group">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Image */}
                <div className="relative w-full md:w-64 h-48 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gray-400 uppercase">
                        {project.category.replace("-", " ")}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-xs text-gray-400">
                        {formatDate(project.date)}
                      </span>
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-brand-light/50 text-gray-300 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}


