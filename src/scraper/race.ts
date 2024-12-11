import { Extractor } from '../interfaces/extractor.interface';
import { RaceFastestLapsData, raceFastestLapsModel } from '../models/race/fastestLaps.model';
import { raceResultDetailModel } from '../models/race/race.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RESULTS, getFastestLapsUrl, getPitStopsUrl, getPracticeOneUrl, getPracticeThreeUrl, getPracticeTwoUrl, getQualifyingUrl, getRaceResultUrl, getStartingGridUrl, racesMap } from '../utils/globals';
import { RaceResult } from '../xata';

export const getRace = async (env: Env, id: string): Promise<RaceResult[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const raceResultUrl = getRaceResultUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${raceResultUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const raceDetail: RaceResult = raceResultDetailModel;
    const extractor: Extractor<RaceResult> = {
      f1Object: raceDetail,
      retrieveAdditionalData: setYear,
    };
    const raceResults: RaceResult[] = await extractElement<RaceResult>(html, extractor, env);

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

export const pitStops = async (env: Env, id: string): Promise<void> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const pitStopsUrl = getPitStopsUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${pitStopsUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch pit stops data");
  }
}

export const startingGrid = async (env: Env, id: string): Promise<void> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const startingGridUrl = getStartingGridUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${startingGridUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch starting grid data");
  }
}

export const qualifying = async (env: Env, id: string): Promise<void> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const qualifyingUrl = getQualifyingUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${qualifyingUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch qualifying data");
  }
}

export const practiceOne = async (env: Env, id: string): Promise<void> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const practiceOneUrl = getPracticeOneUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${practiceOneUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch practice one data");
  }
}

export const practiceTwo = async (env: Env, id: string): Promise<void> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const practiceTwoUrl = getPracticeTwoUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${practiceTwoUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch practice two data");
  }
}

export const practiceThree = async (env: Env, id: string): Promise<void> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const practiceThreeUrl = getPracticeThreeUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${practiceThreeUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch practice three data");
  }
}

const setYear = async (raceResult: RaceResult | RaceFastestLapsData): Promise<void> => {
  raceResult.year = Number(F1_YEAR);
}

