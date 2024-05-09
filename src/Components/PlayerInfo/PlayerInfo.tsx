import React from "react";
import { PlayerInformation } from "../../footballteams";
import { config } from "dotenv";

type Props = { headerConfig: any; data: PlayerInformation | undefined };

function PlayerInfo({ headerConfig, data }: Props) {
  return (
    <div className="flex justify-center">
      <table className="border border-gray-400">
        <thead>
          <tr>
            {headerConfig.map((configItem: any, index: number) => (
              <th
                key={index}
                className="p-4 border-gray-200 bg-gray-200 text-gray-800 uppercase font-semibold tracking-wider"
              >
                {configItem.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headerConfig.map((val: any) => {
              return (
                <td className="p-2 border-gray-200">{val.render(data)}</td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PlayerInfo;
