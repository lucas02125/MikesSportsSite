import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PlayerSquads, TeamInformation } from "../../footballteams";
import { getSquadForTeam } from "../../api";
import Title from "../../Components/Title/Title";
import PositionProfile from "../../Components/PositionProfile/PositionProfile";

interface Props {}

const TeamPage = (props: Props) => {
  let { ticker } = useParams();
  const [theSquad, setSquad] = useState<PlayerSquads[]>([]);
  const [teamInfo, setInfo] = useState<TeamInformation | undefined>();
  const [theGoalies, setGoalie] = useState<PlayerSquads[]>([]);
  const [theDefenders, setDefenders] = useState<PlayerSquads[]>([]);
  const [theMidfield, setMidfielders] = useState<PlayerSquads[]>([]);
  const [theAttack, setStrikers] = useState<PlayerSquads[]>([]);

  useEffect(() => {
    const getSquadData = async () => {
      const result = await getSquadForTeam(ticker!);
      let responseData = result!.data.response[0];
      setInfo(responseData.team);
      setSquad(responseData.players);
    };
    getSquadData();
  }, []);

  useEffect(() => {
    const midfield = theSquad.filter(
      (player) => player.position === "Midfielder"
    );
    setMidfielders(midfield);
    const goalies = theSquad.filter(
      (player) => player.position === "Goalkeeper"
    );
    const defenders = theSquad.filter(
      (player) => player.position === "Defender"
    );
    setDefenders(defenders);
    const strikers = theSquad.filter(
      (player) => player.position === "Attacker"
    );
    setGoalie(goalies);
    setStrikers(strikers);
  }, [theSquad]);

  return (
    <>
      {theSquad.length > 0 && teamInfo ? (
        <div>
          <Title title={teamInfo.name} logo={teamInfo.logo} />
          <PositionProfile position="Goalkeepers" info={theGoalies} />
          <PositionProfile position="Defenders" info={theDefenders} />
          <PositionProfile position="Midfielders" info={theMidfield} />
          <PositionProfile position="Attackers" info={theAttack} />
        </div>
      ) : (
        <h1>The squad does not exist</h1>
      )}
    </>
  );
};

export default TeamPage;
