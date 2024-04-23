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
        path: "leagues",
        element: <LeaguePage />,
        children: [{ path: ":ticker/standings", element: <StandingsPage /> }],
      },
      {
        path: "clubs/:ticker",
        element: <TeamPage />,
      },
      {
        path: "players/:ticker/:position",
        element: <PlayerPage />,
      },
    ],
  },
]);
