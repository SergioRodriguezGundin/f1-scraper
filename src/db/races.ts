import { RacesResultScraper, RacesResultData } from '../models/race/race.model';
import { F1_YEAR } from '../utils/globals';
import { Driver } from '../xata';
import { RacesResult } from '../xata';
import { Team } from '../xata';
import { DBXataClient } from './client/xata';

export const addRacesResults = async (env: Env, races: RacesResultScraper[]): Promise<void> => {
  const xata = DBXataClient.getInstance(env);

  const teams = await xata.getTeams();
  const drivers = await xata.getDrivers();
  const racesComposed = composeRaces(races, drivers, teams);
  const racesResultsDB = await xata.getRacesResults();
  const racesResultsToAdd = mergeRaceResults(racesComposed, racesResultsDB);

  console.log('racesResultsToAdd', racesResultsToAdd);

  await xata.addRacesResults(racesResultsToAdd);
};

const mergeRaceResults = (races: RacesResultData[], dbRaces: RacesResult[]): RacesResult[] => {
  return races.map((raceResult: RacesResultData) => {
    const racesMap = new Map(dbRaces.map((race) => [race.track, race]));

    const existingRace = racesMap.get(raceResult.track);
    if (!existingRace) {
      return {
        ...raceResult,
        id: crypto.randomUUID(),
        year: parseInt(F1_YEAR),
      };
    } else {
      return {
        ...raceResult,
        id: existingRace.id,
        year: parseInt(F1_YEAR),
      };
    }
  });
};

const composeRaces = (races: RacesResultScraper[], drivers: Driver[], teams: Team[]): RacesResultData[] => {
  return races.map((race: RacesResultScraper) => {
    const driverMap = new Map(drivers.map((driver) => [driver.name, driver]));
    const teamMap = new Map(teams.map((team) => [team.name, team]));
    
    const driver = driverMap.get(race.winner);
    const team = teamMap.get(race.team);

    return {
      ...race,
      winner: driver,
      team: team,
    } as RacesResultData;
  });
};
