import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LeaguePage from "../Pages/LeaguePage/LeaguePage";
import TeamPage from "../Pages/TeamPage/TeamPage";
import PlayerPage from "../Pages/PlayerPage/PlayerPage";
import SearchPage from "../Pages/SearchPage/SeachPage";
import HomePage from "../Pages/HomePage/HomePage";
import StandingsPage from "../Pages/StandingsPage/StandingsPage";
import FixturePage from "../Pages/FixturePage/FixturePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      {
        path: "league/:countrycode",
        element: <LeaguePage />,
        children: [{ path: ":ticker/standing", element: <StandingsPage /> }],
      },
      {
        path: "league",
        element: <LeaguePage />,
        children: [{ path: ":ticker/standing", element: <StandingsPage /> }],
      },
      { path: "fixture", element: <FixturePage /> },
      {
        path: "club/:club",
        element: <TeamPage />,
        children: [
          {
            path: "player/:player/:position",
            element: <PlayerPage />,
          },
        ],
      },
      { path: "player/:player/:position", element: <PlayerPage /> },
    ],
  },
]);
