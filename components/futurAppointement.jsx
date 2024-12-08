"use client";
import { useState, useEffect } from "react";
import { supabase } from "./clientSupabase";

function FutureAppointments( {id} ) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFutureAppointments = async () => {
     
      setLoading(true);

      try {
        const today = new Date().toISOString();
        console.log(today)
        // Fetch future appointments for the patient
        const { data, error } = await supabase
          .from("appointment")
          .select("*")
          .eq("patient_id", id) // Ensure id is valid
          .gt("appointment_date", today) // Only future dates
          .order("appointment_date", { ascending: true }); // Sort by date

        console.log(data)

        
        setAppointments(data || []);
      } catch (error) {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFutureAppointments();
  }, [id]);

  if (loading) {
    return <p>Loading future appointments...</p>;
  }

  if (appointments.length === 0) {
    return <p>No future appointments found for this patient.</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Future Appointments</h1>
      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li
            key={appointment.appointment_id}
            className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(appointment.appointment_date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Time:</span>{" "}
              {new Date(appointment.appointment_date).toLocaleTimeString()}
            </p>
            <p>
              <span className="font-semibold">Reason:</span>{" "}
              {appointment.reason || "No reason provided"}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {appointment.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FutureAppointments;
