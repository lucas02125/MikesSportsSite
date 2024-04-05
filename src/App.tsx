import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router";

const leagues = [
  { id: 2002, name: "Bundasliga", icon: "DEU" },
  { id: 2014, name: "La Liga", icon: "ESP" },
  { id: 2015, name: "Ligue 1", icon: "FRA" },
  { id: 2019, name: "Serie A", icon: "ITA" },
  { id: 2021, name: "Premier League", icon: "ENG" },
  // { id: 2002, name: "BL1", icon: "DEU" },
  // { id: 2014, name: "PD", icon: "ESP" },
  // { id: 2015, name: "FL1", icon: "FRA" },
  // { id: 2019, name: "SA", icon: "ITA" },
  // { id: 2021, name: "PL", icon: "ENG" },
];

function App() {
  return (
    <>
      <Navbar leagues={leagues} />
      <Outlet />
    </>
  );
}

export default App;
