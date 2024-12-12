import { RacePractice } from '../../xata';

export type PracticeKeys = keyof RacePractice;

export const practiceKeys: PracticeKeys[] = ['id', 'position', 'driverNumber', 'driver', 'team', 'time', 'gap', 'laps', 'year', 'place'];

