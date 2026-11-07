export function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mb-10 max-w-3xl"><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-coral">{eyebrow}</p><h2 className="font-display text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl">{title}</h2><p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/60">{text}</p></div>;
}
