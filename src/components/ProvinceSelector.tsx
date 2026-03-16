import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AppView, PartyId, PartyScore } from '../types';
import { SpainMap } from './SpainMap';
import { provinces } from '../data/provinces';
import { saveResult } from '../lib/supabase';

interface Props {
  scores: PartyScore[];
  onNavigate: (view: AppView) => void;
  onProvinceSaved: () => void;
}

export function ProvinceSelector({ scores, onNavigate, onProvinceSaved }: Props) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedName = provinces.find((p) => p.id === selectedProvince)?.name;

  const handleConfirm = async () => {
    if (!selectedProvince || scores.length === 0) return;
    setSaving(true);

    const partyScores = {} as Record<PartyId, number>;
    for (const s of scores) {
      partyScores[s.partyId] = s.totalScore;
    }

    await saveResult({
      province: selectedProvince,
      party_scores: partyScores,
      top_party: scores[0].partyId,
    });

    setSaving(false);
    onProvinceSaved();
  };

  return (
    <div className="min-h-screen">
      <header className="px-4 py-4 border-b border-gray-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Inicio
          </button>
          <span className="text-sm text-gray-400">Selecciona tu provincia</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-2"
        >
          <h1 className="text-2xl font-bold text-white">
            Antes de ver tus resultados...
          </h1>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Selecciona tu provincia para contribuir anónimamente a las estadísticas.
            Solo guardamos tu provincia y los % de afinidad, nada más.
          </p>
        </motion.div>

        <SpainMap selected={selectedProvince ?? undefined} onSelect={setSelectedProvince} />

        {/* Province dropdown for mobile */}
        <div className="sm:hidden">
          <label htmlFor="province-select" className="sr-only">Selecciona tu provincia</label>
          <select
            id="province-select"
            value={selectedProvince ?? ''}
            onChange={(e) => setSelectedProvince(e.target.value || null)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white"
          >
            <option value="">Selecciona una provincia</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {selectedName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
            aria-live="polite"
          >
            <p className="text-lg text-white">
              Provincia: <strong>{selectedName}</strong>
            </p>

            <button
              onClick={handleConfirm}
              disabled={saving}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
            >
              {saving ? 'Guardando...' : 'Ver mis resultados →'}
            </button>
          </motion.div>
        )}

        {!selectedName && (
          <div className="text-center pt-2">
            <button
              onClick={onProvinceSaved}
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors underline underline-offset-4"
            >
              Saltar y ver resultados sin contribuir
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
