import { ITeam, ITeamScore, MatchTeams } from "../models/common.ts";
import { Match } from "../models/match.ts";

/**
 * Represents a scoreboard that manages multiple matches.
 */
export class ScoreBoard {
  private matches: Match[] = [];

  /**
   * Creates a new match with the given teams.
   *
   * @param teams The teams participating in the match.
   * @returns The newly created match.
   * @throws Error if any of the teams are already playing in another match.
   */
  createMatch(teams: MatchTeams): Match {
    if (this.validateTeamsIfExist(Object.values(teams))) {
      throw new Error("One or more teams are already playing in another match");
    }

    const match = new Match(teams);
    this.matches.push(match);
    return match;
  }

  /**
   * Finds a match by its ID.
   *
   * @param id The ID of the match to find.
   * @returns The match with the given ID, or throws an error if not found.
   */
  private findMatch(id: number): Match {
    const currMatch = this.matches.find((match) => match.id === id);
    if (!currMatch) throw new Error(`No match found with id ${id}`);
    return currMatch;
  }

  /**
   * Checks if any of the given teams are already playing in another match.
   *
   * @param scores The teams to check.
   * @returns True if any of the teams are already playing, false otherwise.
   */
  private validateTeamsIfExist(scores: ITeam[]): Boolean {
    return this.matches.some((match: Match) =>
      scores.some((team: ITeam) => {
        if (match.isTeamExist(team.id))
          throw new Error(`${team.name} team already playing in another match`);
        return false;
      })
    );
  }

  /**
   * Starts a match by its ID.
   *
   * @param id The ID of the match to start.
   */
  startMatch(id: number) {
    this.findMatch(id)?.start();
  }

  /**
   * Ends a match by its ID.
   *
   * @param id The ID of the match to end.
   */
  endMatch(id: number) {
    this.findMatch(id)?.end();
  }

  /**
   * Scores a goal in a match.
   *
   * @param data The data for the goal, including the match ID, team, and player.
   */
  scoreGoal(data: { matchId: number; team: Team; player?: string }) {
    this.findMatch(data.matchId)?.scoreGoal(data.team, data.player);
  }

  /**
   * Compares two matches based on their scores and start times.
   *
   * @param a The first match to compare.
   * @param b The second match to compare.
   * @returns A negative value if a has a higher score, a positive value if b has a higher score, or 0 if the scores are equal.
   */
  private sortByHighestScore(a: Match, b: Match) {
    const scoreDiff = b.accumulatedScore - a.accumulatedScore;
    if (scoreDiff === 0) {
      return b.startedAt.getTime() - a.startedAt.getTime();
    }
    return scoreDiff;
  }

  /**
   * Gets the matches sorted by their scores and start times.
   */
  private get sortedMatches(): Match[] {
    return this.matches.sort(this.sortByHighestScores.bind(this));
  }

  /**
   * Gets a list of indexed match results.
   */
  get summary(): string[] {
    return this.sortedMatches.map(
      (match, index) => `${index}. ${match.result}`
    );
  }
}
