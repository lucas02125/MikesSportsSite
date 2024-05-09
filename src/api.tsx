import axios from "axios";
import { ClubCompetitions } from "./footballteams";

interface SearchResponse {
  data: ClubCompetitions[];
}

export const getClubCompetition = async (query: string) => {
  try {
    const data = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v3/leagues/`,
      {
        params: { id: query, current: true },
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

export const getLeagueStandings = async (query: string) => {
  try {
    const data = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/standings",
      {
        params: { league: query, season: "2023" },
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

export const getSquadForTeam = async (query: string) => {
  try {
    const data = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/players/squads",
      {
        params: { team: query },
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

export const getPlayerStatistic = async (
  player: string | undefined,
  club: string | undefined
) => {
  try {
    const data = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/players",
      {
        params: { id: player, team: club, season: "2023" },
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
