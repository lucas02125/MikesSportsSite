import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerInformation, PlayerStatistic } from "../../footballteams";
import { getPlayerStatistic } from "../../api";
import PlayerInfo from "../../Components/PlayerInfo/PlayerInfo";
import {
  GetInjuredIcon,
  ConvertCmToFeet,
  CalculateShotAcc,
} from "../../Components/Helpers/PlayerFormating";
import Table from "../../Components/Table/Table";
import { render } from "@testing-library/react";

interface Props {}

const playerConfig = [
  {
    label: " ",
    render: (player: PlayerInformation) => (
      <img src={player.photo} alt={player.name} className="w-24 h-24" />
    ),
  },
  {
    label: "Player Name",
    render: (player: PlayerInformation) =>
      `${player.firstname} ${player.lastname}`,
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

const statsConfig = [
  {
    label: "",
    render: (stats: PlayerStatistic) => (
      <img
        src={stats.league.logo}
        alt={stats.league.country}
        className="w-9 h-9"
      />
    ),
  },
  {
    label: "Competition",
    render: (stats: PlayerStatistic) => stats.league.name,
  },
  {
    label: "Apps(Subs)",
    render: (stats: PlayerStatistic) =>
      `${stats.games.appearences} (${stats.substitutes.in})`,
  },
  { label: "Goals", render: (stats: PlayerStatistic) => stats.goals.total },
  {
    label: "Assists",
    render: (stats: PlayerStatistic) => stats.goals.assists,
  },
  {
    label: "Shots",
    render: (stats: PlayerStatistic) => stats.shots.total,
  },
  {
    label: "Shots on Target",
    render: (stats: PlayerStatistic) => stats.shots.on,
  },
  {
    label: "Shooting %",
    render: (stats: PlayerStatistic) =>
      CalculateShotAcc(stats.shots.total, stats.shots.on),
  },
];

const PlayerPage = (props: Props) => {
  const { player, position, club } = useParams();
  const [playerInfo, setInfo] = useState<PlayerInformation>();
  const [statsInfo, setStats] = useState<PlayerStatistic>();

  useEffect(() => {
    const getPlayerStats = async () => {
      const statsResult = await getPlayerStatistic(player!, club!);
      let playerResponse = statsResult!.data.response[0].player;
      let statsResponse = statsResult!.data.response[0].statistics;
      setInfo(playerResponse);
      setStats(statsResponse);
      console.log(statsResponse);
    };
    getPlayerStats();
  }, []);

  return (
    <>
      {playerInfo ? (
        <div>
          <PlayerInfo headerConfig={playerConfig} data={playerInfo} />
          <Table config={statsConfig} data={statsInfo} />
        </div>
      ) : (
        <h1>No Player Information</h1>
      )}
    </>
  );
};

export default PlayerPage;
