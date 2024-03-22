import React from "react";
import Card from "../Cards/Card";

type Props = {};

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div>
      <Card teamName="Real Madrid" leagueName="La Liga" clubWorth={450000} />
      <Card teamName="Arsenal" leagueName="Premier League" clubWorth={15000} />
      <Card
        teamName="Bayern Munich"
        leagueName="Bundesliga"
        clubWorth={30000}
      />
    </div>
  );
};

export default CardList;
