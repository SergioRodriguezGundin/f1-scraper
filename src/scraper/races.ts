import { Extractor } from '../interfaces/extractor.interface';
import { raceModel, RacesResultData } from '../models/race/race.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RACES, RESULTS } from '../utils/globals';

export const getRaces = async (env: Env): Promise<RacesResultData[]> => {
	const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${RACES}`;
	try {
		const response = await fetch(url);
		const html = await response.text();
		const race: RacesResultData = raceModel;

		const extractor: Extractor<RacesResultData> = {
			f1Object: race,
		};
		const races: RacesResultData[] = await extractElement<RacesResultData>(html, extractor, env);

		return races;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch races data');
	}
};
