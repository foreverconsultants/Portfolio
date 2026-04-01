"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg
              width="32"
              height="18"
              viewBox="0 0 100 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Forever Consultants Logo"
            >
              <defs>
                <linearGradient id="nav-logo" x1="0" y1="0" x2="100" y2="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#93C5FD" />
                </linearGradient>
              </defs>
              <path
                d="M50 25 C50 10, 30 2, 18 10 C6 18, 6 32, 18 40 C30 48, 50 40, 50 25 C50 10, 70 2, 82 10 C94 18, 94 32, 82 40 C70 48, 50 40, 50 25Z"
                stroke="url(#nav-logo)"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="font-semibold text-lg tracking-tight text-zinc-800 group-hover:text-black transition-colors">
              Forever Consultants
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-8 mr-2">
              <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-[#3B82F6] transition-colors">
                About
              </Link>
              <Link href="/services/lic" className="text-sm font-medium text-zinc-600 hover:text-[#3B82F6] transition-colors">
                Insurance
              </Link>
              <Link href="/services/mutual-funds" className="text-sm font-medium text-zinc-600 hover:text-[#3B82F6] transition-colors">
                Investments
              </Link>
              <Link href="/services/health" className="text-sm font-medium text-zinc-600 hover:text-[#3B82F6] transition-colors">
                Health
              </Link>
            </div>

            {/* Email Icon Button */}
            <Link 
              href="/contact" 
              className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-50 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all shadow-sm border border-blue-100"
              aria-label="Email Us"
              title="Email Us"
            >
              <Mail className="w-4 h-4" />
            </Link>

            <a
              href="#book"
              className="hidden md:flex items-center justify-center text-sm font-semibold px-5 py-2 rounded-full text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-colors shadow-lg shadow-[#3B82F6]/25"
            >
              Get Started
            </a>

            <button 
              className="md:hidden flex items-center justify-center w-9 h-9 text-zinc-600 hover:text-zinc-900 transition-colors" 
              aria-label="Menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-black/5 transition-all duration-300 origin-top ${
          isOpen ? 'opacity-100 scale-y-100 py-6' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col px-6 gap-2">
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-zinc-700 font-medium py-3 border-b border-black/5 text-lg">
            About
          </Link>
          <Link href="/services/lic" onClick={() => setIsOpen(false)} className="text-zinc-700 font-medium py-3 border-b border-black/5 text-lg">
            Insurance
          </Link>
          <Link href="/services/mutual-funds" onClick={() => setIsOpen(false)} className="text-zinc-700 font-medium py-3 border-b border-black/5 text-lg">
            Investments
          </Link>
          <Link href="/services/health" onClick={() => setIsOpen(false)} className="text-zinc-700 font-medium py-3 border-b border-black/5 text-lg">
            Health
          </Link>
          <a
            href="#book"
            onClick={() => setIsOpen(false)}
            className="text-center font-semibold px-5 py-3.5 rounded-full text-white bg-[#3B82F6] shadow-lg mt-4"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
