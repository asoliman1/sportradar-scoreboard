import {MatchTeamType} from './common.ts';

export const TEAM_1 = { id: 1, name: "Home Team" };
export const TEAM_2 = { id: 2, name: "Away Team" };
export const TEAM_3 = { id: 3, name: "Other Team" };


export const MATCH_2_TEAMS = {
    [MatchTeamType.Home]: { team: TEAM_1 },
    [MatchTeamType.Away]: { team: TEAM_2 },
};