"use client"
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import "../globals.css";
import SectionDashboardPatient from '@/components/sectiondashboardPatient';

function PatientDashboard() {
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const route=useRouter();
  const {id}=route.query;
  const arr=["Dashboard","Profile","Doctors List","Appointments","Update Account"]
  

  return (
    <div className="!flex flex-row h-screen">
      <Navbar onSelectSection={setSelectedSection} list={arr}/>
      <div className="flex-1 relative ml-60 flex-col p-6  bg-gray-200">
        <SectionDashboardPatient selectedSection={selectedSection} id={id} />
      </div>
    </div>
  );
}
export default PatientDashboard