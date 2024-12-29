import { SprintGridData } from '../models/sprint/sprintGrid.model';
import { SprintQualifyingData } from '../models/sprint/sprintQualifying.model';
import { SprintRaceData } from '../models/sprint/sprintRace.model';
import { driverCache } from '../utils/cache/driver';
import { teamCache } from '../utils/cache/team';
import { getRacePlace } from '../utils/globals';
import { DBXataClient } from './client/xata';

export const addSprintGrid = async (env: Env, id: string, sprintGrid: SprintGridData[]) => {
  const xata = DBXataClient.getInstance(env);
  const sprintGridDB: SprintGridData[] = [];

  const place = getRacePlace(id);

  for (const sprint of sprintGrid) {
    let driver = driverCache.get(sprint.driver as unknown as string);
    if (!driver) {
      driver = await xata.getDriver(['name'], [sprint.driver]);
      driver && driverCache.set(driver);
    }

    let team = teamCache.get(sprint.team as unknown as string);
    if (!team) {
      team = await xata.getTeam(['name'], [sprint.team]);
      team && teamCache.set(team);
    }

    if (place) {
      const sprintGrid: SprintGridData = {
        ...sprint,
        driver: driver as SprintGridData['driver'],
        team: team as SprintGridData['team'],
        place: place || '',
      }
      sprintGridDB.push(sprintGrid);
    } else {
      console.log('Error adding sprint grid. Place is not available', sprint);
    }
  }

  await xata.addSprintGrid(sprintGridDB);
}

export const addSprintRace = async (env: Env, id: string, sprintRace: SprintRaceData[]) => {
  const xata = DBXataClient.getInstance(env);
  const sprintRaceDB: SprintRaceData[] = [];

  const place = getRacePlace(id);

  for (const sprint of sprintRace) {
    let driver = driverCache.get(sprint.driver as unknown as string);
    if (!driver) {
      driver = await xata.getDriver(['name'], [sprint.driver]);
      driver && driverCache.set(driver);
    }

    let team = teamCache.get(sprint.team as unknown as string);
    if (!team) {
      team = await xata.getTeam(['name'], [sprint.team]);
      team && teamCache.set(team);
    }

    if (place && driver && team) {
      const sprintRace: SprintRaceData = {
        ...sprint,
        driver: driver as SprintRaceData['driver'],
        team: team as SprintRaceData['team'],
        place: place || '',
      }
      sprintRaceDB.push(sprintRace);
    } else {
      console.log('Error adding sprint race. Place, driver or team is not available', sprint);
    }
  }

  await xata.addSprintRace(sprintRaceDB);
}

export const addSprintQualifying = async (env: Env, id: string, sprintQualifying: SprintQualifyingData[]) => {
  const xata = DBXataClient.getInstance(env);
  const sprintQualifyingDB: SprintQualifyingData[] = [];

  const place = getRacePlace(id);

  for (const sprint of sprintQualifying) {
    let driver = driverCache.get(sprint.driver as unknown as string);
    if (!driver) {
      driver = await xata.getDriver(['name'], [sprint.driver]);
      driver && driverCache.set(driver);
    }

    let team = teamCache.get(sprint.team as unknown as string);
    if (!team) {
      team = await xata.getTeam(['name'], [sprint.team]);
      team && teamCache.set(team);
    }

    if (place && driver && team) {
      const sprintQualifying: SprintQualifyingData = {
        ...sprint,
        driver: driver as SprintQualifyingData['driver'],
        team: team as SprintQualifyingData['team'],
        place: place || '',
      }
      sprintQualifyingDB.push(sprintQualifying);
    } else {
      console.log('Error adding sprint qualifying. Place, driver or team is not available', sprint);
    }
  }

  await xata.addSprintQualifying(sprintQualifyingDB);
}
