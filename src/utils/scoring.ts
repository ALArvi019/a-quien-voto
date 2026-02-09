import type { Answer, CategoryId, PartyId, PartyScore, Question, Reason } from '../types';
import { parties } from '../data/parties';
import { categories } from '../data/categories';

export function calculateScores(
  questions: Question[],
  answers: Record<string, Answer>
): PartyScore[] {
  return parties.map((party) => {
    const alignments: { questionId: string; alignment: number; category: CategoryId }[] = [];

    for (const q of questions) {
      const userAnswer = answers[q.id];
      if (userAnswer === undefined) continue;
      const partyPos = q.partyPositions[party.id];
      const alignment = 1 - Math.abs(userAnswer - partyPos) / 4;
      alignments.push({ questionId: q.id, alignment, category: q.category });
    }

    const totalScore =
      alignments.length > 0
        ? (alignments.reduce((sum, a) => sum + a.alignment, 0) / alignments.length) * 100
        : 0;

    const categoryScores = {} as Record<CategoryId, number>;
    for (const cat of categories) {
      const catAlignments = alignments.filter((a) => a.category === cat.id);
      categoryScores[cat.id] =
        catAlignments.length > 0
          ? (catAlignments.reduce((sum, a) => sum + a.alignment, 0) / catAlignments.length) * 100
          : 0;
    }

    const sorted = [...alignments].sort((a, b) => b.alignment - a.alignment);
    const topReasons: Reason[] = sorted.slice(0, 3).map((a) => ({
      questionId: a.questionId,
      alignment: a.alignment,
    }));
    const bottomReasons: Reason[] = sorted
      .slice(-3)
      .reverse()
      .map((a) => ({
        questionId: a.questionId,
        alignment: a.alignment,
      }));

    return {
      partyId: party.id as PartyId,
      totalScore: Math.round(totalScore),
      categoryScores,
      topReasons,
      bottomReasons,
    };
  }).sort((a, b) => b.totalScore - a.totalScore);
}
