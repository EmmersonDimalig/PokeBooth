export type Step = 'welcome' | 'capture' | 'select' | 'customize';

export type TemplateId = 'prism' | 'tidal' | 'botanic' | 'ember';
export type ElementType = 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'colorless';
export type RarityType = 'common' | 'rare' | 'ultra' | 'legendary';

export interface Photo {
  id: string;
  url: string;
  capturedAt: number;
}

export interface CardCustomization {
  template: TemplateId;
  name: string;
  hp: number;
  elementType: ElementType;
  rarity: RarityType;
  holographic: boolean;
  cardNumber: string;
  series: string;
  attackName: string;
  attackDamage: string;
  attackDescription: string;
  species: string;
  weakness: string;
  resistance: string;
  retreat: string;
}

export interface CameraDevice {
  deviceId: string;
  label: string;
}

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  tagline: string;
  badge: string;
  element: ElementType;
  primaryColor: string;
  accentColor: string;
  cardBg: string;
  borderFoil: string;
  defaultSeries: string;
  defaultNumber: string;
  defaultSpecies: string;
  defaultAttack: string;
  defaultDamage: string;
  defaultDescription: string;
}

export function getRaritySymbol(rarity: RarityType): string {
  switch (rarity) {
    case 'common':
      return 'COMMON ●';
    case 'rare':
      return 'RARE ★';
    case 'ultra':
      return 'ULTRA RARE ★★';
    case 'legendary':
      return 'LEGENDARY ✦✦✦';
    default:
      return 'ULTRA RARE ★★';
  }
}

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  prism: {
    id: 'prism',
    name: 'Prism',
    tagline: 'For the spotlight seekers.',
    badge: 'ELECTRIC / ULTRA RARE',
    element: 'electric',
    primaryColor: '#FCF5A8',
    accentColor: '#DFC85B',
    cardBg: '#FCF5A8',
    borderFoil: '#DFC85B',
    defaultSeries: 'Prism · 2026',
    defaultNumber: '025 / 151',
    defaultSpecies: 'NO. 025 · GOOD VIBES POKÉMON · ELECTRIC TYPE',
    defaultAttack: 'Main Character Energy',
    defaultDamage: '90',
    defaultDescription: 'A little confidence. A lot of sparkle. This moment is officially one of a kind.',
  },
  tidal: {
    id: 'tidal',
    name: 'Tidal',
    tagline: 'Cool, calm, collectible.',
    badge: 'WATER / RARE',
    element: 'water',
    primaryColor: '#C3E7F4',
    accentColor: '#4F859D',
    cardBg: '#C3E7F4',
    borderFoil: '#4F859D',
    defaultSeries: 'Tidal · 2026',
    defaultNumber: '007 / 151',
    defaultSpecies: 'NO. 007 · GOOD VIBES POKÉMON · WATER TYPE',
    defaultAttack: 'Main Character Energy',
    defaultDamage: '90',
    defaultDescription: 'A little confidence. A lot of sparkle. This moment is officially one of a kind.',
  },
  botanic: {
    id: 'botanic',
    name: 'Botanic',
    tagline: 'A little wild. All you.',
    badge: 'GRASS / COMMON',
    element: 'grass',
    primaryColor: '#C6E7BF',
    accentColor: '#4E7854',
    cardBg: '#C6E7BF',
    borderFoil: '#4E7854',
    defaultSeries: 'Botanic · 2026',
    defaultNumber: '001 / 151',
    defaultSpecies: 'NO. 001 · GOOD VIBES POKÉMON · GRASS TYPE',
    defaultAttack: 'Main Character Energy',
    defaultDamage: '90',
    defaultDescription: 'A little confidence. A lot of sparkle. This moment is officially one of a kind.',
  },
  ember: {
    id: 'ember',
    name: 'Ember',
    tagline: 'Bring your own heat.',
    badge: 'FIRE / LEGENDARY',
    element: 'fire',
    primaryColor: '#FAC9B6',
    accentColor: '#DC9882',
    cardBg: '#FAC9B6',
    borderFoil: '#DC9882',
    defaultSeries: 'Ember · 2026',
    defaultNumber: '004 / 151',
    defaultSpecies: 'NO. 004 · GOOD VIBES POKÉMON · FIRE TYPE',
    defaultAttack: 'Main Character Energy',
    defaultDamage: '90',
    defaultDescription: 'A little confidence. A lot of sparkle. This moment is officially one of a kind.',
  },
};
