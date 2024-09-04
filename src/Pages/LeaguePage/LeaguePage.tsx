import { useContext, useEffect, useState } from "react";
import { LeagueByType, LeagueDetails } from "../../footballteams";
import Table from "../../Components/Table/Table";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Title from "../../Components/Title/Title";
import Spinner from "../../Components/Spinner/Spinner";
import { getClubCompetition } from "../../api";

interface Props {}
const competitionType = ["League", "Cup"];

const TableConfig = [
  {
    label: "Nation",
    render: (league: LeagueDetails) => (
      <img src={league.logo} alt={league.name} className="w-20 h-20" />
    ),
  },
  {
    label: "League Name",
    render: (league: LeagueDetails) => (
      <Link to={league.id + "/standing"}>{league.name}</Link>
    ),
  },
];

const LeaguePage = (props: Props) => {
  const location = useLocation();
  const [leagueOnly, setLeagueOnly] = useState<LeagueDetails[]>([]);
  const [cupOnly, setCup] = useState<LeagueByType[]>([]);
  let { countrycode } = useParams();

  useEffect(() => {
    const testCountryChange = async () => {
      const newResult = await getClubCompetition(
        countrycode!,
        competitionType[0]
      );
      let newResponse = newResult!.data.response;
      const newLeagueArray = newResponse.map((item: any) => item.league);
      setLeagueOnly(newLeagueArray);
    };
    testCountryChange();
  }, [countrycode]);

  return (
    <>
      {location.pathname === `/league/${countrycode}` && leagueOnly ? (
        <div>
          <Title title="Leagues" logo="" />
          <Table config={TableConfig} data={leagueOnly} />
        </div>
      ) : (location.pathname === `/league/${countrycode}`) === false ? (
        <Outlet />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default LeaguePage;
