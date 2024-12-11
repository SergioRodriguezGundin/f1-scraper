import { RaceFastestLaps, RaceResult } from '../../xata';
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

export const addFastestLaps = async (env: Env, raceId: string, raceFastestLaps: RaceFastestLaps[]) => {
  const xata = DBXataClient.getInstance(env);
  const raceFastestLapsDB: RaceFastestLaps[] = [];

  for (const raceFastestLap of raceFastestLaps) {
    const [driver, team] = await Promise.all([
      xata.getDriver(['name'], [raceFastestLap.driver]),
      xata.getTeam(['name'], [raceFastestLap.team])
    ]);
    console.log(driver, team);

    if (driver && team) {
      const race: RaceFastestLaps = {
        ...raceFastestLap,
        driver: driver as RaceFastestLaps['driver'],
        team: team as RaceFastestLaps['team'],
      }
      raceFastestLapsDB.push(race);
    } else {
      console.log('Error adding race fastest laps. Team or driver is not available', raceFastestLap);
    }
  }

  await xata.addRaceFastestLaps(raceFastestLapsDB);
}

