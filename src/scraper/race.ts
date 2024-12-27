import { Extractor } from '../interfaces/extractor.interface';
import { RaceFastestLapsData, raceFastestLapsModel } from '../models/race/fastestLaps.model';
import { RacePitStopsData, racePitStopsModel } from '../models/race/pitStop.model';
import { RacePracticeData, racePracticeModel } from '../models/race/practice.model';
import { RaceQualifyingData, raceQualifyingModel } from '../models/race/qualifying.model';
import { RaceResultDetailData, raceResultDetailModel } from '../models/race/race.model';
import { RaceStartingGridData, raceStartingGridModel } from '../models/race/startingGrid.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RESULTS, getFastestLapsUrl, getPitStopsUrl, getPracticeUrlById, getQualifyingUrl, getRaceResultUrl, getStartingGridUrl, racesMap, setYear } from '../utils/globals';

export const getRace = async (env: Env, id: string): Promise<RaceResultDetailData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const raceResultUrl = getRaceResultUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${raceResultUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const raceDetail: RaceResultDetailData = raceResultDetailModel;
    const extractor: Extractor<RaceResultDetailData> = {
      f1Object: raceDetail,
      retrieveAdditionalData: setYear,
    };
    const raceResults: RaceResultDetailData[] = await extractElement<RaceResultDetailData>(html, extractor, env);

    return raceResults;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch race data");
  }
}

export const fastestLaps = async (env: Env, id: string): Promise<RaceFastestLapsData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const fastestLapsUrl = getFastestLapsUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${fastestLapsUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const raceFastestLaps: RaceFastestLapsData = raceFastestLapsModel;
    const extractor: Extractor<RaceFastestLapsData> = {
      f1Object: raceFastestLaps,
      retrieveAdditionalData: setYear,
    };
    const raceFastestLapsResult: RaceFastestLapsData[] = await extractElement<RaceFastestLapsData>(html, extractor, env);

    return raceFastestLapsResult;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch fastest laps data");
  }
}

export const pitStops = async (env: Env, id: string): Promise<RacePitStopsData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const pitStopsUrl = getPitStopsUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${pitStopsUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const racePitStops: RacePitStopsData = racePitStopsModel;
    const extractor: Extractor<RacePitStopsData> = {
      f1Object: racePitStops,
      retrieveAdditionalData: setYear,
    };
    const racePitStopsResult: RacePitStopsData[] = await extractElement<RacePitStopsData>(html, extractor, env);

    return racePitStopsResult;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch pit stops data");
  }
}

export const startingGrid = async (env: Env, id: string): Promise<RaceStartingGridData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const startingGridUrl = getStartingGridUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${startingGridUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const raceStartingGrid: RaceStartingGridData = raceStartingGridModel;
    const extractor: Extractor<RaceStartingGridData> = {
      f1Object: raceStartingGrid,
      retrieveAdditionalData: setYear,
    };
    const raceStartingGridResult: RaceStartingGridData[] = await extractElement<RaceStartingGridData>(html, extractor, env);

    return raceStartingGridResult;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch starting grid data");
  }
}

export const qualifying = async (env: Env, id: string): Promise<RaceQualifyingData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const qualifyingUrl = getQualifyingUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${qualifyingUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const raceQualifying: RaceQualifyingData = raceQualifyingModel;
    const extractor: Extractor<RaceQualifyingData> = {
      f1Object: raceQualifying,
      retrieveAdditionalData: setYear,
    };
    const raceQualifyingResult: RaceQualifyingData[] = await extractElement<RaceQualifyingData>(html, extractor, env);

    return raceQualifyingResult;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch qualifying data");
  }
}

export const practice = async (env: Env, id: string, practiceId: string): Promise<RacePracticeData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const practiceUrl = getPracticeUrlById(id, Number(practiceId));
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${practiceUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const racePractice: RacePracticeData = racePracticeModel;
    const extractor: Extractor<RacePracticeData> = {
      f1Object: racePractice,
      retrieveAdditionalData: setYear,
    };
    const racePracticeResult: RacePracticeData[] = await extractElement<RacePracticeData>(html, extractor, env);

    return racePracticeResult;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch practice ${practiceId} data`);
  }
}

