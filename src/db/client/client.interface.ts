import { DriverKeys } from '../../interfaces/driver.interface';
import { RaceResultDetailKeys, RaceResultKeys } from '../../interfaces/race/race.interface';
import { ScheduleKeys } from '../../interfaces/schedule.interface';
import { TeamKeys } from '../../interfaces/team.interface';
import { Driver, Team, RaceResult, Schedule, RacesResult } from '../../xata';

export interface DBClient {
  getDriver(keys: DriverKeys[], values: any[]): Promise<Driver | null>;
  addDrivers(drivers: Driver[]): Promise<void>;
  getDrivers(keys: DriverKeys[]): Promise<Driver[]>;

  getTeam(keys: TeamKeys[], values: any[]): Promise<Team | null>;
  addTeams(teams: Team[]): Promise<void>;
  getTeams(keys: TeamKeys[]): Promise<Team[]>;

  getRacesResults(keys: RaceResultKeys[]): Promise<RacesResult[]>;
  addRacesResults(races: RacesResult[]): Promise<void>;

  getScheduleRace(keys: ScheduleKeys[], values: any[]): Promise<Schedule | null>;
  addSchedule(schedule: Schedule[]): Promise<void>;

  getRaceResult(keys: RaceResultDetailKeys[], values: any[]): Promise<RaceResult | null>;
  addRaceResult(raceResults: RaceResult[]): Promise<void>;
}