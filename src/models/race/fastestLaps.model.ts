import { RaceFastestLaps } from '../../xata';

export type RaceFastestLapsData = Omit<RaceFastestLaps, 'id'>;

export const raceFastestLapsModel: RaceFastestLapsData = {
	position: 0,
	driverNumber: 0,
	driver: null,
	team: null,
	lap: 0,
	timeOfDay: '',
	time: '',
	avgSpeed: '',
	year: 2024,
	place: '',
};
