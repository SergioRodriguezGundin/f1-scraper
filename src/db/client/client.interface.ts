import { DriverKeys } from '../../interfaces/driver.interface';
import { RaceResultDetailKeys, RaceResultKeys } from '../../interfaces/race/race.interface';
import { ScheduleKeys } from '../../interfaces/schedule.interface';
import { TeamKeys } from '../../interfaces/team.interface';
import { RacePitStopsData } from '../../models/race/pitStop.model';
import { RacePracticeData } from '../../models/race/practice.model';
import { RaceQualifyingData } from '../../models/race/qualifying.model';
import { RaceStartingGridData } from '../../models/race/startingGrid.model';
import { SprintGridData } from '../../models/sprint/sprintGrid.model';
import { SprintQualifyingData } from '../../models/sprint/sprintQualifying.model';
import { SprintRaceData } from '../../models/sprint/sprintRace.model';
import { Driver, RaceResult, RacesResult, Schedule, Team } from '../../xata';

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

  addRacePitStops(racePitStops: RacePitStopsData[]): Promise<void>;
  addRaceStartingGrid(raceStartingGrid: RaceStartingGridData[]): Promise<void>;
  addRaceQualifying(raceQualifying: RaceQualifyingData[]): Promise<void>;
  addRacePractice(racePractice: RacePracticeData[]): Promise<void>;

  addSprintGrid(sprintGrid: SprintGridData[]): Promise<void>;
  addSprintRace(sprintRace: SprintRaceData[]): Promise<void>;
  addSprintQualifying(sprintQualifying: SprintQualifyingData[]): Promise<void>;
}