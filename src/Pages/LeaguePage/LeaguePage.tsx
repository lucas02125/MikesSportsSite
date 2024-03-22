import { useEffect, useState } from "react";
import League from "../../Components/League/League";
import { ClubCompetitions } from "../../footballteams";
import { getClubCompetition } from "../../api";
import { useOutletContext } from "react-router";

interface Props {}

const LeaguePage = (props: Props) => {
  const leaguesList = [
    { id: 39, name: "Premier League", icon: "GB" },
    { id: 135, name: "Serie A", icon: "IT" },
    { id: 140, name: "La Liga", icon: "ES" },
    { id: 61, name: "Ligue 1", icon: "FR" },
    { id: 78, name: "Bundesliga", icon: "DE" },
  ];

  const [leaguesetter, setLeauge] = useState<ClubCompetitions>();

  useEffect(() => {
    const fetchedData = async () => {
      const result = await getClubCompetition(leaguesList[0].id.toString());
      console.log(result!.data.response[0].league);
      setLeauge(result!.data.response[0].league);
    };

    fetchedData();
  }, []);

  return (
    <>
      {leaguesetter ? (
        <League leagueData={leaguesetter} />
      ) : (
        <h1>No leagues here </h1>
      )}
    </>
  );
};

export default LeaguePage;
