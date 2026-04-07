"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Charulata Rane",
    role: "School Trustee",
    content:
      "Forever Consultants completely transformed my understanding of wealth management. Their advice on Mutual Funds and Health Insurance was tailored perfectly to my family's needs.",
    rating: 5,
  },
  {
    id: 2,
    name: "Milind Yashwantrao",
    role: "Chief of Accounts, Dervan Hospital",
    content:
      "I was completely lost when it came to LIC and retirement planning. Their expert guidance provided me with a clear roadmap to secure my future. I cannot recommend them enough.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mahesh Patwardhan",
    role: "Professor",
    content:
      "A highly professional team with deep knowledge of the financial markets. They set up my SIPs smoothly and ensured I got top-tier Mediclaim for complete peace of mind.",
    rating: 5,
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 relative w-full overflow-hidden bg-gradient-to-b from-transparent to-[#EEF2FF]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#93C5FD]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-sm text-xs font-medium text-zinc-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Client Success
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
            Trusted by <span className="gradient-text-accent">Families</span>
          </h2>
          <p className="mt-6 text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            See what our clients have to say about their journey to financial security and peace of mind with Forever Consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="glass-card p-8 flex flex-col relative group transition-transform duration-500 hover:-translate-y-2"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-zinc-200 transition-colors duration-500 group-hover:text-zinc-900/10" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#3B82F6] text-[#3B82F6]" />
                ))}
              </div>
              
              <p className="text-zinc-700 leading-relaxed mb-8 flex-grow text-sm relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] p-[1px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-[#3B82F6] text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
