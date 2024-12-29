import { Extractor } from '../interfaces/extractor.interface';
import { SprintGridData, sprintGridModel } from '../models/sprint/sprintGrid.model';
import { SprintQualifyingData, sprintQualifyingModel } from '../models/sprint/sprintQualifying.model';
import { SprintRaceData, sprintRaceModel } from '../models/sprint/sprintRace.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RESULTS, getSprintGridUrl, getSprintQualifyingUrl, getSprintRaceUrl, racesMap, setYear } from '../utils/globals';

export const sprintQualifying = async (env: Env, id: string): Promise<SprintQualifyingData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const sprintQualifyingUrl = getSprintQualifyingUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${sprintQualifyingUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const sprintQualifying: SprintQualifyingData = sprintQualifyingModel;
    const extractor: Extractor<SprintQualifyingData> = {
      f1Object: sprintQualifying,
      retrieveAdditionalData: setYear,
    };
    const sprintQualifyingResult: SprintQualifyingData[] = await extractElement<SprintQualifyingData>(html, extractor, env);

    return sprintQualifyingResult;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch sprint qualifying data");
  }
}

export const sprintGrid = async (env: Env, id: string): Promise<SprintGridData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const sprintGridUrl = getSprintGridUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${sprintGridUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const sprintGrid: SprintGridData = sprintGridModel;
    const extractor: Extractor<SprintGridData> = {
      f1Object: sprintGrid,
      retrieveAdditionalData: setYear,
    };
    const sprintGridResult: SprintGridData[] = await extractElement<SprintGridData>(html, extractor, env);

    return sprintGridResult;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch sprint grid data");
  }
}

export const sprintRace = async (env: Env, id: string): Promise<SprintRaceData[]> => {
  const race = racesMap.get(id);

  if (!race) {
    throw new Error(`Race with id ${id} not found`);
  }

  const sprintRaceUrl = getSprintRaceUrl(id);
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${sprintRaceUrl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const sprintRace: SprintRaceData = sprintRaceModel;
    const extractor: Extractor<SprintRaceData> = {
      f1Object: sprintRace,
      retrieveAdditionalData: setYear,
    };
    const sprintRaceResult: SprintRaceData[] = await extractElement<SprintRaceData>(html, extractor, env);

    return sprintRaceResult;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch sprint race data");
  }
}

