import { useEffect, useRef } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import type { Answer, AppView, PartyScore } from '../types';

interface Props {
  onComplete: (scores: PartyScore[], answers: Record<string, Answer>) => void;
  onNavigate: (view: AppView) => void;
}

export function Quiz({ onComplete, onNavigate }: Props) {
  const { currentIndex, currentQuestion, totalQuestions, answers, completed, scores, answer, goBack } =
    useQuiz();
  const completedRef = useRef(false);

  useEffect(() => {
    if (completed && scores.length > 0 && !completedRef.current) {
      completedRef.current = true;
      onComplete(scores, answers);
    }
  }, [completed, scores, answers, onComplete]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 py-4 border-b border-gray-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            aria-label="Volver a inicio"
            className="py-2 px-3 min-h-[44px] flex items-center text-gray-400 hover:text-white transition-colors"
          >
            ← Inicio
          </button>
          <span className="text-sm text-gray-400">¿A quién voto?</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center px-4 py-8 overflow-x-hidden">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <h1 className="sr-only">Test de afinidad política</h1>
          <ProgressBar current={currentIndex} total={totalQuestions} />

          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              onAnswer={answer}
              currentAnswer={answers[currentQuestion.id]}
            />
          )}

          {currentIndex > 0 && (
            <button
              onClick={goBack}
              className="py-2 px-4 min-h-[44px] text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              ← Pregunta anterior
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
