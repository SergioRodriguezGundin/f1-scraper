import { Team } from '../../xata';

export class TeamCache {
  private static instance: TeamCache;
  private cache: Record<string, Team> = {};

  public static getInstance(): TeamCache {
    if (!TeamCache.instance) {
      TeamCache.instance = new TeamCache();
    }
    return TeamCache.instance;
  }

  public get(teamName: string): Team | null {
    return this.cache[teamName] || null;
  }

  public set(team: Team): void {
    if (team.name) {
      this.cache[team.name] = team;
    }
  }

  public has(teamName: string): boolean {
    return !!this.cache[teamName];
  }

  public clear(): void {
    this.cache = {};
  }

  public getAll(): Record<string, Team> {
    return { ...this.cache };
  }
}

// Export a default instance
export const teamCache = TeamCache.getInstance();
