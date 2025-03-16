import { Team } from '../xata';

export type TeamData = Omit<Team, 'id'>;
export const teamModel: TeamData = {
  position: 0,
  name: '',
  points: 0,
  image: '',
  icon: '',
  car: '',
  year: 0,
  queryName: '',
};
