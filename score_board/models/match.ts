import {ITeamScore, ITeam} from './common.ts';

export class Match{
    readonly id: number;
    readonly teamsScore: [ITeamScore, ITeamScore];
    startedAt ?: Date;
    endAt ?: Date;

    constructor(teamA : ITeam,teamB : ITeam){
        this.id = Date.now();
        this.teams = [{team: teamA},{team: teamB}];
    }

    end(){
        this.endAt = new Date();
    }

    start(){
        this.startedAt = new Date();
    }

    get accumulatedScore(){
        return this.teamsScore.reduce((acc, team)=> (team.goals?.length ?? 0) + acc ,0);
    }

    get result(){
        const {teamA, teamB} = (this.teamsScore[0] , this.teamsScore[1] );
        return `${teamA.name} ${teamA.goals?.length ?? 0} - ${teamB.name} ${teamB.goals?.length ?? 0}`;
    }
}