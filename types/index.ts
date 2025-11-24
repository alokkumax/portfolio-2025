export interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string; // Thumbnail image
  images?: string[]; // Legacy support
  video?: string; // Legacy support
  media?: MediaItem[]; // New media array (images and videos)
  tags: string[];
  date: string;
  featured?: boolean;
  link?: string;
}

export type ProjectCategory =
  | "all"
  | "web-development"
  | "ui-ux-design"
  | "mobile-apps"
  | "other";

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  image?: string;
}


