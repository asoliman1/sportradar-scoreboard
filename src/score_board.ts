import { ITeam, ITeamScore, MatchTeams } from "./common.ts";
import { Match } from "./match.ts";

/**
 * Represents a scoreboard that manages multiple matches.
 */
export class ScoreBoard {
  private matches: Match[] = [];

  /**
   * Creates a new match with the given teams and add to match list.
   *
   * @param teams The teams participating in the match.
   * @returns The newly created match.
   * @throws Error if any of the teams are already playing in another match.
   */
  addMatch(teams: MatchTeams): Match {
    if (this.validateTeamsIfExist(Object.values(teams))) {
      throw new Error("One or more teams are already playing in another match");
    }

    const match = new Match(teams);
    this.matches.push(match);
    return match;
  }

  /**
   * Removes match with given id number from list.
   *
   * @param id match id.
   */
  removeMatch(id: number){
    this.matches = this.matches.filter((match)=> match.id === id);
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
   * @param teams The teams to check.
   * @returns True if any of the teams are already playing, false otherwise.
   */
  private validateTeamsIfExist(teams: ITeam[]): Boolean {
    return this.matches.some((match: Match) =>
      teams.some((team: ITeam) => {
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
  scoreGoal(data: { matchId: number; teamType: MatchTeamType; player?: string }) {
    this.findMatch(data.matchId)?.scoreGoal(data.teamType, data.player);
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
    const summaryArr = this.sortedMatches.map(
      (match, index) => `${index + 1}. ${match.result}`
    );

    return summaryArr.length ? summaryArr : ['No matches at the moment, please add some matches'];
  }
}
