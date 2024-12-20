import { RaceFastestLapsData } from '../../models/race/fastestLaps.model';
import { RacePitStopsData } from '../../models/race/pitStop.model';
import { RaceResultDetailData } from '../../models/race/race.model';
import { getRacePlace } from '../../utils/globals';
import { RaceFastestLaps, RacePitStops, RaceQualifying, RaceResult, RaceStartingGrid } from '../../xata';
import { DBXataClient } from '../client/xata';

import { RaceQualifyingData } from '../../models/race/qualifying.model';
import { RaceStartingGridData } from '../../models/race/startingGrid.model';
import { driverCache } from '../../utils/cache/driver';
import { teamCache } from '../../utils/cache/team';

export const addRaceResult = async (env: Env, raceId: string, raceResults: RaceResultDetailData[]) => {
  const xata = DBXataClient.getInstance(env);
  const raceResultsDB: RaceResultDetailData[] = [];

  const place = getRacePlace(raceId);

  for (const raceResult of raceResults) {
    let driver = driverCache.get(raceResult.driver as unknown as string);
    let team = teamCache.get(raceResult.team as unknown as string);

    if (!driver) {
      driver = await xata.getDriver(['name'], [raceResult.driver]);
      driver && driverCache.set(driver);
    }

    if (!team) {
      team = await xata.getTeam(['name'], [raceResult.team]);
      team && teamCache.set(team);
    }

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
    let driver = driverCache.get(raceFastestLap.driver as unknown as string);
    let team = teamCache.get(raceFastestLap.team as unknown as string);

    if (!driver) {
      driver = await xata.getDriver(['name'], [raceFastestLap.driver]);
      driver && driverCache.set(driver);
    }

    if (!team) {
      team = await xata.getTeam(['name'], [raceFastestLap.team]);
      team && teamCache.set(team);
    }

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
    let driver = driverCache.get(racePitStop.driver as unknown as string); // HACK: Type assertion to avoid type error

    if (!driver) {
      driver = await xata.getDriver(['name'], [racePitStop.driver]);
      driver && driverCache.set(driver);
    }

    let team = teamCache.get(racePitStop.team as unknown as string); // HACK: Type assertion to avoid type error
    if (!team) {
      team = await xata.getTeam(['name'], [racePitStop.team]);
      team && teamCache.set(team);
    }

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

export const addStartingGrid = async (env: Env, raceId: string, raceStartingGrid: RaceStartingGridData[]) => {
  const xata = DBXataClient.getInstance(env);
  const raceStartingGridDB: RaceStartingGridData[] = [];

  const place = getRacePlace(raceId);

  for (const startingGrid of raceStartingGrid) {

    let driver = driverCache.get(startingGrid.driver as unknown as string);
    if (!driver) {
      driver = await xata.getDriver(['name'], [startingGrid.driver]);
      driver && driverCache.set(driver);
    }

    let team = teamCache.get(startingGrid.team as unknown as string);
    if (!team) {
      team = await xata.getTeam(['name'], [startingGrid.team]);
      team && teamCache.set(team);
    }

    if (place) {
      const race: RaceStartingGridData = {
        ...startingGrid,
        driver: driver as RaceStartingGrid['driver'],
        team: team as RaceStartingGrid['team'],
        place: place || ''
      }
      raceStartingGridDB.push(race);
    } else {
      console.log('Error adding race starting grid. Place is not available', raceStartingGrid);
    }
  }

  await xata.addRaceStartingGrid(raceStartingGridDB);
}

export const addQualifying = async (env: Env, raceId: string, raceQualifying: RaceQualifyingData[]) => {
  const xata = DBXataClient.getInstance(env);
  const raceQualifyingDB: RaceQualifyingData[] = [];

  const place = getRacePlace(raceId);

  for (const qualifying of raceQualifying) {
    let driver = driverCache.get(qualifying.driver as unknown as string);
    if (!driver) {
      driver = await xata.getDriver(['name'], [qualifying.driver]);
      driver && driverCache.set(driver);
    }

    let team = teamCache.get(qualifying.team as unknown as string);
    if (!team) {
      team = await xata.getTeam(['name'], [qualifying.team]);
      team && teamCache.set(team);
    }

    if (driver && team && place) {
      const race: RaceQualifyingData = {
        ...qualifying,
        driver: driver as RaceQualifying['driver'],
        team: team as RaceQualifying['team'],
        place: place || ''
      }
      raceQualifyingDB.push(race);
    } else {
      console.log('Error adding race qualifying. Team, driver or place is not available', qualifying);
    }
  }

  await xata.addRaceQualifying(raceQualifyingDB);
}












