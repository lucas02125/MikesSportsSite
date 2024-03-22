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
        params: { id: query },
        headers: {
          "X-RapidAPI-Key":
            "46a422f6a9msh8f9d4cbad514226p1cc02cjsnedf495f46fe1",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};
