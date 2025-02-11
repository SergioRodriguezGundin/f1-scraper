import { Context, Hono } from 'hono';
import { addTeams } from '../../db/team';
import { getTeams } from '../../scraper/teams';
import { TeamData } from '../../models/team.model';

export function teamsRouter(app: Hono) {
	app.get('/teams', async (c: Context) => {
		try {
			const teams: TeamData[] = await getTeams(c.env);
			await addTeams(c.env, teams);

			return c.json(teams);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return c.text(error.message, 500);
			}
			return c.text('An unknown error occurred', 500);
		}
	});
}
