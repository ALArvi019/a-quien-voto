import { motion } from 'framer-motion';
import type { ProvinceStatData } from '../types';
import { parties } from '../data/parties';
import { provinceMap } from '../data/provinces';

interface Props {
  data: ProvinceStatData;
}

export function ProvinceStats({ data }: Props) {
  const provinceName = provinceMap[data.province]?.name ?? data.province;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-6 space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">
          {provinceName}
        </h3>
        <span className="text-sm text-gray-400">{data.total} participantes</span>
      </div>

      <div className="grid gap-3">
        {parties
          .slice()
          .sort((a, b) => (data.avgScores[b.id] || 0) - (data.avgScores[a.id] || 0))
          .map((party) => {
            const avg = data.avgScores[party.id] || 0;
            return (
              <div key={party.id} className="flex items-center gap-3">
                <img src={party.logo} alt={party.shortName} className="w-7 h-7 rounded-lg" loading="lazy" />
                <span className="w-20 text-sm text-gray-300">{party.shortName}</span>
                <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden" role="meter" aria-valuenow={avg} aria-valuemin={0} aria-valuemax={100} aria-label={`${party.shortName}: ${avg}%`}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: party.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${avg}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="w-10 text-right text-sm font-bold" style={{ color: party.color }}>
                  {avg}%
                </span>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
}
