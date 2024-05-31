export interface DriverDB extends Driver {
  id: string;
}

export interface Driver {
  position: number;
  name: string;
  nationality: string;
  team: string;
  points: number;
  image: string;
}

export type DriverKeys = keyof DriverDB;

export const driverKeys: DriverKeys[] = [
  'id',
  'position',
  'name',
  'nationality',
  'team',
  'points',
  'image',
];

