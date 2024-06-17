import { Team } from '../interfaces/team.interface';
import { teamModel } from '../models/team.interface';
import { extractElement } from '../utils/extractor';
import { F1_URL, F1_YEAR, RESULTS, TEAMS } from '../utils/globals';

export const getTeams = async (env: Env): Promise<Team[]> => {
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${TEAMS}`;
  try {
    const response = await fetch(url);
    const html = await response.text();

    const team: Team = teamModel;
    const teams: Team[] = await extractElement<Team>(html, team, setTeamImage, env);

    return teams.sort((a, b) => a.position - b.position);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch race data");
  }
}

export const setTeamImage = async (team: Team, env: Env) => {
  const teamNameToSearch = team.name.replace(/\s+/g, '_');
  const image = await env.F1_ASSETS.get(teamNameToSearch);

  if (image === null) {
    throw new Error(`Image not found for team: ${teamNameToSearch}`);
  }

  team.image = image;
}
