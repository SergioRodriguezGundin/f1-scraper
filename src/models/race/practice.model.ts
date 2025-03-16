import { F1_YEAR } from '../../utils/globals';
import { RacePractice } from '../../xata';

export type RacePracticeData = Omit<RacePractice, 'id'>;

export const racePracticeModel: RacePracticeData = {
  position: 0,
  driverNumber: 0,
  driver: null,
  team: null,
  time: '',
  gap: '',
  laps: 0,
  year: Number(F1_YEAR),
  place: '',
  session: 0,
};
