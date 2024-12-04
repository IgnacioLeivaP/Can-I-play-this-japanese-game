export type GameDifficulty = 'playable' | 'caution' | 'not-recommended';
export type TextComplexity = 'simple' | 'moderate' | 'complex';
export type Platform = 'PS4' | 'PS5' | 'Switch' | 'Xbox Series X/S' | 'PC';
export type ConsoleType = 'home' | 'portable' | 'hybrid';
export type RegionLockStatus = 'yes' | 'with-mod' | 'no' | 'easy-mod';
export type ConsoleRegion = 'american' | 'japanese';

export interface GameVotes {
  playable: number;
  caution: number;
  'not-recommended': number;
}

export interface Console {
  id: string;
  name: string;
  manufacturer: string;
  type: ConsoleType;
  releaseYear: number;
  regionLock: Record<ConsoleRegion, RegionLockStatus>;
  notes?: string;
}

export interface Game {
  id: string;
  name: string;
  japaneseTitle?: {
    kanji: string;
    romaji: string;
  };
  coverUrl: string;
  platforms: Platform[];
  genre: string;
  japanExclusive: boolean;
  releaseDate: string;
  developer: string;
  publisher: string;
  difficulty: GameDifficulty;
  textComplexity: TextComplexity;
  description: string;
  reason: string;
  votes: GameVotes;
  originalDifficulty?: GameDifficulty;
}