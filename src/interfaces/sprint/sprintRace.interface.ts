import { SprintRace } from '../../xata';

export type SprintRaceKeys = keyof SprintRace;

export const sprintRaceKeys: SprintRaceKeys[] = [
	'id',
	'position',
	'driverNumber',
	'driver',
	'team',
	'laps',
	'time',
	'points',
	'place',
	'year',
];
