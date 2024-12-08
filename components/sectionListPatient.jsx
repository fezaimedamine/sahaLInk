"use client";
import { useState, useEffect } from "react";
import { supabase } from "./clientSupabase";

function PatientsList({ doctorId }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Fetch all patients related to the doctor
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data: appointments, error: appointmentsError } = await supabase
          .from("appointment")
          .select("patient_id")
          .eq("doctor_id", doctorId);
        console.log(appointments)
        if (appointmentsError) {
          console.error("Error fetching appointments:", appointmentsError);
          return;
        }

        const patientIds = [
          ...new Set(
            appointments
              .filter((a) => a.patient_id !== undefined && a.patient_id !== null) // Ensure patient_id exists
              .map((a) => a.patient_id) // Extract patient_id
          ),
        ];
        console.log(patientIds)
        const { data: patientsData, error: patientsError } = await supabase
          .from("patients")
          .select("*")
          .in("patient_id", patientIds);

        if (patientsError) {
          console.error("Error fetching patients:", patientsError);
        } else {
          setPatients(patientsData);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchPatients();
  }, [doctorId]);

  // Fetch appointments for the selected patient
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedPatient) return;
      console.log(selectedPatient)
      try {
        const { data, error } = await supabase
          .from("appointment")
          .select("*")
          .eq("patient_id", selectedPatient.patient_id);
        console.log(data)
        if (error) {
          console.error("Error fetching appointments:", error);
        } else {
          setAppointments(data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchAppointments();
  }, [selectedPatient]);

  // Filter patients based on search term
  useEffect(() => {
    const results = patients.filter((patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(results);
  }, [searchTerm, patients]);

  if (!selectedPatient) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Patients <span className="text-blue-700">List</span>
        </h1>

        {/* Search Bar */}
        <div className="search-bar flex items-center justify-center mb-8">
          <input
            type="text"
            placeholder="Search for a patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full p-3 w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Patient List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredPatients.length > 0 ? filteredPatients : patients).map((patient) => (
            <div
              key={patient.patient_id}
              className="cursor-pointer bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              onClick={() => setSelectedPatient(patient)}
            >
              <p className="text-lg font-bold text-blue-700">
                {patient.first_name} {patient.last_name}
              </p>
              <p className="text-gray-600">Email: {patient.email}</p>
              <p className="text-gray-600">Phone: {patient.phone_number}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto py-8">
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-blue-500 cursor-pointer hover:text-blue-600 transition"
            onClick={() => setSelectedPatient(null)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5l-7-7m0 0l7-7m-7 7h16.5"
            />
          </svg>
        </div>

        {/* Selected Patient Details */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">
            Patient: <span className="text-blue-700">{selectedPatient.last_name}</span>
          </h2>
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Email: {selectedPatient.email}
          </h3>
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Phone: {selectedPatient.phone_number}
          </h3>
        </div>

        {/* Appointment History */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Appointment History:</h3>
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment.appointment_id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(appointment.appointment_date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Reason:</span>{" "}
                  {appointment.reason || "No reason provided"}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {appointment.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PatientsList;
