import { Driver, DriverDB, DriverKeys, driverKeys } from '../../interfaces/driver.interface';
import { RaceResultDB, RaceResultDetail, RaceResultDetailKeys, RaceResultKeys, raceResultKeys } from '../../interfaces/race.interface';
import { Schedule, ScheduleDB, ScheduleKeys } from '../../interfaces/schedule.interface';
import { Team, TeamDB, TeamKeys, teamKeys } from '../../interfaces/team.interface';
import { XataClient } from '../../xata';
import { DBClient } from './client.interface';

export class DBXataClient implements DBClient {
  private static instance: DBXataClient;
  private client: XataClient;

  private constructor(env: Env) {
    console.log('env: ', env);

    this.client = new XataClient({
      apiKey: env.XATA_API_KEY,
      branch: env.XATA_BRANCH,
      databaseURL: env.XATA_DATABASE_URL,
    });
  }

  public static getInstance(env: Env): DBXataClient {
    if (!DBXataClient.instance) {
      DBXataClient.instance = new DBXataClient(env);
    }
    return DBXataClient.instance;
  }

  public async getDriver(keys: DriverKeys[], values: any[]): Promise<DriverDB | null> {
    const filterObject = keys.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {} as Record<DriverKeys, any>);

    const driverRecord = await this.client.db.Driver.filter(filterObject).getFirst();
    if (!driverRecord) {
      return null;
    }
    return driverRecord as unknown as DriverDB;
  }

  public async addDrivers(drivers: Driver[]): Promise<void> {
    try {
      await this.client.db.Driver.createOrUpdate(drivers);
    } catch (error) {
      console.error('Error creating drivers: ', error);
    }
  }

  public async getDrivers(keys: DriverKeys[] = driverKeys): Promise<DriverDB[]> {
    try {
      const records = await this.client.db.Driver.select(keys).getAll();
      return records.map((record: Record<DriverKeys, any>) => record as DriverDB) as DriverDB[];
    } catch (error) {
      console.error('Error getting drivers: ', error);
      throw error;
    }
  }

  public async getTeam(keys: TeamKeys[], values: any[]): Promise<TeamDB | null> {
    const filterObject = keys.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {} as Record<TeamKeys, any>);

    const teamRecord = await this.client.db.Team.filter(filterObject).getFirst();
    if (!teamRecord) {
      return null;
    }
    return teamRecord as unknown as TeamDB;
  }

  public async addTeams(teams: Team[]): Promise<void> {
    try {
      await this.client.db.Team.createOrUpdate(teams);
    } catch (error) {
      console.error('Error creating teams: ', error);
    }
  }

  public async getTeams(keys: TeamKeys[] = teamKeys): Promise<TeamDB[]> {
    try {
      const records = await this.client.db.Team.select(keys).getAll();
      return records.map((record: Record<TeamKeys, any>) => record as TeamDB) as TeamDB[];
    } catch (error) {
      console.error('Error getting teams: ', error);
      throw error;
    }
  }

  public async getRacesResults(keys: RaceResultKeys[] = raceResultKeys) {
    try {
      const records = await this.client.db.Races_result.select(keys).getAll();
      console.log('records: ', records);
      return records.map((record: Record<RaceResultKeys, any>) => record as RaceResultDB) as RaceResultDB[];
    } catch (error) {
      console.error('Error getting races results: ', error);
      throw error;
    }
  }

  public async addRacesResults(races: RaceResultDB[]): Promise<void> {
    try {
      await this.client.db.Races_result.createOrReplace(races);
    } catch (error) {
      console.error('Error creating races results: ', error);
    }
  }
  public async getScheduleRace(keys: ScheduleKeys[], values: any[]): Promise<ScheduleDB | null> {
    const filterObject = keys.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {} as Record<ScheduleKeys, any>);

    const scheduleRecord = await this.client.db.Schedule.filter(filterObject).getFirst();

    if (!scheduleRecord) {
      return null;
    }

    return scheduleRecord as unknown as ScheduleDB;
  }

  public async addSchedule(schedule: Schedule[]): Promise<void> {
    try {
      await this.client.db.Schedule.create(schedule);
    } catch (error) {
      console.error('Error creating schedule: ', error);
    }
  }

  public async getRaceResult(keys: RaceResultDetailKeys[], values: any[]): Promise<RaceResultDB | null> {
    const filterObject = keys.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {} as Record<RaceResultDetailKeys, any>);

    const raceResult = await this.client.db.Race_result.filter(filterObject).getFirst();
    if (!raceResult) {
      return null;
    }
    return raceResult as unknown as RaceResultDB;
  }

  public async addRaceResult(raceResults: RaceResultDetail[]): Promise<void> {
    try {
      await this.client.db.Race_result.create(raceResults);
    } catch (error) {
      console.error('Error creating race results: ', error);
    }
  }
}

