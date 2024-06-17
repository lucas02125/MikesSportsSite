import axios from "axios";
import { ClubCompetitions } from "./footballteams";

interface SearchResponse {
  data: ClubCompetitions[];
}

//Returns a list of all competitions for a given country (League/Cup)
export const getClubCompetition = async (
  coutnryCode: string,
  competitionType: string
) => {
  try {
    const data = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v3/leagues/`,
      {
        params: { code: coutnryCode, type: competitionType, current: true },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

//Returns a players information from a given search (only 2023 year)
export const getPlayerSearch = async (leagueID: string, playerName: string) => {
  try {
    const data = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/players",
      {
        params: { league: leagueID, season: "2023", search: playerName },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log(`Error when searching player: ${error.message}`);
  }
};

//Returns the current standings of a given League
export const getLeagueStandings = async (leagueID: string) => {
  try {
    const data = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/standings",
      {
        params: { league: leagueID, season: "2023" },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};

//Returns the current squad of a given team
export const getSquadForTeam = async (teamID: string) => {
  try {
    const data = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/players/squads",
      {
        params: { team: teamID },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};

//Returns statistics of a given player (2023 only)
export const getPlayerStatistic = async (
  playerID: string | undefined,
  clubID: string | undefined
) => {
  try {
    const data = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/players",
      {
        params: { id: playerID, team: clubID, season: "2023" },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};
