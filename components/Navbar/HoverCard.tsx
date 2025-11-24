"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DropdownItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface HoverCardProps {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function HoverCard({ items, isOpen, onClose }: HoverCardProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-96 bg-brand-gray border border-brand-light rounded-lg shadow-2xl z-50 p-4"
          onMouseLeave={onClose}
        >
          <div className="grid grid-cols-1 gap-3">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-brand-light transition-colors"
              >
                {item.image && (
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm mb-1 group-hover:text-brand-red transition-colors">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="text-gray-400 text-xs line-clamp-2">
                      {item.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


