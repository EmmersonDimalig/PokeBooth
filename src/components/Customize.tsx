import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Share2,
  RotateCcw,
  CheckCircle2,
  Check,
  ChevronRight,
  Flame,
  Droplets,
  Sprout,
  Zap,
  Eye,
  Star,
} from 'lucide-react';
import { CardFace } from './CardFace';
import { downloadCard, getCardBlob } from '../utils/download';
import type { CardCustomization, ElementType, Photo, RarityType, TemplateId } from '../types';
import { TEMPLATES } from '../types';

interface CustomizeProps {
  customization: CardCustomization;
  onUpdateCustomization: (updater: (prev: CardCustomization) => CardCustomization) => void;
  selectedPhoto: Photo;
  selectedShotIndex: number;
  onMakeAnother: () => void;
}

export function Customize({
  customization,
  onUpdateCustomization,
  selectedPhoto,
  selectedShotIndex,
  onMakeAnother,
}: CustomizeProps) {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const templates: TemplateId[] = ['prism', 'tidal', 'botanic', 'ember'];

  const elementTypes: { type: ElementType; label: string; icon: React.ReactNode }[] = [
    { type: 'fire', label: 'Fire', icon: <Flame size={14} className="text-rose-500" /> },
    { type: 'water', label: 'Water', icon: <Droplets size={14} className="text-sky-500" /> },
    { type: 'grass', label: 'Grass', icon: <Sprout size={14} className="text-emerald-500" /> },
    { type: 'electric', label: 'Electric', icon: <Zap size={14} className="text-amber-500" /> },
    { type: 'psychic', label: 'Psychic', icon: <Eye size={14} className="text-purple-500" /> },
    { type: 'colorless', label: 'Colorless', icon: <Star size={14} className="text-gray-500" /> },
  ];

  const rarities: { rarity: RarityType; label: string }[] = [
    { rarity: 'common', label: 'Common' },
    { rarity: 'rare', label: 'Rare' },
    { rarity: 'ultra', label: '★★ Ultra Rare' },
    { rarity: 'legendary', label: '✦ Legendary' },
  ];

  const handleTemplateSelect = (templateId: TemplateId) => {
    const config = TEMPLATES[templateId];
    onUpdateCustomization((prev) => ({
      ...prev,
      template: templateId,
      elementType: config.element,
      series: config.defaultSeries,
      cardNumber: config.defaultNumber,
      species: config.defaultSpecies,
      attackName: config.defaultAttack,
      attackDamage: config.defaultDamage,
      attackDescription: config.defaultDescription,
    }));
  };

  const handleReset = () => {
    const config = TEMPLATES.prism;
    onUpdateCustomization(() => ({
      template: 'prism',
      name: 'Mika',
      hp: 120,
      elementType: 'electric',
      rarity: 'ultra',
      holographic: true,
      cardNumber: '025 / 151',
      series: 'Prism · 2026',
      attackName: config.defaultAttack,
      attackDamage: config.defaultDamage,
      attackDescription: config.defaultDescription,
      species: config.defaultSpecies,
      weakness: '+20',
      resistance: '-30',
      retreat: '✦',
    }));
    showToast('Card details reset to default!');
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadCard(customization, selectedPhoto.url);
      showToast('Card downloaded in 1500 × 2100 px!');
    } catch (e) {
      showToast('Error generating high-res download');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      const blob = await getCardBlob(customization, selectedPhoto.url);
      if (blob && navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'pokesnap.png', { type: 'image/png' })] })) {
        await navigator.share({
          title: `${customization.name} — PokéSnap Collectible Card`,
          text: `Check out my custom PokéSnap card!`,
          files: [new File([blob], 'pokesnap.png', { type: 'image/png' })],
        });
        showToast('Shared successfully!');
      } else if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        showToast('Card image copied to clipboard!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('PokéSnap link copied to clipboard!');
      }
    } catch {
      showToast('Link copied to clipboard!');
    }
  };

  return (
    <div className="py-6 sm:py-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#1E1E1E] px-5 py-3 text-sm font-bold text-white shadow-2xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 size={18} className="text-[#FDE047]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E1E1E]/60">
            THE CARD LAB
          </span>
          <h1 className="mt-1 text-3xl sm:text-5xl font-black font-display tracking-tight text-[#1E1E1E]">
            A first edition, made by you.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#1E1E1E]/70 max-w-xl">
            Give your good side a name, a type, and a little extra sparkle.
          </p>
        </div>

        {/* All Changes Saved Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-xs">
          <Check size={14} className="text-emerald-600 stroke-[3]" />
          <span>All Changes Saved</span>
        </div>
      </div>

      {/* Main Grid: Left Controls + Right Preview & Result Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Section 01 / Choose your canvas */}
          <div className="rounded-3xl border border-[#1E1E1E]/15 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#1E1E1E]/10 pb-3">
              <h2 className="text-sm font-black font-display uppercase tracking-wider text-[#1E1E1E]">
                01 / Choose your canvas
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E1E1E]/50">
                4 TEMPLATES
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {templates.map((tplId) => {
                const isSelected = customization.template === tplId;
                const tplConfig = TEMPLATES[tplId];

                return (
                  <button
                    key={tplId}
                    type="button"
                    onClick={() => handleTemplateSelect(tplId)}
                    className={`group flex flex-col items-center rounded-2xl border-2 p-2.5 transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'border-[#1E1E1E] bg-[#FAF8F2] shadow-md ring-2 ring-[#FDE047]'
                        : 'border-[#1E1E1E]/15 bg-white hover:border-[#1E1E1E]/40'
                    }`}
                  >
                    {/* Mini Card Preview */}
                    <div
                      className="relative h-20 w-14 rounded-lg border border-[#1E1E1E] shadow-xs flex flex-col justify-between p-1 overflow-hidden"
                      style={{ background: tplConfig.primaryColor }}
                    >
                      <div className="h-10 w-full overflow-hidden rounded-xs border border-[#1E1E1E]/40 bg-black/10">
                        <img
                          src={selectedPhoto.url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="h-1.5 w-full rounded-xs bg-[#1E1E1E]/20" />
                    </div>

                    <span className="mt-2 text-xs font-black capitalize text-[#1E1E1E] flex items-center gap-1">
                      {tplConfig.name} {isSelected && '✓'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 02 / Build your alter ego */}
          <div className="rounded-3xl border border-[#1E1E1E]/15 bg-white p-6 shadow-sm">
            <div className="border-b border-[#1E1E1E]/10 pb-3">
              <h2 className="text-sm font-black font-display uppercase tracking-wider text-[#1E1E1E]">
                02 / Build your alter ego
              </h2>
            </div>

            {/* Card Name + Character Counter */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60">
                  Card name
                </label>
                <span className="text-[11px] font-semibold text-[#1E1E1E]/40">
                  {customization.name.length} / 20
                </span>
              </div>
              <input
                type="text"
                maxLength={20}
                value={customization.name}
                onChange={(e) =>
                  onUpdateCustomization((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your name"
                className="w-full rounded-xl border border-[#1E1E1E]/20 bg-[#FAF8F2] px-4 py-2.5 text-sm font-bold text-[#1E1E1E] outline-none focus:border-[#1E1E1E]"
              />
            </div>

            {/* HP Stepper */}
            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-1.5">
                HP
              </label>
              <input
                type="number"
                min={10}
                max={999}
                step={10}
                value={customization.hp}
                onChange={(e) =>
                  onUpdateCustomization((prev) => ({ ...prev, hp: Number(e.target.value) || 120 }))
                }
                className="w-full rounded-xl border border-[#1E1E1E]/20 bg-[#FAF8F2] px-4 py-2.5 text-sm font-bold text-[#1E1E1E] outline-none focus:border-[#1E1E1E]"
              />
            </div>

            {/* Elemental Type Pills */}
            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-2">
                Elemental type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {elementTypes.map((item) => {
                  const isSelected = customization.elementType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() =>
                        onUpdateCustomization((prev) => ({ ...prev, elementType: item.type }))
                      }
                      className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FDE047] text-[#1E1E1E] shadow-sm font-black ring-1 ring-[#1E1E1E]/20'
                          : 'border border-[#1E1E1E]/15 bg-[#FAF8F2] text-[#1E1E1E]/70 hover:bg-[#F3EFE6]'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rarity Selector */}
            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-2">
                Rarity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {rarities.map((item) => {
                  const isSelected = customization.rarity === item.rarity;
                  return (
                    <button
                      key={item.rarity}
                      type="button"
                      onClick={() =>
                        onUpdateCustomization((prev) => ({ ...prev, rarity: item.rarity }))
                      }
                      className={`rounded-xl py-2 px-2 text-center text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#EDE9FE] text-purple-900 shadow-sm font-black border border-purple-400'
                          : 'border border-[#1E1E1E]/15 bg-[#FAF8F2] text-[#1E1E1E]/70 hover:bg-[#F3EFE6]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 03 / Add the finishing magic */}
          <div className="rounded-3xl border border-[#1E1E1E]/15 bg-white p-6 shadow-sm">
            <div className="border-b border-[#1E1E1E]/10 pb-3">
              <h2 className="text-sm font-black font-display uppercase tracking-wider text-[#1E1E1E]">
                03 / Add the finishing magic
              </h2>
            </div>

            {/* Holographic Finish Toggle Box */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#1E1E1E]/15 bg-[#FAF8F2] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-200 via-rose-200 to-indigo-200 text-[#1E1E1E] shadow-xs">
                  <Sparkles size={18} />
                </div>
                <div>
                  <strong className="block text-sm font-extrabold text-[#1E1E1E]">
                    Holographic finish
                  </strong>
                  <span className="block text-xs text-[#1E1E1E]/60">
                    Pearlescent border + decorative stars
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() =>
                  onUpdateCustomization((prev) => ({ ...prev, holographic: !prev.holographic }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  customization.holographic ? 'bg-[#1E1E1E]' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={customization.holographic}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#FDE047] shadow-lg ring-0 transition duration-200 ease-in-out ${
                    customization.holographic ? 'translate-x-5' : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
            </div>

            {/* Card Number & Series Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-1.5">
                  Card number
                </label>
                <input
                  type="text"
                  value={customization.cardNumber}
                  onChange={(e) =>
                    onUpdateCustomization((prev) => ({ ...prev, cardNumber: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#1E1E1E]/20 bg-[#FAF8F2] px-3.5 py-2 text-xs font-bold text-[#1E1E1E] outline-none focus:border-[#1E1E1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-1.5">
                  Series
                </label>
                <input
                  type="text"
                  value={customization.series}
                  onChange={(e) =>
                    onUpdateCustomization((prev) => ({ ...prev, series: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#1E1E1E]/20 bg-[#FAF8F2] px-3.5 py-2 text-xs font-bold text-[#1E1E1E] outline-none focus:border-[#1E1E1E]"
                />
              </div>
            </div>

            {/* Reset link & Shot info */}
            <div className="mt-5 pt-3 border-t border-[#1E1E1E]/10 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 font-bold text-[#1E1E1E]/70 hover:text-[#1E1E1E] cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset card details</span>
              </button>

              <span className="font-semibold text-[#1E1E1E]/50">
                Made with your Shot 0{selectedShotIndex + 1}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Big Interactive Card Preview & Action Result Box */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Card Showcase Container */}
          <div className="relative rounded-3xl border border-[#1E1E1E]/15 bg-[#ECE9DF] p-6 sm:p-10 shadow-lg flex flex-col items-center justify-center min-h-[560px]">
            {/* Top Preview Bar */}
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#1E1E1E]/60">
                YOUR FIRST EDITION
              </span>

              <div className="flex items-center gap-1.5 rounded-full bg-[#1E1E1E] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE PREVIEW</span>
              </div>
            </div>

            {/* Sparkles floating around card */}
            <div className="absolute top-1/3 left-6 text-2xl text-purple-600 font-bold hidden sm:block animate-pulse">
              ✦
            </div>
            <div className="absolute bottom-1/4 right-6 text-3xl text-[#1E1E1E] font-bold hidden sm:block">
              ✦
            </div>

            {/* The Big 3D Tilt Card */}
            <div className="my-auto py-2">
              <CardFace
                customization={customization}
                photo={selectedPhoto}
                interactiveTilt={true}
              />
            </div>

            {/* Sub-label under card */}
            <div className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#1E1E1E]/70 text-center">
              {customization.name || 'MIKA'} · {customization.elementType.toUpperCase()} ·{' '}
              {customization.rarity.toUpperCase()}
            </div>
          </div>

          {/* Action Box: Certified One of a Kind */}
          <div className="rounded-3xl border border-[#1E1E1E]/15 bg-white p-6 sm:p-7 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black font-display tracking-tight text-[#1E1E1E]">
                  Certified one of a kind.
                </h3>
                <p className="mt-1 text-xs text-[#1E1E1E]/60">
                  High-resolution PNG • 1500 × 2100 px • Ready to keep
                </p>
              </div>

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 size={18} />
              </div>
            </div>

            {/* Download & Share Buttons */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#FDE047] py-3.5 px-5 text-sm font-black text-[#1E1E1E] shadow-sm transition-transform hover:scale-102 active:scale-98 cursor-pointer"
              >
                <Download size={16} strokeWidth={2.5} />
                <span>{isDownloading ? 'Generating...' : 'Download card'}</span>
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#1E1E1E]/20 bg-white py-3.5 px-5 text-sm font-bold text-[#1E1E1E] shadow-xs transition-colors hover:bg-[#FAF8F2] cursor-pointer"
              >
                <Share2 size={16} />
                <span>Share card</span>
              </button>
            </div>

            {/* Make another card link */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onMakeAnother}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1E1E1E]/70 hover:text-[#1E1E1E] cursor-pointer"
              >
                <span>Not your final form? Make another card</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
