import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AppView, PartyId, PartyScore } from '../types';
import { SpainMap } from './SpainMap';
import { provinces } from '../data/provinces';
import { saveResult } from '../lib/supabase';

interface Props {
  scores: PartyScore[];
  onNavigate: (view: AppView) => void;
}

export function ProvinceSelector({ scores, onNavigate }: Props) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const selectedName = provinces.find((p) => p.id === selectedProvince)?.name;

  const handleSave = async () => {
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
    setSaved(true);
  };

  return (
    <div className="min-h-screen">
      <header className="px-4 py-4 border-b border-gray-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('results')}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Resultados
          </button>
          <span className="text-sm text-gray-500">Selecciona tu provincia</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-2"
        >
          <h1 className="text-2xl font-bold text-white">
            Contribuye a las estadísticas
          </h1>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Selecciona tu provincia en el mapa para contribuir anónimamente.
            Solo guardamos tu provincia y los % de afinidad, nada más.
          </p>
        </motion.div>

        <SpainMap selected={selectedProvince ?? undefined} onSelect={setSelectedProvince} />

        {/* Province dropdown for mobile */}
        <div className="sm:hidden">
          <select
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
          >
            <p className="text-lg text-white">
              Provincia seleccionada: <strong>{selectedName}</strong>
            </p>

            {saved ? (
              <div className="space-y-3">
                <p className="text-green-400 font-semibold">
                  ¡Gracias por contribuir!
                </p>
                <button
                  onClick={() => onNavigate('statistics')}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors cursor-pointer"
                >
                  Ver estadísticas →
                </button>
              </div>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {saving ? 'Guardando...' : 'Enviar resultados anónimos'}
              </button>
            )}
          </motion.div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('results')}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
          >
            Omitir y volver a resultados
          </button>
        </div>
      </main>
    </div>
  );
}
