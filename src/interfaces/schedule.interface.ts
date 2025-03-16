import { Schedule } from '../xata';

export type ScheduleKeys = keyof Schedule;

export const scheduleKeys: ScheduleKeys[] = [
  'id',
  'round',
  'days',
  'month',
  'flag',
  'place',
  'title',
  'trackImage',
  'firstPlace',
  'secondPlace',
  'thirdPlace',
  'year',
];
