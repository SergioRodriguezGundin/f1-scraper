import { Driver } from '../xata';
import { Team } from '../xata';
import { DBXataClient } from './client/xata';

export const addDrivers = async (env: Env, drivers: Driver[]): Promise<void> => {
  const xata = DBXataClient.getInstance(env);

  const teams = await xata.getTeams();
  const driversDB = await xata.getDrivers();

  const driversComposed = composeDrivers(drivers, teams);

  const driversMerged = mergeDrivers(driversComposed, driversDB);

  await xata.addDrivers(driversMerged);
};

const mergeDrivers = (drivers: Driver[], driversDB: Driver[]): Driver[] => {
  return drivers.map((driver: Driver) => {
    const driversDBMap = new Map(driversDB.map((driverDB: Driver) => [driverDB.name, driverDB]));

    const existingDriver = driversDBMap.get(driver.name);
    if (!existingDriver) {
      return { ...driver, id: crypto.randomUUID() };
    } else {
      return { ...driver, id: existingDriver.id };
    }
  });
};


const composeDrivers = (drivers: Driver[], teams: Team[]): Driver[] => {
  const teamMap = new Map(teams.map((team: Team) => [team.name, team]));

  return drivers.map((driver: Driver) => {
    const team = teamMap.get(driver.team?.name ?? '');

    return { ...driver, team } as Driver;
  });
};

