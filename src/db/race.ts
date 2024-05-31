import { RaceResultDetail } from '../interfaces/race.interface';
import { getRacePlace } from '../utils/globals';
import { DBXataClient } from './client/xata';

export const addRaceResult = async (env: Env, raceId: string, raceResults: RaceResultDetail[]) => {
  const xata = DBXataClient.getInstance(env);
  const raceResultsDB: RaceResultDetail[] = [];

  const place = getRacePlace(raceId);

  for (const raceResult of raceResults) {
    const [driver, team] = await Promise.all([
      xata.getDriver(['name'], [raceResult.driver]),
      xata.getTeam(['name'], [raceResult.team])
    ]);

    if (driver && team && place) {
      const race: RaceResultDetail = {
        ...raceResult,
        driver: driver.id,
        team: team.id,
        place,
      }
      raceResultsDB.push(race);

    } else {
      console.log('Error adding race result. Team, driver or schedule is not available', raceResult);
    }
  }

  console.log('raceResults DB: ', raceResultsDB);

  await xata.addRaceResult(raceResultsDB);
}
