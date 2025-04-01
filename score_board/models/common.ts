export interface ITeam {
  readonly id: number;
  name: string;
  imageUrl?: string;
  players?: string[];
}

export interface IGoal {
  readonly id: number;
  at: Date;
  player?: string;
}

export interface ITeamScore {
  team: ITeam;
  goals?: IGoal[];
}

export enum Team {
  Home = "home",
  Away = "away",
  // Define more if needed.
}

export type MatchTeams = Record<Team, ITeamScore>;
