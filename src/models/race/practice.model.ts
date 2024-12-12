
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
  year: 2024,
  place: '',
};
