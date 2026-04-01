"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, TrendingUp, Shield, ArrowRight, HeartPulse, PieChart } from 'lucide-react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const nitinRef = useRef<HTMLDivElement>(null);
  const sujataRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mainRef.current) return;

    // Hero section animation
    if (heroRef.current) {
      const heroElements = heroRef.current.children;
      gsap.set(heroElements, { opacity: 1, y: 0 });
      
      gsap.from(heroElements, {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Nitin Gandhi section
    if (nitinRef.current) {
      gsap.set(nitinRef.current.children, { opacity: 1, x: 0 });
      
      gsap.from(nitinRef.current.children, {
        scrollTrigger: {
          trigger: nitinRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -80,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    }

    // Sujata Gandhi section
    if (sujataRef.current) {
      gsap.set(sujataRef.current.children, { opacity: 1, x: 0 });
      
      gsap.from(sujataRef.current.children, {
        scrollTrigger: {
          trigger: sujataRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 80,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    }

    // CTA section
    if (ctaRef.current) {
      gsap.set(ctaRef.current.children, { opacity: 1, y: 0, scale: 1 });
      
      gsap.from(ctaRef.current.children, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      });
    }
  }, { scope: mainRef, dependencies: [] });

  return (
    <main ref={mainRef} className="min-h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-[#EFF6FF] to-transparent pointer-events-none" />
      <div className="fixed -top-[20%] -right-[10%] w-[60%] h-[70%] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation Header */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 pt-10 pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#3B82F6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-32">
        
        {/* INTRO HERO */}
        <div ref={heroRef} className="max-w-4xl mx-auto text-center mb-32">
          <span className="inline-block py-2 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
            About Our Firm
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight leading-[1.1] mb-8">
            The Architects of Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
              Financial Destiny
            </span>
          </h1>
          <p className="text-xl text-zinc-600 leading-relaxed font-light max-w-3xl mx-auto">
            Founded on the pillars of absolute integrity and unparalleled market expertise, Forever Consultants brings over 45 combined years of deep experience to precisely secure, seamlessly manage, and aggressively multiply your family's wealth.
          </p>
        </div>

        {/* NITIN GANDHI SECTION */}
        <div ref={nitinRef} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          {/* Image Side */}
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] translate-x-4 translate-y-4 opacity-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white aspect-[4/5] bg-zinc-100">
              <img 
                src="https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775031318/Untitled_design_24_ze2wqv.png" 
                alt="Nitin Gandhi - Senior Financial Strategist" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 origin-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute bottom-10 -left-6 md:-left-12 bg-white/95 backdrop-blur-md px-6 py-5 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-white flex items-center gap-4 hover:-translate-y-2 transition-transform duration-300 z-20">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black text-zinc-900 leading-none mb-1">25+</p>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 leading-none">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-zinc-900 mb-3 tracking-tight">Nitin Gandhi</h2>
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#3B82F6] mb-8">Senior Financial Strategist</p>
            
            <div className="prose prose-lg text-zinc-600 mb-12 leading-relaxed font-light">
              <p>
                Nitin is the analytical powerhouse driving Forever Consultants' wealth generation strategies. With an elite tenure spanning over two and a half decades in the volatile financial markets, his encyclopedic knowledge of market cycles translates directly into highly resilient, aggressive-growth portfolios for our clients.
              </p>
              <p>
                He specializes in the intricate mechanics of sophisticated mutual fund allocations, dynamic portfolio rebalancing under pressure, and systemic long-term capital compounding. Nitin firmly believes that wealth creation is a highly disciplined science, perfectly matching your unique risk appetite with outperforming equity opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-zinc-800 tracking-wide">Wealth Compounding</span>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center shrink-0">
                  <PieChart className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-zinc-800 tracking-wide">Asset Allocation</span>
              </div>
            </div>
          </div>
        </div>

        {/* SUJATA GANDHI SECTION */}
        <div ref={sujataRef} className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24 mb-32">
          {/* Image Side */}
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] -translate-x-4 translate-y-4 opacity-10 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white aspect-[4/5] bg-zinc-100">
              <img 
                src="https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775031318/Untitled_design_23_w0hgi5.png" 
                alt="Sujata Gandhi - Principal Life & Health Advisor" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 origin-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute bottom-10 -right-6 md:-right-12 bg-white/95 backdrop-blur-md px-6 py-5 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-white flex items-center flex-row-reverse gap-4 hover:-translate-y-2 transition-transform duration-300 z-20 text-right">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black text-zinc-900 leading-none mb-1">20+</p>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 leading-none">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center text-left lg:text-right">
            <h2 className="text-4xl md:text-6xl font-extrabold text-zinc-900 mb-3 tracking-tight">Sujata Gandhi</h2>
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-emerald-500 mb-8">Principal Life & Health Advisor</p>
            
            <div className="prose prose-lg text-zinc-600 mb-12 leading-relaxed font-light ml-auto">
              <p>
                Sujata represents the immensely dedicated, protective cornerstone of Forever Consultants. For over two uninterrupted decades, she has devoted her career to helping thousands of families build concrete financial moats against completely unforeseen medical and life emergencies.
              </p>
              <p>
                She offers highly strategic and deeply empathetic guidance regarding overarching life cover, expansive mediclaim premium networks, and extremely strict risk-mitigation management protocols. Sujata's defining philosophy is absolute certainty: your life's savings should never experience derailment due to an unpredictable health or life event.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center lg:flex-row-reverse gap-4 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-zinc-800 tracking-wide text-left lg:text-right">Risk Mitigation</span>
              </div>
              <div className="flex items-center lg:flex-row-reverse gap-4 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-zinc-800 tracking-wide text-left lg:text-right">Family Protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div ref={ctaRef} className="bg-[#0B0F19] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[200%] bg-gradient-to-r from-blue-600/30 to-emerald-500/30 blur-[120px] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10 tracking-tight">
            Ready to secure your legacy?
          </h2>
          <p className="text-zinc-300 text-lg mb-12 max-w-2xl mx-auto relative z-10 font-light leading-relaxed">
            Book a dedicated consultation directly with our founders today to construct your aggressively optimized and fully protected personal financial roadmap.
          </p>
          <Link
            href="https://cal.com/forever-consultants/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0B0F19] rounded-full font-extrabold text-lg hover:scale-105 hover:bg-zinc-50 transition-all relative z-10 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Schedule Appointment 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </main>
  );
}
