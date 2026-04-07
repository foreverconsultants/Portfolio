"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneWrapper from "@/components/SceneWrapper";
import Link from "next/link";
import { servicesData as sections } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

// Data migrated to @/data/services

export default function ScrollSections() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".service-card-wrapper") as HTMLElement[];
    if (cards.length === 0) return;

    // Set initial states: first card visible, rest off-screen right
    gsap.set(cards.slice(1), { xPercent: 100, autoAlpha: 0 });
    gsap.set(cards[0], { xPercent: 0, autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Two transitions (100vh each) to equal 300vh total height
        pin: true,
        scrub: 1, // Smooth scrolling
      },
    });

    // Card transitions
    // Animate Card 0 out while Card 1 slides in
    if (cards[1]) {
      tl.to(cards[0], { xPercent: -20, autoAlpha: 0, duration: 1 }, 0);
      tl.to(cards[1], { xPercent: 0, autoAlpha: 1, duration: 1 }, 0);
    }
    // Animate Card 1 out while Card 2 slides in
    if (cards[2]) {
      tl.to(cards[1], { xPercent: -20, autoAlpha: 0, duration: 1 }, 1);
      tl.to(cards[2], { xPercent: 0, autoAlpha: 1, duration: 1 }, 1);
    }
  }, { scope: containerRef });

  // Fix for Next.js hash link navigation (e.g., /#book) 
  // Wait for GSAP pin spacers to be injected into the DOM before calculating scroll offset
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        const el = document.querySelector(hash) as HTMLElement;
        if (el) {
          // Precise relative scroll
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 500); // Wait for page to fully paint and GSAP pin spacers to inject
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Compute completely deterministic active section boundaries
      // using exact mathematical midpoints to prevent GSAP trigger edge cases
      if (scrollY < vh * 0.5) {
        setActiveSection(0);
      } else if (scrollY < vh * 1.5) {
        setActiveSection(1);
      } else if (scrollY < vh * 2.5) {
        setActiveSection(2);
      } else if (scrollY < vh * 3.5) {
        setActiveSection(3);
      } else {
        // User scrolled past the pinned service cards
        setActiveSection(-1);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* 3D Particle Background - Using absolute wrapper with sticky child to eliminate -mt-[100vh] CLS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <SceneWrapper />
        </div>
      </div>

      <div className="relative z-10 w-full">
        {/* Glow blobs cleanly isolated to prevent x-overflow on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-none w-full">
          <div className="blob-blue" style={{ top: "10%", right: "-5%" }} />
          <div className="blob-dark" style={{ top: "40%", left: "-8%" }} />
          <div className="blob-blue" style={{ top: "75%", right: "10%" }} />
        </div>

        {/* Absolute anchor targets modeled securely in inline styles to bypass tailwind JIT caching */}
        <div id="lic" className="absolute w-full h-10 -mt-10" style={{ top: "100vh" }} />
        <div id="mutual-funds" className="absolute w-full h-10 -mt-10" style={{ top: "200vh" }} />
        <div id="health" className="absolute w-full h-10 -mt-10" style={{ top: "300vh" }} />

      {/* Side nav dots */}
      <div 
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 transition-opacity duration-300 ${
          activeSection === -1 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              // Smooth scroll natively for side-nav
              e.preventDefault();
              window.scrollTo({
                top: i * window.innerHeight,
                behavior: "smooth",
              });
            }}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
                activeSection === i ? "!opacity-70" : ""
              } text-zinc-500`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === i
                  ? "w-3 h-3 bg-[#3B82F6] shadow-md shadow-[#3B82F6]/40 ring-2 ring-[#3B82F6]/20"
                  : "w-2 h-2 glass-sm"
              }`}
            />
          </a>
        ))}
      </div>

      {/* --- HERO SECTION --- */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-6 relative"
      >
        <div className="text-center z-10 max-w-2xl mx-auto relative">
          {/* Subtle white halo behind text to mask flying particles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] bg-white/80 blur-3xl rounded-full -z-10 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-sm text-xs font-medium text-zinc-600 mb-8 drop-shadow-[0_0_12px_rgba(255,255,255,1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse shadow-sm shadow-[#3B82F6]/50" />
            Total Investment Solutions
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,1)]">
            <span className="text-zinc-900">Securing Your</span>
            <br />
            <span className="gradient-text-accent">Future, Forever.</span>
          </h1>

          <p className="text-lg text-zinc-600 max-w-md mx-auto mb-10 leading-relaxed drop-shadow-[0_0_16px_rgba(255,255,255,1)]">
            Comprehensive wealth protection and growth strategies tailored to
            your lifelong goals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#lic"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium rounded-full text-white overflow-hidden transition-all hover:scale-[1.02]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] blur-xl opacity-40 group-hover:opacity-60 transition-opacity rounded-full" />
              <span className="relative font-semibold">Explore Our Services</span>
            </a>
            <a
              href="https://cal.com/forever-consultants/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium glass-cta text-[#3B82F6] transition-all hover:scale-[1.02] hover:text-[#2563EB]"
            >
              Book a Consultation
            </a>
          </div>

          <p className="mt-16 text-xs text-zinc-600 tracking-widest uppercase">
            Scroll to explore ↓
          </p>
        </div>
      </section>

      {/* --- SERVICE SECTIONS CONTAINER --- */}
      <div ref={containerRef} className="h-[100svh] w-full relative">
        <div className="absolute inset-0 flex items-center px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center h-full relative">
            <div className="md:col-start-2 relative w-full min-h-[450px] md:h-[600px] flex items-center pt-32 md:pt-0">
              {sections.slice(1).map((section, idx) => (
                <div
                  key={section.id}
                  className="service-card-wrapper absolute w-full"
                  style={{ zIndex: 10 + idx }}
                >
                  <div className="glass-card relative p-6 sm:p-8 md:p-10 shadow-2xl">
                    {/* Side Navigation Buttons */}
                    {idx > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.scrollTo({ top: idx * window.innerHeight, behavior: "smooth" });
                        }}
                        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full glass-cta flex items-center justify-center text-[#3B82F6] hover:text-[#2563EB] hover:scale-110 border border-[#3B82F6]/20 shadow-xl transition-all z-50"
                        title="Previous Service"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    
                    {idx < sections.slice(1).length - 1 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.scrollTo({ top: (idx + 2) * window.innerHeight, behavior: "smooth" });
                        }}
                        className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full glass-cta flex items-center justify-center text-[#3B82F6] hover:text-[#2563EB] hover:scale-110 border border-[#3B82F6]/20 shadow-xl transition-all z-50"
                        title="Next Service"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}

                    <Link href={`/services/${section.id}`} className="block group mb-2" aria-label={`View details for ${section.title}`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 glass-icon flex items-center justify-center text-[#60A5FA]">
                            {section.icon}
                          </span>
                          <span className="text-xs font-medium tracking-wider uppercase text-zinc-500">
                            {section.subtitle}
                          </span>
                        </div>
                        <span className="flex items-center text-[#3B82F6] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-semibold text-sm mr-2">
                          View details <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-3 group-hover:text-[#3B82F6] transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-zinc-600 leading-relaxed mb-8 text-sm group-hover:text-zinc-800 transition-colors">
                        {section.description}
                      </p>

                      {section.features && (
                        <ul className="space-y-3 mb-4">
                          {section.features.map((f, i) => (
                            <li
                              key={i}
                              className="flex items-center text-sm text-zinc-700 glass-feature group-hover:bg-blue-50/50 transition-colors"
                            >
                              <Check className="w-4 h-4 mr-3 shrink-0 text-[#3B82F6]" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.partners && (
                        <div>
                          <p className="text-xs font-medium tracking-wider uppercase text-zinc-500 mb-3 group-hover:text-[#3B82F6] transition-colors">
                            Premium Partners
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {section.partners.map((p, i) => (
                              <span
                                key={i}
                                className="text-xs px-4 py-2 glass-sm text-zinc-700 font-medium group-hover:border-blue-200 transition-colors"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.note && (
                        <p className="mt-4 text-xs text-amber-500 flex items-center gap-1.5 group-hover:text-amber-600 transition-colors">
                          <span className="w-1 h-1 rounded-full bg-amber-400 group-hover:bg-amber-500" />
                          {section.note}
                        </p>
                      )}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
