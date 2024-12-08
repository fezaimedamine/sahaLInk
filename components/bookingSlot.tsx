import React from "react";

// Define the expected days of the week
const getCurrentWeekDays = () => {
  const today = new Date();
  console.log(today)
  const currentDayIndex = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const shortWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return { today, weekDays, shortWeekDays };
};

interface WorkDaysProps {
  workdays: string[]; // Restrict workdays to these valid values
  onDateSelect: (date: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday") => void; // Ensure only valid day names are passed
}

const WorkDaysThisWeek: React.FC<WorkDaysProps> = ({ workdays, onDateSelect }) => {
  // Ensure workdays is an array before using .map()
  if (!Array.isArray(workdays)) {
    return <div>Invalid input: workdays must be an array.</div>;
  }

  const { today, weekDays, shortWeekDays } = getCurrentWeekDays();

  // Calculate the date for each workday (only the day number)
  const workDaysThisWeek = workdays.map((day) => {
    const dayIndex = weekDays.indexOf(day);
    const Day = weekDays[dayIndex];

    // Calculate the difference in days between today and the workday
    const diffDays = dayIndex - today.getDay();

    // Create a new date for that workday
    const workdayDate = new Date(today);

    // If the workday has already passed, shift it to next week
    if (diffDays < 0) {
      workdayDate.setDate(today.getDate() + diffDays + 7); // Shift to next week
    } else {
      workdayDate.setDate(today.getDate() + diffDays); // Use current week if the day is not passed
    }

    // Get just the day of the month (the clean date)
    const cleanDate = workdayDate.getDate();

    // Ensure that if we are at the end of the month, the date shifts correctly to the next month
    const formattedDate = workdayDate.toDateString(); // To get the full date (Day, Month, Date, Year)

    return { cleanDate, Day, date: formattedDate, workdayDate };
  });

  // Sort workdays by the date (this will ensure that the dates are in order)
  const sortedWorkDays = workDaysThisWeek.sort((a, b) => a.workdayDate.getTime() - b.workdayDate.getTime());

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {sortedWorkDays.map((workday, index) => (
        <div
          key={index}
          onClick={() => onDateSelect(workday.Day as "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday")} // Cast to valid day
          className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 rounded-full shadow-md bg-white border transition duration-300 hover:bg-blue-600 hover:text-white"
        >
          <span className="text-2xl font-bold">{workday.Day}</span>
          <span className="text-xl">{workday.cleanDate}</span> {/* Only the day number */}
        </div>
      ))}
    </div>
  );
};

export default WorkDaysThisWeek;
