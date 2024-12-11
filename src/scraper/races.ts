import { Extractor } from '../interfaces/extractor.interface';
import { raceModel } from '../models/race/race.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RACES, RESULTS } from '../utils/globals';
import { RacesResult } from '../xata';

export const getRaces = async (env: Env): Promise<RacesResult[]> => {
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${RACES}`;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const race: RacesResult = raceModel;

    const extractor: Extractor<RacesResult> = {
      f1Object: race
    };
    const races: RacesResult[] = await extractElement<RacesResult>(html, extractor, env);

    return races;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch races data");
  }
}

