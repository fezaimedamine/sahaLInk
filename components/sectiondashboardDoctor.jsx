import SectionB from './sectionB';
import PatientsList from "./sectionListPatient"


import UpdateDoctor from './updateDoctor';
import DoctorProfile from './DoctorProfile';
import AppointmentsDoctor from './appointmentDoctor';


function SectionDashboardDoctor({ selectedSection, id }) {
    console.log(selectedSection)
  if (selectedSection === 'Dashboard') {
    return (
       <SectionB id={id}/>
    );
  }
  if (selectedSection === 'Profile') {
    return (
       <DoctorProfile/>
    );
  }
  if (selectedSection === "Update Account") {
    return (
      <div>
        <UpdateDoctor id={id}/>
      </div>
    );
  }

  if (selectedSection === "Patient List") {
    return (
      <div>
        <PatientsList doctorId={id}/>
      </div>
    );
  }

  if (selectedSection === "Appointments") {
    return (
      <div>
        <AppointmentsDoctor id={id}/>
      </div>
    );
  }

  return <p className="text-gray-600">Veuillez sélectionner une option dans le menu.</p>;
}

export default SectionDashboardDoctor;
