import { Context, Hono } from 'hono';
import { addFastestLaps, addRaceResult } from '../../db/race/race';
import { addRacesResults } from '../../db/races';
import { fastestLaps, getRace } from '../../scraper/race';
import { getRaces } from '../../scraper/races';
import { RaceFastestLaps, RaceResult, RacesResult } from '../../xata';
import { RaceFastestLapsData } from '../../models/race/fastestLaps.model';

export function racesRouter(app: Hono) {
  app.get("/races", async (c: Context) => {
    try {
      const races: RacesResult[] = await getRaces(c.env);
      await addRacesResults(c.env, races);

      return c.json(races);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });

  app.get('/race/:id', async (c: Context) => {
    try {
      const raceResult: RaceResult[] = await getRace(c.env, c.req.param('id'));
      await addRaceResult(c.env, c.req.param('id'), raceResult);

      return c.json(raceResult);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  })

  app.get('/race/:id/fastest-laps', async (c: Context) => {
    try {
      const raceFastestLaps: RaceFastestLapsData[] = await fastestLaps(c.env, c.req.param('id'));
      await addFastestLaps(c.env, c.req.param('id'), raceFastestLaps);

      return c.json(raceFastestLaps);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  })
}