import { useState, useRef } from 'react';
import { ArrowRight, RotateCcw, Check, Sparkles, Upload } from 'lucide-react';
import { CardFace } from './CardFace';
import type { CardCustomization, Photo } from '../types';

interface SelectPhotosProps {
  photos: Photo[];
  customization: CardCustomization;
  selectedPhotoIndex: number;
  onSelectPhoto: (index: number) => void;
  onRetakeAll: () => void;
  onRetakeSingle: (index: number, newPhoto: Photo) => void;
  onNext: () => void;
}

export function SelectPhotos({
  photos,
  customization,
  selectedPhotoIndex,
  onSelectPhoto,
  onRetakeAll,
  onRetakeSingle,
  onNext,
}: SelectPhotosProps) {
  // If no photos or less than 3, ensure 3 photos exist
  const effectivePhotos = photos.length > 0 ? photos : [
    { id: '1', url: '/sample-portrait.png', capturedAt: 1 },
    { id: '2', url: '/sample-portrait.png', capturedAt: 2 },
    { id: '3', url: '/sample-portrait.png', capturedAt: 3 },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [retakeTargetIndex, setRetakeTargetIndex] = useState<number>(0);

  const handleSinglePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const updated: Photo = {
        id: crypto.randomUUID(),
        url,
        capturedAt: Date.now(),
      };
      onRetakeSingle(retakeTargetIndex, updated);
    };
    reader.readAsDataURL(file);
  };

  const triggerRetake = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRetakeTargetIndex(index);
    fileInputRef.current?.click();
  };

  return (
    <div className="py-6 sm:py-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleSinglePhotoUpload}
        className="hidden"
      />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E1E1E]/60">
            THE REVEAL
          </span>
          <h1 className="mt-1 text-3xl sm:text-5xl font-black font-display tracking-tight text-[#1E1E1E]">
            Three shots. One rare you.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#1E1E1E]/70 max-w-xl">
            Pick the moment you love. We'll turn it into your first edition.
          </p>
        </div>

        {/* 3 Photos Captured Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-xs">
          <Check size={14} className="text-emerald-600 stroke-[3]" />
          <span>{effectivePhotos.length} Photos Captured</span>
        </div>
      </div>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {effectivePhotos.map((photo, index) => {
          const isSelected = selectedPhotoIndex === index;
          const shotLabel = `SHOT 0${index + 1}`;

          return (
            <div
              key={photo.id || index}
              onClick={() => onSelectPhoto(index)}
              className={`group relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-2 border-[#1E1E1E] bg-[#FFFDEB] shadow-xl ring-4 ring-[#FDE047]/40 scale-[1.02]'
                  : 'border border-[#1E1E1E]/15 bg-[#FAF8F2] hover:border-[#1E1E1E]/40 hover:bg-[#F4F1E6]'
              }`}
            >
              {/* Card top indicator bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-[#1E1E1E]/70">
                  {shotLabel}
                </span>

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                    isSelected
                      ? 'bg-[#1E1E1E] text-white'
                      : 'border-2 border-[#1E1E1E]/30 bg-white group-hover:border-[#1E1E1E]'
                  }`}
                >
                  {isSelected ? <Check size={14} strokeWidth={3} /> : null}
                </div>
              </div>

              {/* Pokémon Card Preview with this Photo */}
              <div className="my-auto flex items-center justify-center py-2">
                <CardFace
                  customization={customization}
                  photo={photo}
                  compact
                  interactiveTilt={false}
                />
              </div>

              {/* Card bottom footer */}
              <div className="mt-4 pt-3 border-t border-[#1E1E1E]/10 flex items-center justify-between text-xs">
                {isSelected ? (
                  <span className="flex items-center gap-1.5 font-black text-[#1E1E1E]">
                    <Sparkles size={14} className="text-amber-500" />
                    <span>This is the one</span>
                  </span>
                ) : (
                  <span className="text-[#1E1E1E]/60 font-semibold">Ready for your close-up</span>
                )}

                <button
                  type="button"
                  onClick={(e) => triggerRetake(index, e)}
                  className="flex items-center gap-1 font-bold text-[#1E1E1E]/60 hover:text-[#1E1E1E] cursor-pointer"
                  title="Replace or retake this shot"
                >
                  <RotateCcw size={12} />
                  <span>Retake</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E1E1E]/15 pt-6">
        {/* Retake all photos */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRetakeAll}
            className="flex items-center gap-2 rounded-xl border border-[#1E1E1E]/20 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#1E1E1E] shadow-xs transition-colors hover:bg-[#FAF8F2] cursor-pointer"
          >
            <span>Retake all photos</span>
            <RotateCcw size={14} />
          </button>
          <span className="hidden sm:inline text-xs text-[#1E1E1E]/60">
            New shots replace this set
          </span>
        </div>

        {/* Selected info & Continue button */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-xs sm:text-sm font-bold text-[#1E1E1E]/70">
            Shot 0{selectedPhotoIndex + 1} selected
          </span>

          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-2.5 rounded-full bg-[#FDE047] px-7 py-3.5 text-sm sm:text-base font-black text-[#1E1E1E] shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Continue to card lab</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Up next hint */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#1E1E1E]/60 text-center">
        <span>✦</span>
        <span>Up next: pick your template, name your card, and dial up your power.</span>
      </div>
    </div>
  );
}
