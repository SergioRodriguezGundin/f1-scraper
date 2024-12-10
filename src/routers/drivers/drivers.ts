import { Context, Hono } from "hono";
import { addDrivers } from '../../db/drivers';
import { getDrivers } from '../../scraper/drivers';
import { Driver } from '../../xata';

export function driversRouter(app: Hono) {
    app.get("/drivers", async (c: Context) => {
        try {
            const drivers: Driver[] = await getDrivers(c.env);
            await addDrivers(c.env, drivers);

            return c.json(drivers);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return c.text(error.message, 500);
            }
            return c.text("An unknown error occurred", 500);
        }
    });

    return app;
}