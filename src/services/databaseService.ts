import { Game } from '@/types';
import { parseCSV } from '@/utils/csvParser';

class DatabaseService {
  private static instance: DatabaseService;
  private games: Game[] = [];

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async loadGamesFromCsv(csvContent: string): Promise<void> {
    try {
      this.games = parseCSV(csvContent);
    } catch (error) {
      console.error('Error loading games from CSV:', error);
      throw new Error('Failed to load games database');
    }
  }

  getGames(): Game[] {
    return this.games;
  }

  getGameById(id: string): Game | undefined {
    return this.games.find(game => game.id === id);
  }

  searchGames(query: string): Game[] {
    const searchTerm = query.toLowerCase();
    return this.games.filter(game => 
      game.name.toLowerCase().includes(searchTerm) ||
      game.japaneseTitle?.kanji.includes(searchTerm) ||
      game.japaneseTitle?.romaji.toLowerCase().includes(searchTerm)
    );
  }

  filterGamesByDifficulty(difficulty: string): Game[] {
    return this.games.filter(game => game.difficulty === difficulty);
  }

  getRandomGame(): Game {
    const randomIndex = Math.floor(Math.random() * this.games.length);
    return this.games[randomIndex];
  }

  updateGame(updatedGame: Game): void {
    const index = this.games.findIndex(game => game.id === updatedGame.id);
    if (index !== -1) {
      this.games[index] = updatedGame;
    }
  }
}

export const db = DatabaseService.getInstance();