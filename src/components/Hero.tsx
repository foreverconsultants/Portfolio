export default function Hero() {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center px-6">
      <div className="text-center z-10 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-white/60 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Total Investment Solutions
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="text-white">Securing Your</span>
          <br />
          <span className="gradient-text">Future, Forever.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
          Comprehensive wealth protection and growth strategies tailored to your lifelong goals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#book"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium rounded-full text-white overflow-hidden transition-all hover:scale-[1.02]"
          >
            {/* Gradient background */}
            <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-500" />
            {/* Glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <span className="relative">Book a Consultation</span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium rounded-full text-white/70 glass glass-hover transition-all hover:text-white hover:scale-[1.02]"
          >
            Explore Services
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex justify-center gap-8 text-white/20 text-xs font-medium tracking-wider uppercase">
          <span>LIC Approved</span>
          <span className="text-white/10">•</span>
          <span>AMFI Registered</span>
          <span className="text-white/10">•</span>
          <span>10+ Years Experience</span>
        </div>
      </div>
    </section>
  );
}
