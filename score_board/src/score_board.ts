import { ITeam, ITeamScore, MatchTeams } from "../models/common.ts";
import { Match } from "../models/match.ts";

export class ScoreBoard {
  private matches: Match[] = [];

  createMatch(teams: MatchTeams): Match {
    if (this.validateTeamsIfExist(Object.values(teams))) return;

    const match = new Match(teams);
    this.matches.push(match);
    return match;
  }

  private findMatch(id: number): Match {
    const currMatch = this.matches.find((match) => match.id === id);
    if (!currMatch) throw new Error("No match found");
    return currMatch;
  }

  private validateTeamsIfExist(scores: ITeam[]): Boolean {
    return this.matches.some((match: Match) =>
      scores.some((team: ITeam) => {
        if (match.isTeamExist(team.id))
          throw new Error(`${team.name} team already playing in another match`);
        return false;
      })
    );
  }

  startMatch(id: number) {
    this.findMatch(id)?.start();
  }

  endMatch(id: number) {
    this.findMatch(id)?.end();
  }

  scoreGoal(data: { matchId: number; team: Team; player?: string }) {
    this.findMatch(data.matchId)?.scoreGoal(data.team, data.player);
  }

  private sortByHighestScore(a: Match, b: Match) {
    const scoreDiff = b.accumulatedScore - a.accumulatedScore;
    if (scoreDiff === 0) {
      return b.startedAt.getTime() - a.startedAt.getTime();
    }
    return scoreDiff;
  }

  private get sortedMatches(): Match[] {
    return this.matches.sort(this.sortByHighestScores.bind(this));
  }

  get summary(): string[] {
    return this.sortedMatches.map(
      (match, index) => `${index}. ${match.result}`
    );
  }
}
