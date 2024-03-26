import { useEffect, useState } from "react";
import { ClubCompetitions } from "../../footballteams";
import { getClubCompetition } from "../../api";
import Table from "../../Components/Table/Table";
import { Link, Outlet, useLocation } from "react-router-dom";

interface Props {}

const TableConfig = [
  {
    label: "Nation",
    render: (league: ClubCompetitions) => (
      <img src={league.flag} alt={league.name} className="w-32 h-32" />
    ),
  },
  {
    label: "League Name",
    render: (league: ClubCompetitions, isLink: boolean) => {
      return isLink ? (
        <Link to={league.id + "/standings"}>{league.name}</Link>
      ) : (
        <p>{league.name}</p>
      );
    },
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
      // const responses = Promise.all( <-- THIS OPTION WILL CALL THE API
      //   leaguesList.map(async (item) => {
      //     const result = await getClubCompetition(item.id.toString());
      //     let responseData = result!.data.response[0].league;
      //     setLeauge((prevLeauge) => [...prevLeauge, responseData]);
      //   })
      // );

      // {

      //const result = await getClubCompetition(leaguesList[0].id.toString());
      //let responseData = result!.data.response[0].league;
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

      // }

      //console.log(leaguesetter);
    };

    fetchedData();
  }, []);

  return (
    <>
      {location.pathname === "/league" && leaguesetter ? (
        <Table config={TableConfig} data={leaguesetter} isLink={true} />
      ) : location.pathname !== "/league" ? (
        <Outlet />
      ) : (
        <h1>No Leagues here</h1>
      )}
    </>
  );
};

export default LeaguePage;
