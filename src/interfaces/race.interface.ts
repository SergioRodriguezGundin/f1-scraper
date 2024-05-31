export interface RaceResultDB extends RaceResult {
  id: string;
}

export interface RaceResult {
  track: string;
  date: string;
  winner: string;
  team: string;
  laps: number;
  time: string;
}

export type RaceResultKeys = keyof RaceResultDB;

export const raceResultKeys: RaceResultKeys[] = ['id', 'track', 'date', 'winner', 'team', 'laps', 'time'];


export interface RaceResultDetail {
  position: number;
  driverNumber: number;
  driver: string;
  team: string;
  laps: number;
  timeOrRetired: string;
  points: number;
  year: number;
  place: string;
}

export interface RaceResultDetailDB extends RaceResultDetail {
  id: string;
}

export type RaceResultDetailKeys = keyof RaceResultDetailDB;

export const raceResultDetailKeys: RaceResultDetailKeys[] = [
  'id',
  'position',
  'driverNumber',
  'driver',
  'team',
  'laps',
  'timeOrRetired',
  'points',
  'year',
  'place',
];
