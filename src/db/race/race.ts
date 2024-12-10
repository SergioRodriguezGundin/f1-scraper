import { RaceResult } from '../../xata';
import { getRacePlace } from '../../utils/globals';
import { DBXataClient } from '../client/xata';

export const addRaceResult = async (env: Env, raceId: string, raceResults: RaceResult[]) => {
  const xata = DBXataClient.getInstance(env);
  const raceResultsDB: RaceResult[] = [];

  const place = getRacePlace(raceId);

  for (const raceResult of raceResults) {
    const [driver, team] = await Promise.all([
      xata.getDriver(['name'], [raceResult.driver]),
      xata.getTeam(['name'], [raceResult.team])
    ]);

    if (driver && team && place) {
      const race: RaceResult = {
        ...raceResult,
        driver: driver as RaceResult['driver'],
        team: team as RaceResult['team'],
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
