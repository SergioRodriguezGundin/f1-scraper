import { DriverDB } from '../interfaces/driver.interface';
import { RaceResult, RaceResultDB } from '../interfaces/race.interface';
import { TeamDB } from '../interfaces/team.interface';
import { DBXataClient } from './client/xata';

export const addRacesResults = async (env: Env, races: RaceResult[]): Promise<void> => {
  const xata = DBXataClient.getInstance(env);

  const teams = await xata.getTeams();
  const drivers = await xata.getDrivers();
  const racesComposed = composeRaces(races, drivers, teams);

  const racesResultsDB = await xata.getRacesResults();
  const racesResultsToAdd = mergeRaceResults(racesComposed, racesResultsDB);

  await xata.addRacesResults(racesResultsToAdd);
};

const mergeRaceResults = (races: RaceResult[], dbRaces: RaceResultDB[]) => {
  return races.map((raceResult: RaceResult) => {
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

const composeRaces = (races: RaceResult[], drivers: DriverDB[], teams: TeamDB[]): RaceResult[] => {
  return races.map((race: RaceResult) => {
    const driverMap = new Map(drivers.map(driver => [driver.name, driver.id]));
    const teamMap = new Map(teams.map(team => [team.name, team.id]));

    const driverId = driverMap.get(race.winner) ?? '';
    const teamId = teamMap.get(race.team) ?? '';

    return {
      ...race,
      winner: driverId,
      team: teamId,
    };
  });
}


