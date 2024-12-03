import { RacesResult, RaceResult } from '../xata';

export type RaceResultKeys = keyof RacesResult;

export const raceResultKeys: RaceResultKeys[] = ['id', 'track', 'date', 'winner', 'team', 'laps', 'time'];

export type RaceResultDetailKeys = keyof RaceResult;

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
