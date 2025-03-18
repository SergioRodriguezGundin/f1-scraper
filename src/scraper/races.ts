import { Extractor } from '../interfaces/extractor.interface';
import { RacesResultScraper, racesResultScraperModel } from '../models/race/race.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RACES, RESULTS } from '../utils/globals';

export const getRaces = async (env: Env): Promise<RacesResultScraper[]> => {
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${RACES}`;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const race: RacesResultScraper = racesResultScraperModel;

    const extractor: Extractor<RacesResultScraper> = {
      f1Object: race,
    };
    const races: RacesResultScraper[] = await extractElement<RacesResultScraper>(html, extractor, env);

    return races;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch races data');
  }
};
