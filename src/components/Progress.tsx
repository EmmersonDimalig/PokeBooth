import { Check } from 'lucide-react';
import type { Step } from '../types';

interface ProgressProps {
  step: Step;
  onStepClick?: (targetStep: Step) => void;
}

export function Progress({ step, onStepClick }: ProgressProps) {
  const steps: { id: Step; number: string; title: string }[] = [
    { id: 'capture', number: '01', title: 'Strike a pose' },
    { id: 'select', number: '02', title: 'Pick your shot' },
    { id: 'customize', number: '03', title: 'Make it yours' },
  ];

  const getStepIndex = (s: Step) => {
    switch (s) {
      case 'capture':
        return 0;
      case 'select':
        return 1;
      case 'customize':
        return 2;
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(step);

  return (
    <div className="flex items-center gap-2 sm:gap-4" aria-label="Photobooth steps">
      {steps.map((item, index) => {
        const isDone = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={item.id} className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              disabled={!isDone && !isActive}
              onClick={() => isDone && onStepClick?.(item.id)}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold transition-opacity ${
                isActive
                  ? 'text-[#1E1E1E]'
                  : isDone
                  ? 'text-[#1E1E1E]/80 cursor-pointer hover:opacity-80'
                  : 'text-[#1E1E1E]/40 cursor-default'
              }`}
            >
              <div
                className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-[#FDE047] text-[#1E1E1E]'
                    : isActive
                    ? 'bg-[#1E1E1E] text-white shadow-sm'
                    : 'border border-[#1E1E1E]/20 text-[#1E1E1E]/40'
                }`}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : item.number}
              </div>
              <span className="hidden md:inline">{item.title}</span>
            </button>

            {index < steps.length - 1 && (
              <div className="h-[1px] w-6 sm:w-10 bg-[#1E1E1E]/15" />
            )}
          </div>
        );
      })}
    </div>
  );
}
