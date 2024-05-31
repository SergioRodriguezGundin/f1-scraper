import { Driver, DriverDB, DriverKeys } from '../../interfaces/driver.interface';
import { RaceResult, RaceResultDB, RaceResultDetail, RaceResultDetailKeys, RaceResultKeys } from '../../interfaces/race.interface';
import { Schedule, ScheduleDB, ScheduleKeys } from '../../interfaces/schedule.interface';
import { Team, TeamDB, TeamKeys } from '../../interfaces/team.interface';

export interface DBClient {
  getDriver(keys: DriverKeys[], values: any[]): Promise<DriverDB | null>;
  addDrivers(drivers: Driver[]): Promise<void>;
  getDrivers(keys: DriverKeys[]): Promise<DriverDB[]>;

  getTeam(keys: TeamKeys[], values: any[]): Promise<TeamDB | null>;
  addTeams(teams: Team[]): Promise<void>;
  getTeams(keys: TeamKeys[]): Promise<TeamDB[]>;

  getRacesResults(keys: RaceResultKeys[]): Promise<RaceResultDB[]>;
  addRacesResults(races: RaceResult[]): Promise<void>;

  getScheduleRace(keys: ScheduleKeys[], values: any[]): Promise<ScheduleDB | null>;
  addSchedule(schedule: Schedule[]): Promise<void>;

  getRaceResult(keys: RaceResultDetailKeys[], values: any[]): Promise<RaceResultDB | null>;
  addRaceResult(raceResults: RaceResultDetail[]): Promise<void>;
}

