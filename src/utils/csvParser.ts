import { Game } from '@/types';

export function parseCSV(csvContent: string): Game[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(';');
  
  return lines.slice(1).map((line) => {
    const values = line.split(';');
    const game: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      let value = values[index]?.trim() || '';
      
      // Parse boolean values
      if (value.toLowerCase() === 'true') value = true;
      if (value.toLowerCase() === 'false') value = false;
      
      // Parse special fields
      switch (header) {
        case 'japaneseTitle':
          game.japaneseTitle = {
            kanji: value,
            romaji: values[headers.indexOf('romaji')]
          };
          break;
        case 'platforms':
          game.platforms = value.split(',').map(p => p.trim());
          break;
        case 'votes':
          game.votes = {
            playable: 0,
            caution: 0,
            'not-recommended': 0
          };
          break;
        case 'romaji':
          // Skip as it's handled in japaneseTitle
          break;
        default:
          game[header] = value;
      }
    });

    return game as Game;
  });
}

export function generateCSV(games: Game[]): string {
  const headers = [
    'id',
    'name',
    'japaneseTitle',
    'romaji',
    'coverUrl',
    'platforms',
    'genre',
    'japanExclusive',
    'releaseDate',
    'developer',
    'publisher',
    'difficulty',
    'textComplexity',
    'description',
    'reason'
  ];

  const rows = games.map(game => {
    return [
      game.id,
      game.name,
      game.japaneseTitle?.kanji || '',
      game.japaneseTitle?.romaji || '',
      game.coverUrl,
      game.platforms.join(','),
      game.genre,
      game.japanExclusive,
      game.releaseDate,
      game.developer,
      game.publisher,
      game.difficulty,
      game.textComplexity,
      game.description,
      game.reason
    ].join(';');
  });

  return [headers.join(';'), ...rows].join('\n');
}