import { useEffect, useState } from "react";
import { ClubCompetitions } from "../../footballteams";
import Table from "../../Components/Table/Table";
import { Link, Outlet, useLocation } from "react-router-dom";
import Title from "../../Components/Title/Title";

interface Props {}

const TableConfig = [
  {
    label: "Nation",
    render: (league: ClubCompetitions) => (
      <img src={league.logo} alt={league.name} className="w-20 h-20" />
    ),
  },
  {
    label: "League Name",
    render: (league: ClubCompetitions) => (
      <Link to={league.id + "/standings"}>{league.name}</Link>
    ),
  },
];

const LeaguePage = (props: Props) => {
  const location = useLocation();
  const leaguesList = [
    { id: 39, name: "Premier League", icon: "GB" },
    { id: 135, name: "Serie A", icon: "IT" },
    { id: 140, name: "La Liga", icon: "ES" },
    { id: 61, name: "Ligue 1", icon: "FR" },
    { id: 78, name: "Bundesliga", icon: "DE" },
  ];

  const [leaguesetter, setLeauge] = useState<ClubCompetitions[]>([]);

  useEffect(() => {
    const fetchedData = async () => {
      // const responses = Promise.all(
      //   leaguesList.map(async (item) => {
      //     const result = await getClubCompetition(item.id.toString());
      //     let responseData = result!.data.response[0].league;
      //     setLeauge((prevLeauge) => [...prevLeauge, responseData]);
      //   })
      // );

      // {

      const responseObject = {
        id: 39,
        logo: "https://media.api-sports.io/football/leagues/39.png",
        name: "Premier League",
        type: "League",
        country: "England",
        flag: "https://media.api-sports.io/flags/gb.svg",
        season: 2023,
      };

      setLeauge((prevLeauge) => [...prevLeauge, responseObject]);

      //}

      console.log(leaguesetter);
    };

    fetchedData();
  }, []);

  return (
    <>
      {location.pathname === "/leagues" && leaguesetter ? (
        <div>
          <Title title="Leagues" logo="" />
          <Table config={TableConfig} data={leaguesetter} />
        </div>
      ) : location.pathname !== "/leagues" ? (
        <Outlet />
      ) : (
        <h1>No Leagues here</h1>
      )}
    </>
  );
};

export default LeaguePage;
