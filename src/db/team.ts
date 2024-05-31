import { Team, TeamDB, TeamKeys } from '../interfaces/team.interface';
import { DBXataClient } from './client/xata';


export const addTeams = async (env: Env, teams: Team[]) => {
  const xata = DBXataClient.getInstance(env);
  await xata.addTeams(teams);
};

export const getTeams = async (env: Env, keys: TeamKeys[]): Promise<TeamDB[]> => {
  const xata = DBXataClient.getInstance(env);
  return await xata.getTeams(keys);
};


