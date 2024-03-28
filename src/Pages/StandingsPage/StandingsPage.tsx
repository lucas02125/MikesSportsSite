import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLeagueStandings } from "../../api";
import { LeagueStandings } from "../../footballteams";
import Table from "../../Components/Table/Table";
import {
  CheckingProgression,
  GetGamesPlayed,
  GetGamesDrawn,
  GetGamesWon,
  GetGamesLost,
  GetGoalsFor,
  GetGoalsAgainst,
  GetTotalPoints,
  DisplayingTeamsForm,
} from "../../Components/Helpers/StandingFormatting";
import Title from "../../Components/Title/Title";
import Dropdown from "../../Components/Dropdown/Dropdown";

type Props = {};
const FixutreTypes = ["All Matches", "Home", "Away"];
const LeagueConfig = [
  {
    label: "Position",
    render: (standing: LeagueStandings) => standing.rank,
  },
  {
    subTitle: "Trending",
    render: (standing: LeagueStandings) => CheckingProgression(standing.status),
  },
  {
    label: "Club",
    render: (standing: LeagueStandings) => (
      <img
        src={standing.team.logo}
        alt={standing.team.name}
        className="w-12 h-12"
      />
    ),
  },
  {
    subtitle: "ClubName",
    render: (standing: LeagueStandings) => standing.team.name,
  },
  {
    label: "Played",
    render: (standing: LeagueStandings) =>
      GetGamesPlayed(standing, FixutreTypes[0]),
  },
  {
    label: "Won",
    render: (standing: LeagueStandings) =>
      GetGamesWon(standing, FixutreTypes[0]),
  },
  {
    label: "Drawn",
    render: (standing: LeagueStandings) =>
      GetGamesDrawn(standing, FixutreTypes[0]),
  },
  {
    label: "Lost",
    render: (standing: LeagueStandings) =>
      GetGamesLost(standing, FixutreTypes[0]),
  },
  {
    label: "GF",
    render: (standing: LeagueStandings) =>
      GetGoalsFor(standing, FixutreTypes[0]),
  },
  {
    label: "GA",
    render: (standing: LeagueStandings) =>
      GetGoalsAgainst(standing, FixutreTypes[0]),
  },
  {
    label: "Points",
    render: (standing: LeagueStandings) =>
      GetTotalPoints(standing, FixutreTypes[0]),
  },
  {
    label: "Form",
    render: (standing: LeagueStandings) => DisplayingTeamsForm(standing.form),
  },
];

const StandingsPage = (props: Props) => {
  let { ticker } = useParams();
  const [standings, setStandings] = useState<LeagueStandings[]>([]);
  const [selectFixtureType, setSelectedFixtureType] = useState<string>(
    FixutreTypes[0]
  );

  useEffect(() => {
    const getLeagueData = async () => {
      const result = await getLeagueStandings(ticker!);
      let responseData = result!.data.response[0].league.standings[0];
      setStandings(responseData);
    };
    getLeagueData();
  }, []);

  const handleFixtureTypeChange = (value: string) => {
    setSelectedFixtureType(value);
  };

  return (
    <>
      {standings.length > 0 ? (
        <div>
          <Title title={standings[0].group} />
          <Dropdown values={FixutreTypes} onChange={handleFixtureTypeChange} />
          <Table config={LeagueConfig} data={standings} isLink={false} />
        </div>
      ) : (
        <h1>No Standings available</h1>
      )}
    </>
  );
};

export default StandingsPage;
