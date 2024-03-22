import React, { useState } from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";

interface Props {
  leagues: { id: number; name: string; icon: string }[];
}

const Navbar = ({ leagues }: Props) => {
  const [isListVisible, setListVisible] = useState(false);
  //const [selectLeague, setSelectedLeague] = useState(null);

  const handleMouseEnter = () => {
    setListVisible(true);
  };
  const handleMouseLeave = () => {
    setListVisible(false);
  };

  // const handleSVGClick = (league: any) => {
  //   setSelectedLeague(league);
  //   console.log(league.name);
  // };

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/teams" className="text-black hover:text-darkBlue">
              Team
            </Link>
          </div>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
          <div className="hidden font-bold lg:flex">
            <Link to="/player" className="text-black hover:text-darkBlue">
              Players
            </Link>
          </div>
          {/* <div className="hidden font-bold lg:flex">
            <Link to="/league" className="text-black hover:text-darkBlue">
              Leagues
            </Link>
          </div> */}
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-back">
          <div className="hover:text-darkBlue">Login</div>
          <a
            href=""
            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
          >
            Signup
          </a>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 "
            onMouseEnter={handleMouseEnter}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          {isListVisible && (
            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              {/* <ul>
                {leagues.map((league: any) => {
                  return (
                    <li
                      key={league.id}
                      className="hover:bg-sky-700"
                      onClick={() => handleSVGClick(league)}
                    >
                      {league.icon}
                    </li>
                  );
                })}
              </ul> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
