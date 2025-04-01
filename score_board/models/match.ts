import { ITeamScore, ITeam, MatchTeamType, MatchScores } from "./common.ts";

/**
 * Gets a summary of the matches, including their results and rankings.
 */
export class Match {
  /**
   * Unique identifier for the match.
   */
  readonly id: number;

  /**
   * Scores of the match for all teams.
   */
  readonly scores: MatchTeams;

  /**
   * Date when the match started.
   */
  startedAt?: Date;

  /**
   * Date when the match ended.
   */
  endAt?: Date;

  constructor(scores: MatchTeams) {
    this.id = Date.now();
    this.scores = scores;
  }

  /**
   * Marks the match as ended.
   */
  end() {
    this.endAt = new Date();
  }

  /**
   * Marks the match as started.
   * @throws {Error} If the match has already started.
   */
  start() {
    if (this.startedAt) throw new Error("Match has already started");
    this.startedAt = new Date();
  }

  /**
   * Checks if a team with the given ID exists in the match.
   * @param teamId ID of the team to check.
   * @param type Type of the team (home or away) {@link MatchTeamType}.
   * @returns True if the team exists, false otherwise.
   */
  isTeamExist(teamId: number, type: MatchTeamType): Boolean {
    return this.scores[type].team.id === teamId;
  }

  /**
   * Gets the accumulated score of the match.
   */
  get accumulatedScore(): number {
    return Object.values(this.scores).reduce(
      (acc, curr) => acc + curr.goals?.length ?? 0,
      0
    );
  }

  /**
   * Gets the result of the match in the format Egypt 1 - Brazil 0.
   */
  get result(): string {
    return Object.values(this.scores)
      .map(
        (score: ITeamScore) => `${score.team.name} ${score.goals?.lenght ?? 0}`
      )
      .join(" - ");
  }

  /**
   * Adds a goal to the specified team's score.
   *
   * @param team The type of the team {@link MatchTeamType}.
   * @param player The player who scored the goal (optional).
   */
  scoreGoal(teamType: MatchTeamType, player?: string) {
    const team = this.scores[teamType];
    team.goals ??= [];
    team.goals.push({ at: new Date(), id: Date.now(), player });
  }

  /**
   * Removes a goal from the specified team's score.
   *
   * @param team The type of the team {@link MatchTeamType}.
   * @param goalId The ID of the goal to remove.
   */
  removeGoal(teamType: MatchTeamType, goalId: number) {
    const team = this.scores[teamType];
    team.goals = team.goals?.filter((goal) => goal.id !== goalId);
  }
}
