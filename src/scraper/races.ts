import { RaceResult } from '../interfaces/race.interface';
import { raceModel } from '../models/race.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RACES, RESULTS } from '../utils/globals';

export const getRaces = async (): Promise<RaceResult[]> => {
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${RACES}`;
  try {
    const response = await fetch(url);
    const html = await response.text();

    const race: RaceResult = raceModel;
    const races: RaceResult[] = await extractElement<RaceResult>(html, race);

    return races;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch race data");
  }
}

