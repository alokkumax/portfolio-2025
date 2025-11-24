"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import { NavItem } from "@/types";

const navItems: NavItem[] = [
  {
    label: "ABOUT",
    href: "/about",
  },
  {
    label: "PROJECTS",
    href: "/projects",
  },
  {
    label: "RESUME",
    href: "/resume",
  },
  {
    label: "AWARDS",
    dropdown: [
      {
        label: "Smart India Hackathon 2022 — Winner",
        href: "/projects/adip-scheme-system",
        description: "ADIP Scheme System for Government of India",
      },
      {
        label: "UNESCO India–Africa Hackathon 2022 — Runner-Up",
        href: "/projects/soil-health-analysis",
        description: "Soil Health Analysis App",
      },
      {
        label: "Decov 2020 — Finalist",
        href: "/projects/decov-app",
        description: "Personalized Diet & COVID Care App",
      },
    ],
  },
  {
    label: "MORE",
    dropdown: [
      {
        label: "Blog",
        href: "/blog",
        description: "Latest articles and insights",
      },
      {
        label: "Resources",
        href: "/resources",
        description: "Tools and resources",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Get in touch",
      },
    ],
  },
  {
    label: "SOCIALS",
    dropdown: [
      {
        label: "Twitter",
        href: "https://twitter.com/kumax",
        description: "Follow us on Twitter",
      },
      {
        label: "GitHub",
        href: "https://github.com/kumax",
        description: "Check out our code",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/company/kumax",
        description: "Connect on LinkedIn",
      },
      {
        label: "Instagram",
        href: "https://instagram.com/kumax",
        description: "See our work",
      },
    ],
  },
  {
    label: "CONTACT",
    href: "/contact",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-20 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-10 w-auto"
            >
              <Image
                src="/images/logo.png"
                alt="Kumax Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.dropdown ? (
                  <DropdownMenu label={item.label} items={item.dropdown} />
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`text-white font-semibold uppercase text-sm px-3 py-1.5 rounded-full transition-all hover:bg-white hover:text-black ${
                      pathname === item.href ? "bg-white text-black" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Connect Button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-semibold uppercase text-sm px-3 py-1.5 rounded-full transition-all hover:bg-white hover:text-black"
            >
              CONNECT
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-brand-dark border-t border-brand-light/20"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`block font-semibold uppercase text-sm px-3 py-2 rounded-full transition-colors ${
                      pathname === item.href
                        ? "bg-white text-black"
                        : "text-white hover:text-brand-red"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="flex items-center justify-between w-full text-white font-semibold uppercase text-sm py-2 hover:text-brand-red transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === index && item.dropdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 pl-4"
                      >
                        {item.dropdown.map((dropdownItem, idx) => (
                          <Link
                            key={idx}
                            href={dropdownItem.href}
                            className="block text-gray-400 text-sm py-1 hover:text-brand-red transition-colors"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <button className="w-full text-white font-semibold uppercase text-sm py-2 hover:text-brand-red transition-colors mt-4">
              CONNECT
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

