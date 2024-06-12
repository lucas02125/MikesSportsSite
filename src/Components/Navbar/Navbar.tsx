import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";

interface Props {}

const leagues = ["GB", "IT", "FR", "DE", "ES"];
const Navbar = (props: Props) => {
  const [isListVisible, setListVisible] = useState(false);
  const [currentCountry, setCountry] = useState<string>(leagues[0]);

  const handleMouseEnter = () => {
    setListVisible(true);
  };

  const handleMouseLeave = () => {
    setListVisible(false);
  };

  const testingClick = (picked: any) => {
    //console.log(picked);
    setCountry(picked);
    return <Link to={"/league/" + currentCountry}></Link>;
  };

  const getCountry = (): string => {
    return currentCountry;
  };

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link
              to={"/league/" + currentCountry}
              className="text-black hover:text-darkBlue"
            >
              League
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
          <b>{currentCountry}</b>
          <div
            className="px-4 py-3 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
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
                  left: "100%",
                  position: "absolute",
                  top: 0,
                }}
              >
                <ul>
                  {leagues.map((league: any, index) => {
                    return (
                      <li key={index} className="hover:bg-sky-700">
                        <Link to={"/league/" + league}>{league}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
