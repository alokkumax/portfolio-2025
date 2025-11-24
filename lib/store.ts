import { create } from "zustand";
import { ProjectCategory } from "@/types";

interface AppState {
  // Music state
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  isShuffle: boolean;
  tracks: Array<{ id: string; title: string; url: string }>;
  
  // Project filter state
  selectedCategory: ProjectCategory;
  searchQuery: string;
  viewMode: "grid" | "list";
  sortBy: "date" | "name" | "category";

  // Actions
  setCurrentTrack: (index: number) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setSelectedCategory: (category: ProjectCategory) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setSortBy: (sort: "date" | "name" | "category") => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 0.7,
  isShuffle: false,
  tracks: [
    { id: "1", title: "9mm (WADADADANG)", url: "/audio/track1.mp3" },
    { id: "3", title: "Wrath", url: "/audio/track3.mp3" },
  ],
  
  selectedCategory: "all",
  searchQuery: "",
  viewMode: "grid",
  sortBy: "date",

  // Actions
  setCurrentTrack: (index) => set({ currentTrackIndex: index }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  nextTrack: () => {
    const { currentTrackIndex, tracks, isShuffle } = get();
    if (tracks.length === 0) return;
    
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      set({ currentTrackIndex: randomIndex });
    } else {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      set({ currentTrackIndex: nextIndex });
    }
  },
  previousTrack: () => {
    const { currentTrackIndex, tracks, isShuffle } = get();
    if (tracks.length === 0) return;
    
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      set({ currentTrackIndex: randomIndex });
    } else {
      const prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
      set({ currentTrackIndex: prevIndex });
    }
  },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSortBy: (sort) => set({ sortBy: sort }),
}));


