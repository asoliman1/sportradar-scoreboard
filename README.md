# Score Board
================

Score Board is a simple library that allows you to visually control results of matches in progress with a very simple set of functions.


### Enums
------------

#### MatchTeamType

*   **Description:** Enum representing the type of team in a match.
*   **Values:**
    *   `HOME`: The home team.
    *   `AWAY`: The away team.

### Interfaces
--------------

#### GoalData

*   **Description:** Interface representing the data for a goal.
*   **Properties:**
    *   `matchId`: The unique identifier of the match.
    *   `teamType`: The type of team that scored the goal.
    *   `player`: The name of the player who scored the goal.

    # Match Data Model
=====================

This repository contains a set of TypeScript interfaces that define a data model for representing match data.

## Overview
------------

The data model includes interfaces for representing teams, goals, team scores, and matches. These interfaces provide a structured way to store and manipulate match data.

## Interfaces
-------------

### ITeam

Represents a team.

* `imageUrl`: The URL of the team's image (optional).
* `players`: A list of player names (optional).

### IGoal

Represents a goal scored in a match.

* `id`: A unique identifier for the goal.
* `at`: The timestamp when the goal was scored.
* `player`: The name of the player who scored the goal (optional).

### ITeamScore

Represents a team's score in a match.

* `team`: The team.
* `goals`: A list of goals scored by the team (optional).

### MatchTeamType

An enum representing the teams in a match.

* `Home`: The home team.
* `Away`: The away team.

### MatchTeams

A type representing the teams participating in a match.

* A record with `MatchTeamType` as keys and `ITeamScore` as values.


## Usage
-----

To use these interfaces, simply import them into your TypeScript project and use them to define your match data.

```typescript
import { ITeam, IGoal, ITeamScore, MatchTeamType, MatchTeams, IMatch } from './match-data-model';

const team: ITeam = {
  imageUrl: 'https://example.com/team-image.jpg',
  players: ['John Doe', 'Jane Doe'],
};

const goal: IGoal = {
  id: 1,
  at: new Date(),
  player: 'John Doe',
};

const teamScore: ITeamScore = {
  team,
  goals: [goal],
};

const match = {
  id: 1,
  startedAt: new Date(),
  teams: {
    [MatchTeamType.Home]: teamScore,
    [MatchTeamType.Away]: teamScore,
  },
  status: 'in_progress',
  imageUrl: 'https://example.com/match-image.jpg',
};
```


## Functions
------------

### addMatch

*   **Description:** Creates a new match with the given teams and adds it to the match list.
*   **Parameters:**
    *   `teams`: Teams to included in the match with the type MatchTeams.
*   **Example:** `addMatch({
    [MatchTeamType.Home] : {team: {id: Date.now(), name:'Brazil'}},
    [MatchTeamType.Away] : {team: {id: Date.now(), name: 'Colombia'}}
})`

### removeMatch

*   **Description:** Removes a match by its ID.
*   **Parameters:**
    *   `id`: The unique identifier of the match.
*   **Example:** `removeMatch(1)`

### startMatch

*   **Description:** Starts a match by its ID.
*   **Parameters:**
    *   `id`: The unique identifier of the match.
*   **Example:** `startMatch(1)`

### endMatch

*   **Description:** Ends a match by its ID.
*   **Parameters:**
    *   `id`: The unique identifier of the match.
*   **Example:** `endMatch(1)`

### scoreGoal

*   **Description:** Scores a goal in a match with a specific team.
*   **Parameters:**
    *   `data`: An object containing the match ID, team type, and optional player name.
*   **Example:** `scoreGoal({ matchId: 1, teamType: 'home', player: 'John Doe' })`

## Getters
------------

### summary

*   **Description:** Returns array of indexed strings for each match and a string .
*   **Example:** `['1. Poland 0 - Spain 1', '2. Brazil 1 - Egypt 2']`


## Contributing
------------

Contributions are welcome! If you'd like to add or modify interfaces, please submit a pull request with a clear description of your changes.

## License
-------

This project is licensed under the MIT License. See the LICENSE file for details.

