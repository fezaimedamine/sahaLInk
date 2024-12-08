import { specialityData } from "@/public/assets";
import Image from "next/image";

const SpecialityRow: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 mt-8 mb-8">
      {specialityData.map((speciality) => (
        <div
          key={speciality.id}
          className="flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105 hover:opacity-80"
        >
          <Image
            src={speciality.image}
            alt="icon"
            width={50}
            height={50}
            className="w-40 h-40 rounded-full object-cover shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          />
          <p className="mt-2 text-lg font-medium text-gray-800 transition-colors duration-300 hover:text-blue-600">
            {speciality.speciality}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SpecialityRow;
