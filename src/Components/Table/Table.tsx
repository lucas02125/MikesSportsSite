import { Divider } from "@mui/material";

interface Props {
  config: any;
  data: any;
}

const Table = ({ config, data }: Props) => {
  const renderedHeader = config.map((config: any) => {
    return config.type === "divider" ? (
      <th className="border-l-4 divide=gray-500"></th>
    ) : (
      <th
        className="p-4 text-left text-sm font-medium text-fray-500 uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });

  const renderedRows = data.map((rowValue: any) => {
    return (
      <tr key={rowValue.id}>
        {config.map((val: any) => {
          return val.type === "divider" ? (
            <th className="border-l-4 divide=gray-500"></th>
          ) : (
            <td className="p-4 text-left text-xl font-large text-fray-500 uppercase tracking-wider">
              {val.render(rowValue)}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div className="bg-white shadowed rounded-lg p-4 sm:p-6 xl:p-8">
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
