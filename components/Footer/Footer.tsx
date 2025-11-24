"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  explore: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "Twitter", href: "https://twitter.com/kumax" },
    { label: "GitHub", href: "https://github.com/kumax" },
    { label: "LinkedIn", href: "https://linkedin.com/company/kumax" },
    { label: "Instagram", href: "https://instagram.com/kumax" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-brand-light/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-brand-red px-4 py-2 rounded-lg mb-4"
            >
              <span className="text-white font-bold text-xl uppercase tracking-wide">
                KUMAX
              </span>
            </motion.div>
            <p className="text-gray-400 text-sm">
              Building modern digital experiences at the intersection of art,
              technology, and innovation.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold uppercase text-sm mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-brand-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold uppercase text-sm mb-4">
              Social
            </h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-brand-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold uppercase text-sm mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with our latest projects and insights.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="w-full bg-brand-gray border border-brand-light rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-brand-red text-white font-semibold uppercase text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-light/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Kumax. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-brand-red transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

