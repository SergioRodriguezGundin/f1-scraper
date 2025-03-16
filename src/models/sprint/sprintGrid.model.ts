import { F1_YEAR } from '../../utils/globals';
import { SprintGrid } from '../../xata';

export type SprintGridData = Omit<SprintGrid, 'id'>;

export const sprintGridModel: SprintGridData = {
  position: 0,
  driverNumber: 0,
  driver: null,
  team: null,
  time: '',
  place: '',
  year: Number(F1_YEAR),
};
