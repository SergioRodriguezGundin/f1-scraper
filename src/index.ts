import { Context, Hono } from "hono";
import { addDrivers } from './db/drivers';
import { addRaceResult } from './db/race';
import { addRacesResults } from './db/races';
import { addSchedule } from './db/schedule';
import { addTeams } from './db/team';
import { Driver } from './interfaces/driver.interface';
import { RaceResult, RaceResultDetail } from './interfaces/race.interface';
import { Schedule } from './interfaces/schedule.interface';
import { Team } from './interfaces/team.interface';
import { getDrivers } from './scraper/drivers';
import { getRace } from './scraper/race';
import { getRaces } from './scraper/races';
import { getSchedule } from './scraper/schedule';
import { getTeams } from './scraper/teams';

const app = new Hono();

app.get("/", (c) => c.text("F1 scraper working!"));

app.get("/drivers", async (c: Context) => {
	try {
		const drivers: Driver[] = await getDrivers(c.env);
		// add drivers to database
		await addDrivers(c.env, drivers);

		return c.json(drivers);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return c.text(error.message, 500);
		}
		return c.text("An unknown error occurred", 500);
	}
});

app.get("/races", async (c: Context) => {
	try {
		const races: RaceResult[] = await getRaces();
		// add races to database
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
		const raceResult: RaceResultDetail[] = await getRace(c.env, c.req.param('id'));
		// add race to database
		await addRaceResult(c.env, c.req.param('id'), raceResult);

		return c.json(raceResult);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return c.text(error.message, 500);
		}
		return c.text("An unknown error occurred", 500);
	}
})

app.get('/teams', async (c: Context) => {
	try {
		const teams: Team[] = await getTeams(c.env);
		// add teams to database
		await addTeams(c.env, teams);

		return c.json(teams);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return c.text(error.message, 500);
		}
		return c.text("An unknown error occurred", 500);
	}

});

app.get('/schedule', async (c: Context) => {
	try {
		const schedule: Schedule[] = await getSchedule();
		// add schedule to database
		await addSchedule(c.env, schedule);

		return c.json(schedule);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return c.text(error.message, 500);
		}
		return c.text("An unknown error occurred", 500);
	}
});

export default app
