import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const projectPrefix = slug.split("-")[0]; // e.g., "zensu" from "zensu-ecommerce"
    
    const imagesDir = path.join(process.cwd(), "public", "images");
    
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ media: [] });
    }

    const files = fs.readdirSync(imagesDir);
    
    // Filter files that match the project pattern
    const projectImages = files
      .filter((file) => {
        const nameWithoutExt = path.parse(file).name;
        // Match patterns like: projectname-1.png, projectname-2.jpg, etc.
        // Also match files starting with slug (e.g., "danger-ahead-1.png")
        // Exclude thumbnail files from gallery
        const matchesPattern = 
          nameWithoutExt.startsWith(slug + "-") ||
          nameWithoutExt.startsWith(projectPrefix + "-") ||
          nameWithoutExt === `${projectPrefix}-ecommerce` ||
          nameWithoutExt === slug;
        
        const isImage = /\.(png|jpg|jpeg|webp)$/i.test(file);
        const isThumbnail = nameWithoutExt.includes("thumbnail");
        
        return matchesPattern && isImage && !isThumbnail;
      })
      .sort((a, b) => {
        // Sort by number in filename (projectname-1.png, projectname-2.png, etc.)
        const numA = parseInt(a.match(/\d+/)?.[0] || "999");
        const numB = parseInt(b.match(/\d+/)?.[0] || "999");
        return numA - numB;
      })
      .map((file) => ({
        type: "image" as const,
        url: `/images/${file}`,
      }));

    return NextResponse.json({ media: projectImages });
  } catch (error) {
    console.error("Error loading project media:", error);
    return NextResponse.json({ media: [] }, { status: 500 });
  }
}

