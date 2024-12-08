"use client";
import { useState, useEffect } from "react";
import { supabase } from "./clientSupabase";

// Utility function to format timestamps
function formatSupabaseTimestamp(timestamp) {
  if (!timestamp) return "Invalid timestamp";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid timestamp";

  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  
}

function AppointmentsDoctor({ id } ) {
  const [appointments, setAppointments] = useState([]);
  const now = new Date();

  useEffect(() => {
    const fetchAppointments = async () => {
      const today = new Date().toISOString();
      console.log(today);

      // Fetch future appointments and related doctor and patient information
      const { data, error } = await supabase
        .from("appointment")
        .select(
          `appointment_id,
           appointment_date,
           status,
           doctor_id,
           patient_id,
           patients:patient_id (
             first_name,
             last_name
           )`
        )
        .eq("doctor_id", id)
        .gt("appointment_date", today) // Only future dates
        .order("appointment_date", { ascending: true }); // Sort by date

      if (error) {
        console.log("Error Supabase:", error);
      } else {
        console.log("Data retrieved:", data);
        setAppointments(data);
      }
    };

    fetchAppointments();
  }, [id]);

  // Handle delete appointment
  const handleDelete = async (appointmentId) => {
    const { error } = await supabase.from("appointment").delete().eq("appointment_id", appointmentId);

    if (error) {
      console.log("Error during deletion:", error);
    } else {
      setAppointments((prev) => prev.filter((appt) => appt.appointment_id !== appointmentId));
    }
  };

  if (appointments && appointments.length > 0) {
    return (
      <div>
        {/* Header Section */}
        <div className="flex flex-col rounded-xl items-center justify-center h-[350px] bg-gray-100 p-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-600">Appointments Page</h1>
            <p className="text-gray-700 mt-2 text-lg max-w-2xl">
              Here, you will find all the information related to managing your appointments.
            </p>
          </div>
        </div>

        {/* Appointment Cards Section */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 px-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.appointment_id}
              className="flex flex-col justify-between text-black p-4 bg-white shadow-lg rounded-2xl w-[320px] hover:shadow-2xl transition-shadow"
            >
              {/* Appointment Information */}
              <div>
                <p className="text-blue-700 font-semibold text-lg">
                  {formatSupabaseTimestamp(appointment.appointment_date)}
                </p>

                {appointment.patients ? (
                  <>
                    <p className="mt-2 text-gray-600">
                      With patient:{" "}
                      <span className="font-bold text-black">
                        {appointment.patients.first_name} {appointment.patients.last_name}
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="text-red-500 mt-2">Patient information not available.</p>
                )}
              </div>

              {/* Action Button */}
              <button
                className="mt-4 bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-indigo-700 border border-indigo-700 transition"
                onClick={() => handleDelete(appointment.appointment_id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl font-semibold">No upcoming appointments found.</p>
      </div>
    );
  }
}

export default AppointmentsDoctor;
