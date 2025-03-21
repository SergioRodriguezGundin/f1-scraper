import { F1_YEAR } from '../../utils/globals';
import { SprintQualifying } from '../../xata';

export type SprintQualifyingData = Omit<SprintQualifying, 'id'>;

export const sprintQualifyingModel: SprintQualifyingData = {
  position: 0,
  driverNumber: 0,
  driver: null,
  team: null,
  q1Time: '',
  q2Time: '',
  q3Time: '',
  laps: 0,
  place: '',
  year: Number(F1_YEAR),
};
