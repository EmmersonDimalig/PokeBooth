# PokéSnap

PokéSnap is a polished, Pokémon-inspired photobooth built with React, Vite, TypeScript, and Tailwind CSS. It uses original visual styling and wording rather than copyrighted Pokémon artwork.

## Features

- Responsive landing page and guided four-step flow
- Browser webcam access through `MediaDevices.getUserMedia`
- Three-frame capture with an on-screen countdown
- Photo selection with up to three chosen frames
- Card customization for title, caption, color palette, and sticker
- Live card preview with the first selected photo as the main artwork
- Canvas-generated PNG download using the same main artwork and supporting photos
- Demo photo frames are available when camera access is unavailable

## Setup

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Camera access requires a secure context (HTTPS or localhost) and browser permission.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.
