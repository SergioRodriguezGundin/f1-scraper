import { Context, Hono } from 'hono';
import { addFastestLaps, addPitStops, addPractice, addQualifying, addRaceResult, addSprintGrid, addSprintQualifying, addSprintRace, addStartingGrid } from '../../db/race';
import { addRacesResults } from '../../db/races';
import { RaceFastestLapsData } from '../../models/race/fastestLaps.model';
import { RacePitStopsData } from '../../models/race/pitStop.model';
import { RacePracticeData } from '../../models/race/practice.model';
import { RaceQualifyingData } from '../../models/race/qualifying.model';
import { RaceResultDetailData, RacesResultData } from '../../models/race/race.model';
import { RaceStartingGridData } from '../../models/race/startingGrid.model';
import { SprintGridData } from '../../models/sprint/sprintGrid.model';
import { SprintQualifyingData } from '../../models/sprint/sprintQualifying.model';
import { SprintRaceData } from '../../models/sprint/sprintRace.model';
import { fastestLaps, getRace, pitStops, practice, qualifying, sprintGrid, sprintQualifying, sprintRace, startingGrid } from '../../scraper/race';
import { getRaces } from '../../scraper/races';

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
      console.log(error);
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });

  app.get('/race/:id/starting-grid', async (c: Context) => {
    try {
      const raceStartingGrid: RaceStartingGridData[] = await startingGrid(c.env, c.req.param('id'));
      await addStartingGrid(c.env, c.req.param('id'), raceStartingGrid);

      return c.json(raceStartingGrid);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });

  app.get('/race/:id/qualifying', async (c: Context) => {
    try {
      const raceQualifying: RaceQualifyingData[] = await qualifying(c.env, c.req.param('id'));
      await addQualifying(c.env, c.req.param('id'), raceQualifying);

      return c.json(raceQualifying);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });

  app.get('/race/:id/practice/:practice', async (c: Context) => {
    try {
      const racePractice: RacePracticeData[] = await practice(c.env, c.req.param('id'), c.req.param('practice'));
      await addPractice(c.env, c.req.param('id'), c.req.param('practice'), racePractice);

      return c.json(racePractice);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });

  app.get('/race/:id/sprint-qualifying', async (c: Context) => {
    try {
      const raceSprintQualifying: SprintQualifyingData[] = await sprintQualifying(c.env, c.req.param('id'));
      await addSprintQualifying(c.env, c.req.param('id'), raceSprintQualifying);

      return c.json(raceSprintQualifying);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });

  app.get('/race/:id/sprint-grid', async (c: Context) => {
    try {
      const raceSprintGrid: SprintGridData[] = await sprintGrid(c.env, c.req.param('id'));
      await addSprintGrid(c.env, c.req.param('id'), raceSprintGrid);

      return c.json(raceSprintGrid);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });

  app.get('/race/:id/sprint-race', async (c: Context) => {
    try {
      const raceSprintRace: SprintRaceData[] = await sprintRace(c.env, c.req.param('id'));
      await addSprintRace(c.env, c.req.param('id'), raceSprintRace);

      return c.json(raceSprintRace);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.text(error.message, 500);
      }
      return c.text("An unknown error occurred", 500);
    }
  });
}