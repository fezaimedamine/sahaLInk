import React, { useEffect, useState } from "react";
import DoctorCard from "./doctorCard";

import { supabase } from "./clientSupabase";

interface Doctor {
  id: string;
  profile_image_url: string | null;
  first_name: string;
  last_name: string;
  specialty: string;
}

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data, error } = await supabase
          .from("doctors")
          .select("doctor_id, first_name, last_name, specialty, profile_image_url") // Ensure correct field names from your Supabase table
          .limit(5);

        if (error) {
          console.error("Error fetching doctors:", error);
          return;
        }

        if (data) {
          // Map data to ensure it fits the Doctor interface
          const formattedData: Doctor[] = data.map((doctor: any) => ({
            id: doctor.doctor_id, // Match the field name in your database
            profile_image_url: doctor.profile_image_url,
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            specialty: doctor.specialty,
          }));

          setDoctors(formattedData);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          imgSrc={doctor.profile_image_url}
          name={`${doctor.first_name} ${doctor.last_name}`}
          position={doctor.specialty}
        />
      ))}
    </div>
  );
};

export default DoctorList;
