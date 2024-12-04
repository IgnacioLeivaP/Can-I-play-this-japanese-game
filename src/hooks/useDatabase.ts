import { useState, useEffect } from 'react';
import { Game } from '@/types';
import { db } from '@/services/databaseService';

export function useDatabase() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        // In a real application, you would fetch this from your server
        const response = await fetch('/src/data/games.csv');
        const csvContent = await response.text();
        await db.loadGamesFromCsv(csvContent);
        setGames(db.getGames());
        setLoading(false);
      } catch (err) {
        setError('Error loading games database');
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const searchGames = (query: string) => {
    return db.searchGames(query);
  };

  const filterByDifficulty = (difficulty: string) => {
    return db.filterGamesByDifficulty(difficulty);
  };

  const getRandomGame = () => {
    return db.getRandomGame();
  };

  const updateGame = (game: Game) => {
    db.updateGame(game);
    setGames(db.getGames());
  };

  return {
    games,
    loading,
    error,
    searchGames,
    filterByDifficulty,
    getRandomGame,
    updateGame
  };
}