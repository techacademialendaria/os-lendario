import type { ColorFormats } from '../types';

/**
 * Calculate color formats (HEX, RGB, CMYK) from a hex color
 */
export const getColorFormats = (hex: string): ColorFormats => {
  // Remove hash
  const cleanHex = hex.replace('#', '');

  // Parse RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Calculate CMYK
  let c = 0,
    m = 0,
    y = 0,
    k = 0;

  // Normalize to [0, 1]
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;

  k = 1 - Math.max(rN, gN, bN);

  if (k < 1) {
    c = (1 - rN - k) / (1 - k);
    m = (1 - gN - k) / (1 - k);
    y = (1 - bN - k) / (1 - k);
  } else {
    c = 0;
    m = 0;
    y = 0; // Black
  }

  return {
    hex: `#${cleanHex.toUpperCase()}`,
    rgb: `${r}, ${g}, ${b}`,
    cmyk: `${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)}`,
  };
};

/**
 * Calculate brightness for sorting (0 to 255)
 */
export const getBrightness = (hex: string): number => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
};
