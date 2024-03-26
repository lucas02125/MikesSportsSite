import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import { LeagueStandings } from "../../footballteams";
export const CheckingProgression: any = (status: string) => {
  if ((status = "same")) {
    return <HiOutlineMinusCircle />;
  } else if ((status = "up")) {
    return <HiOutlineChevronUp />;
  } else {
    return <HiOutlineChevronDown />;
  }
};

export const GetGamesPlayed: any = (
  standing: LeagueStandings,
  fixture: string
) => {
  if ((fixture = "All Matches")) {
    return standing.all.gamesPlayed;
  } else if ((fixture = "Home")) {
    return standing.home.gamesPlayed;
  } else {
    return standing.away.gamesPlayed;
  }
};
