import type { Answer, Question } from '../types';

export interface CompassCoords {
  economic: number; // -10 (izquierda) a +10 (derecha)
  social: number;   // -10 (libertario) a +10 (autoritario)
}

export function calculateCompassPosition(
  questions: Question[],
  answers: Record<string, Answer>
): CompassCoords {
  let economicSum = 0;
  let economicCount = 0;
  let socialSum = 0;
  let socialCount = 0;

  for (const q of questions) {
    const userAnswer = answers[q.id];
    if (userAnswer === undefined) continue;

    // direction: +1 means agreeing pushes right/authoritarian
    // direction: -1 means agreeing pushes left/libertarian
    const contribution = userAnswer * q.direction;

    if (q.axis === 'economic') {
      economicSum += contribution;
      economicCount++;
    } else {
      socialSum += contribution;
      socialCount++;
    }
  }

  // Normalize to -10..+10 range
  const economic = economicCount > 0 ? (economicSum / (economicCount * 2)) * 10 : 0;
  const social = socialCount > 0 ? (socialSum / (socialCount * 2)) * 10 : 0;

  return {
    economic: Math.round(economic * 10) / 10,
    social: Math.round(social * 10) / 10,
  };
}
