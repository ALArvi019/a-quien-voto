import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Answer, Question } from '../types';
import { categoryMap } from '../data/categories';

interface Props {
  question: Question;
  onAnswer: (questionId: string, value: Answer) => void;
  currentAnswer?: Answer;
}

const answerOptions: { value: Answer; label: string; color: string }[] = [
  { value: 2, label: 'Totalmente de acuerdo', color: 'bg-green-600 hover:bg-green-500' },
  { value: 1, label: 'De acuerdo', color: 'bg-green-800 hover:bg-green-700' },
  { value: 0, label: 'Me da igual', color: 'bg-gray-600 hover:bg-gray-500' },
  { value: -1, label: 'En desacuerdo', color: 'bg-red-800 hover:bg-red-700' },
  { value: -2, label: 'Totalmente en desacuerdo', color: 'bg-red-600 hover:bg-red-500' },
];

export function QuestionCard({ question, onAnswer, currentAnswer }: Props) {
  const category = categoryMap[question.category];
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current?.focus();
  }, [question.id]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        ref={cardRef}
        tabIndex={-1}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 outline-none"
      >
        <div className="space-y-3">
          {category && (
            <span className="inline-block text-sm px-3 py-1 rounded-full bg-gray-800 text-gray-300">
              {category.icon} {category.name}
            </span>
          )}
          <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {question.text}
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="font-semibold text-gray-300">Contexto:</span> {question.explanation}
          </p>
        </div>

        <div role="group" aria-label="Tu respuesta" className="grid gap-3">
          {answerOptions.map((opt) => (
            <button
              key={opt.value}
              aria-pressed={currentAnswer === opt.value}
              onClick={() => onAnswer(question.id, opt.value)}
              className={`w-full text-left px-5 py-3 rounded-xl text-white font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 outline-none
                ${currentAnswer === opt.value
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-950 scale-[1.02]'
                  : ''
                } ${opt.color}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
