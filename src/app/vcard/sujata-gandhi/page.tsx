"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Phone, Mail, MapPin, Youtube, Globe, MessageCircle, Download } from "lucide-react";

export default function SujataGandhiVCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide navbar and footer
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");
    
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";
    if (main) {
      main.style.paddingTop = "0";
      main.style.minHeight = "100vh";
    }

    const ctx = gsap.context(() => {
      // Set elements to be visible by default
      gsap.set(".vcard-header", { opacity: 1, y: 0 });
      gsap.set(".vcard-info", { opacity: 1, y: 0 });
      gsap.set(".vcard-action", { opacity: 1, scale: 1 });

      // Animate from hidden state
      gsap.from(".vcard-header", {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".vcard-info", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.from(".vcard-action", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.6,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => {
      // Restore navbar and footer when leaving
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
      if (main) {
        main.style.paddingTop = "";
        main.style.minHeight = "";
      }
      ctx.revert();
    };
  }, []);

  const handleDownloadVCard = () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://forever-consultants.vercel.app';
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Sujata Gandhi
TITLE:Senior Insurance Advisor, Care Health Champion
TEL;TYPE=CELL:+918087907776
EMAIL:sujatagandhi72@gmail.com
ADR;TYPE=WORK:;;B/205, Chawre Arcade, Vasai;Nalasopara;;401203;India
URL:${siteUrl}
NOTE:Senior Insurance Advisor specializing in LIC Insurance, Mutual Funds, and Health Insurance
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sujata_Gandhi.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const whatsappMessage = encodeURIComponent(
    "Hi,\n\nI got your number from some reference, I want you to give some time to discuss over my *Financial Planning.*\n\nThanks"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0c] via-[#0f0f14] to-[#0a0a0c] flex items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Blurred blue circles in background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#3B82F6]/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-32 right-16 w-96 h-96 bg-[#60A5FA]/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#2563EB]/25 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div
        ref={containerRef}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative z-10"
      >
        {/* Header with photo background */}
        <div className="vcard-header relative h-64 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-transparent">
            <img 
              src="https://res.cloudinary.com/dbnlmt97x/image/upload/q_auto/f_auto/v1775031318/Untitled_design_23_w0hgi5.png" 
              alt="Sujata Gandhi"
              className="w-full h-full object-contain"
              style={{ objectPosition: 'center' }}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/80" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-6">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Sujata Gandhi</h1>
            <p className="text-white text-sm font-medium drop-shadow-md">Senior Insurance Advisor, Care Health Champion</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 space-y-4">
          {/* Phone */}
          <a
            href="tel:+918087907776"
            className="vcard-info flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors border border-[#3B82F6]/20">
              <Phone className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-zinc-400 mb-1">Phone</p>
              <p className="text-white font-medium">+91 8087907776</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:sujatagandhi72@gmail.com"
            className="vcard-info flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors border border-[#3B82F6]/20">
              <Mail className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-zinc-400 mb-1">Email</p>
              <p className="text-white font-medium text-sm">sujatagandhi72@gmail.com</p>
            </div>
          </a>

          {/* Address */}
          <a
            href="https://www.google.com/maps?q=19.42082977294922,72.81449127197266&z=17&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="vcard-info flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors border border-[#3B82F6]/20">
              <MapPin className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-zinc-400 mb-1">Address</p>
              <p className="text-white font-medium text-sm leading-relaxed">
                B/205, Chawre Arcade, Vasai<br />
                Nalasopara - 401203
              </p>
            </div>
          </a>

          {/* Divider */}
          <div className="h-px bg-white/10 my-6" />

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/918087907776?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vcard-action flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-[#25D366]/25"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Message on WhatsApp</span>
            </a>

            {/* Website */}
            <a
              href={process.env.NEXT_PUBLIC_SITE_URL || 'https://forever-consultants.vercel.app'}
              target="_blank"
              rel="noopener noreferrer"
              className="vcard-action flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:scale-105 backdrop-blur-sm"
            >
              <Globe className="w-5 h-5 text-[#3B82F6]" />
              <span>Visit Website</span>
            </a>

            {/* YouTube */}
            <a
              href="https://youtu.be/aVAVi7FdveI?si=PZTnpqsuxYWYwTgi"
              target="_blank"
              rel="noopener noreferrer"
              className="vcard-action flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-[#FF0000]/25"
            >
              <Youtube className="w-5 h-5" />
              <span>Watch on YouTube</span>
            </a>

            {/* Download vCard */}
            <button
              type="button"
              onClick={handleDownloadVCard}
              className="vcard-action flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:scale-105 backdrop-blur-sm"
            >
              <Download className="w-5 h-5 text-[#3B82F6]" />
              <span>Save Contact</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-zinc-500">
            Forever Consultants - Your Financial Partner
          </p>
        </div>
      </div>
    </div>
  );
}
