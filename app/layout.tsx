"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Hamburger } from "@/components/ui/hamburger";
import { FiSun, FiMoon, FiGithub, FiLinkedin } from "react-icons/fi";
import { useEffect, useState } from "react";
import Particles from "@/components/Particles";

const GITHUB_URL = "https://github.com/a-smiggle";
const LINKEDIN_URL = "https://www.linkedin.com/in/anthonysmigielski/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dark mode toggle logic
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dark = localStorage.getItem("theme") === "dark";
      document.documentElement.classList.toggle("dark", dark);
      // Set state after DOM update to avoid cascading renders
      setTimeout(() => setIsDark(dark), 0);
    }
  }, []);
  const handleToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };
  const handleMenuToggle = () => setMenuOpen((open) => !open);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar>
          <div className="flex items-center w-full h-16">
            {/* Branding */}
            <div className="flex-none font-bold text-lg px-4 select-none">
              Anthony Smigielski
            </div>
            {/* Desktop Nav */}
            <div className="hidden md:flex flex-1 justify-end">
              <nav className="flex gap-2 items-center">
                <Button asChild variant="ghost" size="sm">
                  <a href="#overview">Overview</a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="#skills">Skills</a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="#education-certs">Education/Certs</a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="#job-timeline">Job Timeline</a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="#job-details">Job Details</a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="#portfolio">Portfolio</a>
                </Button>
                <a
                  href={GITHUB_URL}
                  aria-label="Open GitHub profile"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent hover:bg-accent text-foreground dark:text-foreground"
                >
                  <FiGithub size={22} />
                </a>
                <a
                  href={LINKEDIN_URL}
                  aria-label="Open LinkedIn profile"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent hover:bg-accent text-foreground dark:text-foreground"
                >
                  <FiLinkedin size={22} />
                </a>
                <IconButton
                  aria-label="Toggle dark mode"
                  icon={isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
                  onClick={handleToggle}
                />
              </nav>
            </div>
            {/* Mobile Nav */}
            <div className="flex md:hidden flex-1 justify-end items-center gap-2">
              <a
                href={GITHUB_URL}
                aria-label="Open GitHub profile"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent hover:bg-accent text-foreground dark:text-foreground"
              >
                <FiGithub size={22} />
              </a>
              <a
                href={LINKEDIN_URL}
                aria-label="Open LinkedIn profile"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent hover:bg-accent text-foreground dark:text-foreground"
              >
                <FiLinkedin size={22} />
              </a>
              <IconButton
                aria-label="Toggle dark mode"
                icon={isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
                onClick={handleToggle}
              />
              <Hamburger open={menuOpen} onClick={handleMenuToggle} />
            </div>
          </div>
          {/* Mobile Menu Overlay */}
          {menuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 md:hidden"
              onClick={handleMenuToggle}
            />
          )}
          <div
            className={
              menuOpen
                ? "fixed top-16 left-0 right-0 z-50 bg-background border-b border-border flex flex-col items-center gap-2 py-4 md:hidden animate-in fade-in slide-in-from-top-4"
                : "hidden"
            }
          >
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-11/12"
              onClick={handleMenuToggle}
            >
              <a href="#overview">Overview</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-11/12"
              onClick={handleMenuToggle}
            >
              <a href="#skills">Skills</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-11/12"
              onClick={handleMenuToggle}
            >
              <a href="#education-certs">Education/Certs</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-11/12"
              onClick={handleMenuToggle}
            >
              <a href="#job-timeline">Job Timeline</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-11/12"
              onClick={handleMenuToggle}
            >
              <a href="#job-details">Job Details</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-11/12"
              onClick={handleMenuToggle}
            >
              <a href="#portfolio">Portfolio</a>
            </Button>
          </div>
        </Navbar>
        {children}
        <Particles
          key={isDark ? "dark" : "light"}
          useThemeColors
          particleCount={1000}
          particleSpread={50}
          speed={0.1}
          particleBaseSize={400}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </body>
    </html>
  );
}
