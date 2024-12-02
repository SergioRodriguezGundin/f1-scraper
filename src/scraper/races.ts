import { Extractor } from '../interfaces/extractor.interface';
import { RaceResult } from '../interfaces/race.interface';
import { raceModel } from '../models/race.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RACES, RESULTS } from '../utils/globals';

export const getRaces = async (env: Env): Promise<RaceResult[]> => {
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${RACES}`;
  console.log('URL: ', url);
  try {
    const response = await fetch(url);
    const html = await response.text();
    const race: RaceResult = raceModel;

    const extractor: Extractor<RaceResult> = {
      f1Object: race
    };
    const races: RaceResult[] = await extractElement<RaceResult>(html, extractor, env);

    return races;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch races data");
  }
}

