import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Answer, AppView, PartyScore } from '../types';
import { PartyCard } from './PartyCard';
import { PoliticalCompass } from './PoliticalCompass';
import { ShareButtons } from './ShareButtons';
import { partyMap } from '../data/parties';
import { calculateCompassPosition } from '../utils/compass';
import { questions } from '../data/questions';

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let rafId: number;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
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
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="px-4 py-4 border-b border-gray-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            aria-label="Volver a inicio"
            className="py-2 px-3 min-h-[44px] flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span> Inicio
          </button>
          <span className="text-sm text-gray-400">Resultados</span>
        </div>
      </header>

      <main ref={mainRef} tabIndex={-1} aria-label="Resultados del test" className="max-w-2xl mx-auto px-4 py-8 space-y-8 outline-none">
        {scores.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-gray-400">No hay resultados disponibles.</p>
            <button
              onClick={() => onNavigate('quiz')}
              className="px-6 py-3 min-h-[44px] bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
            >
              Hacer el test
            </button>
          </div>
        ) : null}
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
            <p className="text-5xl font-bold text-white">
              <span aria-hidden="true">{animatedScore}%</span>
              <span className="sr-only">{scores[0]?.totalScore}% de afinidad</span>
            </p>
            <p className="text-gray-400 max-w-md mx-auto text-sm">{topParty.description}</p>
          </motion.div>
        )}

        <PoliticalCompass coords={compassCoords} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-300">Ranking completo</h2>
          <ol className="space-y-4" aria-label="Ranking de partidos por afinidad">
            {scores.map((s, i) => (
              <li key={s.partyId}><PartyCard score={s} rank={i} /></li>
            ))}
          </ol>
        </div>

        {topParty && scores[0] && (
          <ShareButtons scores={scores} />
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => onNavigate('statistics')}
            className="flex-1 px-6 py-3 min-h-[44px] bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
          >
            Ver estadísticas por provincia
          </button>
          <button
            onClick={() => onNavigate('landing')}
            className="flex-1 px-6 py-3 min-h-[44px] border border-gray-700 hover:border-gray-500 text-gray-300 font-semibold rounded-xl transition-colors"
          >
            Repetir test
          </button>
        </div>
      </main>
    </div>
  );
}
