import { RacePitStops } from '../../xata';

export type PitStopKeys = keyof RacePitStops;

export const pitStopKeys: PitStopKeys[] = [
  'id',
  'stops',
  'driverNumber',
  'driver',
  'team',
  'lap',
  'timeOfDay',
  'time',
  'total',
  'year',
  'place',
];
