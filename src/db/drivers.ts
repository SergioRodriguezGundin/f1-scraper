import { Driver } from '../xata';
import { Team } from '../xata';
import { DBXataClient } from './client/xata';
import { DriverData } from '../models/driver.model';

export const addDrivers = async (env: Env, drivers: DriverData[]): Promise<void> => {
  const xata = DBXataClient.getInstance(env);

  const teams = await xata.getTeams();
  const driversDB = await xata.getDrivers();

  const driversComposed = composeDrivers(drivers, teams);

  const driversMerged = mergeDrivers(driversComposed, driversDB);

  await xata.addDrivers(driversMerged);
};

const mergeDrivers = (drivers: DriverData[], driversDB: Driver[]): Driver[] => {
  return drivers.map((driver: DriverData) => {
    const driversDBMap = new Map(driversDB.map((driverDB: Driver) => [driverDB.name, driverDB]));

    const existingDriver = driversDBMap.get(driver.name);
    if (!existingDriver) {
      return { ...driver, id: crypto.randomUUID() };
    } else {
      return { ...driver, id: existingDriver.id };
    }
  });
};


const composeDrivers = (drivers: DriverData[], teams: Team[]): DriverData[] => {
  const teamMap = new Map(teams.map((team: Team) => [team.name, team]));

  return drivers.map((driver: DriverData) => {
    const team = teamMap.get(driver.team?.name ?? '');

    return { ...driver, team } as Driver;
  });
};

