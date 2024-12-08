import SectionA from './sectionA';
import DoctorList from './sectionListDoctor';
import AppointmentsPatient from './appointmentPatient';
import UpdateCompte from './updateCompte';
import PatientProfile from './PatientProfile';


function SectionDashboardPatient({ selectedSection, id }) {
  
  if (selectedSection === 'Dashboard') {
    return (
       <SectionA id={id}/>
    );
  }

  if (selectedSection === "Profile") {
    return (
      <PatientProfile/>
    )
  }
  if (selectedSection === "Update Account") {
    return (
      <div>
        <UpdateCompte id={id}/>
      </div>
    );
  }

  if (selectedSection === "Doctors List") {
    return (
      <div>
        <DoctorList id={id}/>
      </div>
    );
  }

  if (selectedSection === 'Appointments') {
    return (
      <div className='bg-[#e5e7eb]'>
        <AppointmentsPatient id={id}/>
      </div>
    );
  }

  return <p className="text-gray-600">Veuillez sélectionner une option dans le menu.</p>;
}

export default SectionDashboardPatient;
