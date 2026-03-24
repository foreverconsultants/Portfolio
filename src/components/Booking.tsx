"use client";

import React, { useRef } from "react";
import { Video, MapPin, PhoneCall, Building2, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  const modes = [
    {
      icon: <Video className="w-6 h-6 text-[#3B82F6]" />,
      title: "Google Meet",
      desc: "Virtual face-to-face consultation from anywhere in the world.",
      action: "Book Video Call",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#10B981]" />,
      title: "Personal Visit",
      desc: "We visit your home or office for a comfortable discussion.",
      action: "Request Visit",
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-[#F59E0B]" />,
      title: "On Call",
      desc: "Quick telephonic advisory for immediate queries and guidance.",
      action: "Schedule Call",
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#8B5CF6]" />,
      title: "On Premises",
      desc: "Visit our dedicated corporate office for an immersive planning session.",
      action: "Get Directions",
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    const cards = gsap.utils.toArray(".booking-card") as HTMLElement[];
    const checklistItems = gsap.utils.toArray(".checklist-item") as HTMLElement[];
    
    // Set initial visibility to ensure cards are visible
    gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    gsap.set(checklistItems, { opacity: 1, x: 0 });
    if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
    if (descRef.current) gsap.set(descRef.current, { opacity: 1, y: 0 });
    
    // Animate heading
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    // Animate description
    if (descRef.current) {
      gsap.from(descRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    }

    // Animate checklist items
    if (checklistItems.length > 0) {
      gsap.from(checklistItems, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.4,
        ease: "power3.out",
      });
    }

    // Animate cards with stagger
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.3,
        ease: "back.out(1.2)",
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="book" className="py-24 bg-[#0B0F19] text-white relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Hero Text */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-zinc-300">Ready to secure your</span>
              <br />
              <span className="gradient-text-accent text-[#3B82F6]">Financial Destiny?</span>
            </h2>
            <p ref={descRef} className="text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We understand that discussing personal finances requires absolute trust and convenience. That's why we offer 4 distinct, highly flexible forms of appointments tailored exactly to your comfort.
            </p>
            
            <div ref={checklistRef} className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-zinc-300 tracking-wider">Zero Obligation</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-zinc-300 tracking-wider">Complete Confidentiality Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-zinc-300 tracking-wider">Tailored to your Schedule</span>
              </div>
            </div>
          </div>

          {/* Right Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-[40px] blur-3xl -z-10" />
            
            {modes.map((mode, idx) => (
              <a
                key={idx}
                href="mailto:contact@foreverconsultants.com"
                className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {mode.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {mode.desc}
                  </p>
                </div>
                
                <div className="mt-auto flex items-center gap-2 text-[#3B82F6] font-semibold text-sm group-hover:text-[#60A5FA] transition-colors">
                  {mode.action}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </a>
            ))}
            
          </div>

        </div>
      </div>
    </section>
  );
}
