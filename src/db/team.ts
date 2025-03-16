import { TeamKeys } from '../interfaces/team.interface';
import { Team } from '../xata';
import { DBXataClient } from './client/xata';
import { TeamData } from '../models/team.model';
import { F1_YEAR } from '../utils/globals';

export const addTeams = async (env: Env, teams: TeamData[]) => {
	const xata = DBXataClient.getInstance(env);

	const teamsDB = await xata.getTeams();
	const teamsMerged = mergeTeams(teams, teamsDB);

	await xata.addTeams(teamsMerged);
};

export const getTeams = async (env: Env, keys: TeamKeys[]): Promise<Team[]> => {
	const xata = DBXataClient.getInstance(env);
	return await xata.getTeams(keys);
};

const mergeTeams = (teams: TeamData[], teamsDB: Team[]): Team[] => {
	const teamsDBMap = new Map(teamsDB.map((teamDB: Team) => [teamDB.name, teamDB]));

	return teams.map((team: TeamData) => {
		const teamDB = teamsDBMap.get(team.name);
		if (!teamDB || team.year !== Number(F1_YEAR)) {
			return { ...team, id: crypto.randomUUID() };
		}
		return { ...team, id: teamDB.id };
	});
};
