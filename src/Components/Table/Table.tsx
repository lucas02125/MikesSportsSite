import React from "react";
import { ClubCompetitions } from "../../footballteams";
import { Link } from "react-router-dom";

interface Props {
  config: any;
  data: any;
  isLink: boolean;
}

const Table = ({ config, data, isLink }: Props) => {
  const renderedHeader = config.map((config: any) => {
    return (
      <th
        className="p-4 text-left text-sm font-medium text-fray-500 uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });

  const renderedRows = data.map((leagueName: any) => {
    return (
      <tr key={leagueName.id}>
        {config.map((val: any) => {
          return (
            <td className="p-4 text-left text-xl font-large text-fray-500 uppercase tracking-wider">
              {val.render(leagueName, isLink)}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div className="bg-white shadowed rounded-lg p-4 sm:p-6 xl:p-8">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        Leagues
      </h2>
      <table className="mx-auto">
        <thead className="min-w-full divide-y divide=gray-200 m-5">
          {renderedHeader}
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
