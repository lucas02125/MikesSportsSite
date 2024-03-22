import { ClubCompetitions } from "../../footballteams";

interface Props {
  leagueData: ClubCompetitions;
}

const League = ({ leagueData }: Props) => {
  return (
    <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        Leagues
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <ul>
          <li>{leagueData}</li>
        </ul>
      </div>
    </section>
  );
};

export default League;
