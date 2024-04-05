import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import { LeagueStandings } from "../../footballteams";
export const CheckingProgression: any = (status: string) => {
  if (status === "same") {
    return <HiOutlineMinusCircle />;
  } else if (status === "up") {
    return <HiOutlineChevronUp />;
  } else {
    return <HiOutlineChevronDown />;
  }
};

export const GetGamesPlayed = (
  standing: LeagueStandings,
  fixture: string
): number => {
  if (fixture === "All Matches") {
    return standing.all.played;
  } else if (fixture === "Home") {
    return standing.home.played;
  } else {
    return standing.away.played;
  }
};

export const GetGamesDrawn = (
  standing: LeagueStandings,
  fixture: string
): number => {
  if (fixture === "All Matches") {
    return standing.all.draw;
  } else if (fixture === "Home") {
    return standing.home.draw;
  } else {
    return standing.away.draw;
  }
};

export const GetGamesWon = (
  standing: LeagueStandings,
  fixture: string
): number => {
  if (fixture === "All Matches") {
    return standing.all.win;
  } else if (fixture === "Home") {
    return standing.home.win;
  } else {
    return standing.away.win;
  }
};

export const GetGamesLost = (
  standing: LeagueStandings,
  fixture: string
): number => {
  if (fixture === "All Matches") {
    return standing.all.lose;
  } else if (fixture === "Home") {
    return standing.home.lose;
  } else {
    return standing.away.lose;
  }
};

export const GetGoalsFor = (
  standing: LeagueStandings,
  fixture: string
): number => {
  if (fixture === "All Matches") {
    return standing.all.goals.for;
  } else if (fixture === "Home") {
    return standing.home.goals.for;
  } else {
    return standing.away.goals.for;
  }
};

export const GetGoalsAgainst = (
  standing: LeagueStandings,
  fixture: string
): number => {
  if (fixture === "All Matches") {
    return standing.all.goals.against;
  } else if (fixture === "Home") {
    return standing.home.goals.against;
  } else {
    return standing.away.goals.against;
  }
};

export const GetTotalPoints = (
  standing: LeagueStandings,
  fixture: string
): any => {
  if (fixture === "All Matches") {
    return <b>{standing.points}</b>;
  } else if (fixture === "Home") {
    let updatedPoints = standing.home.win * 3 + standing.home.draw * 1;
    return <b>{updatedPoints}</b>;
  } else {
    let updatedPoints = standing.away.win * 3 + standing.away.draw * 1;
    return <b>{updatedPoints}</b>;
  }
};

export const DisplayingTeamsForm: any = (teamForm: string) => {
  const getColor = (letter: string) => {
    switch (letter) {
      case "W":
        return "bg-green-500";
      case "L":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div className="flex">
      {teamForm.split("").map((letter, index) => (
        <div
          key={index}
          className={`w-8 h-8 ${getColor(
            letter
          )} rounded-full flex items-center justify-center text-white`}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};
