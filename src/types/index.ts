export type PartyId = 'pp' | 'psoe' | 'vox' | 'podemos' | 'salf';

export type CategoryId =
  | 'country_world'
  | 'economy'
  | 'personal_values'
  | 'society'
  | 'religion'
  | 'rights_freedoms'
  | 'security';

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

export type CompassAxis = 'economic' | 'social';

export interface Question {
  id: string;
  category: CategoryId;
  text: string;
  explanation: string;
  partyPositions: Record<PartyId, number>;
  axis: CompassAxis;
  /** +1 means agreeing pushes right/authoritarian, -1 means agreeing pushes left/libertarian */
  direction: 1 | -1;
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

export interface SavedQuiz {
  id: string;
  date: string;
  answers: Record<string, Answer>;
  scores: PartyScore[];
  topParty: PartyId;
}

export type AppView = 'landing' | 'quiz' | 'results' | 'province' | 'statistics';
