import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Camera } from './components/Camera';
import { SelectPhotos } from './components/SelectPhotos';
import { Customize } from './components/Customize';
import { Logo } from './components/Logo';
import { Progress } from './components/Progress';
import { HelpModal } from './components/HelpModal';
import { ArrowLeft, HelpCircle, ArrowUpRight } from 'lucide-react';
import type { CardCustomization, Photo, Step, TemplateId } from './types';
import { TEMPLATES } from './types';

const defaultCustomization: CardCustomization = {
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

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(1); // Default to shot 2 as in Figma
  const [customization, setCustomization] = useState<CardCustomization>(defaultCustomization);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  const startPhotobooth = (startingTemplate?: TemplateId) => {
    if (startingTemplate) {
      const config = TEMPLATES[startingTemplate];
      setCustomization((prev) => ({
        ...prev,
        template: startingTemplate,
        elementType: config.element,
        series: config.defaultSeries,
        cardNumber: config.defaultNumber,
        species: config.defaultSpecies,
        attackName: config.defaultAttack,
        attackDamage: config.defaultDamage,
        attackDescription: config.defaultDescription,
      }));
    }
    setStep('capture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCardLabDirectly = () => {
    // If no photos yet, use sample portrait
    if (photos.length === 0) {
      setPhotos([
        { id: 'sample-1', url: '/sample-portrait.png', capturedAt: 1 },
        { id: 'sample-2', url: '/sample-portrait.png', capturedAt: 2 },
        { id: 'sample-3', url: '/sample-portrait.png', capturedAt: 3 },
      ]);
      setSelectedPhotoIndex(1);
    }
    setStep('customize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCaptureDone = (captured: Photo[]) => {
    setPhotos(captured);
    setSelectedPhotoIndex(captured.length > 1 ? 1 : 0);
    setStep('select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeSingle = (index: number, newPhoto: Photo) => {
    const updated = [...photos];
    updated[index] = newPhoto;
    setPhotos(updated);
  };

  const handleBack = () => {
    if (step === 'capture') setStep('welcome');
    else if (step === 'select') setStep('capture');
    else if (step === 'customize') setStep('select');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#1E1E1E] flex flex-col font-sans selection:bg-[#FDE047] selection:text-[#1E1E1E]">
      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* TOP HEADER */}
      <header className="border-b border-[#1E1E1E]/10 bg-[#FAF8F2] px-6 lg:px-12 py-3.5 sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo
            suffix={step === 'welcome' ? '▾' : '✦'}
            onClick={() => setStep('welcome')}
          />

          <div className="flex items-center gap-6 sm:gap-8">
            {step === 'welcome' ? (
              <>
                <nav className="hidden items-center gap-7 text-xs font-black uppercase tracking-wider text-[#1E1E1E]/70 md:flex">
                  <a href="#how" className="hover:text-[#1E1E1E] transition-colors">
                    How it works
                  </a>
                  <a href="#lab" className="hover:text-[#1E1E1E] transition-colors">
                    The card lab
                  </a>
                  <a href="#faq" className="hover:text-[#1E1E1E] transition-colors">
                    FAQ
                  </a>
                </nav>

                <button
                  type="button"
                  onClick={() => startPhotobooth()}
                  className="flex items-center gap-1.5 rounded-full bg-[#FDE047] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#1E1E1E] shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Start photobooth</span>
                  <ArrowUpRight size={14} strokeWidth={2.8} />
                </button>
              </>
            ) : (
              <>
                <span className="hidden sm:inline-block rounded-full bg-[#FDE047] px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#1E1E1E] shadow-xs">
                  THE CREATIVE STUDIO
                </span>

                <button
                  type="button"
                  onClick={() => setIsHelpOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#1E1E1E]/70 hover:text-[#1E1E1E] cursor-pointer"
                >
                  <span>Need a hand?</span>
                  <HelpCircle size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* STUDIO SUB-BAR WITH STEPPER (for capture, select, customize) */}
      {step !== 'welcome' && (
        <div className="border-b border-[#1E1E1E]/10 bg-[#FAF8F2] px-6 lg:px-12 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Back button */}
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-bold text-[#1E1E1E]/70 hover:text-[#1E1E1E] cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>{step === 'capture' ? 'Back to home' : 'Back'}</span>
            </button>

            {/* Stepper */}
            <Progress step={step} onStepClick={(target) => setStep(target)} />

            {/* Session indicator */}
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1E1E1E]/50">
              SESSION 001
            </span>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 lg:px-12 pb-16">
        {step === 'welcome' && (
          <LandingPage
            onStart={startPhotobooth}
            onOpenCardLab={openCardLabDirectly}
          />
        )}

        {step === 'capture' && (
          <Camera
            customization={customization}
            onUpdateCustomization={setCustomization}
            onDone={handleCaptureDone}
          />
        )}

        {step === 'select' && (
          <SelectPhotos
            photos={photos}
            customization={customization}
            selectedPhotoIndex={selectedPhotoIndex}
            onSelectPhoto={(idx) => setSelectedPhotoIndex(idx)}
            onRetakeAll={() => setStep('capture')}
            onRetakeSingle={handleRetakeSingle}
            onNext={() => setStep('customize')}
          />
        )}

        {step === 'customize' && (
          <Customize
            customization={customization}
            onUpdateCustomization={setCustomization}
            selectedPhoto={photos[selectedPhotoIndex] || { id: 'fallback', url: '/sample-portrait.png', capturedAt: 0 }}
            selectedShotIndex={selectedPhotoIndex}
            onMakeAnother={() => {
              setPhotos([]);
              setStep('capture');
            }}
          />
        )}
      </main>

      {/* STUDIO FOOTER (for capture, select, customize) */}
      {step !== 'welcome' && (
        <footer className="border-t border-[#1E1E1E]/10 bg-[#FAF8F2] px-6 lg:px-12 py-4 text-xs text-[#1E1E1E]/60">
          <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span>◎</span>
              <span>Your camera. Your moment. Photos stay in your browser.</span>
            </div>
            <span>A fan-made creative project. Not affiliated with Pokémon.</span>
          </div>
        </footer>
      )}
    </div>
  );
}
