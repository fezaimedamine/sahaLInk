
import HeroSection from "@/components/heroSection";

import CenteredContent from "@/components/text";
import MissionSection from "@/components/textOffer";

import { CalendarIcon, ClipboardIcon, UserCircleIcon, CogIcon } from "@heroicons/react/24/outline"; 
export default function About() {
 

const features = [
  {
    title: "Comprehensive Healthcare Services",
    icon: <ClipboardIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Effortless Appointment Scheduling",
    icon: <CalendarIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Profile Management for Everyone",
    icon: <UserCircleIcon className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Streamlined Schedule Management",
    icon: <CogIcon className="w-8 h-8 text-blue-600" />,
  },
];

    return (
        <div>
           <section className="relative mb-20 rounded-lg bg-blue-600 text-white md:flex-row items-center justify-center p-8 md:p-16 h-auto md:h-[85vh] sm:w-full flex">
            <div className="md:w-1/2 text-center space-y-4 mb-8 md:mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Welcome to SahaLink!
                </h1>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                At SahaLink, we believe that healthcare should be simple, accessible, and efficient for everyone. Our platform connects patients with doctors in a seamless and user-friendly way, enabling better communication and time management for both parties.
                </p>
            </div>
            </section>
            <CenteredContent 
          title="What We Offer" 
          content=" Explore our range of features designed to connect patients and doctors effortlessly, ensuring a smooth healthcare experience for everyone." 
            />
            <div className=" flex justify-center gap-6 mt-8">
            {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6  hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700">{feature.title}</h3>
            </div>
          ))}
            </div>
            <MissionSection/>
           
            
                    
        </div>
    );
}