import React from "react";

interface Props {
  teamName: string;
  leagueName: string;
  clubWorth: number;
}

const Card: React.FC<Props> = ({
  teamName,
  leagueName,
  clubWorth,
}: Props): JSX.Element => {
  return (
    <div className="card">
      <h2>{teamName}</h2>
      <p>{leagueName}</p>
      <p>{clubWorth}</p>
    </div>
  );
};

export default Card;
