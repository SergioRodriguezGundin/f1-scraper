import { Context, Hono } from 'hono';
import { addSchedule } from '../../db/schedule';
import { getSchedule } from '../../scraper/schedule';
import { Schedule } from '../../xata';

export function scheduleRouter(app: Hono) {
  app.get('/schedule', async (c: Context) => {
    try {
      const schedule: Schedule[] = await getSchedule();
      await addSchedule(c.env, schedule);

      return c.json(schedule);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });
}
