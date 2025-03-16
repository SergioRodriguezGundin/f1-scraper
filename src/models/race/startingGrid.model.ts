import { F1_YEAR } from '../../utils/globals';
import { RaceStartingGrid } from '../../xata';

export type RaceStartingGridData = Omit<RaceStartingGrid, 'id'>;

export const raceStartingGridModel: RaceStartingGridData = {
  position: 0,
  driverNumber: 0,
  driver: null,
  team: null,
  time: '',
  year: Number(F1_YEAR),
  place: '',
};
