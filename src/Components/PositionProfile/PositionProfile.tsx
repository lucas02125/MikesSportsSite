import { PlayerSquads } from "../../footballteams";
import PlayerCard from "../PlayerCard/PlayerCard";

type Props = {
  position: string;
  info: PlayerSquads[];
};

function PositionProfile({ position, info }: Props) {
  return (
    <>
      <div className="flex-auto justify-center items-center">
        {info.length > 0 ? (
          <section
            id={position}
            className="relative flex flex-col items-center"
          >
            <h2 className="py-10 mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
              {position}
            </h2>
            <div className="flex mb-5 justify-center md:space-y-2 md:space-x-2  flex-wrap">
              {info.map((singlePlayer, index) => {
                return (
                  <>
                    {info.length < 5 ? (
                      <div
                        key={singlePlayer.id}
                        className="w-full md:w-1/8 lg:w-1/3 flex-initial justify-center"
                      >
                        <PlayerCard
                          playerValue={singlePlayer}
                          playerPosition={position}
                        />
                      </div>
                    ) : (
                      <div
                        key={singlePlayer.id}
                        className="w-full md:w-1/2 lg:w-1/6 flex-initial justify-center"
                      >
                        <PlayerCard
                          playerValue={singlePlayer}
                          playerPosition={position}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </section>
        ) : (
          <h2>No {position} listed</h2>
        )}
      </div>
    </>
  );
}

export default PositionProfile;
