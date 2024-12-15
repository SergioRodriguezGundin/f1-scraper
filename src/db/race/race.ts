import { RaceFastestLaps, RacePitStops, RaceResult } from '../../xata';
import { getRacePlace } from '../../utils/globals';
import { DBXataClient } from '../client/xata';
import { RaceFastestLapsData } from '../../models/race/fastestLaps.model';
import { RaceResultDetailData } from '../../models/race/race.model';
import { RacePitStopsData } from '../../models/race/pitStop.model';

export const addRaceResult = async (env: Env, raceId: string, raceResults: RaceResultDetailData[]) => {
  const xata = DBXataClient.getInstance(env);
  const raceResultsDB: RaceResultDetailData[] = [];

  const place = getRacePlace(raceId);

  for (const raceResult of raceResults) {
    const [driver, team] = await Promise.all([
      xata.getDriver(['name'], [raceResult.driver]),
      xata.getTeam(['name'], [raceResult.team])
    ]);

    if (driver && team && place) {
      const race: RaceResultDetailData = {
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

  await xata.addRaceResult(raceResultsDB);
}

export const addFastestLaps = async (env: Env, raceId: string, raceFastestLaps: RaceFastestLapsData[]) => {
  const xata = DBXataClient.getInstance(env);
  const raceFastestLapsDB: RaceFastestLapsData[] = [];

  const place = getRacePlace(raceId);

  for (const raceFastestLap of raceFastestLaps) {
    const [driver, team] = await Promise.all([
      xata.getDriver(['name'], [raceFastestLap.driver]),
      xata.getTeam(['name'], [raceFastestLap.team])
    ]);

    if (driver && team && place) {
      const race: RaceFastestLapsData = {
        ...raceFastestLap,
        driver: driver as RaceFastestLaps['driver'],
        team: team as RaceFastestLaps['team'],
        place
      }
      raceFastestLapsDB.push(race);
    } else {
      console.log('Error adding race fastest laps. Team, driver or place is not available', raceFastestLap);
    }
  }

  await xata.addRaceFastestLaps(raceFastestLapsDB);
}

export const addPitStops = async (env: Env, raceId: string, racePitStops: RacePitStopsData[]) => {
  const xata = DBXataClient.getInstance(env);
  const racePitStopsDB: RacePitStopsData[] = [];

  const place = getRacePlace(raceId);

  for (const racePitStop of racePitStops) {
    const [driver, team] = await Promise.all([
      xata.getDriver(['name'], [racePitStop.driver]),
      xata.getTeam(['name'], [racePitStop.team])
    ]);

    console.log(driver, team, place);

    if (driver && team && place) {
      const race: RacePitStopsData = {
        ...racePitStop,
        driver: driver as RacePitStops['driver'],
        team: team as RacePitStops['team'],
        place: place || ''
      }
      racePitStopsDB.push(race);
    } else {
      console.log('Error adding race pit stops. Team, driver or place is not available', racePitStop);
    }
  }

  await xata.addRacePitStops(racePitStopsDB);
}

