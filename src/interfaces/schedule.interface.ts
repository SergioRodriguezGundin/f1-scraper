export interface ScheduleDB extends Schedule {
  id: string;
}

export interface Schedule {
  round: string;
  race_status: string;
  date: string;
  month: string;
  country_flag: string;
  place: string;
  title: string;
  track_image: string;
  hero_image: string;
  year: number;
}

export type ScheduleKeys = keyof ScheduleDB;

export const scheduleKeys: ScheduleKeys[] = ['id', 'round', 'race_status', 'date', 'month', 'country_flag', 'place', 'title', 'track_image', 'hero_image', 'year'];
