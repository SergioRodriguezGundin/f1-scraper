import { RacesResult, RaceResult } from '../xata';

export const raceModel: RacesResult = {
  id: '',
  track: '',
  date: '',
  winner: null,
  team: null,
  laps: 0,
  time: '',
}

export const raceResultDetailModel: RaceResult = {
  id: '',
  position: 0,
  driverNumber: 0,
  driver: null,
  team: null,
  laps: 0,
  timeOrRetired: '',
  points: 0,
  year: 2024,
  place: ''
}

