import React from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const getTopLeagueIDs = (country: string): string => {
  switch (country) {
    case "GB":
      return "39";
    case "IT":
      return "135";
    case "FR":
      return "61";
    case "DE":
      return "78";
    case "ES":
      return "140";
    default:
      return "";
  }
};

const FixturePage = (props: Props) => {
  let { state } = useLocation();
  const currentID = getTopLeagueIDs(state);
  return <div>FixturePage</div>;
};

export default FixturePage;
