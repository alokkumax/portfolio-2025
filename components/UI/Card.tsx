"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8 } : undefined}
      className={cn(
        "bg-brand-gray border border-brand-light/20 rounded-lg overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
}


