"use client";

import React, { useRef, useState, useEffect } from "react";
import { Award, TrendingUp, Shield, Users, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const awards = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "LIC Certified Advisors",
      description: "Officially recognized and certified by Life Insurance Corporation of India",
      color: "blue",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "AMFI Registered",
      description: "Association of Mutual Funds in India certified mutual fund distributors",
      color: "emerald",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "5000+ Families Served",
      description: "Trusted by thousands of families across India for their financial security",
      color: "purple",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "₹500Cr+ AUM",
      description: "Managing over 500 crores in assets under management with consistent growth",
      color: "amber",
    },
  ];

  const certifications = [
    "LIC Certified Agent",
    "AMFI Registered Mutual Fund Distributor",
    "IRDA Licensed Insurance Advisor",
    "Certified Financial Planner (CFP)",
  ];

  const galleryImages = [
    {
      url: "https://res.cloudinary.com/dc3o4l7rx/image/upload/v1772952138/characters/characters/character_tulasi_85f24a70.png",
      caption: "Award Ceremony 2024"
    },
    {
      url: "https://res.cloudinary.com/dc3o4l7rx/image/upload/v1772651622/characters/characters/character_school_b7d932bf.png",
      caption: "Financial Excellence Recognition"
    },
    {
      url: "https://res.cloudinary.com/dc3o4l7rx/image/upload/v1772651383/characters/characters/character_ruhi_disney_d6601d92.png",
      caption: "Industry Leadership Award"
    },
    {
      url: "https://res.cloudinary.com/dc3o4l7rx/image/upload/v1771147941/characters/characters/character_shiv_disney_ada2583b.png",
      caption: "Client Service Excellence"
    },
    {
      url: "https://res.cloudinary.com/dc3o4l7rx/image/upload/v1770643601/characters/characters/character_shubham_disney_c5dbde3f.png",
      caption: "Top Performer Recognition"
    },
    {
      url: "https://res.cloudinary.com/dc3o4l7rx/image/upload/v1763703806/Gemini_Generated_Image_b0j7gqb0j7gqb0j7_gbsoey.png",
      caption: "Professional Achievement"
    },
    {
      url: "https://res.cloudinary.com/dc3o4l7rx/image/upload/v1765438342/characters/characters/character_poof_38723776.png",
      caption: "Industry Excellence Award"
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header animation
    if (headerRef.current) {
      const headerElements = headerRef.current.children;
      gsap.set(headerElements, { opacity: 1, y: 0 });
      
      gsap.from(headerElements, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Awards cards animation
    const cards = gsap.utils.toArray(".award-card") as HTMLElement[];
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Gallery animation
    const gallery = document.querySelector(".gallery-container");
    if (gallery) {
      gsap.set(gallery, { opacity: 1, scale: 1 });
      
      gsap.from(gallery, {
        scrollTrigger: {
          trigger: gallery,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Certifications animation
    const certItems = gsap.utils.toArray(".cert-item") as HTMLElement[];
    if (certItems.length > 0) {
      gsap.set(certItems, { opacity: 1, x: 0 });
      
      gsap.from(certItems, {
        scrollTrigger: {
          trigger: ".certifications-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-zinc-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6 border border-blue-100">
            <Star className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-bold tracking-wider uppercase text-[#3B82F6]">
              Awards & Recognition
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6 tracking-tight">
            Trusted by Thousands,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Certified by the Best
            </span>
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            Our commitment to excellence is reflected in our certifications, achievements, and the trust of over 5,000 families across India.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className={`award-card bg-white rounded-3xl p-8 border border-zinc-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                award.color === 'blue' ? 'from-blue-500 to-blue-600' :
                award.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                award.color === 'purple' ? 'from-purple-500 to-purple-600' :
                'from-amber-500 to-amber-600'
              }`} />
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                award.color === 'blue' ? 'bg-blue-50 text-[#3B82F6]' :
                award.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' :
                award.color === 'purple' ? 'bg-purple-50 text-purple-500' :
                'bg-amber-50 text-amber-500'
              }`}>
                {award.icon}
              </div>
              
              <h3 className="text-xl font-bold text-zinc-900 mb-3 relative z-10">
                {award.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed relative z-10">
                {award.description}
              </p>
            </div>
          ))}
        </div>

        {/* Photo Gallery Carousel */}
        <div className="gallery-container mb-16">
          <h3 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
            Moments of Excellence
          </h3>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Main carousel */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-zinc-100">
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    idx === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <p className="text-white text-xl font-semibold">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-zinc-900 hover:bg-white hover:scale-110 transition-all shadow-lg z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-zinc-900 hover:bg-white hover:scale-110 transition-all shadow-lg z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentSlide
                      ? 'w-8 h-2 bg-[#3B82F6]'
                      : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Thumbnail strip */}
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {galleryImages.map((image, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                    idx === currentSlide
                      ? 'ring-4 ring-[#3B82F6] scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Banner */}
        <div className="certifications-container bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center md:text-left">
              Official Certifications & Licenses
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="cert-item flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm md:text-base">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
