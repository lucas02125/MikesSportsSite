import React, { useState } from "react";
import dayjs from "dayjs";

type Props = {
  chosenDate: string;
  onChange: (value: string) => void;
};

const Calendar = ({ chosenDate, onChange }: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const todaysDate = new Date().toISOString().split("T")[0];

  // Calculate the start and end of the current month
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  // Calculate days to display
  const daysInMonth = endOfMonth.diff(startOfMonth, "day") + 1;
  const daysArray = Array.from({ length: daysInMonth }, (_, index) =>
    startOfMonth.add(index, "day")
  );

  // Helper function to render day names
  const renderDayNames = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames.map((day, index) => (
      <div key={index} className="p-2 font-medium text-center">
        {day}
      </div>
    ));
  };

  const handleDateClick = (date: dayjs.Dayjs): any => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    onChange(date.format("YYYY-MM-DD"));
  };

  // Helper function to render days of the month
  const renderDays = () => {
    return daysArray.map((date, index) => {
      const isDateChecked =
        selectedDate && selectedDate === date.format("YYYY-MM-DD");
      const isItToday = !selectedDate && dayjs().isSame(date, "day");
      return (
        <div
          key={index}
          //onClick={handleDateClick(date)}
          className={`p-2 border text-center cursor-pointer ${
            isDateChecked || isItToday
              ? "bg-lightGreen text-white"
              : "hover:bg-blue-100"
          }`}
          onClick={() => handleDateClick(date)}
        >
          {date.date()}
        </div>
      );
    });
  };

  // Handle navigation between months
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 bg-gray-300 rounded">
          Previous
        </button>
        <h2 className="text-lg font-bold">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={handleNextMonth} className="p-2 bg-gray-300 rounded">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7">
        {renderDayNames()}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
