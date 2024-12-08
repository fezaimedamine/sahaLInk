import React from "react";

const TimeSlots: React.FC<{
  onTimeSelect: (time: string) => void;
  selectedTimes: string[];
  availableTimes: string[];
}> = ({ onTimeSelect, selectedTimes, availableTimes }) => {
  {console.log(availableTimes)}
  return (
    <div className="flex mt-8 justify-center gap-4">
      {availableTimes.map((time, index) => (
        <div
          key={index}
          onClick={() => !selectedTimes.includes(time) && onTimeSelect(time)} // Prevent selecting already chosen times
          className={`cursor-pointer flex items-center justify-center w-24 h-16 border-2 border-gray-300 rounded-xl bg-white shadow-md 
            ${selectedTimes.includes(time) ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white"} 
            transition duration-300`}
          style={{ opacity: selectedTimes.includes(time) ? 0.5 : 1 }}
        >
          <span className="text-lg font-medium">{time}</span>
        </div>
      ))}
    </div>
  );
};

export default TimeSlots;
