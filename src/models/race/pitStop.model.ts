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
	year: 2024,
	place: '',
};
