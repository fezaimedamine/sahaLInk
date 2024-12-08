"use client"

import HeroSection from "@/components/heroSection";
import DoctorList from "@/components/show5doctors";
import SpecialityRow from "@/components/showSpeciality";
import CenteredContent from "@/components/text";


export default function Home() {
    return (
        <div>
        {/* Main Hero Section */}
        <HeroSection 
          title="Welcome to Our Website" 
          content="Discover our amazing services and products tailored just for you." 
          imgSrc="/header_img.png" 
          link="/about" 
          btnContent="Learn More" 
        />
  
        {/* Informational Section: Find by Speciality */}
        <CenteredContent 
          title="Find by Speciality" 
          content="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free." 
        />
        <SpecialityRow/>
        {/* Informational Section: Top Doctors */}
        <CenteredContent 
          title="Top Doctors to Book" 
          content="Simply browse through our extensive list of trusted doctors." 
        />
        <DoctorList/> 
        {/* Secondary Hero Section: Book Appointments */}
        <div className="mt-20">
          <HeroSection 
            title="Book Appointment With 20+ Trusted Doctors" 
            content="" 
            btnContent="Create account" 
            link="/register" 
            imgSrc="/appointment_img.png" 
          />
        </div>
      </div>
    );
}