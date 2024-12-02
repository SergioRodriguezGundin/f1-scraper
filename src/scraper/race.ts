import { Extractor } from '../interfaces/extractor.interface';
import { RaceResultDetail } from '../interfaces/race.interface';
import { raceResultDetailModel } from '../models/race.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RESULTS, getRaceResultUrl, racesMap } from '../utils/globals';

export const getRace = async (env: Env, id: string): Promise<RaceResultDetail[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const raceResultUrl = getRaceResultUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${raceResultUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const raceDetail: RaceResultDetail = raceResultDetailModel;
    const extractor: Extractor<RaceResultDetail> = {
      f1Object: raceDetail,
      retrieveAdditionalData: setYear,
    };
    const raceResults: RaceResultDetail[] = await extractElement<RaceResultDetail>(html, extractor, env);

    return raceResults;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch race data");
  }
}

export const setYear = async (raceResultDetail: RaceResultDetail): Promise<void> => {
  raceResultDetail.year = Number(F1_YEAR);
}

