import { RaceStartingGrid } from '../../xata';

export type StartingGridKeys = keyof RaceStartingGrid;

export const startingGridKeys: StartingGridKeys[] = ['id', 'position', 'driverNumber', 'driver', 'time', 'year', 'place'];
