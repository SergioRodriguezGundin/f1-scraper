export interface TeamDB extends Team {
  id: string;
}

export interface Team {
  position: number;
  name: string;
  points: number;
  image: string;
}

export type TeamKeys = keyof Team;

export const teamKeys: TeamKeys[] = ['position', 'name', 'points', 'image'];
