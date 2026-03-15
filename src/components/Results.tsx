import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Answer, AppView, PartyScore } from '../types';
import { PartyCard } from './PartyCard';
import { PoliticalCompass } from './PoliticalCompass';
import { partyMap } from '../data/parties';
import { calculateCompassPosition } from '../utils/compass';
import { questions } from '../data/questions';

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

interface Props {
  scores: PartyScore[];
  answers: Record<string, Answer>;
  onNavigate: (view: AppView) => void;
}

export function Results({ scores, answers, onNavigate }: Props) {
  const topParty = scores[0] ? partyMap[scores[0].partyId] : null;
  const animatedScore = useCountUp(scores[0]?.totalScore ?? 0);
  const compassCoords = calculateCompassPosition(questions, answers);

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
          <span className="text-sm text-gray-400">Resultados</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {topParty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3"
          >
            <p className="text-gray-400 text-sm">Tu mayor afinidad es con</p>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: topParty.color }}>
              {topParty.name}
            </h1>
            <p className="text-5xl font-bold text-white">{animatedScore}%</p>
            <p className="text-gray-400 max-w-md mx-auto text-sm">{topParty.description}</p>
          </motion.div>
        )}

        <PoliticalCompass coords={compassCoords} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-300">Ranking completo</h2>
          {scores.map((s, i) => (
            <PartyCard key={s.partyId} score={s} rank={i} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => onNavigate('province')}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
          >
            Seleccionar mi provincia
          </button>
          <button
            onClick={() => onNavigate('statistics')}
            className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors"
          >
            Ver estadísticas
          </button>
          <button
            onClick={() => onNavigate('landing')}
            className="flex-1 px-6 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold rounded-xl transition-colors"
          >
            Repetir test
          </button>
        </div>
      </main>
    </div>
  );
}
