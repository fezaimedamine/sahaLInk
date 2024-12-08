"use client"
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import "../globals.css";
import SectionDashboardDoctor from '@/components/sectiondashboardDoctor';
import BlockBackNavigation from '@/components/blockBackNavigation'; 

function DoctorDashboard() {
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const route = useRouter();
  const { id } = route.query;
  const arr = ["Dashboard", "Profile", "Patient List", "Appointments", "Update Account"];
  
  return (
    <div className="!flex flex-row h-screen">
      <Navbar onSelectSection={setSelectedSection} list={arr}/>
      
      {/* Include the BlockBackNavigation component */}
      <BlockBackNavigation /> 

      <div className="flex-1 relative ml-60 flex-col p-6 bg-gray-200">
        <SectionDashboardDoctor selectedSection={selectedSection} id={id} />
      </div>
    </div>
  );
}

export default DoctorDashboard;
