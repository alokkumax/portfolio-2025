"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
}: ButtonProps) {
  const baseStyles = "font-semibold uppercase transition-all inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-brand-red text-white hover:bg-red-600",
    secondary: "bg-brand-gray text-white hover:bg-brand-light border border-brand-light/20",
    outline: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-dark",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className, "inline-block")}
      >
        {children}
      </motion.a>
    );
  }

  return buttonContent;
}


