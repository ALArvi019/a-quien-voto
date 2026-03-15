import type { Answer, PartyScore, SavedQuiz } from '../types';

const STORAGE_KEY = 'a-quien-voto-history';

export function getSavedQuizzes(): SavedQuiz[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedQuiz[];
  } catch {
    return [];
  }
}

export function saveQuiz(answers: Record<string, Answer>, scores: PartyScore[]): SavedQuiz {
  const saved: SavedQuiz = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    answers,
    scores,
    topParty: scores[0].partyId,
  };
  const history = getSavedQuizzes();
  history.unshift(saved);
  // Keep max 10
  if (history.length > 10) history.length = 10;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return saved;
}

export function deleteSavedQuiz(id: string): void {
  const history = getSavedQuizzes().filter((q) => q.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}
