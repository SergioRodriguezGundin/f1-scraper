import { Context, Hono } from 'hono';
import { addDrivers } from '../../db/drivers';
import { getDrivers } from '../../scraper/drivers';
import { DriverData } from '../../models/driver.model';

export function driversRouter(app: Hono) {
  app.get('/drivers', async (c: Context) => {
    try {
      const drivers: DriverData[] = await getDrivers(c.env);
      await addDrivers(c.env, drivers);

      return c.json(drivers);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text('An unknown error occurred', 500);
    }
  });

  return app;
}
