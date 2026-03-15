import { useState } from 'react';
import { provinces } from '../data/provinces';

interface Props {
  selected?: string;
  onSelect: (provinceId: string) => void;
  colorMap?: Record<string, string>;
}

export function SpainMap({ selected, onSelect, colorMap }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredProvince = provinces.find((p) => p.id === hovered);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {hoveredProvince && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-lg pointer-events-none">
          {hoveredProvince.name}
        </div>
      )}
      <svg
        viewBox="0 0 1000 800"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Mapa de España por provincias"
      >
        {provinces.map((prov) => {
          const isSelected = selected === prov.id;
          const isHovered = hovered === prov.id;
          const fillColor = colorMap?.[prov.id] || (isSelected ? '#3b82f6' : '#374151');

          return (
            <path
              key={prov.id}
              d={prov.path}
              fill={fillColor}
              stroke="#1f2937"
              strokeWidth={isSelected || isHovered ? 2 : 1}
              className="transition-[fill,opacity,stroke-width] duration-150"
              onClick={() => onSelect(prov.id)}
              onMouseEnter={() => setHovered(prov.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                opacity: isSelected ? 1 : isHovered ? 0.9 : 0.75,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
