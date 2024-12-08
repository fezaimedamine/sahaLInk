"use client";

import { useState, useEffect } from 'react';
import { supabase } from "./clientSupabase";

export default function SectionB({ id }) {
  const [statistics, setStatistics] = useState({
    totalAppointments: 0,
    malePatients: 0,
    femalePatients: 0,
    states: {},
  });

  const [statToday, setStatToday] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { data, error } = await supabase
          .from("appointment")
          .select(
            `
            appointment_id,
            appointment_date,
            status,
            doctor_id,
            patients(
              gender,
              state
            )
          `
          )
          .eq("doctor_id", id);

        if (error) throw error;

        // Calculate statistics
        const today = new Date(); // Set the specific date (9th December 2024)
        const totalAppointments = data.length;
        const malePatients = data.filter((appointment) => appointment.patients?.gender === "male").length;
        const femalePatients = data.filter((appointment) => appointment.patients?.gender === "female").length;

        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
        const todayAppointments = data.filter(
          (appointment) =>
            appointment.appointment_date >= startOfDay &&
            appointment.appointment_date <= endOfDay
        ).length;
        
        setStatToday(todayAppointments);
        
        // Group by state
        const states = {};
        data.forEach((appointment) => {
          const state = appointment.patients?.state || "Unknown";
          states[state] = (states[state] || 0) + 1;
        });

        setStatistics({ totalAppointments, malePatients, femalePatients, states });
      } catch (err) {
        console.error("Error fetching statistics:", err);
      }
    };

    fetchStatistics();
  }, [id]);

  return (
    <div>
      <header className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-blue-700">Welcome</span> to your{" "}
          <span className="text-blue-700">Dashboard</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your appointments, update your information, and access your files.
        </p>
      </header>

      <section className="mt-6">
        <h2 className="text-xl font-semibold  text-gray-800">Appointment Statistics</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-blue-200 shadow-md rounded-lg text-blue-800 ">
            <h3 className="text-lg font-semibold">Total Appointments</h3>
            <p className="text-2xl font-bold">{statistics.totalAppointments}</p>
          </div>
          <div className="p-4 bg-blue-200 shadow-md rounded-lg text-blue-800">
            <h3 className="text-lg font-semibold">Appointments taken by Male</h3>
            <p className="text-2xl font-bold">{statistics.malePatients}</p>
          </div>
          <div className="p-4 bg-blue-200  shadow-md rounded-lg text-blue-800">
            <h3 className="text-lg font-semibold">Appointments taken by  Female</h3>
            <p className="text-2xl font-bold">{statistics.femalePatients}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Patients by State</h3>
          <ul className="mt-3 space-y-2">
            {Object.entries(statistics.states).map(([state, count]) => (
              <li key={state} className="flex justify-between shadow-md bg-blue-100 p-3 rounded-lg">
                <span>{state}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className=" mt-4 p-4 bg-blue-200 shadow-md rounded-lg text-blue-800">
            <h3 className="text-lg font-semibold">Today's Appointments</h3>
            <p className="text-2xl font-bold">{statToday}</p>
      </div>
    </div>
  );
}
