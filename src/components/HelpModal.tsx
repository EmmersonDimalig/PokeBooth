import { X, Sparkles, Sun, Camera, Printer, ShieldCheck } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#1E1E1E]/20 bg-[#FAF8F2] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1 text-[#1E1E1E]/60 transition-colors hover:bg-black/5 hover:text-[#1E1E1E]"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700">
          <Sparkles size={16} />
          <span>The Creative Studio Guide</span>
        </div>

        <h3 className="mt-2 text-2xl font-black font-display tracking-tight text-[#1E1E1E]">
          How to get the perfect pull.
        </h3>

        <div className="mt-6 space-y-4 text-sm text-[#1E1E1E]/80">
          <div className="flex items-start gap-3.5 rounded-xl border border-[#1E1E1E]/10 bg-white/70 p-3.5">
            <Sun className="shrink-0 text-amber-500 mt-0.5" size={20} />
            <div>
              <strong className="block text-[#1E1E1E] font-bold">Good lighting is everything</strong>
              <span>Face a window or soft natural light so your portrait stays crisp and vibrant inside the card frame.</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl border border-[#1E1E1E]/10 bg-white/70 p-3.5">
            <Camera className="shrink-0 text-indigo-500 mt-0.5" size={20} />
            <div>
              <strong className="block text-[#1E1E1E] font-bold">Drop your favorite pose</strong>
              <span>Peace signs, profile looks, or playful expressions fit best with classic card artwork aesthetics.</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl border border-[#1E1E1E]/10 bg-white/70 p-3.5">
            <Printer className="shrink-0 text-emerald-600 mt-0.5" size={20} />
            <div>
              <strong className="block text-[#1E1E1E] font-bold">Ready for physical printing</strong>
              <span>Your card exports at 1500 × 2100 px (300 DPI, 2.5 × 3.5 in). It fits directly into standard penny sleeves and binders!</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl border border-[#1E1E1E]/10 bg-white/70 p-3.5">
            <ShieldCheck className="shrink-0 text-blue-600 mt-0.5" size={20} />
            <div>
              <strong className="block text-[#1E1E1E] font-bold">100% Private in your browser</strong>
              <span>Your camera stream and photos stay on your device. Nothing is uploaded to external servers.</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#1E1E1E] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 cursor-pointer"
        >
          Got it, let's make magic!
        </button>
      </div>
    </div>
  );
}
