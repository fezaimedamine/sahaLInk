"use client";

import React, { useState, useEffect } from "react";
import EditDoctorForm from "./editDoctorForm"; // Import the doctor form
import { supabase } from "./clientSupabase";

export default function UpdateDoctorCompte({ id }) {
  const [doctor, setDoctor] = useState(null);

  // Fetch doctor's data from Supabase
  const fetchDoctorData = async () => {
    try {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("doctor_id", id)
        .single();

      if (error) {
        console.error("Error fetching doctor data:", error);
      } else {
        console.log(data)
        setDoctor(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  useEffect(() => {
    fetchDoctorData(); // Fetch data when the component mounts
  }, []);

  const updateDoctor = (updatedDoctor) => {
    setDoctor(updatedDoctor); // Update the doctor data locally
  };

  if (!doctor) {
    return (
      <div className="text-center text-gray-800">
        <p>Loading doctor data...</p>
        <button onClick={fetchDoctorData} className="text-blue-500 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Update Doctor Account
        </h1>
        <EditDoctorForm doctorInitial={doctor} onSave={updateDoctor} />
      </div>
    </div>
  );
}
