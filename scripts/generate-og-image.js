#!/usr/bin/env node
/**
 * Generates the static OG image (1200x630) as an SVG, then converts to PNG.
 * Run: node scripts/generate-og-image.js
 * Requires: none (outputs SVG that can be converted with any tool)
 */

import { writeFileSync } from 'fs';

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0a0a1a"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" rx="0" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Title -->
  <text x="${W / 2}" y="200" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold">¿A quién voto?</text>

  <!-- Subtitle -->
  <text x="${W / 2}" y="270" text-anchor="middle" fill="#9ca3af" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="500">Test de afinidad política</text>

  <!-- Divider -->
  <line x1="400" y1="310" x2="800" y2="310" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

  <!-- CTA -->
  <text x="${W / 2}" y="380" text-anchor="middle" fill="#d1d5db" font-family="system-ui, -apple-system, sans-serif" font-size="28">Descubre qué partido se alinea más con tus ideas</text>

  <!-- Party dots -->
  <circle cx="360" cy="460" r="16" fill="#3b82f6"/>
  <circle cx="480" cy="460" r="16" fill="#ef4444"/>
  <circle cx="600" cy="460" r="16" fill="#22c55e"/>
  <circle cx="720" cy="460" r="16" fill="#7c3aed"/>
  <circle cx="840" cy="460" r="16" fill="#f97316"/>

  <text x="360" cy="460" y="510" text-anchor="middle" fill="#9ca3af" font-family="system-ui, -apple-system, sans-serif" font-size="16">PP</text>
  <text x="480" y="510" text-anchor="middle" fill="#9ca3af" font-family="system-ui, -apple-system, sans-serif" font-size="16">PSOE</text>
  <text x="600" y="510" text-anchor="middle" fill="#9ca3af" font-family="system-ui, -apple-system, sans-serif" font-size="16">VOX</text>
  <text x="720" y="510" text-anchor="middle" fill="#9ca3af" font-family="system-ui, -apple-system, sans-serif" font-size="16">Podemos</text>
  <text x="840" y="510" text-anchor="middle" fill="#9ca3af" font-family="system-ui, -apple-system, sans-serif" font-size="16">SALF</text>

  <!-- URL -->
  <text x="${W / 2}" y="${H - 30}" text-anchor="middle" fill="#6b7280" font-family="system-ui, -apple-system, sans-serif" font-size="20">alarvi019.github.io/a-quien-voto</text>
</svg>`;

writeFileSync('public/og-image.svg', svg);
console.log('Generated public/og-image.svg');
console.log('Convert to PNG with: npx @aspect-build/rules_js//image-tools or any SVG-to-PNG tool');
console.log('Or use an online converter like svgtopng.com');
