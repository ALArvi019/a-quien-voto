export type PartyId = 'pp' | 'psoe' | 'vox' | 'podemos' | 'salf';

export type CategoryId =
  | 'immigration'
  | 'economy'
  | 'health'
  | 'housing'
  | 'security'
  | 'education'
  | 'environment'
  | 'social_rights'
  | 'territorial'
  | 'transparency';

export interface Party {
  id: PartyId;
  name: string;
  shortName: string;
  color: string;
  logo: string;
  description: string;
  ideology: string;
  website: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}

export interface Question {
  id: string;
  category: CategoryId;
  text: string;
  explanation: string;
  partyPositions: Record<PartyId, number>;
}

export type Answer = -2 | -1 | 0 | 1 | 2;

export interface QuizState {
  currentIndex: number;
  answers: Record<string, Answer>;
  completed: boolean;
}

export interface PartyScore {
  partyId: PartyId;
  totalScore: number;
  categoryScores: Record<CategoryId, number>;
  topReasons: Reason[];
  bottomReasons: Reason[];
}

export interface Reason {
  questionId: string;
  alignment: number;
}

export interface ProvinceData {
  id: string;
  name: string;
  path: string;
}

export interface ResultRecord {
  province: string;
  party_scores: Record<PartyId, number>;
  top_party: PartyId;
}

export interface ProvinceStatData {
  province: string;
  total: number;
  avgScores: Record<PartyId, number>;
  topParty: PartyId;
}

export type AppView = 'landing' | 'quiz' | 'results' | 'province' | 'statistics';
