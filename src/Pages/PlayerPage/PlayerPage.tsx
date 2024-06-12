import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { PlayerInformation, PlayerStatistic } from "../../footballteams";
import { getPlayerStatistic } from "../../api";
import PlayerInfo from "../../Components/PlayerInfo/PlayerInfo";
import {
  GetInjuredIcon,
  ConvertCmToFeet,
  CalculateShotAcc,
  CalculateRedCards,
  SetCaptaincy,
  GetThisFromFlag,
} from "../../Components/Helpers/PlayerFormating";
import Table from "../../Components/Table/Table";
import Rating from "@mui/material/Rating";
import Spinner from "../../Components/Spinner/Spinner";

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
        className="w-10 h-9"
      />
    ),
  },
  {
    label: "Competition",
    render: (stats: PlayerStatistic) => (
      <Link
        to={
          "/league" +
          GetThisFromFlag(stats.league.flag) +
          "/" +
          stats.league.id +
          "/standing"
        }
      >
        {stats.league.name}
      </Link>
    ),
  },
  {
    label: "",
    render: (stats: PlayerStatistic) => SetCaptaincy(stats.games.captain),
  },
  { type: "divider" },
  {
    label: "Apps(Subs)",
    render: (stats: PlayerStatistic) =>
      `${stats.games.appearences} (${stats.substitutes.in})`,
  },
  { label: "Goals", render: (stats: PlayerStatistic) => stats.goals.total },
  {
    label: "Assists",
    render: (stats: PlayerStatistic) =>
      stats.goals.assists ? stats.goals.assists : 0,
  },
  {
    label: "Shots",
    render: (stats: PlayerStatistic) =>
      stats.shots.total ? stats.shots.total : 0,
  },
  {
    label: "Shots on Target",
    render: (stats: PlayerStatistic) => (stats.shots.on ? stats.shots.on : 0),
  },
  {
    label: "Shooting %",
    render: (stats: PlayerStatistic) =>
      CalculateShotAcc(stats.shots.total, stats.shots.on),
  },
  { type: "divider" },
  {
    label: "Passes",
    render: (stats: PlayerStatistic) =>
      stats.passes.total ? stats.passes.total : 0,
  },
  {
    label: "Chances Created",
    render: (stats: PlayerStatistic) =>
      stats.passes.key ? stats.passes.key : 0,
  },
  {
    label: "Passing %",
    render: (stats: PlayerStatistic) =>
      stats.passes.accuracy === null ? "0%" : `${stats.passes.accuracy}%`,
  },
  { type: "divider" },
  {
    label: "Total Tackles",
    render: (stats: PlayerStatistic) =>
      stats.tackles.total ? stats.tackles.total : 0,
  },
  {
    label: "Fouls",
    render: (stats: PlayerStatistic) =>
      stats.fouls.committed ? stats.fouls.committed : 0,
  },
  {
    label: "Yellow Cards",
    render: (stats: PlayerStatistic) => stats.cards.yellow,
  },
  {
    label: "Red Cards",
    render: (stats: PlayerStatistic) =>
      CalculateRedCards(stats.cards.yellowred, stats.cards.red),
  },
  {
    label: "Rating",
    render: (stats: PlayerStatistic) => (
      <Rating
        name="customized-10"
        readOnly={true}
        emptyIcon={false}
        defaultValue={Number(stats.games.rating)}
        precision={0.1}
        max={10}
        size="small"
      />
    ),
  },
];

const goalkeeperConfig = [
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
    render: (stats: PlayerStatistic) => (
      <Link to={"/league/" + stats.league.id + "/standing"}>
        {stats.league.name}
      </Link>
    ),
  },
  {
    label: "",
    render: (stats: PlayerStatistic) => SetCaptaincy(stats.games.captain),
  },
  {
    label: "Apps",
    render: (stats: PlayerStatistic) => stats.games.appearences,
  },
  {
    label: "Saves",
    render: (stats: PlayerStatistic) =>
      stats.goals.saves ? stats.goals.saves : 0,
  },
  {
    label: "Penalties Saved",
    render: (stats: PlayerStatistic) =>
      stats.penalty.saved ? stats.penalty.saved : 0,
  },
  {
    label: "Goals Conceded",
    render: (stats: PlayerStatistic) =>
      stats.goals.conceded ? stats.goals.conceded : 0,
  },
  { type: "divider" },
  {
    label: "Passes",
    render: (stats: PlayerStatistic) =>
      stats.passes.total ? stats.passes.total : 0,
  },
  {
    label: "Passing %",
    render: (stats: PlayerStatistic) =>
      stats.passes.accuracy === null ? "0%" : `${stats.passes.accuracy}%`,
  },
  {
    label: "Yellow Cards",
    render: (stats: PlayerStatistic) => stats.cards.yellow,
  },
  {
    label: "Red Cards",
    render: (stats: PlayerStatistic) =>
      CalculateRedCards(stats.cards.yellowred, stats.cards.red),
  },
  {
    label: "Fouls",
    render: (stats: PlayerStatistic) =>
      stats.fouls.committed ? stats.fouls.committed : 0,
  },
  { type: "divider" },
  {
    label: "Rating",
    render: (stats: PlayerStatistic) => (
      <Rating
        name="customized-10"
        readOnly={true}
        emptyIcon={false}
        defaultValue={Number(stats.games.rating)}
        precision={0.1}
        max={10}
        size="small"
      />
    ),
  },
];

const PlayerPage = (props: Props) => {
  const { player, position, club } = useParams();
  const location = useLocation();
  const [playerInfo, setInfo] = useState<PlayerInformation>();
  const [statsInfo, setStats] = useState<PlayerStatistic[]>([]);

  useEffect(() => {
    const getPlayerStats = async () => {
      const statsResult = await getPlayerStatistic(player!, club!);
      let playerResponse = statsResult!.data.response[0].player;
      let statsResponse = statsResult!.data.response[0].statistics;
      setInfo(playerResponse);
      //setStats(statsResponse);
      statsResponse.forEach((comp: any) => {
        if (comp.games.appearences === 0 && comp.substitutes.in === 0) {
          //dont want to display players who haven't played in a competition
        } else {
          setStats((prevComp) => [...prevComp, comp]);
        }
      });
      console.log(statsResponse);
    };
    getPlayerStats();
  }, []);

  return (
    <>
      {playerInfo && location.pathname.includes("/standing") === false ? (
        <div>
          <PlayerInfo headerConfig={playerConfig} data={playerInfo} />
          {position === "Goalkeepers" ? (
            <Table config={goalkeeperConfig} data={statsInfo} />
          ) : (
            <Table config={statsConfig} data={statsInfo} />
          )}
        </div>
      ) : location.pathname.includes("/standing") ? (
        <Outlet />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PlayerPage;
