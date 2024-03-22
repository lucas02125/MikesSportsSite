import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LeaguePage from "../Pages/LeaguePage/LeaguePage";
import TeamPage from "../Pages/TeamPage/TeamPage";
import PlayerPage from "../Pages/PlayerPage/PlayerPage";
import SeachPage from "../Pages/SearchPage/SeachPage";
import HomePage from "../Pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SeachPage /> },
      {
        path: "league/:ticker",
        element: <LeaguePage />,
        children: [
          { path: ":teams", element: <TeamPage /> },
          { path: ":player", element: <PlayerPage /> },
          { path: ":standings", element: <PlayerPage /> },
        ],
      },
      // { path: "teams", element: <TeamPage /> },
      // { path: "player", element: <Player /> },
    ],
  },
]);
