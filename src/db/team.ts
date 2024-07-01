import { Team, TeamDB, TeamKeys } from '../interfaces/team.interface';
import { DBXataClient } from './client/xata';


export const addTeams = async (env: Env, teams: Team[]) => {
  const xata = DBXataClient.getInstance(env);

  const teamsDB = await xata.getTeams();
  const teamsMerged = mergeTeams(teams, teamsDB);

  await xata.addTeams(teamsMerged);
};

export const getTeams = async (env: Env, keys: TeamKeys[]): Promise<TeamDB[]> => {
  const xata = DBXataClient.getInstance(env);
  return await xata.getTeams(keys);
};

const mergeTeams = (teams: Team[], teamsDB: TeamDB[]): TeamDB[] => {
  const teamsDBMap = new Map(teamsDB.map((teamDB: TeamDB) => [teamDB.name, teamDB]));

  return teams.map((team: Team) => {
    const teamDB = teamsDBMap.get(team.name);
    if (!teamDB) {
      return { ...team, id: crypto.randomUUID() };
    }
    return { ...team, id: teamDB.id };
  });
};

