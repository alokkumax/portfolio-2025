"use client";

import { motion } from "framer-motion";
import { Search, Grid, List, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ProjectCategory } from "@/types";

const categories: { value: ProjectCategory; label: string; count?: number }[] = [
  { value: "all", label: "All Projects" },
  { value: "web-development", label: "Web Development" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "other", label: "Other" },
];

export default function FilterSidebar() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
  } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-brand-gray border border-brand-light/20 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-red transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2 p-1 bg-brand-gray rounded-lg border border-brand-light/20">
        <button
          onClick={() => setViewMode("grid")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded transition-colors ${
            viewMode === "grid"
              ? "bg-brand-red text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Grid className="w-4 h-4" />
          <span className="text-sm font-semibold">Grid</span>
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded transition-colors ${
            viewMode === "list"
              ? "bg-brand-red text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <List className="w-4 h-4" />
          <span className="text-sm font-semibold">List</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-white font-semibold uppercase text-sm mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.value
                  ? "bg-brand-red text-white"
                  : "bg-brand-gray text-gray-400 hover:bg-brand-light hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category.label}</span>
                {category.count !== undefined && (
                  <span className="text-xs opacity-75">
                    {category.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}


