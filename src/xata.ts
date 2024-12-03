// Generated by Xata Codegen 0.29.4. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Driver",
    columns: [
      { name: "position", type: "int", notNull: true, defaultValue: "0" },
      { name: "points", type: "int", notNull: true, defaultValue: "0" },
      { name: "image", type: "string", notNull: true, defaultValue: " " },
      { name: "nationality", type: "string", notNull: true, defaultValue: " " },
      { name: "name", type: "string", notNull: true, defaultValue: " " },
      { name: "team", type: "link", link: { table: "Team" } },
    ],
    revLinks: [
      { column: "driver", table: "Race_result" },
      { column: "winner", table: "Races_result" },
    ],
  },
  {
    name: "Team",
    columns: [
      { name: "position", type: "int", notNull: true, defaultValue: "0" },
      { name: "points", type: "int", notNull: true, defaultValue: "0" },
      { name: "image", type: "string", notNull: true, defaultValue: " " },
      { name: "name", type: "string", notNull: true, defaultValue: " " },
      { name: "icon", type: "string" },
      { name: "car", type: "string", notNull: true, defaultValue: " " },
    ],
    revLinks: [
      { column: "team", table: "Driver" },
      { column: "team", table: "Races_result" },
      { column: "team", table: "Race_result" },
    ],
  },
  {
    name: "Races_result",
    columns: [
      { name: "track", type: "string", notNull: true, defaultValue: " " },
      { name: "team", type: "link", link: { table: "Team" } },
      { name: "time", type: "string", notNull: true, defaultValue: " " },
      { name: "laps", type: "int", notNull: true, defaultValue: "0" },
      { name: "date", type: "string", notNull: true, defaultValue: " " },
      { name: "winner", type: "link", link: { table: "Driver" } },
    ],
  },
  {
    name: "Race_result",
    columns: [
      { name: "position", type: "int", notNull: true, defaultValue: "0" },
      { name: "driverNumber", type: "int", notNull: true, defaultValue: "0" },
      { name: "driver", type: "link", link: { table: "Driver" } },
      { name: "team", type: "link", link: { table: "Team" } },
      { name: "laps", type: "int", notNull: true, defaultValue: "0" },
      { name: "timeOrRetired", type: "text", notNull: true, defaultValue: " " },
      { name: "points", type: "int", notNull: true, defaultValue: "0" },
      { name: "year", type: "int", notNull: true, defaultValue: "2024" },
      { name: "place", type: "string", notNull: true, defaultValue: " " },
    ],
  },
  {
    name: "Schedule",
    columns: [
      { name: "round", type: "text", notNull: true, defaultValue: " " },
      { name: "days", type: "text", notNull: true, defaultValue: " " },
      { name: "month", type: "text", notNull: true, defaultValue: " " },
      { name: "flag", type: "text", notNull: true, defaultValue: " " },
      { name: "place", type: "text", notNull: true, defaultValue: " " },
      { name: "title", type: "text", notNull: true, defaultValue: " " },
      { name: "trackImage", type: "text" },
      {
        name: "firstPlace",
        type: "json",
        defaultValue:
          '{\r\n    "driverImage": "",\r\n    "driverName": ""\r\n}',
      },
      {
        name: "secondPlace",
        type: "json",
        defaultValue:
          '{\r\n    "driverImage": "",\r\n    "driverName": ""\r\n}',
      },
      {
        name: "thirdPlace",
        type: "json",
        defaultValue:
          '{\r\n    "driverImage": "",\r\n    "driverName": ""\r\n}',
      },
      { name: "year", type: "int", notNull: true, defaultValue: "2024" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Driver = InferredTypes["Driver"];
export type DriverRecord = Driver & XataRecord;

export type Team = InferredTypes["Team"];
export type TeamRecord = Team & XataRecord;

export type RacesResult = InferredTypes["Races_result"];
export type RacesResultRecord = RacesResult & XataRecord;

export type RaceResult = InferredTypes["Race_result"];
export type RaceResultRecord = RaceResult & XataRecord;

export type Schedule = InferredTypes["Schedule"];
export type ScheduleRecord = Schedule & XataRecord;

export type DatabaseSchema = {
  Driver: DriverRecord;
  Team: TeamRecord;
  Races_result: RacesResultRecord;
  Race_result: RaceResultRecord;
  Schedule: ScheduleRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Sergio-rg-s-workspace-rk8edk.eu-central-1.xata.sh/db/f1-api",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
