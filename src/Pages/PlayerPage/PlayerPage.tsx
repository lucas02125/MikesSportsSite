import React from "react";
import { useParams } from "react-router";

interface Props {}

const PlayerPage = (props: Props) => {
  let { ticker, position } = useParams();
  console.log(ticker);
  console.log(position);

  return <div>PlayerPage</div>;
};

export default PlayerPage;
