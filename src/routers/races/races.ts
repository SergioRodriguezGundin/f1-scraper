import { Context, Hono } from 'hono';
import { addFastestLaps, addPitStops, addRaceResult } from '../../db/race/race';
import { addRacesResults } from '../../db/races';
import { fastestLaps, getRace, pitStops } from '../../scraper/race';
import { getRaces } from '../../scraper/races';
import { RaceFastestLapsData } from '../../models/race/fastestLaps.model';
import { RaceResultDetailData, RacesResultData } from '../../models/race/race.model';
import { RacePitStopsData } from '../../models/race/pitStop.model';

export function racesRouter(app: Hono) {
  app.get("/races", async (c: Context) => {
    try {
      const races: RacesResultData[] = await getRaces(c.env);
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
      const raceResult: RaceResultDetailData[] = await getRace(c.env, c.req.param('id'));
      await addRaceResult(c.env, c.req.param('id'), raceResult);

      return c.json(raceResult);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });

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
  });

  app.get('/race/:id/pit-stops', async (c: Context) => {
    try {
      const racePitStops: RacePitStopsData[] = await pitStops(c.env, c.req.param('id'));
      await addPitStops(c.env, c.req.param('id'), racePitStops);

      return c.json(racePitStops);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  })
}