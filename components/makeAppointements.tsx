"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "./clientSupabase";
import WorkDaysThisWeek from "./bookingSlot";
import TimeSlots from "./timeSlot";
import { UUID } from "crypto";

// Define available time slots for each day
const timeSlotsByDay = {
  Monday: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"],
  Tuesday: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
  Wednesday: ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM"],
  Thursday: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"],
  Friday: ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"],
};

interface IDS {
  doctor_id: UUID;
  patient_id: string;
  workdays: string[];
}

const AppointmentScheduler: React.FC<IDS> = ({ doctor_id, patient_id, workdays }) => {
  const [selectedDate, setSelectedDate] = useState<"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  const handleDateSelect = (date: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday") => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when a new date is selected
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setSelectedTimes([...selectedTimes, time]); // Add selected time to the list
  };

  const fetchBookedSlots = async (date: string) => {
    try {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayIndex = weekDays.indexOf(date);
      const dayDiff = dayIndex - dayOfWeek;

      const selectedFullDate = new Date(today);
      selectedFullDate.setDate(today.getDate() + dayDiff);
      const selectedDateString = selectedFullDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      // Fetch booked appointments from the database
      const { data, error } = await supabase
        .from("appointment")
        .select("appointment_date")
        .eq("doctor_id", doctor_id)
        .gte("appointment_date", `${selectedDateString}T00:00:00`)
        .lte("appointment_date", `${selectedDateString}T23:59:59`);

      if (error) {
        console.error("Error fetching appointments:", error);
        setAvailableTimes(timeSlotsByDay[date as keyof typeof timeSlotsByDay]); // Default to all slots if there's an error
        return;
      }

      // **Option 1: Using Map**
      const bookedTimesMap = Array.from(
        new Set(
          data?.map((appointment: { appointment_date: string }) => {
            const timeString = new Date(appointment.appointment_date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            return timeString.replace(/^0/, ""); // Remove leading zero
          })
        )
      );

      console.log("Booked Times via Map: ", bookedTimesMap);

      // **Option 2: Grouping by Time (Alternative Query)**
      const { data: groupedData, error: groupError } = await supabase
        .from("appointment")
        .select("appointment_date")
        .eq("doctor_id", doctor_id)
        .eq("status", "booked") // Example filter if needed
        .gte("appointment_date", `${selectedDateString}T00:00:00`)
        .lte("appointment_date", `${selectedDateString}T23:59:59`)
        .order("appointment_date");

      if (groupError) {
        console.error("Error fetching grouped appointments:", groupError);
        return;
      }

      const bookedTimesGroup = groupedData?.map((appointment: { appointment_date: string }) => {
        const timeString = new Date(appointment.appointment_date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return timeString.replace(/^0/, ""); // Consistent formatting
      });

      console.log("Booked Times via Grouping: ", bookedTimesGroup);

      // Combine results from both methods
      const finalBookedTimes = Array.from(new Set([...bookedTimesMap, ...(bookedTimesGroup || [])]));

      console.log("Final Booked Times: ", finalBookedTimes);

      // Filter out booked times from available slots
      const filteredTimes = timeSlotsByDay[date as keyof typeof timeSlotsByDay].filter((time) => !finalBookedTimes.includes(time));
      console.log("Filtered Available Times: ", filteredTimes);

      setAvailableTimes(filteredTimes);
    } catch (error) {
      console.error("Unexpected error fetching booked slots:", error);
      setAvailableTimes(timeSlotsByDay[date as keyof typeof timeSlotsByDay]); // Default to all slots in case of error
    }
  };

  // Helper function to add 1 hour to a Date object
  const addOneHour = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 1);
    return newDate;
  };

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime) {
      setMessage("Please select both a date and time.");
      return;
    }

    try {
      const today = new Date();
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayIndex = weekDays.indexOf(selectedDate);
      const dayDiff = dayIndex - today.getDay();

      const appointmentDate = new Date(today);
      appointmentDate.setDate(today.getDate() + dayDiff);

      // Use the helper function to add 1 hour
      const updatedAppointmentDate = addOneHour(appointmentDate);

      const [time, period] = selectedTime.split(" ");
      const [hour, minute] = time.split(":");
      let adjustedHour = parseInt(hour);
      if (period === "PM" && adjustedHour !== 12) adjustedHour += 12;
      if (period === "AM" && adjustedHour === 12) adjustedHour = 0;

      updatedAppointmentDate.setHours(adjustedHour, parseInt(minute), 0, 0);
      const formattedDate = updatedAppointmentDate.toISOString();

      const { data, error } = await supabase
        .from("appointment")
        .insert([
          {
            appointment_date: formattedDate,
            doctor_id: doctor_id,
            patient_id: patient_id,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      setMessage("Your reservation has been successfully submitted.");
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error) {
      console.error("Error making reservation:", error);
      setMessage("Failed to make the reservation. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16 container">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>

      <div className="mb-6 w-full max-w-md">
        <WorkDaysThisWeek workdays={workdays} onDateSelect={handleDateSelect} />
      </div>

      <div className="mb-6 w-full max-w-md">
        {selectedDate && (
          <TimeSlots
            onTimeSelect={handleTimeSelect}
            selectedTimes={selectedTimes}
            availableTimes={availableTimes}
          />
        )}
      </div>

      <div className="w-full max-w-md">
        <button
          onClick={handleReservation}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-full"
        >
          Submit Reservation
        </button>
      </div>

      {message && (
        <p
          className={`mt-4 text-lg p-4 rounded-lg border-2 
          ${message.includes("success") ? "border-green-500 bg-green-100 text-green-800" : ""}
          ${message.includes("error") ? "border-red-500 bg-red-100 text-red-800" : ""}
          ${!message.includes("error") && !message.includes("success") ? "border-blue-500 bg-blue-100 text-blue-800" : ""}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AppointmentScheduler;
