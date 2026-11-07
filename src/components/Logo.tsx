import { Camera } from 'lucide-react';

interface LogoProps {
  suffix?: '▾' | '✦';
  onClick?: () => void;
}

export function Logo({ suffix = '✦', onClick }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2.5 text-left border-0 bg-transparent p-0 cursor-pointer transition-transform hover:opacity-95"
      aria-label="PokéSnap Home"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FDE047] text-[#1E1E1E] shadow-sm">
        <Camera size={18} strokeWidth={2.4} />
      </div>
      <div className="flex items-center gap-1 font-display text-xl font-extrabold tracking-tight text-[#1E1E1E]">
        <span>PokéSnap</span>
        <span className="text-sm font-bold text-[#1E1E1E]/80">{suffix}</span>
      </div>
    </button>
  );
}
