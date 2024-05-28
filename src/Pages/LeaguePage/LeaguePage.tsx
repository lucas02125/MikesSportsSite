import { useEffect, useState } from "react";
import { ClubCompetitions } from "../../footballteams";
import Table from "../../Components/Table/Table";
import { Link, Outlet, useLocation } from "react-router-dom";
import Title from "../../Components/Title/Title";
import Spinner from "../../Components/Spinner/Spinner";

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
      <Link to={league.id + "/standing"}>{league.name}</Link>
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

      const responseObject = [
        {
          id: 39, //45
          logo: "https://media.api-sports.io/football/leagues/39.png",
          name: "Premier League",
          type: "League",
          country: "England",
          flag: "https://media.api-sports.io/flags/gb.svg",
          season: 2023,
        },
        {
          id: 2,
          logo: "https://media.api-sports.io/football/leagues/2.png",
          name: "UEFA Champions League",
          type: "Cup",
          country: "World",
          flag: "",
          season: 2023,
        },
      ];

      setLeauge(responseObject);
      //setLeauge((prevLeauge) => [...prevLeauge, responseObject]);

      //}

      console.log(leaguesetter);
    };

    fetchedData();
  }, []);

  return (
    <>
      {location.pathname === "/league" && leaguesetter ? (
        <div>
          <Title title="Leagues" logo="" />
          <Table config={TableConfig} data={leaguesetter} />
        </div>
      ) : location.pathname !== "/league" ? (
        <Outlet />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default LeaguePage;
