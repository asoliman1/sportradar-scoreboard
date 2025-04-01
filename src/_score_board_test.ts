import 'jasmine';
import 'jest';

import { ScoreBoard } from "./score_board.ts";
import { ITeam, MatchTeamType } from "./common.ts";
import { Match } from "./match.ts";
import { MATCH_2_TEAMS, TEAM_1, TEAM_2 } from "./_mocks.ts";


describe("ScoreBoard", () => {
  let scoreBoard: ScoreBoard;

  beforeEach(() => {
    scoreBoard = new ScoreBoard();
  });

  describe("addMatch", () => {
    it("should create a new match and add it to the matches array", () => {
      const match = scoreBoard.addMatch(MATCH_2_TEAMS);

      expect(scoreBoard.matches).toContain(match);
    });

    it("should throw an error if any team is already playing in another match", () => {
      // Mock existing match with the same team
      const existingMatch = new Match(MATCH_2_TEAMS);
      scoreBoard.matches.push(existingMatch);

      expect(() => scoreBoard.addMatch(MATCH_2_TEAMS)).toThrow(
        "One or more teams are already playing in another match"
      );
    });
  });

  describe("removeMatch", () => {
    it("should create a new match and add it to the matches array", () => {
      const match = scoreBoard.addMatch(MATCH_2_TEAMS);
      scoreBoard.removeMatch(match.id);

      expect(scoreBoard.matches).not.toContain(match);
    });
  });

  describe("findMatch", () => {
    it("should return a match if found", () => {
      const match = new Match(MATCH_2_TEAMS);
      scoreBoard["matches"].push(match);

      const foundMatch = scoreBoard.findMatch(match.id);

      expect(foundMatch).toBe(match);
    });

    it("should throw an error if the match is not found", () => {
      expect(() => scoreBoard.findMatch(999)).toThrow(
        "No match found with id 999"
      );
    });
  });

  describe("validateTeamsIfExist", () => {
    it("should return true if a team is already playing in another match", () => {
      const match = new Match(MATCH_2_TEAMS);
      scoreBoard.matches.push(match);

      const result = scoreBoard.validateTeamsIfExist(TEAM_1);

      expect(result).toBe(true);
    });

    it("should return false if no team is playing in another match", () => {
      const result = scoreBoard.validateTeamsIfExist([TEAM_1, TEAM_2]);

      expect(result).toBe(false);
    });

    it("should throw an error if a team is already playing in another match", () => {
      const match = new Match(MATCH_2_TEAMS);

      scoreBoard.matches.push(match);

      expect(() => scoreBoard.validateTeamsIfExist([TEAM_1,TEAM_2])).toThrow(
        "Team A team already playing in another match"
      );
    });
  });

  describe("startMatch", () => {
    it("should call start on the match", () => {
      const match = new Match(MATCH_2_TEAMS);
      scoreBoard.matches.push(match);
      const spyStart = jest.spyOn(match, "start");

      scoreBoard.startMatch(match.id);
      expect(spyStart).toHaveBeenCalledTimes(1);
    });
  });

  describe("endMatch", () => {
    it("should call end on the match", () => {
      const match = new Match(MATCH_2_TEAMS);
      scoreBoard.matches.push(match);
      const spyEnd = jest.spyOn(match, "end");

      scoreBoard.endMatch(match.id);
      expect(spyEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe("scoreGoal", () => {
    it("should call scoreGoal with the correct arguments on the match", () => {
      const match = new Match(MATCH_2_TEAMS);
      scoreBoard.matches.push(match);
      const spyScoreGoal = jest.spyOn(match, "scoreGoal");

      scoreBoard.scoreGoal({
        matchId: match.id,
        teamType: MatchTeamType.Home,
        player: "Player X",
      });
      expect(spyScoreGoal).toHaveBeenCalledWith(MatchTeamType.Home, "Player X");
    });
  });

  describe("summary", () => {
    it("should return no matches at the moment if no matches added", () => {
      expect(scoreBoard.summary).toEqual(["No matches at the moment, please add some matches"]);
    });

    it("should return a sorted summary of match results", () => {
      const match1 = new Match(MATCH_2_TEAMS);
      const match2 = new Match({
        [MatchTeamType.Home]: { id: 3, name: "Team C" },
        [MatchTeamType.Away]: { id: 4, name: "Team D" },
      });

      scoreBoard.matches.push(match1, match2);

      expect(scoreBoard.summary).toEqual(["1. Team A 0 - Team B 0", "2. Team C 0 - Team D 0"]);
    });
  });
});
