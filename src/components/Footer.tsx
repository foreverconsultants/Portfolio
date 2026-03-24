import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0a0a0c] border-t border-white/5 overflow-hidden">
      {/* Subtle glow at the top edge of the footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg
                width="32"
                height="18"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ft-logo" x1="0" y1="0" x2="100" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 25 C50 10, 30 2, 18 10 C6 18, 6 32, 18 40 C30 48, 50 40, 50 25 C50 10, 70 2, 82 10 C94 18, 94 32, 82 40 C70 48, 50 40, 50 25Z"
                  stroke="url(#ft-logo)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="font-bold text-xl text-white tracking-tight">
                Forever Consultants
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-10">
              Comprehensive wealth management and health protection tailored to
              secure your financial future, forever.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-4 text-sm text-zinc-300">
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Contact Nitin</p>
                  <span className="text-white font-medium text-base">+91 9769660363</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-4 text-sm text-zinc-300">
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Contact Sujata</p>
                  <span className="text-white font-medium text-base">+91 8087907776</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-[#3B82F6] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services/lic" className="text-zinc-400 hover:text-[#3B82F6] transition-colors">
                  LIC Insurance
                </Link>
              </li>
              <li>
                <Link href="/services/mutual-funds" className="text-zinc-400 hover:text-[#3B82F6] transition-colors">
                  Mutual Funds
                </Link>
              </li>
              <li>
                <Link href="/services/health" className="text-zinc-400 hover:text-[#3B82F6] transition-colors">
                  Health Insurance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">
              Talk To Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="text-zinc-400">ntngandhi65@gmail.com</li>
              <li className="text-zinc-400">sujatagandhi72@gmail.com</li>
              <li className="pt-4">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-full text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all hover:scale-105 shadow-lg shadow-[#3B82F6]/25"
                >
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Forever Consultants. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-600 text-center md:text-right max-w-xl leading-relaxed">
            Mutual Fund investments are subject to market risks. Read all scheme
            related documents carefully. Insurance is a subject matter of
            solicitation.
          </p>
        </div>
      </div>
    </footer>
  );
}
