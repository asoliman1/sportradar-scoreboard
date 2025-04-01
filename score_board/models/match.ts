import { ITeamScore, ITeam, Team, MatchScores } from "./common.ts";

export class Match {
  readonly id: number;
  readonly scores: MatchTeams;
  startedAt?: Date;
  endAt?: Date;

  constructor(scores: MatchTeams) {
    this.id = Date.now();
    this.scores = scores;
  }

  end() {
    this.endAt = new Date();
  }

  start() {
    if (this.startedAt) throw new Error("Match has already started");
    this.startedAt = new Date();
  }

  isTeamExist(teamId: number, type: Team): Boolean {
    return this.scores[type].team.id === teamId;
  }

  get accumulatedScore() : number {
    return Object.values(this.scores).reduce(
      (acc, curr) => acc + curr.goals?.length ?? 0,
      0
    );
  }

  get result() : string {
    return Object.values(this.scores)
      .map(
        (score: ITeamScore) => `${score.team.name} ${score.goals?.lenght ?? 0}`
      )
      .join(" - ");
  }

  scoreGoal(team: Team, player?: string) {
    const team = this.scores[team];
    team.goals ??= [];
    team.goals.push({ at: new Date(), id: Date.now(), player });
  }

  removeGoal(team: Team, goalId: number) {
    const team = this.scores[team];
    team.goals = team.goals?.filter((goal) => goal.id !== goalId);
  }
}
