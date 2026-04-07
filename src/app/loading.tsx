"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <svg
        width="80"
        height="40"
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse drop-shadow-lg"
      >
        <defs>
          <linearGradient id="loader-lg-gradient" x1="0" y1="0" x2="100" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path
          d="M50 25 C50 10, 30 2, 18 10 C6 18, 6 32, 18 40 C30 48, 50 40, 50 25 C50 10, 70 2, 82 10 C94 18, 94 32, 82 40 C70 48, 50 40, 50 25Z"
          stroke="url(#loader-lg-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          className="infinity-draw"
        />
      </svg>
      <span className="mt-4 text-sm font-semibold tracking-widest text-[#3B82F6] uppercase animate-pulse">
        Loading
      </span>
      <style>{`
        .infinity-draw {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 2s ease-in-out infinite alternate;
        }
        @keyframes draw {
          from {
            stroke-dashoffset: 200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
