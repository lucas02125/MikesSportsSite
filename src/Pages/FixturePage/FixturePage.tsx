import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getFixtures } from "../../api";
import { H2HDetails, TeamInfo } from "../../footballteams";
import Calendar from "../../Components/Calendar/Calendar";
import Table from "../../Components/Table/Table";
import { Link } from "react-router-dom";
import { CheckFixtureTime } from "../../Components/Helpers/FixtureFormatting";

type Props = {};

const getTopLeagueIDs = (country: string): string => {
  switch (country) {
    case "GB":
      return "39";
    case "IT":
      return "135";
    case "FR":
      return "61";
    case "DE":
      return "78";
    case "ES":
      return "140";
    default:
      return "";
  }
};

const FixturePage = (props: Props) => {
  const location = useLocation();
  const currentDate = new Date().toISOString().split("T")[0];

  const currentID = getTopLeagueIDs(location.state);
  const [fixtureList, setFixtures] = useState<H2HDetails[]>([]);
  const [fixtureDate, setFixtureDate] = useState<string>(""); //2024-08-25
  const [fixtureConfig, setFixtureConfig] = useState<any[]>([]);

  useEffect(() => {
    const getFixturesByCountry = async () => {
      const result = await getFixtures(currentDate, currentID);
      const responseData = result!.data.response;
      console.log(responseData);
      setFixtures(responseData);
    };
    getFixturesByCountry();
  }, []);

  useEffect(() => {
    const getFixturesByDate = async () => {
      const result = await getFixtures(fixtureDate, currentID);
      const responseData = result!.data.response;
      console.log(responseData);
      setFixtures(responseData);
    };
    const modFixtureConfig = [
      {
        label: "",
        render: (h2h: H2HDetails) => (
          <Link to={`club/${h2h.teams.home.id}`}>
            <p className="text-right">{h2h.teams.home.name}</p>
          </Link>
        ),
      },
      {
        label: "Home",
        render: (h2h: H2HDetails) => (
          <img
            src={h2h.teams.home.logo}
            alt={h2h.teams.home.name}
            className="w-12 h-12"
          />
        ),
      },
      {
        type: "contre",
        scoreline: (h2h: H2HDetails) => CheckFixtureTime(fixtureDate, h2h),
      },
      {
        label: "Away",
        render: (h2h: H2HDetails) => (
          <img
            src={h2h.teams.away.logo}
            alt={h2h.teams.away.name}
            className="w-12 h-12"
          />
        ),
      },
      {
        label: "",
        render: (h2h: H2HDetails) => (
          <Link to={`/club/${h2h.teams.away.id}`}>{h2h.teams.away.name}</Link>
        ),
      },
    ];
    setFixtureConfig(modFixtureConfig);
    getFixturesByDate();
  }, [fixtureDate]);

  const calendarDateChange = (pickedDate: string) => {
    console.log(pickedDate);
    setFixtureDate(pickedDate);
  };

  return (
    <>
      <Calendar chosenDate="string" onChange={calendarDateChange} />
      {location.pathname === "/fixture" && fixtureList.length > 0 ? (
        <>
          <Table config={fixtureConfig} data={fixtureList} />
        </>
      ) : location.pathname !== "/fixture" ? (
        <Outlet />
      ) : (
        <h1>No fixtures this day</h1>
      )}
    </>
  );
};

export default FixturePage;
