import { Driver } from "../xata";

export type DriverKeys = keyof Driver;

export const driverKeys: DriverKeys[] = [
  'id',
  'position',
  'name',
  'nationality',
  'team',
  'points',
  'image',
];

