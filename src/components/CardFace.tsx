import React, { useState, useRef, useMemo } from 'react';
import type { CardCustomization, ElementType, Photo } from '../types';
import { TEMPLATES, getRaritySymbol } from '../types';

interface CardFaceProps {
  customization: CardCustomization;
  photo?: Photo | string;
  isLiveVideo?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
  mirrored?: boolean;
  interactiveTilt?: boolean;
  compact?: boolean;
  countdown?: number | null;
  className?: string;
}

export function getElementIcon(type: ElementType): string {
  switch (type) {
    case 'fire':
      return '🔥';
    case 'water':
      return '💧';
    case 'grass':
      return '🍃';
    case 'electric':
      return '⚡';
    case 'psychic':
      return '👁️';
    case 'colorless':
      return '⭐';
    default:
      return '⚡';
  }
}

export function CardFace({
  customization,
  photo,
  isLiveVideo = false,
  videoRef,
  mirrored = true,
  interactiveTilt = true,
  compact = false,
  countdown = null,
  className = '',
}: CardFaceProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glintX: 50, glintY: 50, isHovered: false });

  const template = useMemo(() => {
    return TEMPLATES[customization.template] || TEMPLATES.prism;
  }, [customization.template]);

  const photoUrl = typeof photo === 'string' ? photo : photo?.url || '/sample-portrait.png';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    const glintX = (x / rect.width) * 100;
    const glintY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glintX, glintY, isHovered: true });
  };

  const handleMouseLeave = () => {
    if (!interactiveTilt) return;
    setTilt({ x: 0, y: 0, glintX: 50, glintY: 50, isHovered: false });
  };

  // Card background styling based on template
  const surfaceBg = useMemo(() => {
    switch (customization.template) {
      case 'tidal':
        return '#BFE3F2';
      case 'botanic':
        return '#C3E1B9';
      case 'ember':
        return '#FAC8B5';
      case 'prism':
      default:
        return '#FCF4A3';
    }
  }, [customization.template]);

  const borderFoilColor = useMemo(() => {
    switch (customization.template) {
      case 'tidal':
        return '#4F859D';
      case 'botanic':
        return '#4E7854';
      case 'ember':
        return '#DC9882';
      case 'prism':
      default:
        return '#E4CB5B';
    }
  }, [customization.template]);

  // Is this the botanic arched artwork?
  const isBotanic = customization.template === 'botanic';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none transition-transform duration-200 ease-out ${
        compact ? 'w-full max-w-[270px]' : 'w-[320px] sm:w-[380px] md:w-[400px]'
      } ${className}`}
      style={{
        transform:
          interactiveTilt && tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      }}
    >
      {/* Outer Card Frame with Theme-Colored Border + Delicate Pearlescent / Holo Sheen */}
      <div
        className={`relative aspect-[2.5/3.5] w-full rounded-[20px] sm:rounded-[22px] ${
          compact ? 'p-[6.5px] sm:p-[7.5px]' : 'p-[10px] sm:p-[12px]'
        } transition-all duration-300`}
        style={{
          background: borderFoilColor,
          boxShadow: '0 16px 34px -6px rgba(0, 0, 0, 0.22), 0 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Subtle holographic iridescent foil edge shimmer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[20px] sm:rounded-[22px] opacity-40 mix-blend-screen"
          style={{
            background: `linear-gradient(${125 + tilt.x * 2}deg, rgba(255,255,255,0.7) 0%, rgba(254,202,202,0.4) 25%, rgba(199,210,254,0.4) 50%, rgba(254,240,138,0.5) 75%, rgba(255,255,255,0.7) 100%)`,
          }}
        />

        {/* Dynamic mouse-glint reflection */}
        {interactiveTilt && tilt.isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-[20px] sm:rounded-[22px] opacity-35 mix-blend-color-dodge transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glintX}% ${tilt.glintY}%, rgba(255,255,255,0.85) 0%, rgba(254,202,202,0.3) 30%, transparent 70%)`,
            }}
          />
        )}

        {/* Inner Card Surface */}
        <div
          className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[13px] sm:rounded-[15px] border border-[#1E1E1E]/20 ${
            compact ? 'p-2 sm:p-2.5' : 'p-3 sm:p-4'
          } text-[#1E1E1E] shadow-inner`}
          style={{ backgroundColor: surfaceBg }}
        >
          {/* Subtle Halftone Pattern Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          />

          {/* CARD TOP HEADER: Name + Basic + HP + Energy Icon */}
          <div
            className={`relative z-10 flex shrink-0 items-center justify-between border-b border-[#1E1E1E]/15 ${
              compact ? 'pb-1' : 'pb-1.5 sm:pb-2'
            }`}
          >
            <div className="flex items-baseline gap-1.5 min-w-0 pr-1.5">
              <span
                className={`truncate font-bold tracking-tight font-display ${
                  compact ? 'text-[12px] sm:text-[14px]' : 'text-base sm:text-xl'
                }`}
              >
                {customization.name || 'Mika'}
              </span>
              <span
                className={`rounded bg-[#1E1E1E]/10 font-bold uppercase tracking-wider text-[#1E1E1E]/70 ${
                  compact ? 'px-1 py-[1px] text-[6px] sm:text-[7px]' : 'px-1.5 py-0.5 text-[8px] sm:text-[9px]'
                }`}
              >
                BASIC
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span
                className={`font-semibold tracking-tight text-[#1E1E1E]/70 ${
                  compact ? 'text-[8px] sm:text-[9px]' : 'text-[10px] sm:text-xs'
                }`}
              >
                HP
              </span>
              <span
                className={`font-black tracking-tight ${
                  compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-lg'
                }`}
              >
                {customization.hp || 120}
              </span>
              <div
                className={`grid place-items-center rounded-full border border-[#1E1E1E]/40 bg-white/50 shadow-2xs ${
                  compact ? 'h-4 w-4 sm:h-5 sm:w-5 text-[9px] sm:text-[10px]' : 'h-6 w-6 sm:h-7 sm:w-7 text-xs sm:text-sm'
                }`}
              >
                <span>{getElementIcon(customization.elementType)}</span>
              </div>
            </div>
          </div>

          {/* ARTWORK FRAME: Arched top on Botanic, Rounded on others */}
          <div
            className={`relative z-10 shrink-0 w-full aspect-[1.42/1] overflow-hidden border border-[#1E1E1E]/40 bg-[#111111] shadow-[inset_0_0_8px_rgba(0,0,0,0.25)] ${
              isBotanic ? 'rounded-t-[30px] sm:rounded-t-[34px] rounded-b-[8px]' : 'rounded-[8px] sm:rounded-[10px]'
            } ${compact ? 'my-1' : 'my-1.5 sm:my-2'}`}
          >
            {/* Top-Left Pill Badge: POKESNAP ORIGINAL */}
            <div className="absolute top-2 left-2 z-20">
              <span
                className={`inline-block rounded-full border border-[#1E1E1E]/20 bg-white/95 font-bold uppercase tracking-wider text-[#1E1E1E] shadow-xs backdrop-blur-xs ${
                  compact
                    ? 'px-1.5 py-[1px] text-[5.5px] sm:text-[6.5px]'
                    : 'px-2 py-0.5 text-[7px] sm:text-[8px]'
                }`}
              >
                POKESNAP ORIGINAL
              </span>
            </div>

            {/* Live Camera Video OR Photo Image */}
            {isLiveVideo && videoRef ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`h-full w-full object-cover ${mirrored ? 'scale-x-[-1]' : ''}`}
              />
            ) : (
              <img
                src={photoUrl}
                alt={customization.name || 'Pokémon card selfie'}
                className="h-full w-full object-cover"
              />
            )}

            {/* Sparkle star in bottom right corner */}
            <div
              className={`absolute bottom-1.5 right-2 z-20 text-yellow-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${
                compact ? 'text-xs' : 'text-sm sm:text-base'
              }`}
            >
              <span>✦</span>
            </div>

            {/* Countdown Overlay during Capture */}
            {countdown !== null && countdown > 0 && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border-3 border-[#1E1E1E] bg-[#FDE047] text-xl sm:text-3xl font-black text-[#1E1E1E] shadow-xl animate-ping-once">
                  {countdown}
                </div>
              </div>
            )}
          </div>

          {/* SUB-BAR / SPECIES RIBBON */}
          <div
            className={`relative z-10 shrink-0 rounded-xs border border-[#1E1E1E]/15 bg-white/35 text-center font-bold tracking-wider text-[#1E1E1E]/90 shadow-2xs truncate ${
              compact
                ? 'my-0.5 px-1 py-[1.5px] text-[5.5px] sm:text-[6.5px]'
                : 'my-1 px-2 py-0.5 text-[7px] sm:text-[8px]'
            }`}
          >
            {customization.species || template.defaultSpecies}
          </div>

          {/* ATTACKS SECTION */}
          <div
            className={`relative z-10 shrink-0 border-t border-b border-[#1E1E1E]/20 ${
              compact ? 'py-1' : 'py-1.5 sm:py-2'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 min-w-0 pr-1">
                <span
                  className={`text-[#1E1E1E] font-bold ${
                    compact ? 'text-[8.5px] sm:text-[9.5px]' : 'text-xs sm:text-sm'
                  }`}
                >
                  ✦
                </span>
                <span
                  className={`truncate font-extrabold font-display ${
                    compact ? 'text-[9.5px] sm:text-[11px]' : 'text-xs sm:text-sm'
                  }`}
                >
                  {customization.attackName || template.defaultAttack}
                </span>
              </div>
              <span
                className={`font-black font-display shrink-0 ${
                  compact ? 'text-xs sm:text-sm' : 'text-base sm:text-xl'
                }`}
              >
                {customization.attackDamage || template.defaultDamage}
              </span>
            </div>
            <p
              className={`text-[#1E1E1E]/80 italic line-clamp-2 leading-tight ${
                compact ? 'mt-[1px] text-[6.5px] sm:text-[7.5px]' : 'mt-0.5 sm:mt-1 text-[8px] sm:text-[9.5px]'
              }`}
            >
              {customization.attackDescription || template.defaultDescription}
            </p>
          </div>

          {/* WEAKNESS / RESISTANCE / RETREAT ROW */}
          <div
            className={`relative z-10 shrink-0 grid grid-cols-3 divide-x divide-[#1E1E1E]/15 text-center font-bold text-[#1E1E1E]/70 ${
              compact ? 'py-[2px] text-[6px] sm:text-[7px]' : 'py-1 text-[7px] sm:text-[8px]'
            }`}
          >
            <div>
              <span>weakness </span>
              <strong className="text-[#1E1E1E]">{customization.weakness || '+20'}</strong>
            </div>
            <div>
              <span>resistance </span>
              <strong className="text-[#1E1E1E]">{customization.resistance || '-30'}</strong>
            </div>
            <div>
              <span>retreat </span>
              <strong className="text-[#1E1E1E]">{customization.retreat || '✦'}</strong>
            </div>
          </div>

          {/* CARD FOOTER ROW: Series & Number + Rarity */}
          <div
            className={`relative z-10 shrink-0 flex items-center justify-between border-t border-[#1E1E1E]/15 font-bold uppercase tracking-wider text-[#1E1E1E]/75 ${
              compact ? 'pt-[2px] text-[6px] sm:text-[7px]' : 'pt-1 text-[7px] sm:text-[8.5px]'
            }`}
          >
            <span className="truncate pr-1">{customization.series || template.defaultSeries}</span>
            <span className="shrink-0">
              {customization.cardNumber || template.defaultNumber} · {getRaritySymbol(customization.rarity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
