import {ScoreBoard} from './src/score_board.ts';
import {MatchTeamType} from './src/common.ts';

const EGYPT_POLAND_MATCH = {
    [MatchTeamType.Home] : {team: {id: Date.now(), name:'Egypt'}},
    [MatchTeamType.Away] : {team: {id: Date.now(), name: 'Poland'}}
}

const BRAZIL_COLOMBIA_MATCH = {
    [MatchTeamType.Home] : {team: {id: Date.now(), name:'Brazil'}},
    [MatchTeamType.Away] : {team: {id: Date.now(), name: 'Colombia'}}
}

const 

class Example{

    constructor(){
        this.init();
    }

    init(){
        const scoreBoard = new ScoreBoard();

        const egyptPolandMatch = scoreBoard.createMatch(EGYPT_POLAND_MATCH);
        egyptPolandMatch.scoreGoal(MatchTeamType.Home);
        egyptPolandMatch.scoreGoal(MatchTeamType.Away);

        const brazilColombiaMatch = scoreBoard.createMatch(BRAZIL_COLOMBIA_MATCH);
        brazilColombiaMatch.scoreGoal(MatchTeamType.Home);

        console.log(scoreBoard.summary);
    }
}