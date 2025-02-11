import { F1_YEAR } from '../../utils/globals';
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
	year: Number(F1_YEAR),
	place: '',
};
