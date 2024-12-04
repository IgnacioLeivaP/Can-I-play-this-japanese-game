import { Console } from '@/types';

export const consoles: Console[] = [
  // Nintendo Consoles
  {
    id: 'switch',
    name: 'Nintendo Switch',
    manufacturer: 'Nintendo',
    type: 'hybrid',
    releaseYear: 2017,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'Region-free for physical games. Digital purchases tied to account region.'
  },
  {
    id: '3ds',
    name: 'Nintendo 3DS',
    manufacturer: 'Nintendo',
    type: 'portable',
    releaseYear: 2011,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Strictly region-locked. Can be bypassed with custom firmware.'
  },
  {
    id: 'wii-u',
    name: 'Wii U',
    manufacturer: 'Nintendo',
    type: 'home',
    releaseYear: 2012,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Region-locked for both physical and digital games.'
  },
  {
    id: 'wii',
    name: 'Wii',
    manufacturer: 'Nintendo',
    type: 'home',
    releaseYear: 2006,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Region-locked. Can be bypassed with homebrew software.'
  },
  {
    id: 'ds',
    name: 'Nintendo DS',
    manufacturer: 'Nintendo',
    type: 'portable',
    releaseYear: 2004,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'Region-free except for DSi-enhanced games.'
  },
  {
    id: 'gamecube',
    name: 'GameCube',
    manufacturer: 'Nintendo',
    type: 'home',
    releaseYear: 2001,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Region-locked. Can be bypassed with boot disc or modchip.'
  },
  {
    id: 'gba',
    name: 'Game Boy Advance',
    manufacturer: 'Nintendo',
    type: 'portable',
    releaseYear: 2001,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'All games are region-free.'
  },
  {
    id: 'n64',
    name: 'Nintendo 64',
    manufacturer: 'Nintendo',
    type: 'home',
    releaseYear: 1996,
    regionLock: {
      american: 'easy-mod',
      japanese: 'easy-mod'
    },
    notes: 'Physical cartridge lock can be easily bypassed with adapters. Game boards are compatible.'
  },
  {
    id: 'snes',
    name: 'Super Nintendo',
    manufacturer: 'Nintendo',
    type: 'home',
    releaseYear: 1990,
    regionLock: {
      american: 'easy-mod',
      japanese: 'easy-mod'
    },
    notes: 'Different cartridge shapes but can be easily bypassed with adapters. Game boards are compatible.'
  },
  {
    id: 'gbc',
    name: 'Game Boy Color',
    manufacturer: 'Nintendo',
    type: 'portable',
    releaseYear: 1998,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'All games are region-free.'
  },
  {
    id: 'gb',
    name: 'Game Boy',
    manufacturer: 'Nintendo',
    type: 'portable',
    releaseYear: 1989,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'All games are region-free.'
  },
  {
    id: 'nes',
    name: 'Nintendo Entertainment System',
    manufacturer: 'Nintendo',
    type: 'home',
    releaseYear: 1983,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Game boards are completely different between regions (different pin count). Disk System format does not exist for North America.'
  },
  {
    id: 'ps5',
    name: 'PlayStation 5',
    manufacturer: 'Sony',
    type: 'home',
    releaseYear: 2020,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'All PS5 games are region-free. PS4 games follow PS4 region rules.'
  },
  {
    id: 'ps4',
    name: 'PlayStation 4',
    manufacturer: 'Sony',
    type: 'home',
    releaseYear: 2013,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'Games are region-free. DLC must match game region.'
  },
  {
    id: 'vita',
    name: 'PlayStation Vita',
    manufacturer: 'Sony',
    type: 'portable',
    releaseYear: 2011,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'Games are region-free. Multiple accounts require system reset.'
  },
  {
    id: 'ps3',
    name: 'PlayStation 3',
    manufacturer: 'Sony',
    type: 'home',
    releaseYear: 2006,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'Most games region-free except for Persona 4 Arena. PS1/PS2 games follow original region lock.'
  },
  {
    id: 'psp',
    name: 'PlayStation Portable',
    manufacturer: 'Sony',
    type: 'portable',
    releaseYear: 2004,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'UMD movies are region-locked, games are region-free.'
  },
  {
    id: 'ps2',
    name: 'PlayStation 2',
    manufacturer: 'Sony',
    type: 'home',
    releaseYear: 2000,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Region-locked. Can be bypassed with swap magic or modchip.'
  },
  {
    id: 'ps1',
    name: 'PlayStation',
    manufacturer: 'Sony',
    type: 'home',
    releaseYear: 1994,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Region-locked. Can be bypassed with mod chips or swap trick.'
  },
  {
    id: 'xbox-series',
    name: 'Xbox Series X/S',
    manufacturer: 'Microsoft',
    type: 'home',
    releaseYear: 2020,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'All games are region-free. Digital content follows account region.'
  },
  {
    id: 'xbox-one',
    name: 'Xbox One',
    manufacturer: 'Microsoft',
    type: 'home',
    releaseYear: 2013,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'Games are region-free. Digital content is tied to account region.'
  },
  {
    id: 'xbox-360',
    name: 'Xbox 360',
    manufacturer: 'Microsoft',
    type: 'home',
    releaseYear: 2005,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Region-locked with different regions (NTSC/PAL/NTSC-J). Some games are region-free.'
  },
  {
    id: 'xbox',
    name: 'Xbox',
    manufacturer: 'Microsoft',
    type: 'home',
    releaseYear: 2001,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Strictly region-locked. Can be modded to bypass region lock.'
  },
  {
    id: 'dreamcast',
    name: 'Dreamcast',
    manufacturer: 'Sega',
    type: 'home',
    releaseYear: 1998,
    regionLock: {
      american: 'easy-mod',
      japanese: 'easy-mod'
    },
    notes: 'Can be easily bypassed with boot discs. Some games are region-free.'
  },
  {
    id: 'saturn',
    name: 'Sega Saturn',
    manufacturer: 'Sega',
    type: 'home',
    releaseYear: 1994,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Strictly region-locked. Can be modded with replacement BIOS or cartridge.'
  },
  {
    id: 'genesis',
    name: 'Sega Genesis/Mega Drive',
    manufacturer: 'Sega',
    type: 'home',
    releaseYear: 1988,
    regionLock: {
      american: 'easy-mod',
      japanese: 'easy-mod'
    },
    notes: 'Different cartridge shapes but game boards are compatible. Adapters available to bypass region lock.'
  },
  {
    id: 'game-gear',
    name: 'Game Gear',
    manufacturer: 'Sega',
    type: 'portable',
    releaseYear: 1990,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'All games are region-free except for a few Japanese releases.'
  },
  {
    id: 'master-system',
    name: 'Master System',
    manufacturer: 'Sega',
    type: 'home',
    releaseYear: 1985,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Different cartridge shapes and pin configurations between regions.'
  },
  {
    id: 'jaguar',
    name: 'Atari Jaguar',
    manufacturer: 'Atari',
    type: 'home',
    releaseYear: 1993,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'No region lock implemented.'
  },
  {
    id: 'lynx',
    name: 'Atari Lynx',
    manufacturer: 'Atari',
    type: 'portable',
    releaseYear: 1989,
    regionLock: {
      american: 'no',
      japanese: 'no'
    },
    notes: 'All games are region-free.'
  },
  {
    id: '7800',
    name: 'Atari 7800',
    manufacturer: 'Atari',
    type: 'home',
    releaseYear: 1986,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Different TV standards (NTSC/PAL) affect compatibility.'
  },
  {
    id: '5200',
    name: 'Atari 5200',
    manufacturer: 'Atari',
    type: 'home',
    releaseYear: 1982,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'TV standard differences between regions.'
  },
  {
    id: '2600',
    name: 'Atari 2600',
    manufacturer: 'Atari',
    type: 'home',
    releaseYear: 1977,
    regionLock: {
      american: 'yes',
      japanese: 'yes'
    },
    notes: 'Different TV standards between regions affect compatibility.'
  }
];