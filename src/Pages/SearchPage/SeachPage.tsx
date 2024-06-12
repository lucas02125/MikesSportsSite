import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { PlayerInformation, PlayerStatistic } from "../../footballteams";
import { useLocation } from "react-router";
import { getPlayerSearch } from "../../api";
import Search from "../../Components/Search/Search";

type Props = {};

const getLeagueIDs = (country: string): string[] => {
  switch (country) {
    case "GB":
      return ["39"];
    //return ["39", "40", "41"];
    case "IT":
      return ["135", "136", "138"];
    case "FR":
      return ["61", "62", "63"];
    case "DE":
      return ["78", "79", "80"];
    case "ES":
      return ["140", "141", "435"];
    default:
      return [];
  }
};

const SeachPage = (props: Props) => {
  let { state } = useLocation();
  const currentLeagueIds = getLeagueIDs(state);
  const [search, setSearch] = useState<string>("");
  const [playerIndex, setPlayerIndex] = useState<PlayerInformation[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    currentLeagueIds.forEach(async (singleLeague: string) => {
      console.log(singleLeague);
      const result = await getPlayerSearch(singleLeague, search);
      if (typeof result == "string") {
        setServerError(result);
      } else if (result?.data == null) {
        setServerError("");
      } else if (Array.isArray(result.data)) {
        setPlayerIndex(result.data);
      }

      //We have our match so no need to continue
      if (result !== undefined) return;
    });

    console.log(playerIndex);
  };

  return (
    <div className="App">
      SeachPage
      <Search
        onSearchSubmit={onSearchSubmit}
        handleSearchChange={handleSearchChange}
        searchValue={search}
      />
    </div>
  );
};

export default SeachPage;
