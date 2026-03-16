import type { CompassCoords } from '../utils/compass';

interface Props {
  coords: CompassCoords;
}

const SIZE = 300;
const HALF = SIZE / 2;

function coordToPixel(value: number): number {
  // -10..+10 → 0..SIZE
  return HALF + (value / 10) * HALF;
}

function getHeatmapColor(x: number, y: number): string {
  // x: -10 (left) to +10 (right)
  // y: -10 (libertarian) to +10 (authoritarian)
  const r = Math.round(128 + (x / 10) * 80 + (y / 10) * 47);
  const g = Math.round(128 - Math.abs(x / 10) * 50 - Math.abs(y / 10) * 50);
  const b = Math.round(128 - (x / 10) * 80 + (y / 10) * 47);

  return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
}

function clamp(v: number): number {
  return Math.max(0, Math.min(255, v));
}

// Pre-computed heatmap cells (constant, no need to recalculate per render)
const STEP = 20;
const CELLS: { x: number; y: number; color: string }[] = [];
for (let gx = 0; gx < SIZE; gx += STEP) {
  for (let gy = 0; gy < SIZE; gy += STEP) {
    const normX = ((gx + STEP / 2) / SIZE) * 20 - 10;
    const normY = ((gy + STEP / 2) / SIZE) * 20 - 10;
    CELLS.push({ x: gx, y: gy, color: getHeatmapColor(normX, normY) });
  }
}

export function PoliticalCompass({ coords }: Props) {
  const px = coordToPixel(coords.economic);
  const py = coordToPixel(coords.social);
  const quadrantLabel = getQuadrantLabel(coords.economic, coords.social);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-300">Tu brújula política</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full" style={{ maxWidth: SIZE, aspectRatio: '1' }}>
          {/* Heatmap background */}
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full rounded-xl overflow-hidden" role="img" aria-label={`Brújula política. Tu posición: ${quadrantLabel}`}>
            {CELLS.map((cell, i) => (
              <rect
                key={i}
                x={cell.x}
                y={cell.y}
                width={STEP}
                height={STEP}
                fill={cell.color}
                opacity={0.3}
              />
            ))}

            {/* Grid lines */}
            <line x1={HALF} y1={0} x2={HALF} y2={SIZE} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
            <line x1={0} y1={HALF} x2={SIZE} y2={HALF} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />

            {/* Quadrant labels */}
            <text x={HALF / 2} y={HALF / 2} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="bold">
              Izquierda
            </text>
            <text x={HALF / 2} y={HALF / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="bold">
              Autoritaria
            </text>

            <text x={HALF + HALF / 2} y={HALF / 2} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="bold">
              Derecha
            </text>
            <text x={HALF + HALF / 2} y={HALF / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="bold">
              Autoritaria
            </text>

            <text x={HALF / 2} y={HALF + HALF / 2} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="bold">
              Izquierda
            </text>
            <text x={HALF / 2} y={HALF + HALF / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="bold">
              Libertaria
            </text>

            <text x={HALF + HALF / 2} y={HALF + HALF / 2} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="bold">
              Derecha
            </text>
            <text x={HALF + HALF / 2} y={HALF + HALF / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="bold">
              Libertaria
            </text>

            {/* Axis labels */}
            <text x={HALF} y={14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10}>
              Autoritario
            </text>
            <text x={HALF} y={SIZE - 5} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10}>
              Libertario
            </text>
            <text x={8} y={HALF - 5} textAnchor="start" fill="rgba(255,255,255,0.5)" fontSize={10}>
              Izq.
            </text>
            <text x={SIZE - 8} y={HALF - 5} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize={10}>
              Der.
            </text>

            {/* Border */}
            <rect x={0} y={0} width={SIZE} height={SIZE} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2} rx={12} />

            {/* User position dot */}
            <circle cx={px} cy={py} r={12} fill="rgba(255,255,255,0.15)" />
            <circle cx={px} cy={py} r={8} fill="white" stroke="#111827" strokeWidth={2} />
          </svg>
        </div>

        {/* Coordinates and label */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-white">{quadrantLabel}</p>
          <p className="text-xs text-gray-400">
            Económico: <span className={coords.economic < 0 ? 'text-red-400' : 'text-blue-400'}>
              {coords.economic > 0 ? '+' : ''}{coords.economic}
            </span>
            {' · '}
            Social: <span className={coords.social < 0 ? 'text-green-400' : 'text-orange-400'}>
              {coords.social > 0 ? '+' : ''}{coords.social}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function getQuadrantLabel(economic: number, social: number): string {
  const eLabel = Math.abs(economic) < 1.5 ? 'Centro' : economic < 0 ? 'Izquierda' : 'Derecha';
  const sLabel = Math.abs(social) < 1.5 ? '' : social < 0 ? ' Libertaria' : ' Autoritaria';

  if (eLabel === 'Centro' && !sLabel) return 'Centro';
  if (eLabel === 'Centro') return `Centro${sLabel}`;
  return `${eLabel}${sLabel}`;
}
