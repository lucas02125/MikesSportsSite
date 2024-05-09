import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LeaguePage from "../Pages/LeaguePage/LeaguePage";
import TeamPage from "../Pages/TeamPage/TeamPage";
import PlayerPage from "../Pages/PlayerPage/PlayerPage";
import SeachPage from "../Pages/SearchPage/SeachPage";
import HomePage from "../Pages/HomePage/HomePage";
import StandingsPage from "../Pages/StandingsPage/StandingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SeachPage /> },
      {
        path: "league",
        element: <LeaguePage />,
        children: [{ path: ":ticker/standing", element: <StandingsPage /> }],
      },
      {
        path: "club/:club",
        element: <TeamPage />,
        children: [
          { path: "player/:player/:position", element: <PlayerPage /> },
        ],
      },
    ],
  },
]);
