import { H2HDetails } from "../../footballteams";

export const CheckFixtureTime: any = (fixtureDate: string, h2h: H2HDetails) => {
  const kickoffTime = h2h.fixture.date.split("T")[1];
  const fixtureDateTimeStamp = fixtureDate + " " + kickoffTime.split("+")[0];
  const currentDateTimeStamp = formatCurrentDate();
  if (fixtureDateTimeStamp < currentDateTimeStamp) {
    return (
      <div className="shadow-inner bg-lightGreen text-white px-2 rounded">
        {h2h.goals.home} - {h2h.goals.away}
      </div>
    );
  } else {
    return (
      <div className="shadow-inner bg-lightGreen text-white px-2 rounded">
        {kickoffTime
          .split("+")[0]
          .substring(0, kickoffTime.split("+")[0].length - 3)}
      </div>
    );
  }
};

{
}
function formatCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}
