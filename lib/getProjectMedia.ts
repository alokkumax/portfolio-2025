import { MediaItem } from "@/types";
import fs from "fs";
import path from "path";

/**
 * Dynamically loads images from a project folder
 * @param projectSlug - The slug of the project (e.g., "zensu-ecommerce")
 * @returns Array of MediaItem objects
 */
export function getProjectMedia(projectSlug: string): MediaItem[] {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");
    const files = fs.readdirSync(imagesDir);
    
    // Filter files that match the project pattern (e.g., zensu-*.png, zensu-*.jpg)
    const projectImages = files
      .filter((file) => {
        const nameWithoutExt = path.parse(file).name;
        // Match patterns like: projectname-1.png, projectname-2.jpg, etc.
        return nameWithoutExt.startsWith(projectSlug.split("-")[0] + "-") && 
               /\.(png|jpg|jpeg|webp)$/i.test(file);
      })
      .sort((a, b) => {
        // Sort by number in filename (zensu-1.png, zensu-2.png, etc.)
        const numA = parseInt(a.match(/\d+/)?.[0] || "0");
        const numB = parseInt(b.match(/\d+/)?.[0] || "0");
        return numA - numB;
      })
      .map((file) => ({
        type: "image" as const,
        url: `/images/${file}`,
      }));

    return projectImages;
  } catch (error) {
    console.error(`Error loading media for ${projectSlug}:`, error);
    return [];
  }
}

/**
 * Gets the thumbnail image for a project
 * @param projectSlug - The slug of the project
 * @returns Thumbnail image path or default
 */
export function getProjectThumbnail(projectSlug: string): string {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");
    const files = fs.readdirSync(imagesDir);
    
    // Look for thumbnail patterns: projectname.jpg, projectname-thumb.jpg, projectname-ecommerce.jpg
    const thumbnailPatterns = [
      `${projectSlug}.jpg`,
      `${projectSlug}.png`,
      `${projectSlug.split("-")[0]}-ecommerce.jpg`,
      `${projectSlug.split("-")[0]}-ecommerce.png`,
    ];

    for (const pattern of thumbnailPatterns) {
      if (files.includes(pattern)) {
        return `/images/${pattern}`;
      }
    }

    // Fallback: use first image if available
    const projectImages = files.filter((file) =>
      file.startsWith(projectSlug.split("-")[0] + "-")
    );
    if (projectImages.length > 0) {
      return `/images/${projectImages[0]}`;
    }

    return "/images/placeholder.jpg";
  } catch (error) {
    console.error(`Error loading thumbnail for ${projectSlug}:`, error);
    return "/images/placeholder.jpg";
  }
}

