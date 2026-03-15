import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AppView, SavedQuiz } from '../types';
import { parties } from '../data/parties';
import { partyMap } from '../data/parties';
import { getSavedQuizzes, deleteSavedQuiz } from '../lib/storage';

interface Props {
  onNavigate: (view: AppView) => void;
  onLoadSaved: (saved: SavedQuiz) => void;
}

export function Landing({ onNavigate, onLoadSaved }: Props) {
  const [savedQuizzes, setSavedQuizzes] = useState(() => getSavedQuizzes());

  const handleDelete = (id: string) => {
    deleteSavedQuiz(id);
    setSavedQuizzes(getSavedQuizzes());
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            ¿A quién voto?
          </h1>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Responde preguntas sobre los temas que importan y descubre qué partido se alinea más con tus ideas.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('quiz')}
            className="px-8 py-4 bg-white text-gray-950 text-lg font-bold rounded-xl transition-all hover:bg-gray-100"
          >
            Empezar el test
          </motion.button>
        </motion.div>
      </section>

      {/* Previous results */}
      {savedQuizzes.length > 0 && (
        <section className="px-4 py-12 border-t border-gray-800">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-lg font-bold text-white">Tests anteriores</h2>
            <div className="grid gap-3">
              {savedQuizzes.map((sq) => {
                const topParty = partyMap[sq.topParty];
                const date = new Date(sq.date);
                const dateStr = date.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <motion.div
                    key={sq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 rounded-xl p-4 flex items-center gap-4 border border-gray-800"
                  >
                    {topParty && (
                      <img src={topParty.logo} alt={topParty.shortName} className="w-10 h-10 rounded-lg shrink-0" loading="lazy" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {topParty?.shortName}
                        </span>
                        <span className="font-bold" style={{ color: topParty?.color }}>
                          {sq.scores[0]?.totalScore}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">{dateStr}</div>
                    </div>
                    <button
                      onClick={() => onLoadSaved(sq)}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm text-white rounded-lg transition-colors shrink-0"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => handleDelete(sq.id)}
                      className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors shrink-0 rounded-lg"
                      title="Eliminar"
                      aria-label={`Eliminar test de ${topParty?.shortName}`}
                    >
                      ✕
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="px-4 py-12 border-t border-gray-800">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-lg font-bold text-white">¿Cómo funciona?</h2>
          <ol className="space-y-4 text-sm text-gray-400">
            <li className="flex gap-3">
              <span className="text-white font-bold shrink-0">1.</span>
              <span>Responde preguntas sobre economía, sanidad, vivienda, inmigración y más.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-bold shrink-0">2.</span>
              <span>Comparamos tus respuestas con las posiciones reales de cada partido.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-bold shrink-0">3.</span>
              <span>Ves tu ranking con % de afinidad y desglose por temas.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Parties */}
      <section className="px-4 py-12 border-t border-gray-800">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-lg font-bold text-white">Partidos incluidos</h2>
          <div className="flex flex-wrap gap-4">
            {parties.map((party) => (
              <div
                key={party.id}
                className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2"
              >
                <img src={party.logo} alt={party.shortName} className="w-8 h-8 rounded-md" loading="lazy" />
                <span className="text-sm font-medium text-gray-300">
                  {party.shortName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats link */}
      <section className="px-4 py-12 border-t border-gray-800">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Estadísticas por provincia</h2>
            <p className="text-sm text-gray-400">Resultados anónimos de todos los participantes.</p>
          </div>
          <button
            onClick={() => onNavigate('statistics')}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 rounded-lg transition-colors shrink-0"
          >
            Ver →
          </button>
        </div>
      </section>
    </div>
  );
}
