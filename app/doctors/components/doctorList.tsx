import DoctorCard from "@/components/doctorCard";
import React from "react";

interface Doctor {
  doctor_id: string;
  first_name: string;
  specialty: string;
  profile_image_url: string;
}

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = React.memo(({ doctors }) => {
  console.log("DoctorList Rendered");
  return (
    <main className="flex-1 bg-white p-6">
      {/* Adjusted grid layout with more columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5">
        {doctors.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No doctors found.</p>
        ) : (
          doctors.map((doctor) => (
            <DoctorCard
              key={doctor.doctor_id}
              imgSrc={doctor.profile_image_url}
              name={doctor.first_name}
              position={doctor.specialty}
            />
          ))
        )}
      </div>
    </main>
  );
});

// Add displayName for debugging and linting purposes
DoctorList.displayName = "DoctorList";

export default DoctorList;
