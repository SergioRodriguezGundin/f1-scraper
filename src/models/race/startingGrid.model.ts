import { RaceStartingGrid } from '../../xata';

export type RaceStartingGridData = Omit<RaceStartingGrid, 'id'>;

export const raceStartingGridModel: RaceStartingGridData = {
	position: 0,
	driverNumber: 0,
	driver: null,
	team: null,
	time: '',
	year: 2024,
	place: '',
};
