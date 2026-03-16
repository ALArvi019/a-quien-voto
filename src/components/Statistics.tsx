import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { AppView, PartyId, ProvinceStatData } from '../types';
import { getProvinceStats, getNationalStats } from '../lib/supabase';
import { partyMap } from '../data/parties';
import { parties } from '../data/parties';
import { SpainMap } from './SpainMap';
import { ProvinceStats } from './ProvinceStats';
import { provinceMap } from '../data/provinces';

interface Props {
  onNavigate: (view: AppView) => void;
}

export function Statistics({ onNavigate }: Props) {
  const [provStats, setProvStats] = useState<ProvinceStatData[]>([]);
  const [national, setNational] = useState<{ total: number; avgScores: Record<PartyId, number> } | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(false);
    async function load() {
      try {
        const [ps, ns] = await Promise.all([getProvinceStats(), getNationalStats()]);
        if (!ignore) { setProvStats(ps); setNational(ns); }
      } catch {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [retryCount]);

  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const ps of provStats) {
      const party = partyMap[ps.topParty];
      if (party) map[ps.province] = party.color;
    }
    return map;
  }, [provStats]);

  const selectedData = provStats.find((p) => p.province === selectedProvince);

  return (
    <div className="min-h-screen">
      <header className="px-4 py-4 border-b border-gray-800">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            aria-label="Volver a inicio"
            className="py-2 px-3 min-h-[44px] flex items-center text-gray-400 hover:text-white transition-colors"
          >
            ← Inicio
          </button>
          <span className="text-sm text-gray-400">Estadísticas</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Estadísticas nacionales</h1>
          <p className="text-sm text-gray-400">
            Resultados agregados y anónimos de todos los participantes.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12" role="status" aria-label="Cargando">
            <div className="inline-block w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-gray-400 mt-3">Cargando estadísticas...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-gray-400">No se pudieron cargar las estadísticas.</p>
            <button
              onClick={() => setRetryCount((c) => c + 1)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : !national || national.total === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-gray-400">Aún no hay datos suficientes.</p>
            <p className="text-sm text-gray-400">
              Completa el test y selecciona tu provincia para contribuir.
            </p>
            <button
              onClick={() => onNavigate('quiz')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
            >
              Hacer el test
            </button>
          </div>
        ) : (
          <>
            {/* National overview */}
            <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Resumen nacional</h2>
                <span className="text-sm text-gray-400">{national.total} participantes</span>
              </div>
              <div className="grid gap-3">
                {parties.map((party) => {
                  const avg = national.avgScores[party.id] || 0;
                  return (
                    <div key={party.id} className="flex items-center gap-3">
                      <img src={party.logo} alt={party.shortName} className="w-8 h-8 rounded-lg" loading="lazy" />
                      <span className="w-20 text-sm text-gray-300 font-medium">{party.shortName}</span>
                      <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden" role="meter" aria-valuenow={avg} aria-valuemin={0} aria-valuemax={100} aria-label={`${party.shortName}: ${avg}%`}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: party.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${avg}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <span className="w-12 text-right text-sm font-bold" style={{ color: party.color }}>
                        {avg}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white text-center">
                Mapa por provincia
              </h2>
              <p className="text-sm text-gray-400 text-center">
                Cada provincia se colorea según el partido con mayor afinidad media.
              </p>
              <SpainMap
                selected={selectedProvince ?? undefined}
                onSelect={setSelectedProvince}
                colorMap={colorMap}
              />
            </div>

            {/* Selected province detail */}
            {selectedData && <ProvinceStats data={selectedData} />}

            {/* Province table */}
            {provStats.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Datos por provincia</h2>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400">
                        <th className="text-left py-2 px-2">Provincia</th>
                        <th className="text-center py-2 px-1">N</th>
                        {parties.map((p) => (
                          <th key={p.id} className="text-center py-2 px-1" style={{ color: p.color }}>
                            {p.shortName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {provStats
                        .sort((a, b) => b.total - a.total)
                        .map((ps) => (
                          <tr
                            key={ps.province}
                            className="border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer"
                            tabIndex={0}
                            aria-label={`Ver estadísticas de ${provinceMap[ps.province]?.name ?? ps.province}`}
                            onClick={() => setSelectedProvince(ps.province)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProvince(ps.province); } }}
                          >
                            <td className="py-3 px-2 text-gray-300">{provinceMap[ps.province]?.name ?? ps.province}</td>
                            <td className="py-3 px-1 text-center text-gray-400">{ps.total}</td>
                            {parties.map((p) => (
                              <td key={p.id} className="py-3 px-1 text-center text-gray-300">
                                {ps.avgScores[p.id]}%
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
