import { useRef, useEffect, useState, useCallback } from 'react';
import type { PartyScore } from '../types';
import { partyMap } from '../data/parties';

const SITE_URL = 'https://alarvi019.github.io/a-quien-voto/';
const CARD_W = 600;
const CARD_H_SIMPLE = 340;
const CARD_H_FULL = 400;

type CardMode = 'simple' | 'full';

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}

interface Props {
  scores: PartyScore[];
}

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number, partyColor: string) {
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0a0a1a');
  bg.addColorStop(1, '#111827');
  ctx.fillStyle = bg;
  roundRect(ctx, 0, 0, w, h, 16);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  roundRect(ctx, 0.5, 0.5, w - 1, h - 1, 16);
  ctx.stroke();

  const glow = ctx.createRadialGradient(w / 2, 130, 0, w / 2, 130, 180);
  glow.addColorStop(0, partyColor + '22');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
}

function drawHeader(ctx: CanvasRenderingContext2D, w: number, partyName: string, partyColor: string, score: number) {
  ctx.fillStyle = '#9ca3af';
  ctx.font = '500 14px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Mi mayor afinidad es con', w / 2, 48);

  ctx.fillStyle = partyColor;
  ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
  ctx.fillText(partyName, w / 2, 88);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px system-ui, -apple-system, sans-serif';
  ctx.fillText(`${score}%`, w / 2, 155);
}

function drawFooter(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#6b7280';
  ctx.font = '500 12px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('¿A quién voto? — Haz el test en alarvi019.github.io/a-quien-voto', w / 2, h - 16);
}

function drawSimpleCard(canvas: HTMLCanvasElement, scores: PartyScore[]) {
  const ctx = canvas.getContext('2d');
  if (!ctx || scores.length === 0) return;

  const h = CARD_H_SIMPLE;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = CARD_W * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const top = scores[0];
  const party = partyMap[top.partyId];

  drawBackground(ctx, CARD_W, h, party.color);
  drawHeader(ctx, CARD_W, party.name, party.color, top.totalScore);

  // Ideology subtitle
  ctx.fillStyle = '#9ca3af';
  ctx.font = '500 16px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(party.ideology, CARD_W / 2, 195);

  // CTA
  ctx.fillStyle = '#d1d5db';
  ctx.font = '500 18px system-ui, -apple-system, sans-serif';
  ctx.fillText('¿Con quién coincides tú?', CARD_W / 2, 260);

  // Party color dots
  const dotColors = scores.map(s => partyMap[s.partyId].color);
  const dotSpacing = 40;
  const dotsW = (dotColors.length - 1) * dotSpacing;
  const dotsStartX = (CARD_W - dotsW) / 2;
  dotColors.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(dotsStartX + i * dotSpacing, 290, 6, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? color : color + '55';
    ctx.fill();
  });

  drawFooter(ctx, CARD_W, h);
}

function drawFullCard(canvas: HTMLCanvasElement, scores: PartyScore[]) {
  const ctx = canvas.getContext('2d');
  if (!ctx || scores.length === 0) return;

  const h = CARD_H_FULL;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = CARD_W * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const top = scores[0];
  const party = partyMap[top.partyId];

  drawBackground(ctx, CARD_W, h, party.color);
  drawHeader(ctx, CARD_W, party.name, party.color, top.totalScore);

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 178);
  ctx.lineTo(CARD_W - 40, 178);
  ctx.stroke();

  // Ranking bars
  const barStartX = 160;
  const barMaxW = 350;
  const barH = 22;
  const startY = 196;
  const availableH = h - startY - 42;
  const gap = Math.min(36, Math.floor(availableH / scores.length));

  scores.forEach((s, i) => {
    const p = partyMap[s.partyId];
    const y = startY + i * gap;

    ctx.fillStyle = '#d1d5db';
    ctx.font = '600 13px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(p.shortName, barStartX - 12, y + barH / 2 + 4);

    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    roundRect(ctx, barStartX, y, barMaxW, barH, 6);
    ctx.fill();

    const fillW = Math.max(barMaxW * (s.totalScore / 100), 8);
    const barGrad = ctx.createLinearGradient(barStartX, 0, barStartX + fillW, 0);
    barGrad.addColorStop(0, p.color);
    barGrad.addColorStop(1, p.color + 'aa');
    ctx.fillStyle = barGrad;
    roundRect(ctx, barStartX, y, fillW, barH, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${s.totalScore}%`, barStartX + fillW + 8, y + barH / 2 + 4);
  });

  drawFooter(ctx, CARD_W, h);
}

export function ShareButtons({ scores }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [cardMode, setCardMode] = useState<CardMode>('simple');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const top = scores.length > 0 ? scores[0] : null;
  const party = top ? partyMap[top.partyId] : null;
  const shareText = party && top
    ? `Mi mayor afinidad política es con ${party.shortName} (${top.totalScore}%). ¿Con quién coincides tú? Haz el test:`
    : '';
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(SITE_URL);
  const cardH = cardMode === 'simple' ? CARD_H_SIMPLE : CARD_H_FULL;

  useEffect(() => {
    if (!canvasRef.current || scores.length === 0) return;
    if (cardMode === 'simple') {
      drawSimpleCard(canvasRef.current, scores);
    } else {
      drawFullCard(canvasRef.current, scores);
    }
  }, [scores, cardMode]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const downloadImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'mi-resultado-a-quien-voto.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  const shareNative = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !navigator.share) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'mi-resultado.png', { type: 'image/png' });
      const shareData: ShareData = navigator.canShare?.({ files: [file] })
        ? { text: shareText + ' ' + SITE_URL, files: [file] }
        : { text: shareText + ' ' + SITE_URL };
      try {
        await navigator.share(shareData);
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          console.error('Share failed:', e);
        }
      }
    }, 'image/png');
  }, [shareText]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${SITE_URL}`);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }

  const shareLinks = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-gray-800 hover:bg-gray-700 border border-gray-700',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#1da851]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#0d6ce8]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-[#0088cc] hover:bg-[#006da3]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
  ];

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  if (!top || !party) return null;

  return (
    <section className="space-y-4" aria-label="Compartir resultado">
      <h2 className="text-lg font-semibold text-gray-300">Comparte tu resultado</h2>

      {/* Card mode selector */}
      <fieldset className="flex gap-2 justify-center border-0 p-0 m-0">
        <legend className="sr-only">Tipo de imagen para compartir</legend>
        <label
          className={`px-4 py-2 min-h-[44px] rounded-xl text-sm font-medium transition-colors inline-flex items-center cursor-pointer focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-gray-950 ${
            cardMode === 'simple'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200 border border-gray-700'
          }`}
        >
          <input
            type="radio"
            name="card-mode"
            value="simple"
            checked={cardMode === 'simple'}
            onChange={() => setCardMode('simple')}
            className="sr-only"
          />
          Solo mi partido
        </label>
        <label
          className={`px-4 py-2 min-h-[44px] rounded-xl text-sm font-medium transition-colors inline-flex items-center cursor-pointer focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-gray-950 ${
            cardMode === 'full'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200 border border-gray-700'
          }`}
        >
          <input
            type="radio"
            name="card-mode"
            value="full"
            checked={cardMode === 'full'}
            onChange={() => setCardMode('full')}
            className="sr-only"
          />
          Con ranking completo
        </label>
      </fieldset>

      {/* Visual card preview */}
      <div className="flex justify-center overflow-x-auto">
        <canvas
          ref={canvasRef}
          className="rounded-2xl w-full max-w-[600px]"
          style={{ aspectRatio: `${CARD_W}/${cardH}` }}
          role="img"
          aria-label={`Card de resultado: mayor afinidad con ${party.name} al ${top.totalScore}%${cardMode === 'full' ? ' con ranking completo' : ''}`}
        >Mayor afinidad con {party.name} al {top.totalScore}%</canvas>
      </div>

      {/* Action buttons */}
      <div role="group" className="flex flex-wrap gap-2 justify-center" aria-label="Compartir en redes sociales">
        <button
          onClick={downloadImage}
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl text-white font-medium bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          <span className="text-sm">Guardar imagen</span>
        </button>

        {hasNativeShare && (
          <button
            onClick={shareNative}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-500 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span className="text-sm">Compartir</span>
          </button>
        )}

        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${link.name} (abre en nueva ventana)`}
            className={`inline-flex items-center gap-2 px-3 py-2.5 min-h-[44px] min-w-[44px] rounded-xl text-white font-medium transition-colors ${link.color}`}
          >
            {link.icon}
            <span className="text-sm">{link.name}</span>
          </a>
        ))}

        <button
          onClick={copyLink}
          className="inline-flex items-center gap-2 px-3 py-2.5 min-h-[44px] min-w-[44px] rounded-xl text-gray-300 font-medium bg-gray-800/50 border border-gray-700 hover:border-gray-500 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {copied ? (
              <path d="M20 6L9 17l-5-5" />
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </>
            )}
          </svg>
          <span className="text-sm" aria-live="polite">{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>
    </section>
  );
}
