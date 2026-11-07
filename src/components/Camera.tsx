import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera as CameraIcon,
  Maximize,
  Minimize,
  FlipHorizontal,
  SlidersHorizontal,
  ChevronDown,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import { CardFace } from './CardFace';
import { useCamera } from '../hooks/useCamera';
import type { CardCustomization, Photo, TemplateId } from '../types';
import { TEMPLATES } from '../types';

interface CameraProps {
  customization: CardCustomization;
  onUpdateCustomization: (updater: (prev: CardCustomization) => CardCustomization) => void;
  onDone: (photos: Photo[]) => void;
}

export function Camera({ customization, onUpdateCustomization, onDone }: CameraProps) {
  const {
    videoRef,
    devices,
    selectedDeviceId,
    switchCamera,
    cameraConnected,
    cameraError,
    mirrored,
    setMirrored,
    captureFrame,
  } = useCamera();

  const [shotsCount, setShotsCount] = useState<number>(3); // 1, 3, or 4 shots
  const [countdownDuration, setCountdownDuration] = useState<number>(3); // 3, 5, or 10s
  const [activeCountdown, setActiveCountdown] = useState<number | null>(null);
  const [isCapturingBurst, setIsCapturingBurst] = useState<boolean>(false);
  const [capturedPhotos, setCapturedPhotos] = useState<Photo[]>([]);
  const [currentShotIndex, setCurrentShotIndex] = useState<number>(0);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Play synthetic camera shutter sound
  const playShutterSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch {
      // AudioContext not allowed or not supported
    }
  }, []);

  // Single shot capture with flash & sound
  const takeSingleShot = useCallback(async (): Promise<Photo> => {
    setIsFlashing(true);
    playShutterSound();
    setTimeout(() => setIsFlashing(false), 180);

    const frameUrl = captureFrame();
    return {
      id: crypto.randomUUID(),
      url: frameUrl,
      capturedAt: Date.now(),
    };
  }, [captureFrame, playShutterSound]);

  // Handle Burst Capture Sequence
  const startBurstCapture = async () => {
    if (isCapturingBurst) return;
    setIsCapturingBurst(true);
    cancelRef.current = false;
    const collected: Photo[] = [];

    for (let shot = 0; shot < shotsCount; shot++) {
      if (cancelRef.current) break;
      setCurrentShotIndex(shot);

      // Countdown loop
      for (let sec = countdownDuration; sec > 0; sec--) {
        if (cancelRef.current) break;
        setActiveCountdown(sec);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (cancelRef.current) break;
      setActiveCountdown(null);

      // Flash & snap!
      const photo = await takeSingleShot();
      collected.push(photo);
      setCapturedPhotos([...collected]);

      // Brief pause between shots if not last shot
      if (shot < shotsCount - 1 && !cancelRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }

    setActiveCountdown(null);
    setIsCapturingBurst(false);

    if (!cancelRef.current && collected.length > 0) {
      onDone(collected);
    }
  };

  const cancelCountdown = () => {
    cancelRef.current = true;
    setActiveCountdown(null);
    setIsCapturingBurst(false);
  };

  const toggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Allow uploading a custom photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const uploadedPhotos: Photo[] = [
        { id: crypto.randomUUID(), url, capturedAt: Date.now() },
        { id: crypto.randomUUID(), url, capturedAt: Date.now() + 1 },
        { id: crypto.randomUUID(), url, capturedAt: Date.now() + 2 },
      ];
      onDone(uploadedPhotos);
    };
    reader.readAsDataURL(file);
  };

  const currentTemplate = TEMPLATES[customization.template] || TEMPLATES.prism;

  return (
    <div className="py-6 sm:py-8">
      {/* Eyebrow & Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E1E1E]/60">
            THE PHOTOBOOTH
          </span>
          <h1 className="mt-1 text-3xl sm:text-5xl font-black font-display tracking-tight text-[#1E1E1E]">
            Your main-character moment.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#1E1E1E]/70 max-w-xl">
            Get comfy. We'll take {shotsCount} shots, so you can find your favorite.
          </p>
        </div>

        {/* Camera Connected Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{cameraConnected ? 'Camera Connected' : 'Camera Ready (Sample)'}</span>
        </div>
      </div>

      {/* Main Grid: Left Stage + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Photobooth Stage */}
        <div
          ref={stageRef}
          className="lg:col-span-8 relative flex flex-col items-center justify-between rounded-3xl border border-[#1E1E1E]/15 bg-[#ECE9DF] p-6 sm:p-10 shadow-lg min-h-[580px] overflow-hidden"
        >
          {/* Shutter White Flash overlay */}
          {isFlashing && (
            <div className="pointer-events-none absolute inset-0 z-50 bg-white transition-opacity duration-150" />
          )}

          {/* Top badges inside stage */}
          <div className="w-full flex items-center justify-between z-10 mb-4">
            <div className="flex items-center gap-2 rounded-full bg-[#1E1E1E] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>LIVE PREVIEW</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1E1E1E]/70">
              SHOT 0{Math.min(shotsCount, currentShotIndex + 1)} / 0{shotsCount}
            </div>
          </div>

          {/* Center Area: Sparkle Quote + Card + Camera */}
          <div className="relative flex w-full items-center justify-center py-4">
            {/* Left note */}
            <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 flex-col items-start gap-1 text-[#1E1E1E]/70 text-xs font-bold">
              <span className="text-xl text-[#1E1E1E]">✦</span>
              <span className="max-w-[110px] leading-snug">Peace signs? Always rare.</span>
            </div>

            {/* The Live Pokémon Card */}
            <div className="relative">
              <CardFace
                customization={customization}
                isLiveVideo={cameraConnected}
                videoRef={videoRef}
                mirrored={mirrored}
                countdown={activeCountdown}
                interactiveTilt={false}
              />
            </div>
          </div>

          {/* Fallback / Upload prompt if camera is blocked */}
          {cameraError && (
            <div className="my-2 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-50/80 px-4 py-2 text-xs text-amber-900">
              <span>{cameraError}</span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 font-bold underline hover:opacity-80 cursor-pointer"
              >
                <Upload size={14} /> Upload a photo instead
              </button>
            </div>
          )}

          {/* Bottom Stage Controls */}
          <div className="w-full flex flex-col items-center gap-4 mt-6 z-10">
            {/* Get Ready step dots */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E1E1E]/60">
              <span>GET READY</span>
              {[3, 2, 1].map((num) => (
                <span
                  key={num}
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    activeCountdown === num
                      ? 'bg-[#FDE047] text-[#1E1E1E] scale-110 shadow-xs'
                      : 'border border-[#1E1E1E]/20 text-[#1E1E1E]/50'
                  }`}
                >
                  {num}
                </span>
              ))}
            </div>

            {/* Main Action Bar */}
            <div className="flex flex-wrap items-center justify-between w-full gap-4 pt-2 border-t border-[#1E1E1E]/10">
              {/* Left toggles: Mirror & Fullscreen */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMirrored(!mirrored)}
                  className="flex items-center gap-1.5 rounded-full border border-[#1E1E1E]/15 bg-white/70 px-3 py-1.5 text-xs font-bold text-[#1E1E1E] transition-colors hover:bg-white cursor-pointer"
                  title="Toggle mirror view"
                >
                  <FlipHorizontal size={14} />
                  <span>{mirrored ? 'Mirror on' : 'Mirror off'}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1E1E1E]/15 bg-white/70 text-[#1E1E1E] transition-colors hover:bg-white cursor-pointer"
                  title="Toggle fullscreen"
                >
                  {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Center Shutter Button */}
              <div>
                {!isCapturingBurst ? (
                  <button
                    type="button"
                    onClick={startBurstCapture}
                    className="group relative flex items-center gap-3 rounded-full bg-[#1E1E1E] px-8 py-3 text-sm font-black text-white shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span className="flex h-3.5 w-3.5 rounded-full bg-[#FDE047] shadow-sm" />
                    <span>Take {shotsCount} photos</span>
                    <CameraIcon size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={cancelCountdown}
                    className="flex items-center gap-3 rounded-full bg-[#1E1E1E] px-7 py-3 text-sm font-bold text-white shadow-xl cursor-pointer"
                  >
                    <span className="h-3 w-3 rounded-full bg-[#FDE047] animate-ping" />
                    <span>Capturing {shotsCount} photos...</span>
                  </button>
                )}
              </div>

              {/* Right: Cancel button */}
              <div>
                {isCapturingBurst ? (
                  <button
                    type="button"
                    onClick={cancelCountdown}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Cancel countdown
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#1E1E1E]/70 hover:text-[#1E1E1E] cursor-pointer"
                  >
                    <Upload size={13} /> Upload photo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: "Set the scene" Sidebar Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="rounded-3xl border border-[#1E1E1E]/15 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#1E1E1E]/10 pb-4">
              <h2 className="text-xl font-black font-display tracking-tight text-[#1E1E1E]">
                Set the scene
              </h2>
              <SlidersHorizontal size={18} className="text-[#1E1E1E]/70" />
            </div>

            {/* 1. Camera Selector */}
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-2">
                Camera
              </label>
              <div className="relative">
                <select
                  value={selectedDeviceId}
                  onChange={(e) => switchCamera(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#1E1E1E]/20 bg-[#FAF8F2] px-4 py-3 text-sm font-semibold text-[#1E1E1E] outline-none focus:border-[#1E1E1E] cursor-pointer"
                >
                  {devices.length > 0 ? (
                    devices.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label}
                      </option>
                    ))
                  ) : (
                    <option value="">FaceTime HD Camera / Built-in</option>
                  )}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1E1E1E]/60"
                />
              </div>
            </div>

            {/* 2. Photos per session */}
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-2">
                Photos per session
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 3, 4].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setShotsCount(count)}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      shotsCount === count
                        ? 'bg-[#FDE047] text-[#1E1E1E] shadow-sm font-black'
                        : 'border border-[#1E1E1E]/15 bg-[#FAF8F2] text-[#1E1E1E]/70 hover:bg-[#F3EFE6]'
                    }`}
                  >
                    {count} {count === 1 ? 'shot' : 'shots'}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Countdown Duration */}
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-2">
                Countdown
              </label>
              <div className="relative">
                <select
                  value={countdownDuration}
                  onChange={(e) => setCountdownDuration(Number(e.target.value))}
                  className="w-full appearance-none rounded-xl border border-[#1E1E1E]/20 bg-[#FAF8F2] px-4 py-3 text-sm font-semibold text-[#1E1E1E] outline-none focus:border-[#1E1E1E] cursor-pointer"
                >
                  <option value={3}>3 seconds</option>
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1E1E1E]/60"
                />
              </div>
            </div>

            {/* 4. Starting template */}
            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1E1E]/60 mb-2">
                Starting template
              </label>
              <div
                onClick={() => {
                  const templates: TemplateId[] = ['prism', 'tidal', 'botanic', 'ember'];
                  const currentIndex = templates.indexOf(customization.template);
                  const nextTemplate = templates[(currentIndex + 1) % templates.length];
                  onUpdateCustomization((prev) => ({
                    ...prev,
                    template: nextTemplate,
                    elementType: TEMPLATES[nextTemplate].element,
                  }));
                }}
                className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-[#1E1E1E]/15 bg-[#FAF8F2] p-3 transition-all hover:border-[#1E1E1E] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-9 rounded-md border border-[#1E1E1E] shadow-sm flex items-center justify-center text-xs overflow-hidden"
                    style={{ background: currentTemplate.primaryColor }}
                  >
                    <img src="/sample-portrait.png" alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <strong className="block text-sm font-extrabold text-[#1E1E1E]">
                      {currentTemplate.name}
                    </strong>
                    <span className="block text-xs text-[#1E1E1E]/60">
                      {currentTemplate.tagline}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 underline group-hover:text-black">
                  Change after your shots
                </span>
              </div>
            </div>

            {/* A Little Camera Wisdom */}
            <div className="mt-6 rounded-2xl border border-[#1E1E1E]/10 bg-[#FAF8F2] p-4 text-xs text-[#1E1E1E]/80">
              <span className="block font-black uppercase tracking-wider text-[#1E1E1E] mb-1">
                A LITTLE CAMERA WISDOM
              </span>
              <p className="leading-relaxed">
                Face a window, keep your eyes on the lens, and leave a little room for your rare energy.
              </p>
            </div>

            {/* Privacy Guarantee */}
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#1E1E1E]/60">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Nothing uploads. This moment is just yours.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
