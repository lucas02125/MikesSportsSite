import { PlayerSquads } from "../../footballteams";
import { Link, useOutletContext } from "react-router-dom";

type Props = {
  playerValue: PlayerSquads;
  playerPosition: string;
};

function PlayerCard({ playerValue, playerPosition }: Props) {
  return (
    <div className="flex items-center">
      <Link
        to={`player/${playerValue.id}/${playerPosition}`}
        className="block w-4/5 p-6 space-y-6 text-center rounded-lg shadow-lg"
      >
        <img
          src={playerValue.photo}
          alt={playerValue.name}
          className="w-20 h-20 rounded-full "
        />
        <span className="text-gray-500 whitespace-nowrap text-lg">
          Age: {playerValue.age}
        </span>
        <div className="flex flex-grow justify-between items-center">
          <div>
            <span className="text-gray-500 whitespace-nowrap text-lg">
              #. {playerValue.number}
            </span>
          </div>
          <div>
            <span className="text-lg font-semibold">{playerValue.name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlayerCard;
