import { RaceResult, RaceResultDetail } from '../interfaces/race.interface';

export const raceModel: RaceResult = {
  track: "",
  date: "",
  winner: "",
  team: "",
  laps: 0,
  time: "",
}

export const raceResultDetailModel: RaceResultDetail = {
  position: 0,
  driverNumber: 0,
  driver: "",
  team: "",
  laps: 0,
  timeOrRetired: "",
  points: 0,
}

