import { Driver } from '../xata';
import { RacesResult } from '../xata';
import { Team } from '../xata';
import { DBXataClient } from './client/xata';

export const addRacesResults = async (env: Env, races: RacesResult[]): Promise<void> => {
  const xata = DBXataClient.getInstance(env);

  const teams = await xata.getTeams();
  const drivers = await xata.getDrivers();
  const racesComposed = composeRaces(races, drivers, teams);

  const racesResultsDB = await xata.getRacesResults();
  const racesResultsToAdd = mergeRaceResults(racesComposed, racesResultsDB);

  await xata.addRacesResults(racesResultsToAdd);
};

const mergeRaceResults = (races: RacesResult[], dbRaces: RacesResult[]): RacesResult[] => {
  return races.map((raceResult: RacesResult) => {
    const racesMap = new Map(dbRaces.map(race => [race.track, race]));

    const existingRace = racesMap.get(raceResult.track);
    if (!existingRace) {
      return {
        ...raceResult,
        id: crypto.randomUUID(),
      };
    } else {
      return {
        ...raceResult,
        id: existingRace.id,
      };
    }
  });
}

const composeRaces = (races: RacesResult[], drivers: Driver[], teams: Team[]): RacesResult[] => {
  return races.map((race: RacesResult) => {
    const driverMap = new Map(drivers.map(driver => [driver.name, driver]));
    const teamMap = new Map(teams.map(team => [team.name, team]));

    const driverId = driverMap.get(race.winner?.name ?? '') ?? '';
    const teamId = teamMap.get(race.team?.name ?? '') ?? '';

    return {
      ...race,
      winner: driverId,
      team: teamId,
    } as RacesResult;
  });
}


