import { useState, useCallback, useMemo } from 'react';
import type { Answer, PartyScore, QuizState } from '../types';
import { questions } from '../data/questions';
import { calculateScores } from '../utils/scoring';

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    answers: {},
    completed: false,
  });

  const answer = useCallback((questionId: string, value: Answer) => {
    setState((prev) => {
      const newAnswers = { ...prev.answers, [questionId]: value };
      const nextIndex = prev.currentIndex + 1;
      const completed = nextIndex >= questions.length;
      return {
        answers: newAnswers,
        currentIndex: completed ? prev.currentIndex : nextIndex,
        completed,
      };
    });
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(0, prev.currentIndex - 1),
    }));
  }, []);

  const reset = useCallback(() => {
    setState({ currentIndex: 0, answers: {}, completed: false });
  }, []);

  const scores: PartyScore[] = useMemo(() => {
    if (!state.completed) return [];
    return calculateScores(questions, state.answers);
  }, [state.completed, state.answers]);

  return {
    currentIndex: state.currentIndex,
    currentQuestion: questions[state.currentIndex],
    totalQuestions: questions.length,
    answers: state.answers,
    completed: state.completed,
    scores,
    answer,
    goBack,
    reset,
  };
}
