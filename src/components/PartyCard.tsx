import { motion } from 'framer-motion';
import type { PartyScore } from '../types';
import { partyMap } from '../data/parties';
import { categoryMap } from '../data/categories';
import { questions } from '../data/questions';
import { categories } from '../data/categories';
import { useState } from 'react';

interface Props {
  score: PartyScore;
  rank: number;
}

export function PartyCard({ score, rank }: Props) {
  const party = partyMap[score.partyId];
  const [expanded, setExpanded] = useState(rank === 0);

  if (!party) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1, duration: 0.4 }}
      className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center gap-4 cursor-pointer"
      >
        <span
          className="text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
          style={{ backgroundColor: party.color }}
        >
          {rank + 1}
        </span>
        <img src={party.logo} alt={party.shortName} className="w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 text-left">
          <div className="font-bold text-white">{party.name}</div>
          <div className="text-sm text-gray-400">{party.ideology}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold" style={{ color: party.color }}>
            {score.totalScore}%
          </div>
          <div className="text-xs text-gray-500">afinidad</div>
        </div>
        <span className="text-gray-500 ml-2">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5 space-y-4"
        >
          {/* Progress bar */}
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: party.color }}
              initial={{ width: 0 }}
              animate={{ width: `${score.totalScore}%` }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </div>

          {/* Category breakdown */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Afinidad por tema</h4>
            <div className="grid gap-2">
              {categories.map((cat) => {
                const catScore = Math.round(score.categoryScores[cat.id]);
                return (
                  <div key={cat.id} className="flex items-center gap-2 text-sm">
                    <span className="w-5">{cat.icon}</span>
                    <span className="w-36 text-gray-400 truncate">{cat.name}</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ backgroundColor: party.color, width: `${catScore}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-gray-300">{catScore}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top reasons */}
          <div>
            <h4 className="text-sm font-semibold text-green-400 mb-1">Mayor coincidencia</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              {score.topReasons.map((r) => {
                const q = questions.find((qq) => qq.id === r.questionId);
                const cat = q ? categoryMap[q.category] : null;
                return (
                  <li key={r.questionId} className="flex gap-2">
                    <span>{cat?.icon}</span>
                    <span className="line-clamp-1">{q?.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-1">Mayor diferencia</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              {score.bottomReasons.map((r) => {
                const q = questions.find((qq) => qq.id === r.questionId);
                const cat = q ? categoryMap[q.category] : null;
                return (
                  <li key={r.questionId} className="flex gap-2">
                    <span>{cat?.icon}</span>
                    <span className="line-clamp-1">{q?.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <a
            href={party.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
          >
            Visitar web del partido →
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}
