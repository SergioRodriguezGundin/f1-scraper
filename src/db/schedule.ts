import { Schedule } from '../interfaces/schedule.interface';
import { DBXataClient } from './client/xata';

export const addSchedule = async (env: Env, schedule: Schedule[]): Promise<void> => {
  const xata = DBXataClient.getInstance(env);
  await xata.addSchedule(schedule);
};

