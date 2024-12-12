import { RaceQualifying } from '../../xata';

export type QualifyingKeys = keyof RaceQualifying;

export const qualifyingKeys: QualifyingKeys[] = ['id', 'position', 'driverNumber', 'driver', 'team', 'q1Time', 'q2Time', 'q3Time', 'year'];

