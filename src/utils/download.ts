import type { CardCustomization, Photo } from '../types';
import { TEMPLATES, getRaritySymbol } from '../types';

const CARD_WIDTH = 1500;
const CARD_HEIGHT = 2100;

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
};

const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });

function drawCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const imgWidth = image.naturalWidth || image.width;
  const imgHeight = image.naturalHeight || image.height;
  const scale = Math.max(width / imgWidth, height / imgHeight);
  const drawWidth = imgWidth * scale;
  const drawHeight = imgHeight * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function getElementSymbol(type: string): string {
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

export async function renderCardToCanvas(
  customization: CardCustomization,
  photoUrl?: string
): Promise<HTMLCanvasElement> {
  const template = TEMPLATES[customization.template] || TEMPLATES.prism;
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Draw Outer Card Background / Foil
  const cardX = 60;
  const cardY = 60;
  const cardW = CARD_WIDTH - 120;
  const cardH = CARD_HEIGHT - 120;
  const cardRadius = 70;

  roundRect(ctx, cardX, cardY, cardW, cardH, cardRadius);

  if (customization.holographic) {
    // Rainbow iridescent holographic foil gradient
    const holo = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    holo.addColorStop(0, '#FFF9C4');
    holo.addColorStop(0.18, '#F59E0B');
    holo.addColorStop(0.38, '#FDE047');
    holo.addColorStop(0.55, '#E0E7FF');
    holo.addColorStop(0.7, '#C7D2FE');
    holo.addColorStop(0.85, '#FDE047');
    holo.addColorStop(1, '#D97706');
    ctx.fillStyle = holo;
  } else {
    // Standard template border
    const border = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    border.addColorStop(0, template.primaryColor);
    border.addColorStop(0.5, '#FFFFFF');
    border.addColorStop(1, template.accentColor);
    ctx.fillStyle = border;
  }
  ctx.fill();

  // Subtle drop shadow / outer outline
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 4;
  ctx.stroke();

  // 2. Draw Inner Card Surface
  const surfaceX = cardX + 40;
  const surfaceY = cardY + 40;
  const surfaceW = cardW - 80;
  const surfaceH = cardH - 80;
  const surfaceRadius = 50;

  roundRect(ctx, surfaceX, surfaceY, surfaceW, surfaceH, surfaceRadius);

  switch (customization.template) {
    case 'tidal':
      ctx.fillStyle = '#BFE3F2';
      break;
    case 'botanic':
      ctx.fillStyle = '#C3E1B9';
      break;
    case 'ember':
      ctx.fillStyle = '#FAC8B5';
      break;
    case 'prism':
    default:
      ctx.fillStyle = '#FCF4A3';
      break;
  }
  ctx.fill();

  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 10;
  ctx.stroke();

  // 3. Header: Card Name + BASIC + HP + Energy Orb
  ctx.fillStyle = '#1E1E1E';
  ctx.textAlign = 'left';

  // Name
  ctx.font = 'bold 68px Arial, sans-serif';
  const nameText = customization.name || 'Mika';
  ctx.fillText(nameText, surfaceX + 45, surfaceY + 115);

  // BASIC badge
  const nameWidth = ctx.measureText(nameText).width;
  const basicX = surfaceX + 55 + nameWidth;
  const basicY = surfaceY + 68;
  roundRect(ctx, basicX, basicY, 90, 40, 8);
  ctx.fillStyle = 'rgba(34, 34, 34, 0.12)';
  ctx.fill();
  ctx.fillStyle = '#222222';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText('BASIC', basicX + 12, basicY + 28);

  // HP
  ctx.textAlign = 'right';
  ctx.fillStyle = '#444444';
  ctx.font = 'bold 32px Arial, sans-serif';
  ctx.fillText('HP', surfaceX + surfaceW - 130, surfaceY + 115);

  ctx.fillStyle = '#1E1E1E';
  ctx.font = 'bold 62px Arial, sans-serif';
  ctx.fillText(String(customization.hp || 120), surfaceX + surfaceW - 75, surfaceY + 115);

  // Energy Circle
  const orbX = surfaceX + surfaceW - 40;
  const orbY = surfaceY + 95;
  ctx.beginPath();
  ctx.arc(orbX, orbY, 32, 0, Math.PI * 2);
  const orbGrad = ctx.createRadialGradient(orbX - 8, orbY - 8, 4, orbX, orbY, 32);
  orbGrad.addColorStop(0, '#FFFFFF');
  orbGrad.addColorStop(1, '#E5E7EB');
  ctx.fillStyle = orbGrad;
  ctx.fill();
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Energy Symbol inside circle
  ctx.textAlign = 'center';
  ctx.font = '30px Arial';
  ctx.fillText(getElementSymbol(customization.elementType), orbX, orbY + 10);

  // 4. Artwork Window & Photo
  const artX = surfaceX + 45;
  const artY = surfaceY + 160;
  const artW = surfaceW - 90;
  const artH = 800;
  const isBotanic = customization.template === 'botanic';
  const artRadii = isBotanic ? [110, 110, 24, 24] : [24, 24, 24, 24];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(artX, artY, artW, artH, artRadii);
  ctx.clip();

  // Dark background behind photo
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(artX, artY, artW, artH);

  // Load and draw photo
  const finalPhotoUrl = photoUrl || '/sample-portrait.png';
  try {
    const img = await loadImage(finalPhotoUrl);
    drawCover(ctx, img, artX, artY, artW, artH);
  } catch (err) {
    // Fallback colored rect
    ctx.fillStyle = '#444444';
    ctx.fillRect(artX, artY, artW, artH);
  }

  // Holographic sheen on art if enabled
  if (customization.holographic) {
    const shine = ctx.createLinearGradient(artX, artY, artX + artW, artY + artH);
    shine.addColorStop(0.2, 'rgba(255, 255, 255, 0)');
    shine.addColorStop(0.48, 'rgba(255, 255, 255, 0.35)');
    shine.addColorStop(0.52, 'rgba(199, 210, 254, 0.4)');
    shine.addColorStop(0.56, 'rgba(254, 202, 202, 0.35)');
    shine.addColorStop(0.8, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = shine;
    ctx.fillRect(artX, artY, artW, artH);
  }
  ctx.restore();

  // Art border
  ctx.beginPath();
  ctx.roundRect(artX, artY, artW, artH, artRadii);
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 6;
  ctx.stroke();

  // "POKESNAP ORIGINAL" pill in upper-left corner of art
  const pillW = 230;
  const pillH = 32;
  const pillX = artX + 16;
  const pillY = artY + 12;
  roundRect(ctx, pillX, pillY, pillW, pillH, 16);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#222222';
  ctx.font = 'bold 17px Arial, sans-serif';
  ctx.fillText('POKESNAP ORIGINAL', pillX + pillW / 2, pillY + 24);

  // Sparkle in bottom right corner of art
  ctx.fillStyle = '#FDE047';
  ctx.font = 'bold 36px Arial';
  ctx.fillText('✦', artX + artW - 35, artY + artH - 25);

  // 5. Species / Sub-bar Ribbon
  const ribbonX = artX;
  const ribbonY = artY + artH + 20;
  const ribbonW = artW;
  const ribbonH = 48;
  roundRect(ctx, ribbonX, ribbonY, ribbonW, ribbonH, 6);
  const ribbonGrad = ctx.createLinearGradient(ribbonX, ribbonY, ribbonX + ribbonW, ribbonY);
  ribbonGrad.addColorStop(0, '#E5E7EB');
  ribbonGrad.addColorStop(0.5, '#F9FAFB');
  ribbonGrad.addColorStop(1, '#E5E7EB');
  ctx.fillStyle = ribbonGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(34, 34, 34, 0.4)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#222222';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText(
    customization.species || template.defaultSpecies,
    ribbonX + ribbonW / 2,
    ribbonY + 32
  );

  // 6. Attacks Section
  const attackY = ribbonY + ribbonH + 45;

  // Attack horizontal divider top
  ctx.beginPath();
  ctx.moveTo(surfaceX + 45, attackY);
  ctx.lineTo(surfaceX + surfaceW - 45, attackY);
  ctx.strokeStyle = 'rgba(34, 34, 34, 0.3)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Attack Line: Sparkle + Attack Name ... Damage
  ctx.textAlign = 'left';
  ctx.fillStyle = '#CA8A04';
  ctx.font = 'bold 36px Arial';
  ctx.fillText('✦', surfaceX + 50, attackY + 58);

  ctx.fillStyle = '#1E1E1E';
  ctx.font = 'bold 44px Arial, sans-serif';
  ctx.fillText(customization.attackName || template.defaultAttack, surfaceX + 95, attackY + 58);

  ctx.textAlign = 'right';
  ctx.font = 'bold 64px Arial, sans-serif';
  ctx.fillText(
    customization.attackDamage || template.defaultDamage,
    surfaceX + surfaceW - 50,
    attackY + 62
  );

  // Attack Description
  ctx.textAlign = 'left';
  ctx.fillStyle = '#444444';
  ctx.font = 'italic 28px Arial, sans-serif';
  ctx.fillText(
    customization.attackDescription || template.defaultDescription,
    surfaceX + 50,
    attackY + 115
  );

  // 7. Weakness / Resistance / Retreat
  const statsY = attackY + 165;
  ctx.beginPath();
  ctx.moveTo(surfaceX + 45, statsY);
  ctx.lineTo(surfaceX + surfaceW - 45, statsY);
  ctx.strokeStyle = 'rgba(34, 34, 34, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = 'bold 24px Arial, sans-serif';
  const col1X = surfaceX + surfaceW * 0.22;
  const col2X = surfaceX + surfaceW * 0.5;
  const col3X = surfaceX + surfaceW * 0.78;

  ctx.fillStyle = '#666666';
  ctx.fillText('weakness', col1X - 35, statsY + 45);
  ctx.fillStyle = '#1E1E1E';
  ctx.fillText(customization.weakness || '+20', col1X + 45, statsY + 45);

  ctx.fillStyle = '#666666';
  ctx.fillText('resistance', col2X - 35, statsY + 45);
  ctx.fillStyle = '#1E1E1E';
  ctx.fillText(customization.resistance || '-30', col2X + 45, statsY + 45);

  ctx.fillStyle = '#666666';
  ctx.fillText('retreat', col3X - 25, statsY + 45);
  ctx.fillStyle = '#1E1E1E';
  ctx.fillText(customization.retreat || '✦', col3X + 35, statsY + 45);

  // 8. Footer: Series & Number + Rarity
  const footY = surfaceY + surfaceH - 30;
  ctx.beginPath();
  ctx.moveTo(surfaceX + 45, footY - 35);
  ctx.lineTo(surfaceX + surfaceW - 45, footY - 35);
  ctx.strokeStyle = 'rgba(34, 34, 34, 0.25)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#444444';
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillText((customization.series || template.defaultSeries).toUpperCase(), surfaceX + 50, footY);

  ctx.textAlign = 'right';
  const rarityText = `${customization.cardNumber || template.defaultNumber} · ${getRaritySymbol(
    customization.rarity
  )}`;
  ctx.fillText(rarityText, surfaceX + surfaceW - 50, footY);

  return canvas;
}

export async function downloadCard(
  customization: CardCustomization,
  photoUrl?: string
): Promise<void> {
  const canvas = await renderCardToCanvas(customization, photoUrl);
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  const safeName = (customization.name || 'card').toLowerCase().replace(/[^a-z0-9]/g, '-');
  link.download = `pokesnap-${safeName}-1500x2100.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function getCardBlob(
  customization: CardCustomization,
  photoUrl?: string
): Promise<Blob | null> {
  const canvas = await renderCardToCanvas(customization, photoUrl);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
  });
}
