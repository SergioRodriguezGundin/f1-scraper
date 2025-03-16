import { Driver } from '../xata';

export type DriverData = Omit<Driver, 'id'>;
export const driverModel: DriverData = {
  position: 0,
  name: '',
  nationality: '',
  team: null,
  points: 0,
  image: '',
  year: 0,
  queryName: '',
};
