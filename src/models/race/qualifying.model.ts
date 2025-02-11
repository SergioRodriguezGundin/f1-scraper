import { RaceQualifying } from '../../xata';

export type RaceQualifyingData = Omit<RaceQualifying, 'id'>;

export const raceQualifyingModel: RaceQualifyingData = {
	position: 0,
	driverNumber: 0,
	driver: null,
	team: null,
	q1Time: '',
	q2Time: '',
	q3Time: '',
	laps: 0,
	year: 2024,
	place: '',
};
