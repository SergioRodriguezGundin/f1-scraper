import { Driver, DriverDB } from '../interfaces/driver.interface';
import { TeamDB } from '../interfaces/team.interface';
import { DBXataClient } from './client/xata';


export const addDrivers = async (env: Env, drivers: Driver[]): Promise<void> => {
  const xata = DBXataClient.getInstance(env);

  const teams = await xata.getTeams();
  const driversDB = await xata.getDrivers();

  const driversComposed = composeDrivers(drivers, teams);
  const driversMerged = mergeDrivers(driversComposed, driversDB);

  await xata.addDrivers(driversMerged);
};

const mergeDrivers = (drivers: Driver[], driversDB: DriverDB[]): DriverDB[] => {
  return drivers.map((driver: Driver) => {
    const driversDBMap = new Map(driversDB.map((driverDB: DriverDB) => [driverDB.name, driverDB]));

    const existingDriver = driversDBMap.get(driver.name);
    if (!existingDriver) {
      return { ...driver, id: crypto.randomUUID() };
    } else {
      return { ...driver, id: existingDriver.id };
    }
  });
};


const composeDrivers = (drivers: Driver[], teams: TeamDB[]): Driver[] => {
  return drivers.map((driver: Driver) => {
    const teamMap = new Map(teams.map((team: TeamDB) => [team.id, team]));
    const team = teamMap.get(driver.team);

    return { ...driver, team: team?.id ?? '' };
  });
};

