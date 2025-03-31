import { ITeam } from "../models/common.ts";
import { Match } from "../models/match.ts";

export class ScoreBoard {
  private matches: Match[] = [];

  createMatch(team1: ITeam, team2: ITeam) {
    const match = new Match(team1, team2);
    if (this.isDuplicate(team1, team2))
      throw new Error("This match already exists");
    this.matches.push(match);
    return match;
  }

  private findMatch(id: number): Match | never {
    const currMatch = this.matches.find((match) => match.id === id);
    if (!currMatch) throw new Error("No match found");
    return currMatch;
  }

  private isDuplicate(team1: ITeam, team2: ITeam) {
    return !!this.matches.find(
      (val) => val.isTeamExist(team1) && val.isTeamExist(team2)
    );
  }

  startMatch(id: number) {
    this.findMatch(id)?.start();
  }

  endMatch(id: number) {
    this.findMatch(id)?.end();
  }

  private sortByHighestScore(a: Match, b: Match) {
    return b.accumulatedScore - a.accumulatedScore;
  }

  private get sortedMatches() {
    return this.matches.sort(this.sortByHighestScores.bind(this));
  }

  showResults() {
    return this.sortedMatches.map((match: Match) => match.results);
  }
}
