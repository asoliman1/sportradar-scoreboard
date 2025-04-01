import { Match } from "./match.ts";
import {
  MatchTeams,
  ITeamScore,
  ITeam,
  MatchTeamType,
  MatchScores,
} from "./common.ts";
import {TEAM_1, TEAM_2, MATCH_2_TEAMS} from './_mocks.ts';

describe("Match class", () => {
  let match: Match;
  let scores: MatchTeams;

  beforeEach(() => {
    scores = MATCH_2_TEAMS;
    match = new Match(scores);
  });

  it("should create a new match with a unique id", () => {
    expect(match.id).toBeGreaterThan(0);
  });

  it("should set the scores of the match", () => {
    expect(match.scores).toEqual(scores);
  });

  it("should not have a start date by default", () => {
    expect(match.startedAt).toBeUndefined();
  });

  it("should not have an end date by default", () => {
    expect(match.endAt).toBeUndefined();
  });

  it("should initially have goals undefined for all teams", () => {
    expect(Object.values(match.scores).map((e) => e.goals)).toEqual([
      undefined,
      undefined,
    ]);
  });

  describe("start method", () => {
    beforeEach(() => {
      match.start();
    });

    it("should set the start date of the match", () => {
      expect(match.startAt).not.toBeUndefined();
    });

    it("should set the end date to the current date if no date is provided", () => {
      try {
        match.start();
      } catch (err: Error) {
        expect(err.message).toEqual("Match has already started");
      }
    });
  });

  describe("end method", () => {
    it("should set the end date of the match", () => {
      match.end();

      expect(match.endAt).not.toBeUndefined();
    });
  });

  describe("isTeamExist method", () => {
    it("should return false if same team exist with different type", () => {
      expect(match.isTeamExist(TEAM_1.id, MatchTeamType.Home)).toBeFalse();
    });

    it("should return false if same team exist with same type", () => {
      expect(match.isTeamExist(TEAM_1.id, MatchTeamType.Away)).toBeFalse();
    });

    it("should return true if team doesn't exist", () => {
      expect(match.isTeamExist(1, MatchTeamType.Home)).toBeTrue();
    });
  });

  describe("accumulatedScore getter", () => {
    it("should return zero initially", () => {
      expect(match.accumulatedScore).toEqual(0);
    });

    it("should return sum of all goals scored in the match", () => {
      match.scoreGoal(MatchTeamType.Home);
      match.scoreGoal(MatchTeamType.Away);

      expect(match.accumulatedScore).toEqual(2);
    });

    it("should return correct amount of goals when a goal is added then removed", () => {
      match.scoreGoal(MatchTeamType.Home);
      match.scoreGoal(MatchTeamType.Away);
      match.removeGoal(MatchTeamType.Away);

      expect(match.accumulatedScore).toEqual(1);
    });

    it("should not return negative values when remove goal is called", () => {
      match.removeGoal(MatchTeamType.Away);

      expect(match.accumulatedScore).toEqual(0);
    });
  });

  describe("result getter", () => {
    it("should return correct format with 0 scores intially", () => {
      expect(match.result).toEqual(`Home Team 0 - Away Team 0`);
    });

    it("should return score 1 with Home Team and 0 with Away Team", () => {
      match.scoreGoal(MatchTeamType.Home);

      expect(match.result).toEqual(`Home Team 1 - Away Team 0`);
    });

    it("should not return negative values", () => {
      match.removeGoal(MatchTeamType.Home);

      expect(match.result).toEqual(`Home Team 0 - Away Team 0`);
    });
  });

  describe("scoreGoal method", () => {
    beforeEach(()=>{
        match.scoreGoal(MatchTeamType.Home);
    });

    it("should increase goals when scoreGoal is called for the relevant team", () => {
      expect(match.scores[MatchTeamType.Home].goals?.length).toEqual(1);
    });

    It("should increse goals under Home Team only",()=>{
      expect(match.scores[MatchTeamType.Home].goals?.length).toEqual(1);
      expect(match.scores[MatchTeamType.Away].goals?.length).toEqual(0);
    })

    it("should define goal id and time when scoreGoal is called ", () => {
      const goal = match.scores[MatchTeamType.Home].goals?.pop();

      expect(goal.id).not.toBeUndefined();
      expect(goal.at).not.toBeUndefined();
    });

    it("should define goal player scored when passed in scoreGoal function ", () => {
      const goal = match.scores[MatchTeamType.Home].goals?.pop();

      expect(goal.player).toEqual("Ahmed");
    });
  });

  describe("removeGoal method", () => {
    beforeEach(()=>{
        match.scoreGoal(MatchTeamType.Home);
    });

    it("should have 0 goals when called after scoring for the Home Team", () => {
      match.removeGoal(MatchTeamType.Home);
      
      expect(match.scores[MatchTeamType.Home].goals).not.toBeUndefined();
      expect(match.scores[MatchTeamType.Home].goals?.length).toEqual(0);
    });

    it("should remove goal only for Away Team while Home Team shouldn't change", () => {
      match.scoreGoal(MatchTeamType.Away);
      match.removeGoal(MatchTeamType.Away);

      expect(match.scores[MatchTeamType.Away].goals?.length).toEqual(0);
      expect(match.scores[MatchTeamType.Home].goals?.length).toEqual(1)
    });
  });
});
