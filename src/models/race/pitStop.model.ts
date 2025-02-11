import { F1_YEAR } from '../../utils/globals';
import { RacePitStops } from '../../xata';

export type RacePitStopsData = Omit<RacePitStops, 'id'>;

export const racePitStopsModel: RacePitStopsData = {
	stops: 0,
	driverNumber: 0,
	driver: null,
	team: null,
	lap: 0,
	timeOfDay: '',
	time: '',
	total: '',
	year: Number(F1_YEAR),
	place: '',
};
