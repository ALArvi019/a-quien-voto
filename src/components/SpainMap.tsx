import { useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { provinces } from '../data/provinces';

interface Props {
  selected?: string;
  onSelect: (provinceId: string) => void;
  colorMap?: Record<string, string>;
}

const WIDTH = 800;
const HEIGHT = 820;

const CANARY_IDS = new Set(['35', '38']);

// Canary box position and size
const CANARY_BOX = { x: 60, y: 610, w: 260, h: 150 };

export function SpainMap({ selected, onSelect, colorMap }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredProvince = provinces.find((p) => p.id === hovered);

  const { pathGenerator, canaryPathGenerator } = useMemo(() => {
    // Main projection for peninsula + Balearic Islands
    const projection = geoMercator()
      .center([-3.7, 40.0])
      .scale(2800)
      .translate([WIDTH / 2, 330]);

    // Canary Islands projection - centered in bottom-left box
    const canaryProjection = geoMercator()
      .center([-15.5, 28.1])
      .scale(2800)
      .translate([
        CANARY_BOX.x + CANARY_BOX.w / 2 + 10,
        CANARY_BOX.y + CANARY_BOX.h / 2 + 20,
      ]);

    return {
      pathGenerator: geoPath().projection(projection),
      canaryPathGenerator: geoPath().projection(canaryProjection),
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {hoveredProvince && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-lg pointer-events-none">
          {hoveredProvince.name}
        </div>
      )}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="group"
        aria-label="Mapa de España por provincias"
      >
        {/* Canary Islands box */}
        <rect
          x={CANARY_BOX.x}
          y={CANARY_BOX.y}
          width={CANARY_BOX.w}
          height={CANARY_BOX.h}
          fill="none"
          stroke="#374151"
          strokeWidth={1}
          strokeDasharray="4 2"
          rx={4}
        />
        <text x={CANARY_BOX.x + 10} y={CANARY_BOX.y + 18} fill="#6b7280" fontSize={12}>
          Islas Canarias
        </text>

        {provinces.map((prov) => {
          const isCanary = CANARY_IDS.has(prov.id);
          const gen = isCanary ? canaryPathGenerator : pathGenerator;
          const d = gen(prov.geometry as Parameters<typeof gen>[0]);
          if (!d) return null;

          const isSelected = selected === prov.id;
          const isHovered = hovered === prov.id;
          const fillColor =
            colorMap?.[prov.id] || (isSelected ? '#3b82f6' : '#374151');

          return (
            <path
              key={prov.id}
              d={d}
              fill={fillColor}
              stroke="#1f2937"
              strokeWidth={isSelected || isHovered ? 2 : 0.5}
              className="transition-[fill,opacity,stroke-width] duration-150 cursor-pointer"
              aria-hidden="true"
              onClick={() => onSelect(prov.id)}
              onMouseEnter={() => setHovered(prov.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                opacity: isSelected ? 1 : isHovered ? 0.9 : 0.75,
              }}
            >
              <title>{prov.name}</title>
            </path>
          );
        })}
      </svg>
    </div>
  );
}
