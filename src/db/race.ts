import { RaceFastestLapsData } from '../models/race/fastestLaps.model';
import { RacePitStopsData } from '../models/race/pitStop.model';
import { RaceResultDetailData } from '../models/race/race.model';
import { F1_YEAR, getRacePlace } from '../utils/globals';
import { RaceFastestLaps, RacePitStops, RaceQualifying, RaceResult, RaceStartingGrid } from '../xata';
import { DBXataClient } from './client/xata';

import { RaceQualifyingData } from '../models/race/qualifying.model';
import { RaceStartingGridData } from '../models/race/startingGrid.model';
import { driverCache } from '../utils/cache/driver';
import { teamCache } from '../utils/cache/team';
import { RacePracticeData } from '../models/race/practice.model';
import { SprintGridData } from '../models/sprint/sprintGrid.model';
import { SprintRaceData } from '../models/sprint/sprintRace.model';
import { SprintQualifyingData } from '../models/sprint/sprintQualifying.model';

export const addRaceResult = async (env: Env, raceId: string, raceResults: RaceResultDetailData[]) => {
	const xata = DBXataClient.getInstance(env);
	const raceResultsDB: RaceResultDetailData[] = [];

	const place = getRacePlace(raceId);

	for (const raceResult of raceResults) {
		let driver = driverCache.get(raceResult.driver as unknown as string);
		let team = teamCache.get(raceResult.team as unknown as string);

		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [raceResult.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		if (!team) {
			team = await xata.getTeam(['name', 'year'], [raceResult.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (driver && team && place) {
			const race: RaceResultDetailData = {
				...raceResult,
				driver: driver as RaceResult['driver'],
				team: team as RaceResult['team'],
				place,
				year: Number(F1_YEAR),
			};
			raceResultsDB.push(race);
		} else {
			console.log('Error adding race result. Team, driver or schedule is not available', raceResult);
		}
	}

	await xata.addRaceResult(raceResultsDB);
};

export const addFastestLaps = async (env: Env, raceId: string, raceFastestLaps: RaceFastestLapsData[]) => {
	const xata = DBXataClient.getInstance(env);
	const raceFastestLapsDB: RaceFastestLapsData[] = [];

	const place = getRacePlace(raceId);

	for (const raceFastestLap of raceFastestLaps) {
		let driver = driverCache.get(raceFastestLap.driver as unknown as string);
		let team = teamCache.get(raceFastestLap.team as unknown as string);

		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [raceFastestLap.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		if (!team) {
			team = await xata.getTeam(['name', 'year'], [raceFastestLap.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (driver && team && place) {
			const race: RaceFastestLapsData = {
				...raceFastestLap,
				driver: driver as RaceFastestLaps['driver'],
				team: team as RaceFastestLaps['team'],
				place,
			};
			raceFastestLapsDB.push(race);
		} else {
			console.log('Error adding race fastest laps. Team, driver or place is not available', raceFastestLap);
		}
	}

	await xata.addRaceFastestLaps(raceFastestLapsDB);
};

export const addPitStops = async (env: Env, raceId: string, racePitStops: RacePitStopsData[]) => {
	const xata = DBXataClient.getInstance(env);
	const racePitStopsDB: RacePitStopsData[] = [];
	const place = getRacePlace(raceId);

	for (const racePitStop of racePitStops) {
		let driver = driverCache.get(racePitStop.driver as unknown as string); // HACK: Type assertion to avoid type error

		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [racePitStop.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		let team = teamCache.get(racePitStop.team as unknown as string); // HACK: Type assertion to avoid type error
		if (!team) {
			team = await xata.getTeam(['name', 'year'], [racePitStop.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (driver && team && place) {
			const race: RacePitStopsData = {
				...racePitStop,
				driver: driver as RacePitStops['driver'],
				team: team as RacePitStops['team'],
				place: place || '',
				year: Number(F1_YEAR),
			};
			racePitStopsDB.push(race);
		} else {
			console.log('Error adding race pit stops. Team, driver or place is not available', racePitStop);
		}
	}

	await xata.addRacePitStops(racePitStopsDB);
};

export const addStartingGrid = async (env: Env, raceId: string, raceStartingGrid: RaceStartingGridData[]) => {
	const xata = DBXataClient.getInstance(env);
	const raceStartingGridDB: RaceStartingGridData[] = [];

	const place = getRacePlace(raceId);

	for (const startingGrid of raceStartingGrid) {
		let driver = driverCache.get(startingGrid.driver as unknown as string);
		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [startingGrid.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		let team = teamCache.get(startingGrid.team as unknown as string);
		if (!team) {
			team = await xata.getTeam(['name', 'year'], [startingGrid.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (place) {
			const race: RaceStartingGridData = {
				...startingGrid,
				driver: driver as RaceStartingGrid['driver'],
				team: team as RaceStartingGrid['team'],
				place: place || '',
				year: Number(F1_YEAR),
			};
			raceStartingGridDB.push(race);
		} else {
			console.log('Error adding race starting grid. Place is not available', raceStartingGrid);
		}
	}

	await xata.addRaceStartingGrid(raceStartingGridDB);
};

export const addQualifying = async (env: Env, raceId: string, raceQualifying: RaceQualifyingData[]) => {
	const xata = DBXataClient.getInstance(env);
	const raceQualifyingDB: RaceQualifyingData[] = [];

	const place = getRacePlace(raceId);

	for (const qualifying of raceQualifying) {
		let driver = driverCache.get(qualifying.driver as unknown as string);
		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [qualifying.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		let team = teamCache.get(qualifying.team as unknown as string);
		if (!team) {
			team = await xata.getTeam(['name', 'year'], [qualifying.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (driver && team && place) {
			const race: RaceQualifyingData = {
				...qualifying,
				driver: driver as RaceQualifying['driver'],
				team: team as RaceQualifying['team'],
				place: place || '',
				year: Number(F1_YEAR),
			};
			raceQualifyingDB.push(race);
		} else {
			console.log('Error adding race qualifying. Team, driver or place is not available', qualifying);
		}
	}

	await xata.addRaceQualifying(raceQualifyingDB);
};

export const addPractice = async (env: Env, raceId: string, practiceId: string, racePractice: RacePracticeData[]) => {
	const xata = DBXataClient.getInstance(env);
	const racePracticeDB: RacePracticeData[] = [];

	const place = getRacePlace(raceId);

	for (const practice of racePractice) {
		let driver = driverCache.get(practice.driver as unknown as string);
		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [practice.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		let team = teamCache.get(practice.team as unknown as string);
		if (!team) {
			team = await xata.getTeam(['name', 'year'], [practice.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (place && driver && team) {
			const race: RacePracticeData = {
				...practice,
				driver: driver as RacePracticeData['driver'],
				team: team as RacePracticeData['team'],
				place: place || '',
				session: Number(practiceId),
				year: Number(F1_YEAR),
			};
			racePracticeDB.push(race);
		} else {
			console.log('Error adding race practice. Place, driver or team is not available', practice);
		}
	}

	await xata.addRacePractice(racePracticeDB);
};

export const addSprintGrid = async (env: Env, id: string, sprintGrid: SprintGridData[]) => {
	const xata = DBXataClient.getInstance(env);
	const sprintGridDB: SprintGridData[] = [];

	const place = getRacePlace(id);

	for (const sprint of sprintGrid) {
		let driver = driverCache.get(sprint.driver as unknown as string);
		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [sprint.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		let team = teamCache.get(sprint.team as unknown as string);
		if (!team) {
			team = await xata.getTeam(['name', 'year'], [sprint.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (place) {
			const sprintGrid: SprintGridData = {
				...sprint,
				driver: driver as SprintGridData['driver'],
				team: team as SprintGridData['team'],
				place: place || '',
				year: Number(F1_YEAR),
			};
			sprintGridDB.push(sprintGrid);
		} else {
			console.log('Error adding sprint grid. Place is not available', sprint);
		}
	}

	await xata.addSprintGrid(sprintGridDB);
};

export const addSprintRace = async (env: Env, id: string, sprintRace: SprintRaceData[]) => {
	const xata = DBXataClient.getInstance(env);
	const sprintRaceDB: SprintRaceData[] = [];

	const place = getRacePlace(id);

	for (const sprint of sprintRace) {
		let driver = driverCache.get(sprint.driver as unknown as string);
		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [sprint.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		let team = teamCache.get(sprint.team as unknown as string);
		if (!team) {
			team = await xata.getTeam(['name', 'year'], [sprint.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (place && driver && team) {
			const sprintRace: SprintRaceData = {
				...sprint,
				driver: driver as SprintRaceData['driver'],
				team: team as SprintRaceData['team'],
				place: place || '',
				year: Number(F1_YEAR),
			};
			sprintRaceDB.push(sprintRace);
		} else {
			console.log('Error adding sprint race. Place, driver or team is not available', sprint);
		}
	}

	await xata.addSprintRace(sprintRaceDB);
};

export const addSprintQualifying = async (env: Env, id: string, sprintQualifying: SprintQualifyingData[]) => {
	const xata = DBXataClient.getInstance(env);
	const sprintQualifyingDB: SprintQualifyingData[] = [];

	const place = getRacePlace(id);

	for (const sprint of sprintQualifying) {
		let driver = driverCache.get(sprint.driver as unknown as string);
		if (!driver) {
			driver = await xata.getDriver(['name', 'year'], [sprint.driver, F1_YEAR]);
			driver && driverCache.set(driver);
		}

		let team = teamCache.get(sprint.team as unknown as string);
		if (!team) {
			team = await xata.getTeam(['name', 'year'], [sprint.team, F1_YEAR]);
			team && teamCache.set(team);
		}

		if (place && driver && team) {
			const sprintQualifying: SprintQualifyingData = {
				...sprint,
				driver: driver as SprintQualifyingData['driver'],
				team: team as SprintQualifyingData['team'],
				place: place || '',
				year: Number(F1_YEAR),
			};
			sprintQualifyingDB.push(sprintQualifying);
		} else {
			console.log('Error adding sprint qualifying. Place, driver or team is not available', sprint);
		}
	}

	await xata.addSprintQualifying(sprintQualifyingDB);
};
