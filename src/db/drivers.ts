import { Driver, DriverKeys } from '../interfaces/driver.interface';
import { TeamDB } from '../interfaces/team.interface';
import { DBXataClient } from './client/xata';


export const addDrivers = async (env: Env, drivers: Driver[]): Promise<void> => {
  const xata = DBXataClient.getInstance(env);
  const driversDB: Driver[] = [];
  const teams = await xata.getTeams();

  drivers.forEach((driver: Driver) => {
    const driverTeam = driver.team;
    const team = teams.find((team: TeamDB) => team.name === driverTeam);
    driver.team = team?.id ?? '';

    driversDB.push(driver);
  });

  await xata.addDrivers(drivers);
};

