import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

const StandingsPage = (props: Props) => {
  let { ticker } = useParams();
  const [standings, setStandings] = useState<LeagueStandings[]>([]);
  const [LeagueConfig, setLeagueConfig] = useState<any[]>([]); // Initialize LeagueConfig with initial fixture type
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

  useEffect(() => {
    const newLeagueConfig = [
      {
        label: "Position",
        render: (standing: LeagueStandings) => standing.rank,
      },
      {
        subTitle: "Trending",
        render: (standing: LeagueStandings) =>
          CheckingProgression(standing.status),
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
        render: (standing: LeagueStandings) => (
          <Link to={`/club/${standing.team.id}`}>{standing.team.name}</Link>
        ),
      },
      {
        label: "Played",
        render: (standing: LeagueStandings) =>
          GetGamesPlayed(standing, selectFixtureType),
      },
      {
        label: "Won",
        render: (standing: LeagueStandings) =>
          GetGamesWon(standing, selectFixtureType),
      },
      {
        label: "Drawn",
        render: (standing: LeagueStandings) =>
          GetGamesDrawn(standing, selectFixtureType),
      },
      {
        label: "Lost",
        render: (standing: LeagueStandings) =>
          GetGamesLost(standing, selectFixtureType),
      },
      {
        label: "GF",
        render: (standing: LeagueStandings) =>
          GetGoalsFor(standing, selectFixtureType),
      },
      {
        label: "GA",
        render: (standing: LeagueStandings) =>
          GetGoalsAgainst(standing, selectFixtureType),
      },
      {
        label: "Points",
        render: (standing: LeagueStandings) =>
          GetTotalPoints(standing, selectFixtureType),
      },
      {
        label: "Form",
        render: (standing: LeagueStandings) =>
          DisplayingTeamsForm(standing.form),
      },
    ];
    setLeagueConfig(newLeagueConfig);
  }, [selectFixtureType]);

  const handleFixtureTypeChange = (value: string) => {
    console.log(value);
    setSelectedFixtureType(value);
  };

  return (
    <>
      {standings.length > 0 ? (
        <div>
          <Title title={standings[0].group} logo={standings[0].team.logo} />
          <Dropdown
            values={FixutreTypes}
            dropdownName={"Filter Fixtures"}
            onChange={handleFixtureTypeChange}
          />
          <Table config={LeagueConfig} data={standings} />
        </div>
      ) : (
        <h1>No Standings available</h1>
      )}
    </>
  );
};

export default StandingsPage;
