import { motion } from 'framer-motion';
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

export function PoliticalCompass({ coords }: Props) {
  const px = coordToPixel(coords.economic);
  const py = coordToPixel(coords.social);

  // Generate heatmap gradient cells
  const cells: { x: number; y: number; color: string }[] = [];
  const step = 20;
  for (let gx = 0; gx < SIZE; gx += step) {
    for (let gy = 0; gy < SIZE; gy += step) {
      const normX = ((gx + step / 2) / SIZE) * 20 - 10;
      const normY = ((gy + step / 2) / SIZE) * 20 - 10;
      cells.push({ x: gx, y: gy, color: getHeatmapColor(normX, normY) });
    }
  }

  const quadrantLabel = getQuadrantLabel(coords.economic, coords.social);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-300">Tu brújula política</h3>
      <div className="flex flex-col items-center gap-4">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          {/* Heatmap background */}
          <svg width={SIZE} height={SIZE} className="rounded-xl overflow-hidden">
            {cells.map((cell, i) => (
              <rect
                key={i}
                x={cell.x}
                y={cell.y}
                width={step}
                height={step}
                fill={cell.color}
                opacity={0.3}
              />
            ))}

            {/* Grid lines */}
            <line x1={HALF} y1={0} x2={HALF} y2={SIZE} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
            <line x1={0} y1={HALF} x2={SIZE} y2={HALF} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />

            {/* Quadrant labels */}
            <text x={HALF / 2} y={HALF / 2} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontWeight="bold">
              Izquierda
            </text>
            <text x={HALF / 2} y={HALF / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontWeight="bold">
              Autoritaria
            </text>

            <text x={HALF + HALF / 2} y={HALF / 2} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontWeight="bold">
              Derecha
            </text>
            <text x={HALF + HALF / 2} y={HALF / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontWeight="bold">
              Autoritaria
            </text>

            <text x={HALF / 2} y={HALF + HALF / 2} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontWeight="bold">
              Izquierda
            </text>
            <text x={HALF / 2} y={HALF + HALF / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontWeight="bold">
              Libertaria
            </text>

            <text x={HALF + HALF / 2} y={HALF + HALF / 2} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontWeight="bold">
              Derecha
            </text>
            <text x={HALF + HALF / 2} y={HALF + HALF / 2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={11} fontWeight="bold">
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
          </svg>

          {/* User position dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="absolute w-5 h-5 rounded-full bg-white border-2 border-gray-900 shadow-lg shadow-white/30"
            style={{
              left: px - 10,
              top: py - 10,
            }}
          />

          {/* Glow effect around dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute w-10 h-10 rounded-full bg-white/20 blur-sm"
            style={{
              left: px - 20,
              top: py - 20,
            }}
          />
        </div>

        {/* Coordinates and label */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-white">{quadrantLabel}</p>
          <p className="text-xs text-gray-500">
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
