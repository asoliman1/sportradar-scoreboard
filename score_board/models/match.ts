import { ITeamScore, ITeam } from "./common.ts";

export class Match {
  readonly id: number;
  readonly team1Score: ITeamScore;
  readonly team2Score: ITeamScore;
  startedAt?: Date;
  endAt?: Date;

  constructor(team1: ITeam, team2: ITeam) {
    this.id = Date.now();
    this.team1Score = { team: team1 };
    this.team2Score = { team: team2 };
  }

  end() {
    this.endAt = new Date();
  }

  start() {
    if(this.startedAt) throw new Error('StartedAt cannot be modified');
    this.startedAt = new Date();
  }

  isTeamExist(team: ITeam){
    return this.team1Score.team.id === team.id || this.team2Score.team.id === team;
  }

  get accumulatedScore() {
    return (this.team1Score.goals?.length ?? 0) + (this.team2Score.goals?.length ?? 0);
  }

  get result() {
    return `${this.team1Score.team.name} ${this.team1Score.goals?.length ?? 0} - ${this.team2Score.team.name} ${
      this.team2Score.goals?.length ?? 0
    }`;
  }
}
