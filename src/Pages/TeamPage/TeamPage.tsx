import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PlayerSquads, TeamInformation } from "../../footballteams";
import { getSquadForTeam } from "../../api";
import Title from "../../Components/Title/Title";
import Table from "../../Components/Table/Table";

interface Props {}

const SquadInfo = [
  { label: "Number", render: (player: PlayerSquads) => player.number },
  {
    render: (player: PlayerSquads) => (
      <img src={player.photo} alt={player.name} className="w-20 h-20" />
    ),
  },
  { label: "Name", render: (player: PlayerSquads) => player.name },
  { label: "Age", render: (player: PlayerSquads) => player.age },
];

const TeamPage = (props: Props) => {
  let { ticker } = useParams();
  const [theSquad, setSquad] = useState<PlayerSquads[]>([]);
  const [teamInfo, setInfo] = useState<TeamInformation | undefined>();
  const [theGoalies, setGoalie] = useState<PlayerSquads[]>([]);

  useEffect(() => {
    const getSquadData = async () => {
      const result = await getSquadForTeam(ticker!);
      let responseData = result!.data.response[0];
      console.log(responseData.players);
      setSquad(responseData.players);
      setInfo(responseData.team);
    };
    getSquadData();
  }, []);

  // function getGoalKeepers() {
  //   let goalies = theSquad.filter((gol) => gol.position === "Goalkeeper");
  //   setGoalie((lastGoalie) => [...lastGoalie, goalies]);
  // }

  return (
    <>
      {theSquad.length > 0 && teamInfo ? (
        <div>
          <Title title={teamInfo.name} logo={teamInfo.logo} />
          <h2>Goalkeepers</h2>
          <Table config={SquadInfo} data={theSquad} />
        </div>
      ) : (
        <h1>The squad does not exist</h1>
      )}
    </>
  );
};

export default TeamPage;
