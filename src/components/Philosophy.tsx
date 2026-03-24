"use client";

import React, { useRef } from "react";
import { Layers, Activity, Target, Trophy } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const concepts = [
    {
      icon: <Layers className="w-6 h-6 text-[#3B82F6]" />,
      title: "The Plan Burger",
      subtitle: "Layered Financial Stability",
      description:
        "Just like a burger, a sound financial plan has essential layers. The solid base represents emergency funds and basic security. The thick core is your robust insurance and protection block. The flavorful top layers are your high-growth investments and wealth-creation strategies.",
    },
    {
      icon: <Activity className="w-6 h-6 text-[#10B981]" />,
      title: "3 Stages of Life",
      subtitle: "Adapting to Time",
      description:
        "We tailor our strategies dynamically across the Early Earning phase (building capital), the Family & Accumulation phase (protecting and growing wealth), and the Retirement phase (capital conservation and regular income generation).",
    },
    {
      icon: <Target className="w-6 h-6 text-[#F59E0B]" />,
      title: "The 4 'C' Concept",
      subtitle: "Holistic Money Management",
      description:
        "Our advisory revolves around four critical actions: Creation (generating strong income streams), Consumption (intelligent budgeting), Continuation (risk protection through insurance), and Conservation (smart investing and estate planning).",
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#8B5CF6]" />,
      title: "4 Levels of Life Status",
      subtitle: "Elevating Your Destiny",
      description:
        "We guide you up the financial ladder—from Survival (paycheck to paycheck) and Stability (debt-free safety nets), accelerating you towards Success (achieving all life goals), and ultimately culminating in Significance (leaving a wealthy multi-generational legacy).",
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray(".philosophy-card") as HTMLElement[];
    
    // Set initial visibility
    gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    
    // Animate header section
    if (headerRef.current) {
      const headerChildren = Array.from(headerRef.current.children);
      gsap.set(headerChildren, { opacity: 1, y: 0 });
      
      gsap.from(headerChildren, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Animate concept cards
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EFF6FF]/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-widest uppercase text-[#3B82F6] mb-3 block">
            Our Core Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6 tracking-tight">
            How We Explain Wealth
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            We don't use intimidating financial jargon. We use simple, highly effective frameworks that clearly map exactly where you are and where you are going.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {concepts.map((concept, idx) => (
            <div
              key={idx}
              className="philosophy-card bg-[#F9FAFB] rounded-3xl p-8 border border-zinc-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-zinc-100">
                {concept.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-1">
                {concept.title}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
                {concept.subtitle}
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
