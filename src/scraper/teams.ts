import { Extractor } from '../interfaces/extractor.interface';
import { TeamData, teamModel } from '../models/team.model';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RESULTS, TEAMS } from '../utils/globals';

export const getTeams = async (env: Env): Promise<TeamData[]> => {
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${TEAMS}`;
  try {
    const response = await fetch(url);
    const html = await response.text();

    const team: TeamData = teamModel;
    const extractor: Extractor<TeamData> = {
      f1Object: team,
      retrieveAdditionalData: setTeamImage,
    };
    const teams: TeamData[] = await extractElement<TeamData>(html, extractor, env);

    return teams.sort((a, b) => a.position - b.position);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch teams data');
  }
};

export const setTeamImage = async (team: TeamData, env: Env) => {
  const teamNameToSearch = team.name.replace(/\s+/g, '_').trim();
  const teamImage = await env.F1_ASSETS.get(teamNameToSearch);
  const teamIcon = await env.F1_ASSETS.get(`${teamNameToSearch}_icon`);
  const teamCar = await env.F1_ASSETS.get(`${teamNameToSearch}_car`);

  if (teamImage === null) {
    throw new Error(`Image not found for team: ${teamNameToSearch}`);
  }

  if (teamIcon === null) {
    throw new Error(`Icon not found for team: ${teamNameToSearch}`);
  }

  if (teamCar === null) {
    throw new Error(`Car not found for team: ${teamNameToSearch}`);
  }

  team.image = teamImage;
  team.icon = teamIcon;
  team.car = teamCar;
};
