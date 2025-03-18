import { F1_YEAR } from '../../utils/globals';
import { RacesResult, RaceResult } from '../../xata';

export type RacesResultScraper = Omit<RacesResultData, 'winner' | 'team'> & {
  winner: string;
  team: string;
};
export const racesResultScraperModel: RacesResultScraper = {
  track: '',
  date: '',
  winner: '',
  team: '',
  laps: 0,
  time: '',
  year: Number(F1_YEAR),
};

export type RacesResultData = Omit<RacesResult, 'id'>;
export const raceModel: RacesResultData = {
  track: '',
  date: '',
  winner: null,
  team: null,
  laps: 0,
  time: '',
  year: Number(F1_YEAR),
};

export type RaceResultDetailData = Omit<RaceResult, 'id'>;
export const raceResultDetailModel: RaceResultDetailData = {
  position: 0,
  driverNumber: 0,
  driver: null,
  team: null,
  laps: 0,
  timeOrRetired: '',
  points: 0,
  year: Number(F1_YEAR),
  place: '',
};
