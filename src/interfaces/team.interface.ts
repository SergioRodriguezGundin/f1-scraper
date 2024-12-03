import { Team } from '../xata';

export type TeamKeys = keyof Team;

export const teamKeys: TeamKeys[] = ['position', 'name', 'points', 'image', 'icon', 'car'];
