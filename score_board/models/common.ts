/**
 * Represents a team in a match.
 */
export interface ITeam {
  /**
   * Unique identifier for the team.
   */
  readonly id: number;
  /**
   * Name of the team.
   */
  name: string;
  /**
   * URL of the team's image (optional).
   */
  imageUrl?: string;
  /**
   * List of player names (optional).
   */
  players?: string[];
}

/**
 * Represents a goal scored in a match.
 */
export interface IGoal {
  /**
   * Unique identifier for the goal.
   */
  readonly id: number;
  /**
   * Timestamp when the goal was scored.
   */
  readonly at: Date;
  /**
   * Name of the player who scored the goal (optional).
   */
  player?: string;
}

/**
 * Represents a team's score in a match.
 */
export interface ITeamScore {
  /**
   * The team.
   */
  team: ITeam;
  /**
   * List of goals scored by the team (optional).
   */
  goals?: IGoal[];
}

/**
 * Enum representing the teams in a match.
 */
export enum MatchTeamType {
  Home = "home",
  Away = "away",
  // Define more if needed.
}

export type MatchTeams = Record<MatchTeamType, ITeamScore>;
