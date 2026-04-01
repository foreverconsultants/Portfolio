"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Award, TrendingUp, Shield, Users, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
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
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035892/IMG_9507_yfcg7v.heic",
      caption: "Trophy Cabinet — Years of Excellence"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035893/IMG_9508_ax05lt.heic",
      caption: "Care Health Insurance — Champion Award, Sept 2024"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035893/IMG_9509_tihgjk.heic",
      caption: "Care Health Insurance — Champion Award, Jan 2024"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035892/IMG_9506_jb35bo.heic",
      caption: "LIC MDRT 2021 — 8th Time Qualifier, Nitin Gandhi"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035891/IMG_9505_qchfnr.heic",
      caption: "LIC Warrior 2020 — Nitin A. Gandhi, Mumbai Div-IV"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035889/IMG_9504_zkddhh.heic",
      caption: "LIC Corporate Trophy 2015"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035890/IMG_9501_n5cyyy.heic",
      caption: "LIC Corporate Trophy 2016"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035890/IMG_9502_dbsaob.heic",
      caption: "Award Ceremony — Nitin Gandhi Felicitation"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035889/IMG_9503_s9wgqq.heic",
      caption: "LIC Recognition Ceremony — Early Career Achievement"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035889/IMG_9500_veelui.heic",
      caption: "LIC Achiever's Trophy 2013-14, Western Zone"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035888/IMG_9499_nouzle.heic",
      caption: "LIC Shatakveer Agent Trophy 2012-13, Mumbai Div-IV"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035886/IMG_9481_ogu4nm.heic",
      caption: "LIC Globe Trophy — Excellence in Service"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035887/IMG_9498_rzelhj.heic",
      caption: "LIC Champions' Trophy 2014, Western Zone"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035886/IMG_9482_pxf48t.heic",
      caption: "Care Health Insurance — Amazing Almaty Contest 2024"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035883/IMG_9479_ncy0q6.heic",
      caption: "MDRT 2013 — Nitin Gandhi with Achievement Award"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035881/IMG_9475_yncizg.heic",
      caption: "LIC MDRT 2010 — Certificate & Trophy, Mumbai B.O. 919"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035881/IMG_9477_gxqjni.heic",
      caption: "Million Dollar Round Table (MDRT) 2011 Membership"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035881/IMG_9474_cvbux9.heic",
      caption: "LIC Abhikarta Mahakumbh 2024 & Monsoon Dhamaaka 2015"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035880/IMG_9476_chyqac.heic",
      caption: "Warrior 2020 & Vaishya Global Charitable Trust Award"
    },
    {
      url: "https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775035880/IMG_9473_jjy3cf.heic",
      caption: "LIC Dharma Chakra Trophy 2023, Mumbai Div-IV"
    },
  ];

  // Cloudinary transform helpers - resize images on the CDN side
  const getOptimizedUrl = (url: string, width: number, quality = 70) => {
    // Insert w_{width},q_{quality} after /upload/
    return url.replace('/upload/', `/upload/w_${width},q_${quality}/`);
  };

  // Only render slides near the current one to avoid loading all 20 images
  const isNearCurrentSlide = (idx: number) => {
    const total = galleryImages.length;
    const prev = (currentSlide - 1 + total) % total;
    const next = (currentSlide + 1) % total;
    return idx === currentSlide || idx === prev || idx === next;
  };


  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  // Touch swipe handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    // Only trigger if horizontal swipe is dominant and > 50px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) nextSlide();
      else prevSlide();
    }
    touchStartRef.current = null;
  }, [nextSlide, prevSlide]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (strip) {
      const activeThumb = strip.children[currentSlide] as HTMLElement;
      if (activeThumb) {
        const scrollLeft = activeThumb.offsetLeft - strip.offsetWidth / 2 + activeThumb.offsetWidth / 2;
        strip.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentSlide]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

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
          {/* Main carousel — swipeable on mobile */}
            <div
              ref={carouselRef}
              className="relative aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 cursor-grab active:cursor-grabbing touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {galleryImages.map((image, idx) => {
                // Only mount slides near the current one (prev, current, next)
                if (!isNearCurrentSlide(idx)) return null;
                return (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      idx === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={getOptimizedUrl(image.url, 800)}
                      alt={image.caption}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8">
                      <p className="text-white text-base md:text-xl font-semibold">{image.caption}</p>
                      <p className="text-zinc-400 text-xs mt-1 font-medium">{currentSlide + 1} / {galleryImages.length}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons — small & top-positioned on mobile, centered on desktop */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-2 top-4 md:left-4 md:top-1/2 md:-translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/80 md:bg-white/90 backdrop-blur-sm flex items-center justify-center text-zinc-900 hover:bg-white hover:scale-110 transition-all shadow-md md:shadow-lg z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2 top-4 md:right-4 md:top-1/2 md:-translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/80 md:bg-white/90 backdrop-blur-sm flex items-center justify-center text-zinc-900 hover:bg-white hover:scale-110 transition-all shadow-md md:shadow-lg z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>

            {/* Progress bar */}
            <div className="mt-6 bg-zinc-200 rounded-full h-1.5 max-w-md mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentSlide + 1) / galleryImages.length) * 100}%` }}
              />
            </div>

            {/* Thumbnail strip — optimized with tiny images */}
            <div ref={thumbStripRef} className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
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
                    src={getOptimizedUrl(image.url, 150, 50)}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
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
