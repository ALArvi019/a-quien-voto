import { motion } from 'framer-motion';

interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Pregunta {current + 1} de {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
