import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Camera,
  Sparkles,
  Download,
  ChevronDown,
  Printer,
  ShieldCheck,
  Share2,
  Check,
} from 'lucide-react';
import { CardFace } from './CardFace';
import { Logo } from './Logo';
import type { CardCustomization, TemplateId } from '../types';
import { TEMPLATES } from '../types';

interface LandingPageProps {
  onStart: (startingTemplate?: TemplateId) => void;
  onOpenCardLab: () => void;
}

export function LandingPage({ onStart, onOpenCardLab }: LandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sample cards for previews
  const defaultMikaCard: CardCustomization = {
    template: 'prism',
    name: 'Mika',
    hp: 120,
    elementType: 'electric',
    rarity: 'ultra',
    holographic: true,
    cardNumber: '025 / 151',
    series: 'Prism · 2026',
    attackName: 'Main Character Energy',
    attackDamage: '90',
    attackDescription: 'A little confidence. A lot of sparkle. This moment is officially one of a kind.',
    species: 'NO. 025 · GOOD VIBES POKÉMON · ELECTRIC TYPE',
    weakness: '+20',
    resistance: '-30',
    retreat: '✦',
  };

  const tidalMikaCard: CardCustomization = {
    ...defaultMikaCard,
    template: 'tidal',
    elementType: 'water',
    rarity: 'rare',
    series: 'Tidal · 2026',
    cardNumber: '007 / 151',
    species: 'NO. 007 · GOOD VIBES POKÉMON · WATER TYPE',
    weakness: '+20',
    resistance: '-20',
    retreat: '✦',
  };

  const botanicMikaCard: CardCustomization = {
    ...defaultMikaCard,
    template: 'botanic',
    elementType: 'grass',
    rarity: 'common',
    series: 'Botanic · 2026',
    cardNumber: '001 / 151',
    species: 'NO. 001 · GOOD VIBES POKÉMON · GRASS TYPE',
    weakness: '+20',
    resistance: '-30',
    retreat: '✦',
  };

  const emberMikaCard: CardCustomization = {
    ...defaultMikaCard,
    template: 'ember',
    elementType: 'fire',
    rarity: 'legendary',
    series: 'Ember · 2026',
    cardNumber: '004 / 151',
    species: 'NO. 004 · GOOD VIBES POKÉMON · FIRE TYPE',
    weakness: '+20',
    resistance: '-30',
    retreat: '✦',
  };

  const faqItems = [
    {
      q: 'Is PokéSnap free to use?',
      a: 'Yes! PokéSnap is 100% free with no hidden fees, subscriptions, or watermarks. All features and 1500 × 2100 px high-res exports are completely unlocked.',
    },
    {
      q: 'Do you store my photos?',
      a: 'Never. Your camera stream and photos never leave your device. Everything is processed locally in your browser memory and never touches an external server.',
    },
    {
      q: 'How do I print my cards?',
      a: "Download the high-resolution PNG (1500 × 2100 px). It's formatted at the exact standard 2.5 × 3.5 inch trading card ratio (300 DPI) for instant printing at home or any local photo lab.",
    },
    {
      q: 'How do I download or share my card?',
      a: 'Once you make your card in the Card Lab, click "Download card" for an instant high-res PNG or "Share card" to copy a direct image or link to send to your friends.',
    },
    {
      q: 'Is this an official Pokémon product?',
      a: 'No. PokéSnap is an independent fan-made creative project and is not affiliated with, endorsed, or sponsored by Nintendo, Game Freak, or The Pokémon Company.',
    },
  ];

  return (
    <div className="flex flex-col gap-16 sm:gap-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-16" aria-labelledby="hero-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-[#FEF9C3] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-amber-900 shadow-xs mb-6">
              <span>✨ 14,000+ CARDS PULLED THIS WEEK</span>
            </div>

            <h1
              id="hero-title"
              className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#1E1E1E] leading-[0.92]"
            >
              You. But make <br />
              it collectible.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#1E1E1E]/70 max-w-xl leading-relaxed">
              Step into the booth. Drop your pose. Turn your selfie into a holographic trading card
              you'll actually want to keep.
            </p>

            {/* Hero Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => onStart()}
                className="flex items-center gap-2.5 rounded-full bg-[#FDE047] px-8 py-4 text-base font-black text-[#1E1E1E] shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Start photobooth</span>
                <ArrowUpRight size={18} strokeWidth={2.8} />
              </button>

              <button
                type="button"
                onClick={onOpenCardLab}
                className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#1E1E1E] hover:opacity-80 cursor-pointer"
              >
                <span>Explore card lab</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-12 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-widest text-[#1E1E1E]/50">
              <span>100% FREE</span>
              <span>•</span>
              <span>IN-BROWSER PRIVACY</span>
              <span>•</span>
              <span>HIGH-RES EXPORT</span>
            </div>
          </div>

          {/* Right Hero Visual: Fanned Card Stack */}
          <div className="lg:col-span-5 relative flex justify-center items-center min-h-[460px]">
            {/* Background sparkle accents */}
            <div className="absolute -top-4 right-10 text-3xl text-amber-500 font-bold animate-pulse">
              ✦
            </div>
            <div className="absolute bottom-6 left-4 text-2xl text-purple-600 font-bold">✦</div>

            {/* 3D Fanned Cards Container */}
            <div className="relative w-full max-w-[360px] h-[440px] flex items-center justify-center">
              {/* Back Card Left: Tidal */}
              <div className="absolute -left-4 sm:-left-8 top-6 -rotate-12 transform scale-90 opacity-90 transition-transform hover:scale-95 z-10">
                <CardFace customization={tidalMikaCard} compact interactiveTilt={false} />
              </div>

              {/* Back Card Right: Botanic */}
              <div className="absolute -right-4 sm:-right-8 top-6 rotate-12 transform scale-90 opacity-90 transition-transform hover:scale-95 z-10">
                <CardFace customization={botanicMikaCard} compact interactiveTilt={false} />
              </div>

              {/* Center Front Card: Prism (Mika) */}
              <div className="relative z-20 rotate-1 shadow-2xl transition-transform hover:scale-105">
                <CardFace customization={defaultMikaCard} compact interactiveTilt={true} />
              </div>

              {/* Floating Hero Badge below center card */}
              <div className="absolute -bottom-4 z-30 flex items-center gap-2 rounded-full border border-[#1E1E1E] bg-[#FDE047] px-4 py-2 text-xs font-black text-[#1E1E1E] shadow-lg">
                <Sparkles size={14} />
                <span>Meet your new first edition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TICKER STRIP */}
      <div className="-mx-6 lg:-mx-10 overflow-hidden bg-[#1E1E1E] py-4 text-white">
        <div className="flex w-max animate-marquee space-x-8 text-xs font-black uppercase tracking-[0.25em]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-8">
              <span>✦ HIGH-RESOLUTION PRINTS</span>
              <span>✦ PRIVATE BY DEFAULT</span>
              <span>✦ FREE, FOREVER & EVER</span>
              <span>✦ 100% IN-BROWSER</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SECTION: FROM CAMERA ROLL TO CARD PULL */}
      <section id="how" className="pt-8" aria-labelledby="steps-title">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E1E1E]/60">
              THE THREE-STEP SHUFFLE
            </span>
            <h2
              id="steps-title"
              className="mt-1 text-3xl sm:text-5xl font-black font-display tracking-tight text-[#1E1E1E]"
            >
              From camera roll to card pull.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#1E1E1E]/70 max-w-md leading-relaxed">
            No design skills needed. No complicated editors. Just you, your best angle, and a
            printer-ready card in sixty seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01 */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#1E1E1E]/15 bg-white p-7 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                <Camera size={24} />
              </div>
              <span className="text-3xl font-black text-[#1E1E1E]/20">01</span>
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-[#1E1E1E]">Find your good side.</h3>
              <p className="mt-2 text-sm text-[#1E1E1E]/70 leading-relaxed">
                Hit the booth for a rapid 3-shot burst. Pick the one that hits different.
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#1E1E1E]/15 bg-white p-7 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Sparkles size={24} />
              </div>
              <span className="text-3xl font-black text-[#1E1E1E]/20">02</span>
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-[#1E1E1E]">Choose your energy.</h3>
              <p className="mt-2 text-sm text-[#1E1E1E]/70 leading-relaxed">
                Pick an elemental canvas: Prism, Tidal, Botanic, or Ember. Dial in your HP and traits.
              </p>
            </div>
          </div>

          {/* Card 03 */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#1E1E1E]/15 bg-white p-7 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <Download size={24} />
              </div>
              <span className="text-3xl font-black text-[#1E1E1E]/20">03</span>
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-[#1E1E1E]">Keep a little magic.</h3>
              <p className="mt-2 text-sm text-[#1E1E1E]/70 leading-relaxed">
                Download a crisp 1500 × 2100 px PNG or share straight to the group chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: PICK YOUR TYPE. FIND YOUR VIBE */}
      <section id="lab" className="pt-8" aria-labelledby="canvases-title">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C8B82]">
              THE CARD LAB
            </span>
            <h2
              id="canvases-title"
              className="mt-1 text-3xl sm:text-5xl font-black font-display tracking-tight text-[#1E1E1E]"
            >
              Pick your type. Find your vibe.
            </h2>
          </div>
          <div className="rounded-full bg-white border border-[#1E1E1E]/15 px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#1E1E1E] shadow-2xs">
            4 SIGNATURE TEMPLATES + ENDLESS YOU
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start">
          {/* Prism */}
          <div
            onClick={() => onStart('prism')}
            className="group flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1.5"
          >
            <div className="flex items-center justify-center">
              <CardFace customization={defaultMikaCard} compact interactiveTilt={true} />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <strong className="text-xl font-bold font-display text-[#1E1E1E]">Prism</strong>
              <ArrowUpRight
                size={16}
                className="text-[#1E1E1E]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1E1E1E]"
              />
            </div>
            <p className="text-xs text-[#1E1E1E]/60 mt-1">For the spotlight seekers.</p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E1E1E]/40 mt-3">
              ELECTRIC / ULTRA RARE
            </span>
          </div>

          {/* Tidal */}
          <div
            onClick={() => onStart('tidal')}
            className="group flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1.5"
          >
            <div className="flex items-center justify-center">
              <CardFace customization={tidalMikaCard} compact interactiveTilt={true} />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <strong className="text-xl font-bold font-display text-[#1E1E1E]">Tidal</strong>
              <ArrowUpRight
                size={16}
                className="text-[#1E1E1E]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1E1E1E]"
              />
            </div>
            <p className="text-xs text-[#1E1E1E]/60 mt-1">Cool, calm, collectible.</p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E1E1E]/40 mt-3">
              WATER / RARE
            </span>
          </div>

          {/* Botanic */}
          <div
            onClick={() => onStart('botanic')}
            className="group flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1.5"
          >
            <div className="flex items-center justify-center">
              <CardFace customization={botanicMikaCard} compact interactiveTilt={true} />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <strong className="text-xl font-bold font-display text-[#1E1E1E]">Botanic</strong>
              <ArrowUpRight
                size={16}
                className="text-[#1E1E1E]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1E1E1E]"
              />
            </div>
            <p className="text-xs text-[#1E1E1E]/60 mt-1">A little wild. All you.</p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E1E1E]/40 mt-3">
              GRASS / COMMON
            </span>
          </div>

          {/* Ember */}
          <div
            onClick={() => onStart('ember')}
            className="group flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1.5"
          >
            <div className="flex items-center justify-center">
              <CardFace customization={emberMikaCard} compact interactiveTilt={true} />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <strong className="text-xl font-bold font-display text-[#1E1E1E]">Ember</strong>
              <ArrowUpRight
                size={16}
                className="text-[#1E1E1E]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1E1E1E]"
              />
            </div>
            <p className="text-xs text-[#1E1E1E]/60 mt-1">Bring your own heat.</p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E1E1E]/40 mt-3">
              FIRE / LEGENDARY
            </span>
          </div>
        </div>
      </section>

      {/* 5. SECTION: YOUR FACE. YOUR STATS. YOUR ORIGIN STORY */}
      <section className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Lavender container with tilted Pokémon card & floating white form card */}
          <div className="lg:col-span-6 relative rounded-[28px] sm:rounded-[32px] bg-[#DCD6F7] p-6 sm:p-10 pb-8 sm:pb-12 shadow-sm flex flex-col justify-between min-h-[460px] overflow-hidden">
            {/* Top header row inside container */}
            <div className="w-full flex items-center justify-between mb-6 z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#554E6D]">
                A CARD THAT'S ALL YOU
              </span>
              <span className="text-base font-bold text-[#1E1E1E]">✦</span>
            </div>

            {/* Overlapping Presentation: Tilted Pokémon Card + Floating White Form Card */}
            <div className="relative flex items-center justify-center w-full my-auto py-2">
              {/* Tilted Pokémon Card on Left */}
              <div className="relative z-10 rotate-[-6deg] shadow-2xl transition-transform hover:scale-105">
                <CardFace customization={defaultMikaCard} compact interactiveTilt={false} />
              </div>

              {/* Floating White Form Card on Right overlapping card */}
              <div className="relative z-20 -ml-16 sm:-ml-20 w-[190px] sm:w-[215px] rounded-[20px] border border-[#1E1E1E]/15 bg-white p-4 sm:p-5 shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
                <span className="block text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#8C8B82] mb-3">
                  YOUR ALTER EGO
                </span>

                {/* Card Name */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#1E1E1E]">
                    Card name
                  </label>
                  <div className="w-full rounded-[10px] border border-[#1E1E1E]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#1E1E1E] shadow-2xs">
                    Mika
                  </div>
                </div>

                {/* HP & Type Side by Side */}
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-[#1E1E1E]">
                      HP
                    </label>
                    <div className="w-full rounded-[10px] border border-[#1E1E1E]/20 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1E1E1E] shadow-2xs">
                      120
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-[#1E1E1E]">
                      Type
                    </label>
                    <div className="w-full flex items-center gap-1 rounded-[10px] border border-[#1E1E1E]/20 bg-white px-2 py-1.5 text-[11px] font-bold text-[#1E1E1E] shadow-2xs">
                      <span className="text-amber-500">⚡</span>
                      <span>Electric</span>
                    </div>
                  </div>
                </div>

                {/* Rarity */}
                <div className="mt-3 space-y-1">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#8C8B82]">
                    RARITY
                  </span>
                  <div className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-[#FEF9C3] px-3 py-1 text-[11px] font-bold text-[#1E1E1E] shadow-2xs">
                    <span>★★ Ultra Rare</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy, Bullets & Button */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C8B82]">
              NOT JUST A FILTER
            </span>
            <h2 className="mt-2 text-4xl sm:text-6xl font-black font-display tracking-tight text-[#1E1E1E] leading-[1.05]">
              Your face. Your stats. <br />
              Your origin story.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#1E1E1E]/75 leading-relaxed max-w-md">
              Give your card a name, an elemental type, and the power level you woke up with. Every
              detail is a tiny expression of you.
            </p>

            <div className="mt-6 space-y-3 text-xs sm:text-sm font-semibold text-[#1E1E1E]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#1E1E1E] font-bold text-sm">✦</span>
                <span>Make your name the headline</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#1E1E1E] font-bold text-sm">✦</span>
                <span>Choose from six elemental types</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#1E1E1E] font-bold text-sm">✦</span>
                <span>Go Common, Rare, Ultra Rare, or Legendary</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenCardLab}
              className="mt-8 flex items-center gap-2 rounded-full bg-[#1E1E1E] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Meet your card self</span>
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. SECTION: RARE LOOKS GOOD ON YOU (DARK SECTION) */}
      <section className="-mx-6 lg:-mx-12 bg-[#212320] px-6 py-20 sm:py-28 text-white lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C6B778]">
              A LITTLE EXTRA SHINY
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[1.05]">
              Rare looks good <br />
              on you.
            </h2>
            <p className="mt-6 text-sm sm:text-base text-white/70 max-w-sm leading-relaxed">
              Pearlescent borders. Star-studded details. Holographic finishes that make every card
              feel like the pull of a lifetime.
            </p>
          </div>

          {/* Right: 3 Swatch Cards (Classic, Holographic, Legendary) */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end gap-3.5 sm:gap-6 pt-2">
            {/* Card 1: CLASSIC (Tilted Left) */}
            <div className="group relative aspect-[1/1.42] w-[150px] sm:w-[185px] md:w-[205px] rounded-[22px] bg-[#FAF6B8] p-5 sm:p-6 shadow-[0_18px_38px_rgba(0,0,0,0.35)] flex flex-col justify-between -rotate-4 transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E1E1E]">
                CLASSIC
              </span>

              {/* Outlined 4-Point Sparkle Star */}
              <div className="my-auto py-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  fill="none"
                  stroke="#1E1E1E"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <path d="M 50 10 C 50 35 35 50 10 50 C 35 50 50 65 50 90 C 50 65 65 50 90 50 C 65 50 50 35 50 10 Z" />
                </svg>
              </div>

              <span className="text-[11px] sm:text-[12px] font-semibold text-[#1E1E1E]">
                Clean & timeless
              </span>
            </div>

            {/* Card 2: HOLOGRAPHIC (Straight / Center) */}
            <div
              className="group relative aspect-[1/1.42] w-[150px] sm:w-[185px] md:w-[205px] rounded-[22px] p-5 sm:p-6 shadow-[0_20px_42px_rgba(0,0,0,0.4)] flex flex-col justify-between z-10 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background:
                  'linear-gradient(135deg, #CFE8F8 0%, #D8F5E4 22%, #FAF1B8 48%, #FCD4E5 72%, #D4DEFA 100%)',
              }}
            >
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E1E1E]">
                HOLOGRAPHIC
              </span>

              {/* Solid 4-Point Sparkle Star */}
              <div className="my-auto py-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  fill="#1E1E1E"
                >
                  <path d="M 50 10 C 50 35 35 50 10 50 C 35 50 50 65 50 90 C 50 65 65 50 90 50 C 65 50 50 35 50 10 Z" />
                </svg>
              </div>

              <span className="text-[11px] sm:text-[12px] font-semibold text-[#1E1E1E]">
                Prismatic energy
              </span>
            </div>

            {/* Card 3: LEGENDARY (Tilted Right) */}
            <div className="group relative aspect-[1/1.42] w-[150px] sm:w-[185px] md:w-[205px] rounded-[22px] bg-[#DDD6F7] p-5 sm:p-6 shadow-[0_18px_38px_rgba(0,0,0,0.35)] flex flex-col justify-between rotate-4 transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E1E1E]">
                LEGENDARY
              </span>

              {/* Solid 8-Pointed Sparkle Star */}
              <div className="my-auto py-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  fill="#1E1E1E"
                >
                  <polygon points="50,6 53,42 71,29 57,46 94,50 57,54 71,71 53,58 50,94 47,58 29,71 43,54 6,50 43,46 29,29 47,42" />
                </svg>
              </div>

              <span className="text-[11px] sm:text-[12px] font-semibold text-[#1E1E1E]">
                Born to stand out
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION: EVERY MOOD DESERVES A CARD */}
      <section className="pt-8" aria-labelledby="moments-title">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E1E1E]/60">
              MADE FOR MOMENTS
            </span>
            <h2
              id="moments-title"
              className="mt-1 text-3xl sm:text-5xl font-black font-display tracking-tight text-[#1E1E1E]"
            >
              Every mood deserves a card.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#1E1E1E]/70 max-w-sm">
            From birthdays to inside jokes, selfies to pet portraits. Here's what people are pulling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="flex flex-col items-center justify-between rounded-3xl border border-[#1E1E1E]/15 bg-[#FFFDEB] p-6 shadow-sm">
            <div className="py-2">
              <CardFace customization={defaultMikaCard} compact interactiveTilt={true} />
            </div>
            <div className="mt-4 text-center">
              <span className="block text-xs font-black uppercase tracking-wider text-[#1E1E1E]/50">
                THE EVERYDAY FLEX
              </span>
              <strong className="block text-base font-extrabold text-[#1E1E1E]">
                The everyday icon
              </strong>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center justify-between rounded-3xl border border-[#1E1E1E]/15 bg-[#F2EFFC] p-6 shadow-sm">
            <div className="py-2">
              <CardFace customization={tidalMikaCard} compact interactiveTilt={true} />
            </div>
            <div className="mt-4 text-center">
              <span className="block text-xs font-black uppercase tracking-wider text-[#1E1E1E]/50">
                WEEKEND PHOTO DUMP
              </span>
              <strong className="block text-base font-extrabold text-[#1E1E1E]">
                The soft-focus era
              </strong>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center justify-between rounded-3xl border border-[#1E1E1E]/15 bg-[#FFF1EE] p-6 shadow-sm">
            <div className="py-2">
              <CardFace customization={emberMikaCard} compact interactiveTilt={true} />
            </div>
            <div className="mt-4 text-center">
              <span className="block text-xs font-black uppercase tracking-wider text-[#1E1E1E]/50">
                BIRTHDAY SPECIAL EDITION
              </span>
              <strong className="block text-base font-extrabold text-[#1E1E1E]">
                The birthday pull
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* 8. YELLOW BANNER: FOR THE GROUP CHAT. FOR THE ACTUAL CARD BINDER */}
      <section className="-mx-6 lg:-mx-10 bg-[#FDE047] px-6 py-12 lg:px-10 text-[#1E1E1E]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight">
              For the group chat. <br />
              For the actual card binder.
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-sm font-bold">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E1E1E] text-[#FDE047]">
                <Printer size={15} />
              </div>
              <div>
                <span>High-res ready:</span>
                <span className="font-normal text-[#1E1E1E]/80 ml-1.5">
                  Crisp 1500 × 2100 px files ready for photo printing.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E1E1E] text-[#FDE047]">
                <ShieldCheck size={15} />
              </div>
              <div>
                <span>Standard card size:</span>
                <span className="font-normal text-[#1E1E1E]/80 ml-1.5">
                  Fits right into standard penny sleeves and binders.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E1E1E] text-[#FDE047]">
                <Share2 size={15} />
              </div>
              <div>
                <span>Share-ready aspect ratio:</span>
                <span className="font-normal text-[#1E1E1E]/80 ml-1.5">
                  Crops cleanly for story and feed posts.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ: A FEW THINGS TO KNOW */}
      <section id="faq" className="pt-8" aria-labelledby="faq-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E1E1E]/60">
              QUESTIONS & ANSWERS
            </span>
            <h2
              id="faq-title"
              className="mt-1 text-3xl sm:text-5xl font-black font-display tracking-tight text-[#1E1E1E]"
            >
              A few things <br />
              to know.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#1E1E1E]/70 max-w-sm">
              Everything you need to know about privacy, printing, and making the best card possible.
            </p>
            <a
              href="#top"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E1E1E] hover:underline"
            >
              <span>✦ Have another question? Ask us</span>
            </a>
          </div>

          <div className="lg:col-span-7 divide-y divide-[#1E1E1E]/15 border-t border-b border-[#1E1E1E]/15">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.q} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left text-base sm:text-lg font-bold font-display text-[#1E1E1E] cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-[#1E1E1E]/60 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm text-[#1E1E1E]/75 leading-relaxed pr-6 animate-in fade-in duration-150">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. CTA BANNER: READY FOR YOUR FIRST PULL */}
      <section className="rounded-3xl border border-[#1E1E1E]/15 bg-[#E8E4F8] p-10 sm:p-16 text-center">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-purple-900/70">
          NO DOWNLOAD REQUIRED • RUNS IN BROWSER
        </span>
        <h2 className="mt-3 text-4xl sm:text-6xl font-black font-display tracking-tight text-[#1E1E1E]">
          Ready for your first pull? ✦
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#1E1E1E]/70 max-w-md mx-auto">
          Three shots. A little bit of sparkle. A memory you can keep forever.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => onStart()}
            className="flex items-center gap-2.5 rounded-full bg-[#FDE047] px-8 py-4 text-base font-black text-[#1E1E1E] shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Start photobooth</span>
            <ArrowUpRight size={18} strokeWidth={2.8} />
          </button>
        </div>

        <p className="mt-4 text-xs font-semibold text-[#1E1E1E]/50">
          100% free • No account required • Private by design
        </p>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t border-[#1E1E1E]/15 pt-8 pb-12 flex flex-col gap-6 text-xs text-[#1E1E1E]/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo suffix="▾" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

          <nav className="flex items-center gap-6 font-bold uppercase tracking-wider text-[11px] text-[#1E1E1E]/70">
            <a href="#how" className="hover:text-[#1E1E1E]">
              How it works
            </a>
            <a href="#lab" className="hover:text-[#1E1E1E]">
              The card lab
            </a>
            <a href="#faq" className="hover:text-[#1E1E1E]">
              FAQ
            </a>
            <button
              type="button"
              onClick={() => onStart()}
              className="hover:text-[#1E1E1E] cursor-pointer"
            >
              Start photobooth ↗
            </button>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#1E1E1E]/10 pt-4 text-[11px]">
          <span>© 2026 PokéSnap. All rights reserved.</span>
          <span>
            A fan-made creative project. Not affiliated with Pokémon, Nintendo, or Game Freak.
          </span>
        </div>
      </footer>
    </div>
  );
}
