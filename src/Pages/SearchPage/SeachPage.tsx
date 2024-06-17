import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { PlayerInformation, PlayerStatistic } from "../../footballteams";
import { useLocation } from "react-router";
import { getPlayerSearch } from "../../api";
import Search from "../../Components/Search/Search";
import {
  ConvertCmToFeet,
  GetInjuredIcon,
} from "../../Components/Helpers/PlayerFormating";
import Table from "../../Components/Table/Table";
import { Link } from "react-router-dom";

type Props = {};

//Config that will return when the user searches for a player
const playerConfig = [
  {
    label: " ",
    render: (player: PlayerInformation) => (
      <img src={player.photo} alt={player.name} className="w-24 h-24" />
    ),
  },
  {
    label: "Player Name",
    render: (player: PlayerInformation & { position: string }) => (
      <Link to={`/player/${player.id}/${player.position}`}>
        {`${player.firstname} ${player.lastname}`}
      </Link>
    ),
  },
  {
    label: "Nationality",
    render: (player: PlayerInformation) => player.nationality,
  },
  {
    label: "Date of Birth",
    render: (player: PlayerInformation) =>
      `${player.birth.date} (${player.age})`,
  },
  {
    label: "Weight",
    render: (player: PlayerInformation) => player.weight,
  },
  {
    label: "Height",
    render: (player: PlayerInformation) => ConvertCmToFeet(player.height),
  },
  {
    label: "Health",
    render: (player: PlayerInformation) => GetInjuredIcon(player.injured),
  },
];

//League IDs from the API that reference Top 3 leagues for each country
const getLeagueIDs = (country: string): string[] => {
  switch (country) {
    case "GB":
      return ["39", "40", "41"];
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
  const [playerPosition, setPlayerPosition] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string>("");

  //Event handling the text change in the seach bar
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  //Action for when the user enters players name
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      //Collect all promises
      const allPromises = currentLeagueIds.map(async (singleLeague: string) => {
        const result = await getPlayerSearch(singleLeague, search);
        return result!.data.response;
      });

      const allResponses = await Promise.all(allPromises);

      let allPlayers: any = [];
      let playerPosArray: any = [];
      for (let playerResponse of allResponses) {
        if (typeof playerResponse === "string") {
          setServerError(playerResponse);
          return; //Exit early on error
        } else if (playerResponse === null) {
          setServerError("");
        } else if (playerResponse.length > 0) {
          const playerArray = playerResponse.map((item: any) => item.player);
          const positionArray = playerResponse.map((pos: any) => {
            return pos.statistics[0] && pos.statistics[0].games
              ? pos.statistics[0].games.position
              : null;
          });
          allPlayers = [...allPlayers, ...playerArray];
          playerPosArray = [...playerPosArray, ...positionArray];
        }
      }

      //set the state with all collected player data
      setPlayerIndex(allPlayers);
      setPlayerPosition(playerPosArray);
    } catch (error) {
      console.log(`Error during search: ${error}`);
      setServerError(`An error occurred while searching players`);
    }
  };

  // Combine player data with their positions
  const combinedPlayerData = playerIndex.map((player, index) => ({
    ...player,
    position: playerPosition[index] || "Unknown",
  }));

  return (
    <div className="App">
      SeachPage
      <Search
        onSearchSubmit={onSearchSubmit}
        handleSearchChange={handleSearchChange}
        searchValue={search}
      />
      <Table config={playerConfig} data={combinedPlayerData} />
    </div>
  );
};

export default SeachPage;
