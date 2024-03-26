import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getLeagueStandings } from "../../api";
import { LeagueStandings } from "../../footballteams";
import LeaguePage from "../LeaguePage/LeaguePage";
import Table from "../../Components/Table/Table";
import { CheckingProgression } from "../../Components/Helpers/StandingFormatting";

type Props = {};
const FixutreName = "All Matches";
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
    label: "Games Played",
    render: (standing: LeagueStandings) => GetGamesPlayed(standing, FixutreName);
  }
];

const StandingsPage = (props: Props) => {
  let { ticker } = useParams();
  const [standings, setStandings] = useState<LeagueStandings[]>([]);

  useEffect(() => {
    const getLeagueData = async () => {
      const result = await getLeagueStandings(ticker!);
      console.log(result!.data.response[0].league.standings[0]);
      let responseData = result!.data.response[0].league.standings[0];
      setStandings(responseData);
    };
    getLeagueData();
  }, []);

  return (
    <>
      {standings ? (
        <Table config={LeagueConfig} data={standings} isLink={false} />
      ) : (
        <h1>No LeaguePage</h1>
      )}
    </>
  );
};

export default StandingsPage;
