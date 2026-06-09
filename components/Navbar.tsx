"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";

const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    label: "About",
    href: "/about",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "Experience",
    href: "/experience",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-black shadow-sm backdrop-blur-md"
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-green-400 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ originX: 0.5 }}
        />
        <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            MH
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <motion.li
                  key={link.href}
                  className="relative"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ${
                      active
                        ? "bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    <motion.span
                      className={active ? "text-green-500" : "text-white"}
                      variants={{
                        rest: { y: 0, scale: 1, rotate: 0 },
                        hover: { y: -3, scale: 1.2, rotate: -5 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    >
                      {link.icon}
                    </motion.span>
                    {link.label}
                  </Link>
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-green-400 to-green-300" />
                  )}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-green-400 to-green-300"
                    variants={{
                      rest: { scaleX: 0, opacity: 0 },
                      hover: { scaleX: 1, opacity: 1 },
                    }}
                    style={{ originX: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                </motion.li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-black shadow-2xl flex flex-col md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-gray-800">
                <span className="text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                  MH
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-4 pt-6">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25, ease: "easeOut" }}
                    >
                      <motion.div className="relative" initial="rest" whileHover="hover" animate="rest">
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                            active ? "bg-green-500/10 text-green-400" : "text-gray-300 hover:text-white"
                          }`}
                        >
                          <motion.span
                            className={active ? "text-green-400" : "text-gray-500"}
                            variants={{
                              rest: { y: 0, scale: 1, rotate: 0 },
                              hover: { y: -3, scale: 1.2, rotate: -5 },
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                          >
                            {link.icon}
                          </motion.span>
                          {link.label}
                          {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />}
                        </Link>
                        <motion.span
                          className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-green-400 to-green-300"
                          variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
                          style={{ originX: 0.5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        />
                        {active && (
                          <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-green-400 to-green-300" />
                        )}
                      </motion.div>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
