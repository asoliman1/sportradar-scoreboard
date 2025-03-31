import { Match, ITeam } from "../models/common.ts";

export class ScoreBoard {
  private matches: Match[];

  createMatch(teamA: ITeam, teamB: ITeam) {
    const match = new Match({ teamA, teamB });
    this.matches.push(match);
    return match;
  }

  private findMatch(id: number): Match | never {
    const currMatch = this.matches.find((match) => match.id === id);
    if (!currMatch) throw Error("No match found");
    return currMatch;
  }

  startMatch(id: number) {
    this.findMatch(id)?.start();
  }

  endMatch(id: number) {
    this.findMatch(id)?.end();
  }

  private sortByHighestScore(a: Match, b: Match) {
    return  b.accumulatedScore - a.accumulatedScore;
  }

  private get sortedMatches() {
    return this.matches.sort(this.sortByHighestScores.bind(this));
  }

  showResults() {
    return this.sortedMatches.map((match : Match) => match.results);
  }
}
