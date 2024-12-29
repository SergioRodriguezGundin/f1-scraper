import { SprintRace } from '../../xata';

export type SprintRaceData = Omit<SprintRace, 'id'>;

export const sprintRaceModel: SprintRaceData = {
  position: 0,
  driverNumber: 0,
  driver: null,
  team: null,
  laps: 0,
  time: '',
  points: 0,
  place: '',
  year: 2024
};

