"use client"

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "./components/sidebar";
import DoctorList from "./components/doctorList";

interface Doctor {
  doctor_id: string;
  first_name: string;
  specialty: string;
  profile_image_url: string;
}

const ShowDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState<string | null>(null);

  const fetchDoctors = useCallback(async (specialty: string | null) => {
    setLoading(true);
    setError(null);

    let query = supabase.from("doctors").select("*");

    if (specialty) {
      query = query.eq("specialty", specialty);
    }

    const { data, error } = await query;

    if (error) {
      setError("Failed to fetch doctors. Please try again.");
      console.error("Error fetching doctors:", error);
    } else if (data) {
      setDoctors(data);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDoctors(specialty);
  }, [specialty, fetchDoctors]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex min-h-screen mt-8">
      {/* Sidebar Component */}
      <Sidebar onSpecialtySelect={setSpecialty} />

      {/* Doctor List Component */}
      <DoctorList doctors={doctors} />
    </div>
  );
};

export default ShowDoctors;
