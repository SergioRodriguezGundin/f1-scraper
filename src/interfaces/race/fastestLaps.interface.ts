import { RaceFastestLaps } from '../../xata';

export type FastestLapsKeys = keyof RaceFastestLaps;

export const fastestLapsKeys: FastestLapsKeys[] = ['id', 'position', 'driver', 'team', 'lap', 'time', 'avgSpeed', 'year'];
