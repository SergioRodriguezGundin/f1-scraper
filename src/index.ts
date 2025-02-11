import { Hono } from 'hono';
import { driversRouter } from './routers/drivers/drivers';
import { racesRouter } from './routers/races/races';
import { teamsRouter } from './routers/teams/teams';
import { scheduleRouter } from './routers/schedule/schedule';
const app = new Hono();

app.get('/', (c) => c.text('F1 scraper working!'));

driversRouter(app);
racesRouter(app);
teamsRouter(app);
scheduleRouter(app);

export default app;
