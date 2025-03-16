import { RaceFastestLapsData } from '../models/race/fastestLaps.model';
import { RacePitStopsData } from '../models/race/pitStop.model';
import { RaceQualifyingData } from '../models/race/qualifying.model';
import { RaceResultDetailData } from '../models/race/race.model';
import { RaceStartingGridData } from '../models/race/startingGrid.model';

export const F1_URL = 'https://www.formula1.com';
export const F1_YEAR = '2025';

export const RESULTS = 'en/results';
export const RACING = 'en/racing';

export const RACES = 'races';
export const DRIVERS = 'drivers';
export const TEAMS = 'team';

export type Category = typeof RACES | typeof DRIVERS | typeof TEAMS;

export type RaceResultType = RaceResultDetailData | RaceFastestLapsData | RacePitStopsData | RaceStartingGridData | RaceQualifyingData;

export const TABLE_ELEMENT = 'table.f1-table tbody tr';

export const racesMap = new Map<string, { race: string; place: string }>();
racesMap.set('bahrain', { race: 'races/1257/bahrain', place: 'Bahrain' });
racesMap.set('saudi-arabia', { race: 'races/1258/saudi-arabia', place: 'Saudi Arabia' });
racesMap.set('australia', { race: 'races/1254/australia', place: 'Australia' });
racesMap.set('japan', { race: 'races/1256/japan', place: 'Japan' });
racesMap.set('china', { race: 'races/1255/china', place: 'China' });
racesMap.set('miami', { race: 'races/1259/miami', place: 'Miami' });
racesMap.set('italy', { race: 'races/1260/italy', place: 'Emilia-Romagna' });
racesMap.set('monaco', { race: 'races/1261/monaco', place: 'Monaco' });
racesMap.set('canada', { race: 'races/1263/canada', place: 'Canada' });
racesMap.set('spain', { race: 'races/1262/spain', place: 'Spain' });
racesMap.set('austria', { race: 'races/1264/austria', place: 'Austria' });
racesMap.set('great-britain', { race: 'races/1277/great-britain', place: 'Great Britain' });
racesMap.set('hungary', { race: 'races/1266/hungary', place: 'Hungary' });
racesMap.set('belgium', { race: 'races/1265/belgium', place: 'Belgium' });
racesMap.set('netherlands', { race: 'races/1267/netherlands', place: 'Netherlands' });
racesMap.set('monza', { race: 'races/1268/italy', place: 'Italy' });
racesMap.set('azerbaijan', { race: 'races/1269/azerbaijan', place: 'Azerbaijan' });
racesMap.set('singapore', { race: 'races/1270/singapore', place: 'Singapore' });
racesMap.set('united-states', { race: 'races/1271/united-states', place: 'United States' });
racesMap.set('mexico', { race: 'races/1272/mexico', place: 'Mexico' });
racesMap.set('brazil', { race: 'races/1273/brazil', place: 'Brazil' });
racesMap.set('las-vegas', { race: 'races/1274/las-vegas', place: 'Las Vegas' });
racesMap.set('qatar', { race: 'races/1275/qatar', place: 'Qatar' });
racesMap.set('abu-dhabi', { race: 'races/1276/abu-dhabi', place: 'Abu Dhabi' });

export const getRacePlace = (race: string) => {
	return racesMap.get(race)?.place;
};

export const getRaceResultUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/race-result`;
};

export const getFastestLapsUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/fastest-laps`;
};

export const getPitStopsUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/pit-stop-summary`;
};

export const getQualifyingUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/qualifying`;
};

export const getStartingGridUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/starting-grid`;
};

export const getPracticeOneUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/practice/1`;
};

export const getPracticeTwoUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/practice/2`;
};

export const getPracticeThreeUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/practice/3`;
};

export const getSprintQualifyingUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/sprint-qualifying`;
};

export const getSprintGridUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/sprint-grid`;
};

export const getSprintRaceUrl = (race: string) => {
	return `${racesMap.get(race)?.race}/sprint-results`;
};

const practiceUrlGetters: Record<number, (id: string) => string> = {
	1: getPracticeOneUrl,
	2: getPracticeTwoUrl,
	3: getPracticeThreeUrl,
};

export const getPracticeUrlById = (id: string, practiceId: number): string => {
	const practiceUrl = practiceUrlGetters[practiceId];

	if (!practiceUrl) {
		throw new Error(`Invalid practice session ID: ${practiceId}`);
	}

	return practiceUrl(id);
};

export const setYear = async (raceResult: RaceResultType): Promise<void> => {
	raceResult.year = Number(F1_YEAR);
};
