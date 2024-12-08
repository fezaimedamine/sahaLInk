import Image from "next/image";
import React from "react";

interface DoctorPropsType {
  imgSrc: string | null;
  name: string;
  position: string;
}

function DoctorCard({ imgSrc, name, position }: DoctorPropsType) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white w-[200px]"> {/* Reduced the width */}
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={`${name}'s profile`}
          width={200}   // Reduced the width
          height={200}  // Reduced the height
          className="w-full bg-[#EAEFFF] object-cover"
        />
      ) : (
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="p-4"> {/* Reduced padding */}
        <h2 className="text-lg font-semibold mb-1 text-gray-800">{name}</h2> {/* Reduced font size */}
        <p className="text-gray-600 text-sm">{position}</p>
      </div>
    </div>
  );
}

export default DoctorCard;
